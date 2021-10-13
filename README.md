# 🔎 Esnecil
![✨ Release](https://github.com/mikaelsrozee/esnecil/actions/workflows/RELEASE.yml/badge.svg)

Esnecil (license) checker is a CLI tool that will scan all dependencies (and subdependencies) in your project's node modules directory, allowing you to make informed choices about the packages that you are using.

It is important that you use this information to inform your further research and analysis, rather than being fully dependant on this tool. Any license breaches are still the responsibility of the author (you), not the author of esnecil (me).

## ⚙️ Installation

It is recommended that you install this package globally, and use it as a CLI tool.

### npm
```
npm i -g esnecil
```

### yarn
```
yarn global add esnecil
```

## 🔨 Usage

### esnecil list

To get a list of all licenses in your project, as well as a list of dependencies that do not have a `license` attribute in their `package.json` file, use the `esnecil list` command in the base of your project.

```
/bestdirectory
/node_modules
/someotherdirectory
/src
a.config.js
package.json
```

```
esnecil list
```

## ⚠️ Issues? Feature requests?

Report these [on GitHub](https://github.com/mikaelsrozee/esnecil/issues).

