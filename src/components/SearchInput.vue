<script setup>
import { ref, reactive, watch } from 'vue'

const emit = defineEmits(['changeInputName'])

const inputName = ref('')

watch(inputName, (newVal) => {
  emit('changeInputName', newVal)
})

// 帶 v 就可以做自訂義指令 在 script => camelCase(vAutoFocus) 在 template => kebab casev-auto-focus)
const vAutoFocus = {
  mounted: el => {
    el.focus()
  }
}

// const inputNameTwo = reactive({
//   name: '',
// })

// // 監聽 reactive 裡面的資料 需要用callback Fn
// watch(() => inputNameTwo.name, newVal => {
//   emit('changeInputName', newVal)
// })

</script>

<template>
  <div class="columns field is-grouped">
    <p class="column is-half is-offset-one-quarter control">
      <input v-auto-focus v-model="inputName" class="input is-large" type="text" placeholder="Search Name">
    </p>
  </div>
  <!-- <div class="field">
    <div class="control">
      <label class="radio">
        <input
          type="radio"
          name="question"
          :value="0"
          v-model="addMemberInfo.gender"
        >Female
      </label>
      <label class="radio">
        <input
          type="radio"
          name="question"
          :value="1"
          v-model="addMemberInfo.gender"
        >Male
      </label>
    </div>
  </div> -->
</template>

<style scoped>

</style>