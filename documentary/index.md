# @goa/koa

%NPM: @goa/koa%

`@goa/koa` is the [Koa web-sever](https://koajs.com) compiled and optimised with _Google Closure Compiler_ so that it has only 1 dependency (`mime-db`, for easy access to upgrades). The types are written as JSDoc and don't require installing typings. The aim of this project is to demonstrate how to modernise the old-school NPM package making, including starting to use import/export statements without _Babel_, restoring to pure _JSDoc_ without TypeScript, and compiling the code into the single executable using the compiler, and testing the code with [_Zoroaster_](https://contexttesting.com) testing framework which is twice as fast and weighs 500KB against 50MB compared with _Jest_ (as used in the original repository).

<table>
<tr><th colspan="2">@Goa/Koa Source Code Is ~2000 Lines Of Code</th></tr>
<tr><td colspan="2">
<img src="doc/ic.png" alt="@Goa/Koa Compiled Source Code.">
</td></tr>
<tr>
 <td align="center">
  <strong>Yarn Install</strong>
 </td>
 <td align="center">
  <strong>NPM Install</strong>
 </td>
</tr>
<tr>
 <td align="center">

```sh
yarn add @goa/koa
```
 </td>
 <td align="center">

```sh
npm install @goa/koa
```
 </td>
</tr>
</table>

This package actually compiles the [Goa Source Code](/idiocc/goa). You can find all the documentation on that package's page.

<!-- therefore they work not just with TypeScript-based editors and don't require downloading additional data. -->

## Table Of Contents

%TOC%

%~%