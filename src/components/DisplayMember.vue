<script setup>
import { toRefs } from "vue";
// component
import GenderInput from "@/components/GenderInput.vue";
// pinia
import { storeToRefs } from "pinia";
import { useStore, useLoadingState } from "@/store/store.js";
// composables
import { useMemberActions } from "@/composables/useApiMemberActions";
// directives
import { vNumOnly } from "@/directives/useDealInput";

const { loadingState } = storeToRefs(useLoadingState());
const { setMember } = useStore();
const { filterFamilyMember } = toRefs(useStore());
setMember();
const {
  genderInfo,
  updateMember,
  deleteMember,
  editMember,
  cancelEdit,
} = useMemberActions();
const userTableInfo = ["Name", "Age", "Gender", "Action"];
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
                  <input
                    class="input is-medium"
                    type="text"
                    placeholder="Search Name"
                    v-model.trim="member.name"
                  />
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
                  />
                </p>
              </div>
            </td>
            <td>
              <div class="is-size-5" v-show="!member.isEditting">
                {{ member.gender ? "male" : "female" }}
              </div>
              <GenderInput
                v-show="member.isEditting"
                v-model:genderValue="member.gender"
                :radioItems="genderInfo"
              />
            </td>
            <td>
              <div class="buttons" v-show="!member.isEditting">
                <button
                  class="button is-info is-outlined is-clickable"
                  @click="editMember(member)"
                >
                  Edit
                </button>
              </div>
              <div class="buttons" v-show="member.isEditting">
                <button
                  class="button is-info is-outlined is-clickable"
                  :class="[loadingState ? 'is-loading' : '']"
                  @click="updateMember(member)"
                >
                  Save
                </button>
                <button
                  class="button is-outlined is-clickable"
                  @click="cancelEdit(member)"
                >
                  Cancel
                </button>
                <button
                  class="button is-danger is-outlined is-clickable"
                  :class="[loadingState ? 'is-loading' : '']"
                  @click="deleteMember(member)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
