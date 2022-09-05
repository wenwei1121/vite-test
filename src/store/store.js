import { ref} from 'vue';
// router
import { useRoute } from 'vue-router'
// pinia
import { defineStore } from 'pinia'
// composables
import { resultSwal } from '../composables/useAlert'
import { getApiResult } from '../composables/useApiResult'
// lodash
import { cloneDeep } from 'lodash'

export const useCurrentPath = defineStore('currentPath', () => {

    const route = useRoute()

    const currentPath = ref(route.path)

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
    const inputName = ref("")
    const selectGender = ref(-1)
    return { inputName, selectGender }
})