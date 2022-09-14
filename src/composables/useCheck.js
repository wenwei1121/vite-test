// pinia
import { storeToRefs } from 'pinia'
import { useStore } from '@/store/store.js'

const { changeMember } = storeToRefs(useStore())

export const CheckInputAction = (memberInfo) => {
    const { id = 0, name, age } = memberInfo

    if (!name) {
        return "Have empty name"
    }
  
    if (age === "") {
        return "Have empty age"
    }
  
    const haveSameName = changeMember.value.some(member => {
        if (member.id === id) {
            return ""
        }
        return member.name === name
    })
    if (haveSameName) {
        return "Have same name"
    }

    return ""
}