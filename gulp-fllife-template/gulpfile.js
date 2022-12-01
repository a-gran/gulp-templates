// основной модуль
import gulp from "gulp"
// импорт путей
import { path } from "./gulp/config/path.js"
// импорт задач
import { copy } from "./gulp/tasks/copy.js"

// передаем значения в глобальную переменную
global.app = {
	path: path,
	gulp: gulp
}

// наблюдение за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy)
}

// построение сценариев по умолчанию
const dev = gulp.series(copy, watcher)

// выполнение сценария по умолчанию
gulp.task('default', dev)