import { ref } from "vue"
// vueRouter
import { useRouter } from "vue-router"
// pinia
import { storeToRefs } from "pinia"
import { useStore, useLoadingState } from "@/store/store.js"
// composables
import { useComfirmSwal, useResultSwal } from "@/composables/useAlert"
import { useGetApiResult } from "@/composables/useApi"
import { useCheckInputAction } from "@/composables/useCheck"

export const useMemberActions = () => {
  const addMemberInfo = ref({
    name: "",
    age: 0,
    gender: 0,
  })
  const genderInfo = [
    { genderText: "female", genderValue: 0 },
    { genderText: "male", genderValue: 1 },
  ]

  const router = useRouter()
  const { changeLoadingState } = useLoadingState()
  const { originMember, changeMember } = storeToRefs(useStore())
  // addMember
  const addMember = async () => {
    const errMsg = useCheckInputAction(changeMember, addMemberInfo.value)
    if (errMsg) {
      useResultSwal({ title: errMsg, icon: "error" })
      return
    }

    try {
      changeLoadingState(1)
      const { message } = await useGetApiResult(
        "/members",
        "addPiPiMembers",
        addMemberInfo.value
      )
      useResultSwal({ title: message })
      router.push({ path: "/" })
    } catch (err) {
      useResultSwal({ title: "Add new member failed", icon: "error" })
    } finally {
      changeLoadingState(0)
    }
  }

  const { setMember } = useStore()
  // updateMember
  const updateMember = async (member) => {
    // eslint-disable-next-line no-unused-vars
    const { isEditting, ...other } = member

    const errMsg = useCheckInputAction(changeMember, member)
    if (errMsg) {
      useResultSwal({ title: errMsg, icon: "error" })
      return
    }

    try {
      changeLoadingState(1)
      const data = await useGetApiResult("/members", "updatePiPiMembers", other)
      if (data.status === "ok") {
        await setMember()
        useResultSwal({ title: "update success" })
      } else {
        useResultSwal({ title: "update failed", icon: "error" })
      }
    } catch (err) {
      useResultSwal({ title: "update failed", icon: "error" })
    } finally {
      changeLoadingState(0)
    }
  }

  // deleteMember
  const deleteMember = async ({ name, id }) => {
    const confirmResult = await useComfirmSwal({
      title: `sure to delete ${name} member ?`,
    })
    if (!confirmResult) return

    try {
      changeLoadingState(1)
      const data = await useGetApiResult("/members", "deletePiPiMembers", {
        id,
      })
      if (data.status === "ok") {
        await setMember()
        useResultSwal({ title: "delete success" })
      } else {
        useResultSwal({ title: "delete failed", icon: "error" })
      }
    } catch (error) {
      useResultSwal({ title: "delete failed", icon: "error" })
    } finally {
      changeLoadingState(0)
    }
  }

  // editMember
  const editMember = (member) => {
    // 傳物件進來 還是 proxy 物件的資料 但如果傳進來是 物件裡的屬性 只會有值 就會失去反應性
    changeMember.value.forEach((changeMember) => {
      changeMember.isEditting = false
    })
    member.isEditting = true
  }

  // cancelMember
  const cancelEdit = (member) => {
    // reactive can't reassign value 不能直接重新賦值
    // eslint-disable-next-line no-unused-vars
    const { id, ...other } = originMember.value.find(
      ({ id }) => id === member.id
    )
    Object.assign(member, other)
  }

  return {
    addMemberInfo,
    genderInfo,
    addMember,
    updateMember,
    deleteMember,
    editMember,
    cancelEdit,
  }
}
