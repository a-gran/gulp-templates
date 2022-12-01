// Получаем имя папки проекта
import * as nodePath from 'path' // подключение модуля
const rootFolder = nodePath.basename(nodePath.resolve())
console.log('rootFolder', rootFolder)

const buildFolder = `./dist` // также можно использовать rootFolder
const srcFolder = `./src`

const path = {
	build: {},
	src: {},
	watch: {},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}