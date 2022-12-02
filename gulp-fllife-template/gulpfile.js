// основной модуль
import gulp from "gulp"
// импорт путей
import { path } from "./gulp/config/path.js"
// импорт задач
import { copy } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"

gulp.src('', { allowEmpty: true })

// передаем значения в глобальную переменную
global.app = {
	path: path,
	gulp: gulp
}

// наблюдение за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
}

const mainTasks = gulp.parallel(copy, html)

// построение сценариев по умолчанию
const dev = gulp.series(reset, mainTasks, watcher)

// выполнение сценария по умолчанию
gulp.task('default', dev)