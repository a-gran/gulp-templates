// Получаем имя папки проекта
import * as nodePath from 'path' // подключение модуля
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = `./dist` // также можно использовать rootFolder
const srcFolder = `./src`

export const path = {

	// export - чтобы можно было использовать эту 
	// констунту в других файлах (импортировать ее в другие файлы)

	build: {
		files: `${buildFolder}/`,
		files: `${buildFolder}/files/`,
		allowEmpty: true
	},

	src: {
		files: `${srcFolder}/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		allowEmpty: true
	},

	watch: {
		files: `${srcFolder}/**/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		allowEmpty: true
	},

	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}