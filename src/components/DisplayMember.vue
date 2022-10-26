<script setup>
import { reactive, computed } from "vue";
// component
import GenderInput from "@/components/GenderInput.vue";
// pinia
import { storeToRefs } from "pinia";
import { useStore, useLoadingState, useSearchState } from "@/store/store.js";
// composables
import { useComfirmSwal, useResultSwal } from "@/composables/useAlert";
import { useCheckInputAction } from "@/composables/useCheck";
// directives
import { vNumOnly } from "@/directives/useDealInput";
import { useGetApiResult } from "@/composables/useApi";

const { setMember } = useStore();
setMember();
const { changeMember, originMember } = storeToRefs(useStore());

const { changeLoadingState } = useLoadingState();
const { loadingState } = storeToRefs(useLoadingState());

const { searchInfo } = useSearchState();

// filterMember by searchState
const filterFamilyMember = computed(() => {
  return changeMember.value.filter((member) => {
    if (member.name.toUpperCase().indexOf(searchInfo.inputName.toUpperCase()) === -1) {
      return false;
    }

    if (searchInfo.selectGender !== -1 && member.gender !== searchInfo.selectGender) {
      return false;
    }

    if (searchInfo.selectComparisonOperator !== "no" && searchInfo.inputAge !== "") {
      switch (searchInfo.selectComparisonOperator) {
        case "greater":
          return member.age > searchInfo.inputAge;
        case "less":
          return member.age < searchInfo.inputAge;
        case "equal":
          return member.age === searchInfo.inputAge;
        case "greaterOrEqual":
          return member.age >= searchInfo.inputAge;
        case "lessOrEqual":
          return member.age <= searchInfo.inputAge;
      }
    }

    return true;
  });
});

// table header name
const userTableInfo = ["Name", "Age", "Gender", "Action"];

// table user gender input
const genderInfo = reactive([
  {
    genderText: "female",
    genderValue: 0,
  },
  {
    genderText: "male",
    genderValue: 1,
  },
]);

// edit button
const editMember = (member) => {
  // 傳物件進來 還是 proxy 物件的資料 但如果傳進來是 物件裡的屬性 只會有值 就會失去反應性
  changeMember.value.forEach((member) => {
    member.isEditting = false;
  });
  member.isEditting = true;
};

// save button
const updateMember = async (member) => {
  const { isEditting, ...other } = member;

  const errMsg = useCheckInputAction(member);
  if (errMsg) {
    useResultSwal({ title: errMsg, icon: "error" });
    return;
  }

  try {
    changeLoadingState(1);
    const data = await useGetApiResult("/members", "updatePiPiMembers", other);
    if (data.status === "ok") {
      await setMember();
      useResultSwal({ title: "update success" });
    } else {
      useResultSwal({ title: "update failed", icon: "error" });
    }
  } catch (err) {
    useResultSwal({ title: "update failed", icon: "error" });
  } finally {
    changeLoadingState(0);
  }
};

// cancel button
const cancelEdit = (member) => {
  // 賦值可以因為不會影響到畫面, 但要被改變值就會失去反應性
  const { id, ...other } = originMember.value.find(
    (oMembewr) => oMembewr.id === member.id
  );
  Object.assign(member, other);
};

// delete button
const deleteMember = async (member) => {
  const confirmResult = await useComfirmSwal({
    title: `sure to delete ${member.name} member ?`,
  });
  if (!confirmResult) return;
  try {
    changeLoadingState(1);
    const data = await useGetApiResult("/members", "deletePiPiMembers", { id: member.id });
    if (data.status === "ok") {
      changeMember.value = changeMember.value.filter(
        (changeMember) => changeMember.id !== member.id
      );
      useResultSwal({ title: "delete success" });
    } else {
      useResultSwal({ title: "delete failed", icon: "error" });
    }
  } catch (error) {
    useResultSwal({ title: "delete failed", icon: "error" });
  } finally {
    changeLoadingState(0);
  }
};
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
                  @click="deleteMember(member.id)"
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
