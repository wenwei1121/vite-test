<script setup>
// component
import GenderInput from "@/components/GenderInput.vue";
// pinia
import { storeToRefs } from "pinia";
import { useCurrentPath, useLoadingState } from "@/store/store.js";
// composables
import { useMemberActions } from "@/composables/useApiMemberActions";
// directives
import { vFocus, vNumOnly } from "@/directives/useDealInput";

const { setCurrentPath } = useCurrentPath();
setCurrentPath("/AddPipiFamilyMember");

const { loadingState } = storeToRefs(useLoadingState());
const { genderInfo, addMemberInfo, addMember } = useMemberActions();
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
          />
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
          />
        </div>
      </div>
      <GenderInput v-model:genderValue="addMemberInfo.gender" :radioItems="genderInfo" />
      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-link is-clickable is-size-5"
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
