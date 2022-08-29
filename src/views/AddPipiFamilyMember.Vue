<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCurrentPath } from '../store/store.js'
  import { vFocus } from '../directives/autoFocus.js';
  import { addDoc, collection } from "firebase/firestore";
  import { db } from '../firebase'

  const usePath = useCurrentPath()
  usePath.setCurrentPath('/AddPipiFamilyMember')

  const addMemberInfo = ref({
    name: "",
    age: 0,
    gender: 0,
  })

  // When working with objects or arrays,
  // since changing their attributes does not change the reference,
  // it will not trigger the committing.
  // To track attribute changes, you would need to pass deep: true.
  // It will create clones for each history record.
  // const { history, undo, redo } = useRefHistory(addMemberInfo, {
  //   deep: true,
  // })

  const router = useRouter()

  const addMember = async () => {
    await addDoc(collection(db, "members"), addMemberInfo.value)
    addMemberInfo.name = ""
    addMemberInfo.age = 0
    addMemberInfo.gender = 0
    usePath.setCurrentPath('/')
    router.push({ path: "/" })
  }
</script>

<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter control">
      <div class="field">
        <label class="label is-size-3">Name</label>
        <div class="control">
          <input
            class="input is-large"
            type="text"
            placeholder="Input Name"
            v-focus
            v-model.trim="addMemberInfo.name"
          >
        </div>
      </div>

      <div class="field">
        <label class="label is-size-3">Age</label>
        <div class="control">
          <input
            class="input is-large"
            type="number"
            placeholder="Input Age"
            v-model.number="addMemberInfo.age"
            @onkeydown="value=value.replace(/[^\d]/g,'')"
          >
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="radio mr-2 is-size-5">
            <input
              class="mr-1 is-size-5"
              type="radio"
              :value="0"
              v-model="addMemberInfo.gender"
            >Female
          </label>
          <label class="radio mr-2 is-size-5">
            <input
              class="mr-1"
              type="radio"
              :value="1"
              v-model="addMemberInfo.gender"
            >Male
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link is-clickable is-size-5" @click="addMember">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>