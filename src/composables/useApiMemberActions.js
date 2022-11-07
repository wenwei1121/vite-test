import { ref, reactive } from "vue"
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
  const addMemberInfo = reactive({
    name: "",
    age: 0,
    gender: 0,
  })
  const genderInfo = [
    { genderText: "female", genderValue: 0 },
    { genderText: "male", genderValue: 1 },
  ]
  const userTableInfo = ["Name", "Age", "Gender", "Action"]

  const isOpen = ref(false)

  const router = useRouter()
  const { changeLoadingState } = useLoadingState()
  const { changeMember } = storeToRefs(useStore())
  // addMember
  const addMember = async () => {
    const errMsg = useCheckInputAction(changeMember, addMemberInfo)
    if (errMsg) {
      useResultSwal({ title: errMsg, icon: "error" })
      return
    }

    try {
      changeLoadingState(1)
      const { message } = await useGetApiResult(
        "/members",
        "addPiPiMembers",
        addMemberInfo
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
    const errMsg = useCheckInputAction(changeMember, member)
    if (errMsg) {
      useResultSwal({ title: errMsg, icon: "error" })
      return
    }

    try {
      changeLoadingState(1)
      const data = await useGetApiResult("/members", "updatePiPiMembers", member)
      if (data.status === "ok") {
        await setMember()
        useResultSwal({ title: "update success" })
        isOpen.value = false
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
      const data = await useGetApiResult(
        "/members",
        "deletePiPiMembers",
        { id }
      )
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

  const currentEditMember = reactive({
    id:"",
    name: "",
    age: 0,
    gender: 0,
  })
  // editMember
  const editMember = (member) => {
    currentEditMember.id = member.id
    currentEditMember.name = member.name
    currentEditMember.age = member.age
    currentEditMember.gender = member.gender
    isOpen.value = true
  }

  return {
    genderInfo,
    userTableInfo,
    isOpen,
    addMemberInfo,
    currentEditMember,
    addMember,
    editMember,
    updateMember,
    deleteMember
  }
}
