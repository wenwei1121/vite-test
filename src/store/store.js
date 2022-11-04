import { ref, shallowRef, computed, reactive } from "vue"
// pinia
import { defineStore } from "pinia"
// composables
import { useResultSwal } from "@/composables/useAlert"
import { useGetApiResult } from "@/composables/useApi"
// vueuse
import { useCloned } from "@vueuse/core"

export const useCurrentPath = defineStore("currentPath", () => {
  const currentPath = ref("")

  const setCurrentPath = (passPathValue) => {
    currentPath.value = passPathValue
  }

  return { currentPath, setCurrentPath }
})

export const useStore = defineStore("memberInfo", () => {
  let originMember = shallowRef([])
  const changeMember = ref([])

  const { searchInfo } = useSearchState()
  // filterMember by searchState
  const filterFamilyMember = computed(() => {
    return changeMember.value.filter((member) => {
      if (
        member.name
          .toUpperCase()
          .indexOf(searchInfo.inputName.toUpperCase()) === -1
      )
        return false

      if (
        searchInfo.selectGender !== -1 &&
        member.gender !== searchInfo.selectGender
      )
        return false

      if (
        searchInfo.selectComparisonOperator !== "no" &&
        searchInfo.inputAge !== ""
      ) {
        switch (searchInfo.selectComparisonOperator) {
          case "greater":
            return member.age > searchInfo.inputAge
          case "less":
            return member.age < searchInfo.inputAge
          case "equal":
            return member.age === searchInfo.inputAge
          case "greaterOrEqual":
            return member.age >= searchInfo.inputAge
          case "lessOrEqual":
            return member.age <= searchInfo.inputAge
        }
      }

      return true
    })
  })

  const setMember = async () => {
    try {
      const data = await useGetApiResult("members", "readPiPiMembers")
      originMember.value = data
      changeMember.value = useCloned(originMember).cloned.value
    } catch (err) {
      useResultSwal({ title: "Reading members failed", icon: "error" })
    }
  }

  return {
    originMember,
    changeMember,
    filterFamilyMember,
    setMember,
  }
})

export const useLoadingState = defineStore("loadingState", () => {
  const loadingState = ref(0)

  const getLoadingState = computed(() => {
    return loadingState.value
  })

  const changeLoadingState = (num) => {
    loadingState.value = num
  }

  return {
    loadingState,
    getLoadingState,
    changeLoadingState,
  }
})

export const useSearchState = defineStore("searchState", () => {
  const searchInitState = {
    inputName: "",
    selectComparisonOperator: "no",
    inputAge: 0,
    selectGender: -1,
  }

  let searchInfo = reactive({ ...searchInitState })

  const resetSearchInfo = () => {
    Object.assign(searchInfo, searchInitState)
  }

  return { searchInfo, resetSearchInfo }
})
