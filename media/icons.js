// Shout-Out to vscode-icons for their work with beautiful icons!
// https://github.com/vscode-icons
const iconMap = {
  actionscript: "actionscript.svg",
  ada: "ada.svg",
  advpl: "advpl.svg",
  al: "al.svg",
  affectscript: "affectscript.svg",
  ansible: "ansible.svg",
  antlr: "antlr.svg",
  anyscript: "anyscript.svg",
  apacheconf: "apache.svg",
  apex: "apex.svg",
  apiblueprint: "apib.svg",
  apl: "apl.svg",
  applescript: "applescript.svg",
  asciidoc: "asciidoc.svg",
  asp: "asp.svg",
  "asp (html)": "asp.svg",
  arm: "assembly.svg",
  asm: "assembly.svg",
  ats: "ats.svg",
  ahk: "autohotkey.svg",
  autoit: "autoit.svg",
  avro: "avro.svg",
  azcli: "azure.svg",
  "azure-pipelines": "azurepipelines.svg",
  ballerina: "ballerina.svg",
  bat: "bat.svg",
  bats: "bats.svg",
  bazel: "bazel.svg",
  starlark: "bazel.svg",
  befunge: "befunge.svg",
  befunge98: "befunge.svg",
  biml: "biml.svg",
  blade: "blade.svg",
  "laravel-blade": "blade.svg",
  blitzbasic: "blitzbasic.svg",
  bolt: "bolt.svg",
  bosque: "bosque.svg",
  c: "c.svg",
  "c-al": "c_al.svg",
  cabal: "cabal.svg",
  caddyfile: "caddy.svg",
  cddl: "cddl.svg",
  ceylon: "ceylon.svg",
  cfml: "cfm.svg",
  "lang-cfml": "cf.svg",
  cfc: "cfc.svg",
  cfmhtml: "cfm.svg",
  clojure: "clojure.svg",
  clojurescript: "clojurescript.svg",
  "manifest-yaml": "cloudfoundry.svg",
  cmake: "cmake.svg",
  "cmake-cache": "cmake.svg",
  cobol: "cobol.svg",
  coffeescript: "coffeescript.svg",
  properties: "config.svg",
  dotenv: "config.svg",
  cookbook: "chef_cookbook.svg",
  confluence: "confluence.svg",
  cpp: "cpp.svg",
  crystal: "crystal.svg",
  csharp: "csharp.svg",
  css: "css.svg",
  feature: "cucumber.svg",
  cuda: "cuda.svg",
  cython: "cython.svg",
  dal: "dal.svg",
  dart: "dartlang.svg",
  pascal: "delphi.svg",
  objectpascal: "delphi.svg",
  "django-html": "django.svg",
  "django-txt": "django.svg",
  d: "dlang.svg",
  dscript: "dlang.svg",
  dml: "dlang.svg",
  diet: "dlang.svg",
  diff: "diff.svg",
  dockerfile: "docker.svg",
  ignore: "docker.svg",
  doxygen: "doxygen.svg",
  drools: "drools.svg",
  dotjs: "dotjs.svg",
  dustjs: "dustjs.svg",
  dylan: "dylan.svg",
  "dylan-lid": "dylan.svg",
  edge: "edge.svg",
  eex: "eex.svg",
  "html-eex": "eex.svg",
  es: "elastic.svg",
  elixir: "elixir.svg",
  elm: "elm.svg",
  erb: "erb.svg",
  erlang: "erlang.svg",
  falcon: "falcon.svg",
  fql: "fauna.svg",
  fortran: "fortran.svg",
  "fortran-modern": "fortran.svg",
  FortranFreeForm: "fortran.svg",
  "fortran_fixed-form": "fortran.svg",
  fsharp: "fsharp.svg",
  ftl: "freemarker.svg",
  fthtml: "fthtml.svg",
  galen: "galen.svg",
  "git-commit": "git.svg",
  "git-rebase": "git.svg",
  "gml-gms": "gamemaker.svg",
  "gml-gms2": "gamemaker2.svg",
  "gml-gm81": "gamemaker81.svg",
  gcode: "gcode.svg",
  genstat: "genstat.svg",
  glsl: "glsl.svg",
  glyphs: "glyphs.svg",
  gnuplot: "gnuplot.svg",
  go: "go.svg",
  gdscript: "godot.svg",
  graphql: "graphql.svg",
  dot: "graphviz.svg",
  groovy: "groovy.svg",
  haml: "haml.svg",
  handlebars: "handlebars.svg",
  harbour: "harbour.svg",
  haskell: "haskell.svg",
  "literate haskell": "haskell.svg",
  haxe: "haxe.svg",
  hxml: "haxe.svg",
  "Haxe AST dump": "haxe.svg",
  helm: "helm.svg",
  hjson: "hjson.svg",
  hlsl: "hlsl.svg",
  "home-assistant": "homeassistant.svg",
  hosts: "host.svg",
  html: "html.svg",
  http: "http.svg",
  "hunspell.aff": "hunspell.svg",
  "hunspell.dic": "hunspell.svg",
  hy: "hy.svg",
  hypr: "hypr.svg",
  icl: "icl.svg",
  imba: "imba.svg",
  "4GL": "informix.svg",
  ini: "ini.svg",
  ink: "ink.svg",
  innosetup: "innosetup.svg",
  janet: "janet.svg",
  java: "java.svg",
  jekyll: "jekyll.svg",
  jenkins: "jenkins.svg",
  declarative: "jenkins.svg",
  jenkinsfile: "jenkins.svg",
  jinja: "jinja.svg",
  javascript: "js_official.svg",
  json: "json.svg",
  "json-tmlanguage": "json.svg",
  jsonc: "json.svg",
  jsonnet: "jsonnet.svg",
  json5: "json.svg",
  julia: "julia.svg",
  juliamarkdown: "julia.svg",
  io: "io.svg",
  iodine: "iodine.svg",
  kivy: "kivy.svg",
  kos: "kos.svg",
  kotlin: "kotlin.svg",
  kusto: "kusto.svg",
  latino: "latino.svg",
  less: "less.svg",
  lex: "lex.svg",
  lisp: "lisp.svg",
  lolcode: "lolcode.svg",
  lsl: "lsl.svg",
  lua: "lua.svg",
  makefile: "makefile.svg",
  markdown: "markdown.svg",
  marko: "marko.svg",
  matlab: "matlab.svg",
  maxscript: "maxscript.svg",
  mel: "maya.svg",
  mdx: "mdx.svg",
  mediawiki: "mediawiki.svg",
  meson: "meson.svg",
  mjml: "mjml.svg",
  powerquery: "mlang.svg",
  mojolicious: "mojolicious.svg",
  mongo: "mongo.svg",
  mson: "mson.svg",
  nearley: "nearly.svg",
  nim: "nim.svg",
  nimble: "nimble.svg",
  nix: "nix.svg",
  nsis: "nsi.svg",
  nfl: "nsi.svg",
  nsl: "nsi.svg",
  bridlensis: "nsi.svg",
  nunjucks: "nunjucks.svg",
  "objective-c": "objectivec.svg",
  "objective-cpp": "objectivecpp.svg",
  ocaml: "ocaml.svg",
  ocamllex: "ocaml.svg",
  menhir: "ocaml.svg",
  ogone: "ogone.svg",
  openhab: "openHAB.svg",
  pddl: "pddl.svg",
  plan: "pddl_plan.svg",
  happenings: "pddl_happenings.svg",
  perl: "perl.svg",
  perl6: "perl6.svg",
  pgsql: "pgsql.svg",
  php: "php.svg",
  pine: "pine.svg",
  pinescript: "pine.svg",
  "pip-requirements": "pip.svg",
  "platformio-debug.disassembly": "platformio.svg",
  "platformio-debug.memoryview": "platformio.svg",
  "platformio-debug.asm": "platformio.svg",
  plsql: "plsql.svg",
  oracle: "plsql.svg",
  polymer: "polymer.svg",
  pony: "pony.svg",
  postcss: "postcss.svg",
  powershell: "powershell.svg",
  prisma: "prisma.svg",
  pde: "processinglang.svg",
  abl: "progress.svg",
  prolog: "prolog.svg",
  prometheus: "prometheus.svg",
  proto3: "protobuf.svg",
  proto: "protobuf.svg",
  puppet: "puppet.svg",
  jade: "pug.svg",
  purescript: "purescript.svg",
  pyret: "pyret.svg",
  python: "python.svg",
  qlik: "qlikview.svg",
  qml: "qml.svg",
  qsharp: "qsharp.svg",
  r: "r.svg",
  racket: "racket.svg",
  raml: "raml.svg",
  razor: "razor.svg",
  aspnetcorerazor: "razor.svg",
  javascriptreact: "reactjs.svg",
  typescriptreact: "reactts.svg",
  reason: "reason.svg",
  red: "red.svg",
  rescript: "rescript.svg",
  restructuredtext: "rest.svg",
  rexx: "rexx.svg",
  riot: "riot.svg",
  robot: "robotframework.svg",
  rmd: "rmd.svg",
  ruby: "ruby.svg",
  rust: "rust.svg",
  san: "san.svg",
  SAS: "sas.svg",
  sbt: "sbt.svg",
  scala: "scala.svg",
  vbscript: "script.svg",
  scss: "scss.svg",
  scilab: "scilab.svg",
  sdl: "sdlang.svg",
  shaderlab: "shaderlab.svg",
  shellscript: "shell.svg",
  slang: "slang.svg",
  slice: "slice.svg",
  slim: "slim.svg",
  silverstripe: "silverstripe.svg",
  eskip: "skipper.svg",
  smarty: "smarty.svg",
  snort: "snort.svg",
  solidity: "solidity.svg",
  sqf: "sqf.svg",
  sql: "sql.svg",
  squirrel: "squirrel.svg",
  stan: "stan.svg",
  stata: "stata.svg",
  stencil: "stencil.svg",
  "stencil-html": "stencil.svg",
  stylable: "stylable.svg",
  "source.css.styled": "styled.svg",
  stylus: "stylus.svg",
  svelte: "svelte.svg",
  Swagger: "swagger.svg",
  swagger: "swagger.svg",
  swift: "swift.svg",
  swig: "swig.svg",
  "systemd-unit-file": "systemd.svg",
  systemverilog: "systemverilog.svg",
  t4: "t4tt.svg",
  tt: "tt.svg",
  tera: "tera.svg",
  terraform: "terraform.svg",
  tex: "tex.svg",
  latex: "tex.svg",
  bibtex: "tex.svg",
  doctex: "tex.svg",
  plaintext: "text.svg",
  textile: "textile.svg",
  tiltfile: "tiltfile.svg",
  toml: "toml.svg",
  ttcn: "ttcn.svg",
  tuc: "tuc.svg",
  twig: "twig.svg",
  typescript: "typescript_official.svg",
  typoscript: "typo3.svg",
  vb: "vb.svg",
  vba: "vba.svg",
  velocity: "velocity.svg",
  verilog: "verilog.svg",
  vhdl: "vhdl.svg",
  viml: "vim.svg",
  v: "vlang.svg",
  volt: "volt.svg",
  vue: "vue.svg",
  wasm: "wasm.svg",
  wat: "wasm.svg",
  wenyan: "wenyan.svg",
  wolfram: "wolfram.svg",
  wurstlang: "wurst.svg",
  wurst: "wurst.svg",
  xmake: "xmake.svg",
  xml: "xml.svg",
  xquery: "xquery.svg",
  xsl: "xsl.svg",
  yacc: "yacc.svg",
  yaml: "yaml.svg",
  "yaml-tmlanguage": "yaml.svg",
  yang: "yang.svg",
  zig: "zig.svg",
};
