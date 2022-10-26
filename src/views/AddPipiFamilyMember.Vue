<script setup>
import { ref, reactive } from "vue";
// component
import GenderInput from "@/components/GenderInput.vue";
// vueRouter
import { useRouter } from "vue-router";
// pinia
import { storeToRefs } from "pinia";
import { useCurrentPath, useLoadingState } from "@/store/store.js";
// composables
import { useResultSwal } from "@/composables/useAlert";
import { useGetApiResult } from "@/composables/useApi";
import { useCheckInputAction } from "@/composables/useCheck";
// directives
import { vFocus, vNumOnly } from "@/directives/useDealInput";

const { setCurrentPath } = useCurrentPath();
setCurrentPath("/AddPipiFamilyMember");

// When working with objects or arrays,
// since changing their attributes does not change the reference,
// it will not trigger the committing.
// To track attribute changes, you would need to pass deep: true.
// It will create clones for each history record.
// const { history, undo, redo } = useRefHistory(addMemberInfo, {
//   deep: true,
// })

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

const { changeLoadingState } = useLoadingState();
const { loadingState } = storeToRefs(useLoadingState());

const router = useRouter();

const addMemberInfo = ref({
  name: "",
  age: 0,
  gender: 0,
});

const addMember = async () => {
  const errMsg = useCheckInputAction(addMemberInfo.value);
  if (errMsg) {
    useResultSwal({ title: errMsg, icon: "error" });
    return;
  }

  try {
    changeLoadingState(1);
    const { message } = await useGetApiResult(
      "/members",
      "addPiPiMembers",
      addMemberInfo.value
    );
    useResultSwal({ title: message });
    router.push({ path: "/" });
  } catch (err) {
    useResultSwal({ title: "Add new member failed", icon: "error" });
  } finally {
    changeLoadingState(0);
  }
};
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
