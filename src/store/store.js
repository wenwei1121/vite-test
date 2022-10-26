import { ref, computed, reactive } from 'vue';
// pinia
import { defineStore } from 'pinia'
// composables
import { useResultSwal } from '@/composables/useAlert'
import { useGetApiResult } from '@/composables/useApi'
// vueuse
import { useCloned } from '@vueuse/core' 

export const useCurrentPath = defineStore('currentPath', () => {
    const currentPath = ref("")

    const setCurrentPath = passPathValue => {
        currentPath.value = passPathValue
    }

    return { currentPath, setCurrentPath }
})

export const useStore = defineStore('memberInfo', () => {
    const changeMember = ref([])
    const originMember = ref([])
    const setMember = async () => {
        try {
            const data = await useGetApiResult("members", "readPiPiMembers")
            changeMember.value = [...data]
            const { cloned: clonedData } = useCloned(data)
            originMember.value = clonedData.value
        } catch (err) {
            useResultSwal({ title: "Reading members failed", icon: "error" })
        }
    }
    return { changeMember, originMember, setMember }
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
        changeLoadingState
    }
})

export const useSearchState = defineStore("searchState", () => {
    const searchInitState = {
        inputName: "",
        selectComparisonOperator: "no",
        inputAge: 0,
        selectGender: -1
    }

    let searchInfo = reactive({ ...searchInitState })

    const resetSearchInfo = () => {
        Object.assign(searchInfo, searchInitState)
    }

    return { searchInfo, resetSearchInfo }
})