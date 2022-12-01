// Получаем имя папки проекта
import * as nodePath from 'path' // подключение модуля
const rootFolder = nodePath.basename(nodePath.resolve())
console.log('rootFolder', rootFolder)

const buildFolder = `./dist` // также можно использовать rootFolder
const srcFolder = `./src`

export const path = {

	// export - чтобы можно было использовать эту 
	// констунту в других файлах (импортировать ее в другие файлы)

	build: {
		files: `${buildFolder}/files/`
	},

	src: {
		files: `${srcFolder}/files/**/*.*`
	},

	watch: {
	},

	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}