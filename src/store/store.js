import { defineStore } from 'pinia'
import { ref, reactive } from 'vue';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase'

// export const useStore = defineStore('piFamilyMember', {
//     state: () => ({
//         piFamilyMember: []
//     }),
//     getters: {
//         getPiFamilyMember(state) {
//             return state.piFamilyMember
//         }
//     },
//     actions: {
//         async readPiFamilyMember() {
//             const response = await fetch("http://localhost:3000/members")
//             if (response.ok) {
//                 const data = await response.json()
//                 this.piFamilyMember = [...data]
//             } else {

//             }
//         },
//     },
// })

export const useCurrentPath = defineStore('currentPath', () => {
    const currentPath = ref('/')

    const setCurrentPath = (passPathValue) => {
        currentPath.value = passPathValue
    }

    return { currentPath, setCurrentPath }
})

export const useStore = defineStore('memberInfo', () => {
    const piFamilyMember = ref([])
    const setMember = () => {
        onSnapshot(collection(db, "members"), querySnapshot => {
            const collectMember = []
            querySnapshot.forEach(doc => {
                // // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data())
                const toNewObj = {
                    id: doc.id,
                    ...doc.data(),
                    isEditting: false
                }
                collectMember.push(toNewObj)
            })
            piFamilyMember.value = [...collectMember]
        })
    }
    return { piFamilyMember, setMember }
})