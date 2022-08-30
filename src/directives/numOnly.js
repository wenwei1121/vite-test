export const vNumOnly = {
    mounted: (el) => {
        el.handler = (el) => {
            el.target.value = el.target.value.replace(/[^\d]/g,'')
        }
        el.addEventListener("input", el.handler)
    },
    unmounted: (el) => {
        el.removeEventListener("input", el.handler)
    }
}