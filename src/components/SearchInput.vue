<script setup>
  import { ref, watch } from 'vue'
  // directives
  import { vFocus } from '../directives/useDealInput';

  const emit = defineEmits(['changeInputName'])

  const inputName = ref('')

  watch(inputName, (newVal) => {
    emit('changeInputName', newVal)
  })

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
      <input v-focus v-model="inputName" class="input is-large" type="text" placeholder="Search Name">
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