import { ref } from "vue"
// pinia
import { useLoadingState, useSearchState } from "@/store/store"
// composables
import { useConfirmSwal, useResultSwal } from "@/composables/useAlert"
import { useGetApiResult } from "@/composables/useApi"
import { useCheckInputAction } from "@/composables/useCheck"

export const useFavoriteSearchActions = () => {
  const { searchInfo } = useSearchState()
  const applyConditions = (conditions) => {
    searchInfo.inputName = conditions.name
    searchInfo.selectComparisonOperator = conditions.operator
    searchInfo.inputAge = conditions.age
    searchInfo.selectGender = conditions.gender
  }

  const favorites = ref([])
  const getFavorites = async () => {
    const result = await useGetApiResult("favorites", "readFavorites")
    favorites.value = [...result]
  }
  getFavorites()

  const { changeLoadingState } = useLoadingState()
  const isOpen = ref(false)
  const favoriteName = ref("")
  const addFavorite = async () => {
    const errMsg = useCheckInputAction(favorites, { name: favoriteName.value })
    if (errMsg) {
      useResultSwal({ title: errMsg, icon: "error" })
      return
    }

    const {
      inputName: name,
      inputAge: age,
      selectComparisonOperator: operator,
      selectGender: gender,
    } = searchInfo

    const parameter = {
      name: favoriteName.value,
      conditions: { name, age, operator, gender },
    }

    try {
      changeLoadingState(1)
      const data = await useGetApiResult("favorites", "addFavorite", parameter)
      if (data.status === "ok") {
        getFavorites()
        useResultSwal({ title: "add favorite success" })
        favoriteName.value = ""
        isOpen.value = false
      } else {
        useResultSwal({ title: "add favorite failed", icon: "error" })
      }
    } catch (error) {
      useResultSwal({ title: "add favorite failed", icon: "error" })
    } finally {
      changeLoadingState(0)
    }
  }

  const deleteFavorite = async ({ name, id }) => {
    const check = await useConfirmSwal({
      title: `sure to delete ${name} favoriteItem ?`,
    })
    if (!check) return

    try {
      changeLoadingState(1)
      const data = await useGetApiResult("favorites", "deleteFavorite", { id })
      if (data.status === "ok") {
        getFavorites()
        useResultSwal({ title: "delete favorite success" })
      } else {
        useResultSwal({ title: "delete favorite failed", icon: "error" })
      }
    } catch (err) {
      useResultSwal({ title: "delete favorite failed", icon: "error" })
    } finally {
      changeLoadingState(0)
    }
  }

  return {
    favorites,
    isOpen,
    favoriteName,
    applyConditions,
    addFavorite,
    deleteFavorite,
  }
}
