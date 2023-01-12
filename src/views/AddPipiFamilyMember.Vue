<script setup>
// pinia
import { storeToRefs } from "pinia"
import { useCurrentPath, useLoadingState } from "@/store/store.js"
// composables
import { useMemberActions } from "@/composables/useApiMemberActions"
// directives
import { vFocus, vNumOnly } from "@/directives/useDealInput"

const { setCurrentPath } = useCurrentPath()
setCurrentPath("/AddPipiFamilyMember")

const { loadingState } = storeToRefs(useLoadingState())
const { genderInfo, addMemberInfo, addMember } = useMemberActions()
</script>

<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter control">
      <div class="field mx-auto mb-2 w-full max-w-md">
        <label class="label mb-0">Name</label>
        <div class="control">
          <input
            v-model.trim="addMemberInfo.name"
            v-focus
            class="input is-normal"
            type="text"
            placeholder="Input Name"
          />
        </div>
      </div>
      <div class="field mx-auto mb-2 w-full max-w-md">
        <label class="label mb-0">Age</label>
        <div class="control">
          <input
            v-model.number="addMemberInfo.age"
            v-num-only
            class="input is-normal"
            type="number"
            placeholder="Input Age"
          />
        </div>
      </div>
      <GenderInput
        v-model:genderValue="addMemberInfo.gender"
        :radio-items="genderInfo"
        class="mb-2"
      />
      <div class="field mx-auto mb-2 w-full max-w-md is-grouped">
        <div class="control">
          <button
            class="button is-link is-clickable"
            :class="[loadingState ? 'is-loading' : '']"
            @click="addMember"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
