import config from './types/config'
import { relative, join, dirname } from 'path'
import { readFileSync, existsSync } from 'fs'
import resolveDep from 'resolve-dependency'
import { read, write, ensurePath } from '@wrote/wrote'
import { Replaceable } from 'restream'

const { 'entry': entry, 'js': js, 'destination': destination } = config

let file
let location = file
try {
  file = readFileSync(entry).toString()
} catch (err) {
  if (err.code != 'ENOENT') throw err
  location = require.resolve(entry)
  file = readFileSync(location).toString()
}
const dir = dirname(location)
const toDir = dirname(js)

const [, typework] = file.split('/* typework */\n')
if (!typework) {
  console.log('/* typework */ marker not found in %s', relative('', location))
  process.exit(1)
}

const jsFile = readFileSync(js).toString()

const IMPORT_RE = /import\(['"](\..+?)['"]\)/g

;(async () => {
  let cache = {}
  const repl = new Replaceable({
    re: IMPORT_RE,
    async replacement(m, loc) {
      let fileDestination = join(destination, loc)
      const relLoc = relative(toDir, fileDestination)

      if (loc in cache) return cache[loc]
      const res = `import('${relLoc}')`
      cache[loc] = res

      console.log('Detected %s', loc)

      const referencedFile = join(dir, loc)
      let dep
      try {
        ({ path: dep } = await resolveDep(referencedFile))
      } catch (err) {
        console.log('Could not resolve %s from %s', loc, location)
        return m
      }
      if (!fileDestination.endsWith('.js')) {
        if (dep.endsWith('index.js')) fileDestination = join(fileDestination, 'index.js')
        else fileDestination += '.js'
      }
      // update referencedFile
      const content = await read(dep)
      const depDir = dirname(dep)
      const depRepl = new Replaceable({
        re: IMPORT_RE,
        async replacement(m2, loc2) {
          const referenced = join(depDir, loc2)
          const { path: referencedPath } = await resolveDep(referenced)
          let newRef = relative(dirname(fileDestination), js)
          if (referencedPath == location) {
            newRef = newRef.replace(/(\/index)?\.js$/, '')
            return `import('${newRef}')`
          } else {
            // make sure the file is present
            const dep2 = dirname(fileDestination)
            let realDep = join(dep2, loc2)

            if (!realDep.endsWith('.js')) {
              if (referencedPath.endsWith('index.js')) realDep = join(realDep, 'index.js')
              else realDep += '.js'
            }
            const e = existsSync(realDep)
            if (!e) {
              const other = await read(referencedPath)
              await write(realDep, other)
            }
            return m2
          }
        },
      })
      const depToWrite = await Replaceable.replace(depRepl, content)
      await ensurePath(fileDestination)
      await write(fileDestination, depToWrite)

      return res
    },
  })
  const toAdd = await Replaceable.replace(repl, typework)

  const newJsFile = jsFile.replace(/\/\* typework \*\/\n(?:([^\n][\s\S]+?\n))?$/, `/* typework */
${toAdd}`)
  await write(js, newJsFile)
})()