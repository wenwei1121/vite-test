import { $ref } from "vue/macros"

export const useCurrentPath = defineStore("currentPath", () => {
  let currentPath = $ref("")

  const setCurrentPath = (passPathValue) => {
    currentPath = passPathValue
  }

  // eslint-disable-next-line no-undef
  return $$({ currentPath, setCurrentPath })
})

export const useStore = defineStore("memberInfo", () => {
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
      changeMember.value = data
    } catch (err) {
      useResultSwal({ title: "Reading members failed", icon: "error" })
    }
  }

  return {
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
