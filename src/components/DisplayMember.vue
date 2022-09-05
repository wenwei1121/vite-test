<script setup>
  import { reactive, computed } from 'vue'
  // pinia
  import { storeToRefs } from 'pinia' 
  import { useStore, useLoadingState, useSearchState } from '../store/store.js'
  // composables
  import { comfirmSwal, resultSwal } from '../composables/useAlert'
  // directives
  import { vNumOnly } from "../directives/useDealInput";
  import { getApiResult } from '../composables/useApiResult';

  const { setMember } = useStore()
  setMember()
  const { changeMember, originMember } = storeToRefs(useStore())

  const { changeLoadingState } = useLoadingState()
  const { loadingState } = storeToRefs(useLoadingState())

  const { inputName, selectGender } = storeToRefs(useSearchState()) 

  // filterMember by searchState
  const filterFamilyMember = computed(() => {
    let resultMember = changeMember.value.filter(member => {
      return member.name.toUpperCase().indexOf(inputName.value.toUpperCase()) >= 0
    })

    if (selectGender.value !== -1) {
      resultMember = resultMember.filter(member => member.gender === selectGender.value)
    }

    return resultMember
  })

  // table header name
  const userTableInfo = reactive(["Name", "Age", "Gender", "Action"])

  // table user gender input
  const genderInfo = reactive([
    {
      genderText: "female",
      genderValue: 0
    },
    {
      genderText: "male",
      genderValue: 1
    }
  ])

  // edit button
  const editMember = (member) => {
    // 傳物件進來 還是 proxy 物件的資料 但如果傳進來是 物件裡的屬性 只會有值 就會失去反應性
    changeMember.value.forEach(member => {
      member.isEditting = false
    })
    member.isEditting = true
  }

  // save buuton
  const updateMember = async (member) => {
    const { id, name, age, gender } = member

    if (name === "") {
      resultSwal("Have empty name", "error")
      return
    }

    if (age === "") {
      resultSwal("Have empty age", "error")
      return
    }

    try {
      changeLoadingState(1)

      const data = await getApiResult('/members', "updatePiPiMembers", { id, name, age, gender })
      await setMember()

      changeLoadingState(0)
      resultSwal("update success", "success")
    } catch (err) {
      resultSwal("update fail", "error")
    }
  }

  // cancel button
  const cancelEdit = (member) => {
    // 賦值可以因為不會影響到畫面, 但要被改變值就會失去反應性
    const { name, age, gender, isEditting } = originMember.value.find(oMembewr => oMembewr.id === member.id)
    member.name = name
    member.age = age
    member.gender = gender
    member.isEditting = isEditting
  }

  // delete button
  const deleteMember = async (id) => {
    const confirmResult = await comfirmSwal("sure to delete?", "warning")
    if (confirmResult) {
      try {
        changeLoadingState(1)

        const data = await getApiResult('/members', "deletePiPiMembers", { id })

        changeMember.value = changeMember.value.filter(member => member.id !== id)

        changeLoadingState(0)
        resultSwal("delete success", "success")
      } catch (error) {
        resultSwal("delete failed", "error")
      }
    }
  }
</script>

<template>
<div class="columns">
  <div class="column is-10 is-offset-1">
    <table class="table is-hoverable is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th v-for="tableName of userTableInfo" class="is-size-4">{{ tableName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member of filterFamilyMember" :key="member.id">
          <th>
            <div class="is-size-5" v-show="!member.isEditting">{{ member.name }}</div>
            <div class="columns field is-grouped" v-show="member.isEditting">
              <p class="column control">
                <input class="input is-medium" type="text" placeholder="Search Name" v-model.trim="member.name">
              </p>
            </div>
          </th>
          <td>
            <div class="is-size-5" v-show="!member.isEditting">{{ member.age }}</div>
            <div class="columns field is-grouped" v-show="member.isEditting">
              <p class="column control">
                <input
                  class="input is-medium"
                  type="number"
                  v-num-only
                  v-model.number="member.age"
                >
              </p>
            </div>
          </td>
          <td>
            <div class="is-size-5" v-show="!member.isEditting">{{ member.gender ? "male" : "female" }}</div>
            <div class="field" v-show="member.isEditting">
              <div class="control">
                <label
                  class="radio mr-2 is-size-5"
                  v-for="genderItem of genderInfo"
                  :key="genderItem.genderText"
                >
                  <input
                    class="mr-1"
                    type="radio"
                    :value="genderItem.genderValue"
                    v-model="member.gender"
                  >{{ genderItem.genderText }}
                </label>
              </div>
            </div>
          </td>
          <td>
            <div class="buttons" v-show="!member.isEditting">
              <button class="button is-info is-outlined is-clickable" @click="editMember(member)">Edit</button>
            </div>
            <div class="buttons" v-show="member.isEditting">
              <button
                class="button is-info is-outlined is-clickable"
                :class="[loadingState ? 'is-loading' : '']"
                @click="updateMember(member)"
              >Save
              </button>
              <button 
                class="button is-outlined is-clickable"
                @click="cancelEdit(member)"
              >Cancel
              </button>
              <button
                class="button is-danger is-outlined is-clickable"
                :class="[loadingState ? 'is-loading' : '']"
                @click="deleteMember(member.id)"
              >Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<style scoped>

</style>