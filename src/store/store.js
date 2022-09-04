import { defineStore } from 'pinia'
import { ref } from 'vue';

import { useRoute } from 'vue-router'

import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'

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
        const members = []
        const querySnapShot = await getDocs(collection(db, "members"))
        querySnapShot.forEach(doc => {
            members.push({
                id: doc.id,
                ...doc.data(),
                isEditting: false
            })
        })
        changeMember.value = [...members]
        originMember.value = cloneDeep(members)
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