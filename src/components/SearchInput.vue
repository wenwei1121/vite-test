<script setup>
  import { reactive } from "vue"
  // pinia
  import { storeToRefs } from "pinia";
  import { useSearchState } from "../store/store";
  // directives
  import { vFocus } from '../directives/useDealInput';

  const { inputName, selectGender } = storeToRefs(useSearchState())

  const genderInfo = reactive([
    {
      genderText: "all select",
      genderValue: -1
    },
    {
      genderText: "female",
      genderValue: 0
    },
    {
      genderText: "male",
      genderValue: 1
    }
  ])

</script>

<template>
  <div class="columns field">
    <div class="column is-half is-offset-one-quarter control">
      <p>
        <input v-focus v-model="inputName" class="input is-large" type="text" placeholder="Search Name">
      </p>
      <div class="mt-4">
        <label
          class="radio mr-2"
          v-for="genderItem of genderInfo"
          :key="genderItem.genderText"
        >
          <input
            type="radio"
            name="question"
            class="mr-1"
            :value="genderItem.genderValue"
            v-model="selectGender"
          >{{ genderItem.genderText }}
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>