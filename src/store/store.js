import { ref, reactive } from 'vue';
// pinia
import { defineStore } from 'pinia'
// composables
import { resultSwal } from '@/composables/useAlert'
import { getApiResult } from '@/composables/useApiResult'
// lodash
import { cloneDeep } from 'lodash'

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
            const data = await getApiResult("/members", "readPiPiMembers")
            changeMember.value = [...data]
            originMember.value = cloneDeep(data)
        } catch (err) {
            resultSwal("Reading members failed", "error")
        }
    }
    return { changeMember, originMember, setMember }
})

export const useLoadingState = defineStore("loadingState", {
    state: () => ({
        loadingState: 0,
    }),
    getters: {
        getLoadingState: (state) => state.loadingState,
    },
    actions: {
        changeLoadingState(num) {
            this.loadingState = num
        }
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