<script setup>
// pinia
import { useSearchState } from "@/store/store"
// directives
import { vFocus, vNumOnly } from "@/directives/useDealInput"
// heroIcon
import { ArrowPathIcon } from "@heroicons/vue/24/solid"

const { searchInfo, resetSearchInfo } = useSearchState()

const operatorKind = [
  { text: "no select", value: "no" },
  { text: ">", value: "greater" },
  { text: "<", value: "less" },
  { text: "=", value: "equal" },
  { text: ">=", value: "greaterOrEqual" },
  { text: "<=", value: "lessOrEqual" },
]

const genderInfo = [
  { genderText: "all select", genderValue: -1 },
  { genderText: "female", genderValue: 0 },
  { genderText: "male", genderValue: 1 },
]
</script>

<template>
  <div class="columns field">
    <div class="column is-half is-offset-one-quarter control">
      <div class="mx-auto mb-2 w-full max-w-md">
        <input
          v-model="searchInfo.inputName"
          v-focus
          class="input is-normal"
          type="text"
          placeholder="Search Name"
        />
      </div>
      <div class="mx-auto mb-2 w-full max-w-md columns-2">
        <CommonSelectInput
          v-model:selectTarget="searchInfo.selectComparisonOperator"
          :select-items="operatorKind"
        />
        <div>
          <input
            v-model.number="searchInfo.inputAge"
            v-num-only
            class="input is-normal"
            type="number"
          />
        </div>
      </div>
      <GenderInput
        v-model:genderValue="searchInfo.selectGender"
        :radio-items="genderInfo"
        class="mb-2"
      />
      <div class="mx-auto w-full max-w-md flex gap-x-2">
        <ArrowPathIcon
          class="cursor-pointer h-8 w-8 text-blue-400"
          @click="resetSearchInfo"
        />
        <FavoriteSearch />
      </div>
    </div>
  </div>
</template>
<style scoped></style>