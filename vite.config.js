import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import eslintPlugin from "vite-plugin-eslint"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({ reactivityTransform: true }),
		// 增加下面的配置项,这样在运行时就能检查eslint规范
		eslintPlugin({
			include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
		}),
		AutoImport({
			imports: ["vue", "vue-router", "pinia", "vue-i18n", "@vueuse/head", "@vueuse/core"],
			dirs: [
				"./src/composables",
				"./src/store"
			],
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
			resolvers: [HeadlessUiResolver()],
			extensions: ["vue"],
			dts: "src/components.d.ts",
		})
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	}
})
