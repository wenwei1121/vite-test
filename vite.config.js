import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import eslintPlugin from "vite-plugin-eslint" //导入包

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// 增加下面的配置项,这样在运行时就能检查eslint规范
		eslintPlugin({
			include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
		}),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
})
