<script setup>
  import { reactive } from "vue"
  // pinia
  import { storeToRefs } from "pinia";
  import { useSearchState } from "../store/store";
  // directives
  import { vFocus, vNumOnly } from '../directives/useDealInput';

  const { inputName, selectComparisonOperator, inputAge, selectGender } = storeToRefs(useSearchState())

  const operatorKind = reactive([
    {
      text: "no select",
      value: "no"
    },
    {
      text: ">",
      value: "greater"
    },
    {
      text: "<",
      value: "less"
    },
    {
      text: "=",
      value: "equal"
    },
    {
      text: ">=",
      value: "greaterOrEqual"
    },
    {
      text: "<=",
      value: "lessOrEqual"
    }
  ])

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
      <div>
        <input
          v-focus
          v-model="inputName"
          class="input is-large"
          type="text"
          placeholder="Search Name"
        >
      </div>
      <div class="columns mt-4">
        <div class="column is-3 select is-small">
          <select v-model="selectComparisonOperator">
            <option
              v-for="operatorItem of operatorKind"
              :key="operatorItem.text"
              :value="operatorItem.value"
            >{{ operatorItem.text }}
            </option>
          </select>
        </div>
        <div class="column is-2">
          <input
            class="input is-small"
            type="number"
            v-num-only
            v-model.number="inputAge"
          >
        </div>
      </div>
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