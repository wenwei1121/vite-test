<script setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia' 
  import { useStore } from '../store/store.js'
  import { db } from '../firebase/index.js';
  import { deleteDoc, doc, setDoc } from '@firebase/firestore';

  import { comfirmSwal } from '../composables/useAlert'

  // 要賦值給 props 才會讀的到?
  const props = defineProps({
    passSearchName: {
      type: String,
      default: "",
    },
  })

  const store = useStore()
  store.setMember()
  const { piFamilyMember } = storeToRefs(store)
  
  const filterFamilyMember = computed(() => {
    return piFamilyMember.value.filter(member => {
      return member.name.toUpperCase().indexOf(props.passSearchName.toUpperCase()) >= 0
    })
  })

  const updateMember = async (member) => {
    const { id, name, age, gender } = member
    await setDoc(doc(db, "members", id), {
      name,
      age,
      gender
    })
  }

  const cancelEdit = (isEditting) => {
    isEditting = false
    store.setMember()
  }

  const deleteMember = async (id) => {
    const cofirmResult = await comfirmSwal("sure to delete?", "warning")
    if (cofirmResult) {
      await deleteDoc(doc(db, "members", id))
      filterFamilyMember.value = filterFamilyMember.value.filter(member => member.id !== id)
    }
  }
</script>

<template>
<div class="columns">
  <div class="column is-10 is-offset-1">
    <table class="table is-hoverable is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th class="is-size-4">Name</th>
          <th class="is-size-4">Age</th>
          <th class="is-size-4">Gender</th>
          <th class="is-size-4">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member of filterFamilyMember" :key="member.id">
          <th>
            <div class="is-size-5" v-show="!member.isEditting">{{ member.name }}</div>
            <div class="columns field is-grouped" v-show="member.isEditting">
              <p class="column is-half control">
                <input class="input is-medium" type="text" placeholder="Search Name" v-model="member.name">
              </p>
            </div>
          </th>
          <td>
            <div class="is-size-5" v-show="!member.isEditting">{{ member.age }}</div>
            <div class="columns field is-grouped" v-show="member.isEditting">
              <p class="column is-2 control">
                <input class="input is-medium" type="text" v-model.number="member.age">
              </p>
            </div>
          </td>
          <td>
            <div class="is-size-5" v-show="!member.isEditting">{{ member.gender ? "male" : "female" }}</div>
            <div class="field" v-show="member.isEditting">
              <div class="control">
                <label class="radio mr-2 is-size-5">
                  <input
                    class="mr-1"
                    type="radio"
                    :value="0"
                    v-model="member.gender"
                  >Female
                </label>
                <label class="radio is-size-5">
                  <input
                    class="mr-1"
                    type="radio"
                    :value="1"
                    v-model="member.gender"
                  >Male
                </label>
              </div>
            </div>
          </td>
          <td>
            <div class="buttons" v-show="!member.isEditting">
              <button class="button is-info is-outlined is-clickable" @click="member.isEditting = true">Edit</button>
            </div>
            <div class="buttons" v-show="member.isEditting">
              <button class="button is-info is-outlined is-clickable" @click="updateMember(member)">Save</button>
              <button class="button is-outlined is-clickable" @click="cancelEdit(member.isEditting)">Cancel</button>
              <button class="button is-danger is-outlined is-clickable" @click="deleteMember(member.id)">Delete</button>
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