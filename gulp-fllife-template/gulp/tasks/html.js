// файловый поток
export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.gulp.src('', { allowEmpty: true })) // исправление ошибки пустого массива
		.pipe(app.gulp.dest(app.path.build.html))
}