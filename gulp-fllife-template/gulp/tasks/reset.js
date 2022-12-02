import del from "del"

// удаление папки с результатом (dist)
export const reset = () => {
	return del(app.path.clean)
}