<script setup>
  import { ref } from 'vue'
  // vueRouter
  import { useRouter } from 'vue-router'
  // vuex
  import { useCurrentPath, useLoadingState } from '../store/store.js'
  import { storeToRefs } from 'pinia'
  // useAlert
  import { resultSwal } from '../composables/useAlert'
  // directives
  import { vFocus, vNumOnly } from '../directives/useDealInput'
  // firebase
  import { addDoc, collection } from "firebase/firestore"
  import { db } from '../firebase'

  const usePath = useCurrentPath()
  usePath.setCurrentPath('/AddPipiFamilyMember')

  const useLoading = useLoadingState()
  const { loadingState } = storeToRefs(useLoading)

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
    if (addMemberInfo.value.name === "") {
      resultSwal("Have empty name", "error")
      return
    }

    if (addMemberInfo.value.age === "") {
      resultSwal("Have empty age", "error")
      return
    }

    try {
      useLoading.changeLoadingState(1)
      await addDoc(collection(db, "members"), addMemberInfo.value)
      useLoading.changeLoadingState(0)
      resultSwal("Add new member success", "success")
      usePath.setCurrentPath('/')
      router.push({ path: "/" })
    } catch (err) {
      resultSwal("Add new member failed", "error")
    }
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
            v-num-only
            v-model.number="addMemberInfo.age"
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
          <button
            class="button is-link is-clickable is-size-5"
            :class="[loadingState ? 'is-loading': '']"
            @click="addMember"
          >Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>