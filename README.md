# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

reactive:
    深層響應, 底層本質是將傳入的數據包裝成一個 Proxy
    參數必須是對象或數組
    如果要讓對象的某個元素實現響應式時, 需要使用 toRefs

ref:
    參數接受基本和對象
    參數若是對象時, 底層本質還是 reactive
    ref(1) -> reactive({ value: 1 })
    ref 只能操作淺層的數據, 把基本類型當作自己的屬性值, 深層次則依賴 reactive
    在 template 中訪問 不須加 .value, 但在 Js 要
    ref 響應式原理依賴於 Object.defineProperty() 的 get() & set()

------

ref:


toRef:


toRefs:
    