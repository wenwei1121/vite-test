import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import eslintPlugin from "vite-plugin-eslint"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// 增加下面的配置项,这样在运行时就能检查eslint规范
		eslintPlugin({
			include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
		}),
		AutoImport({
			imports: ["vue", "vue-router", "vue-i18n", "@vueuse/head", "@vueuse/core"],
			dts: "src/auto-import.d.ts",
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/, /\.vue\?vue/, // .vue
				/\.md$/, // .md  
			],
			eslintrc: {
				enabled: true, // <-- this
			},
		}),
		Components({
			dirs: ["src/components", "src/views"],
			extensions: ["vue"],
			dts: "src/components.d.ts"
		})
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	}
})
