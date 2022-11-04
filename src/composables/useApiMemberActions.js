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
    const { changeLoadingState } = useLoadingState()
    const addMemberInfo = ref({
        name: "",
        age: 0,
        gender: 0,
    })
    const genderInfo = reactive([
        { genderText: "female", genderValue: 0 },
        { genderText: "male", genderValue: 1 },
    ])
    const router = useRouter();
    // addMember
    const addMember = async () => {
        const errMsg = useCheckInputAction(addMemberInfo.value)
        if (errMsg) {
            useResultSwal({ title: errMsg, icon: "error" })
            return
        }

        try {
            changeLoadingState(1);
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
        const { isEditting, ...other } = member
      
        const errMsg = useCheckInputAction(member)
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
    };

    // deleteMember
    const deleteMember = async (member) => {
        const confirmResult = await useComfirmSwal({ title: `sure to delete ${member.name} member ?` })
        if (!confirmResult) return

        try {
          changeLoadingState(1)
          const data = await useGetApiResult("/members", "deletePiPiMembers", { id: member.id })
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

    const { changeMember } = storeToRefs(useStore())
    // editMember
    const editMember = (member) => {
        // 傳物件進來 還是 proxy 物件的資料 但如果傳進來是 物件裡的屬性 只會有值 就會失去反應性
        changeMember.value.forEach((member) => {
          member.isEditting = false
        })
        member.isEditting = true
    }

    const { originMember } = storeToRefs(useStore())
    // cancelMember
    const cancelEdit = (member) => {
        // 賦值可以因為不會影響到畫面, 但要被改變值就會失去反應性
        const { id, ...other } = originMember.value.find(
          (oMembewr) => oMembewr.id === member.id
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
        cancelEdit
    }
}