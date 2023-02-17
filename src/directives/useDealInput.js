export const vFocus = {
  mounted: (el) => {
    el.focus()
  },
}

export const vNumOnly = {
  mounted: (el) => {
    el.handler = () => {
      el.value = el.value.replace(/\D+/g, '')
    }
    el.addEventListener('input', el.handler)
  },
  unmounted: (el) => {
    el.removeEventListener('input', el.handler)
  },
}
