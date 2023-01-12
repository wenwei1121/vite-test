<script setup>
// directives
import { vNumOnly } from "@/directives/useDealInput"

const { loadingState } = storeToRefs(useLoadingState())
const { setMember } = useStore()
const { filterFamilyMember } = toRefs(useStore())
setMember()
const {
  userTableInfo,
  genderInfo,
  isOpen,
  currentEditMember,
  editMember,
  updateMember,
  deleteMember
} = useMemberActions()
</script>

<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <table class="table is-hoverable is-fullwidth is-bordered is-striped">
        <thead>
          <tr>
            <th
              v-for="tableName of userTableInfo"
              :key="tableName"
              class="is-size-4"
            >
              {{ tableName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member of filterFamilyMember"
            :key="member.id"
          >
            <th>
              <div class="is-size-5">
                {{ member.name }}
              </div>
            </th>
            <td>
              <div class="is-size-5">
                {{ member.age }}
              </div>
            </td>
            <td>
              <div class="is-size-5">
                {{ member.gender ? "male" : "female" }}
              </div>
            </td>
            <td>
              <div class="buttons">
                <button
                  class="button is-info is-outlined is-clickable"
                  @click="editMember(member)"
                >
                  Edit
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
      <CommonModal
        v-model:isOpen="isOpen"
        title="Edit Member"
        @save="updateMember(currentEditMember)"
      >
        <template #modalBody>
          <label class="flex flex-col gap-y-1 mb-2">
            <span>Name :</span>
            <input
              v-model.trim="currentEditMember.name"
              class="text-gray-800 rounded-sm outline-none px-2 py-1 input is-medium"
              type="text"
              placeholder="Favorite Name"
            />
          </label>
          <label class="flex flex-col gap-y-1 mb-2">
            <span>Age :</span>
            <input
              v-model.number="currentEditMember.age"
              v-num-only
              class="text-gray-800 rounded-sm outline-none px-2 py-1 input is-medium"
              type="number"
            />
          </label>
          <label class="flex flex-col gap-y-1">
            <span>Gender :</span>
            <GenderInput
              v-model:genderValue="currentEditMember.gender"
              :radio-items="genderInfo"
            />
          </label>
        </template>
      </CommonModal>
    </div>
  </div>
</template>

<style scoped></style>
