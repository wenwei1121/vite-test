import { ref, computed } from "vue"
// composables
import { useResultSwal } from "@/composables/useAlert"
// vueuse
import { useCloned } from "@vueuse/core"

export const usePlay = () => {
    const familyArr = ["tako", "takoWife", "aunt", "auntHusband", "cat", "show", "huei", "hueiWife", "sister", "sisterBoyfriend", "brother", "sun", "ning"]

    const sortedArr = ref([])
    const randomSortFamilyMember = () => {
        sortedArr.value = []
        const clonedFamilyArr = [...familyArr]
        do {
            const randomNum = getRandomNum(clonedFamilyArr)
            sortedArr.value.push(clonedFamilyArr[randomNum])
            clonedFamilyArr.splice(randomNum, 1)
        } while (clonedFamilyArr.length !== 0)
        prizes.value = useCloned(prizesSample).cloned.value
        gameOverResult.value = []
        drawerNum.value = 0
    }

    const prizesSample = [
        { id: 0, label: "A", money: 1200 },
        { id: 1, label: "B", money: 800 },
        { id: 2, label: "C", money: 600 },
        { id: 3, label: "C", money: 600 },
        { id: 4, label: "D", money: 200 },
        { id: 5, label: "D", money: 200 },
        { id: 6, label: "D", money: 200 },
        { id: 7, label: "D", money: 200 },
        { id: 8, label: "D", money: 200 },
        { id: 9, label: "D", money: 200 },
        { id: 10, label: "D", money: 200 },
        { id: 11, label: "D", money: 200 },
        { id: 12, label: "D", money: 200 },
    ]

    const prizes = ref(useCloned(prizesSample).cloned.value)
    const showPrize = ref({})
    const gameOverResult = ref([])
    const drawerNum = ref(0)
    const currentDrawer = computed(() => sortedArr.value.length ? sortedArr.value[drawerNum.value] : "")

    const randomPrize = () => {
        if (prizes.value.length === 0) {
            useResultSwal({
                title: "獎已空",
                icon: "error",
                timer: 2000
            })
            return
        }
        const randomNum = getRandomNum(prizes.value)
        showPrize.value = prizes.value[randomNum]
        prizes.value.splice(randomNum, 1)
        useResultSwal({
            title: `恭喜抽中${showPrize.value.label}賞 獎金: ${showPrize.value.money}`,
            icon: "warning",
            showConfirmButton: true,
            timer: 0
        })
        gameOverResult.value.push({
            drawer: currentDrawer.value,
            prizeItem: showPrize.value
        })
        drawerNum.value++
    }

    const getRandomNum = arr => Math.floor(Math.random() * arr.length)

    return {
        familyArr,
        sortedArr,
        randomSortFamilyMember,
        prizes,
        gameOverResult,
        currentDrawer,
        randomPrize,
    }
}