<script setup>
  import { reactive } from "vue"
  // components
  import FavoriteSearch from "./FavoriteSearch.vue"
  import GenderInput from "./GenderInput.vue";
  import Select from "./Select.vue"
  // pinia
  import { useSearchState } from "@/store/store"
  // directives
  import { vFocus, vNumOnly } from '@/directives/useDealInput';
  // heroIcon
  import { ArrowPathIcon } from "@heroicons/vue/24/solid"

  const { searchInfo, resetSearchInfo } = useSearchState()

  const operatorKind = reactive([
    { text: "no select", value: "no" },
    { text: ">", value: "greater" },
    { text: "<", value: "less" },
    { text: "=", value: "equal" },
    { text: ">=", value: "greaterOrEqual" },
    { text: "<=", value: "lessOrEqual" }
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
          v-model="searchInfo.inputName"
          class="input is-large"
          type="text"
          placeholder="Search Name"
        >
      </div>
      <Select
        v-model:selectTarget="searchInfo.selectComparisonOperator"
        :selectItems="operatorKind"
      />
      <div class="column is-2">
        <input
          v-num-only
          v-model.number="searchInfo.inputAge"
          class="input is-small"
          type="number"
        >
      </div>
      <GenderInput
        v-model:genderValue="searchInfo.selectGender"
        :radioItems="genderInfo"
      />
      <div class="flex gap-x-2">
        <ArrowPathIcon
          class="cursor-pointer h-8 w-8 text-blue-400"
          @click="resetSearchInfo"
        />
        <FavoriteSearch />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>