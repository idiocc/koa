import alamode from 'alamode'

alamode({
  matcher(path) {
    if (/@goa\/goa\/test/.test(path) ||
      // tests import statuses but only used in source code testing
      /@goa\/goa\/modules\/statuses/.test(path) ||
      /@goa\/goa\/modules\/parseurl/.test(path)
    ) return true
  },
  ignoreNodeModules: false,
})