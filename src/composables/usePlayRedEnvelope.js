import { ref, reactive, computed } from "vue"
// composables
import { useConfirmSwal, useResultSwal } from "@/composables/useAlert"
// vueuse
import { useCloned } from "@vueuse/core"

export const usePlay = () => {
    const familyArr = ["tako", "takoWife", "aunt", "auntHusband", "cat", "show", "huei", "hueiWife", "sister", "brother", "sun", "ning"]
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
        { id: 11, label: "D", money: 200 }
    ]

    const prizes = ref(useCloned(prizesSample).cloned.value)
    const sortedArr = reactive(new Map())
    const sortedArrKeys = computed(() => sortedArr.keys())
    
    const currentDrawer = ref("")

    const randomSortFamilyMember = async () => {
        let checkResult = true
        if (sortedArr.size && prizes.value.length) {
            checkResult = await useConfirmSwal({ title: "尚有獎項, 確定要重排序?" })
        }
        if (!checkResult) return

        sortedArr.clear()
        const clonedFamilyArr = [...familyArr]
        do {
            const randomNum = getRandomNum(clonedFamilyArr)
            sortedArr.set(clonedFamilyArr[randomNum], "尚未抽獎")
            clonedFamilyArr.splice(randomNum, 1)
        } while (clonedFamilyArr.length !== 0)
        prizes.value = useCloned(prizesSample).cloned.value
        currentDrawer.value = sortedArrKeys.value.next().value ?? ""
    }

    const showAndHandlerPrize = (titleArr, prizeIndex) => {
        const { label, money } = prizes.value[prizeIndex]
        sortedArr.set(currentDrawer.value, `${label}賞 > ${money}元`)
        titleArr.value.push(`
            <span class="font-extrabold">${currentDrawer.value}</span> 恭喜抽中 <span class="text-red-500">${label}</span> 賞 獎金: <span class="text-red-500">${money} 元</span>
        `)
        currentDrawer.value = sortedArrKeys.value.next().value
        prizes.value.splice(prizeIndex, 1)
    }

    const twoHundredPrizeMember = ref([])

    const randomPrize = () => {
        const titleArr = ref([])
        const randomNum = getRandomNum(prizes.value)
        showAndHandlerPrize(titleArr, randomNum)

        if (
            prizes.value.length === 1 ||
            prizes.value.every(({ label }) => label === prizes.value[0].label)
        ) {
            do {
                showAndHandlerPrize(titleArr, 0)
            } while (prizes.value.length !== 0)
        }

        if (prizes.value.length === 0) {
            for (const [key, value] of sortedArr.entries()) {
                if (value.startsWith("D")) {
                    twoHundredPrizeMember.value.push({
                        name: key,
                        guessNum: 0,
                        comfirmGuessNumStatus: false
                    })
                }
            }
        }

        useResultSwal({
            title: titleArr.value.join("\n"),
            showConfirmButton: true,
            timer: 0
        })
    }

    const getRandomNum = arr => Math.floor(Math.random() * arr.length)

    const sixHundredStep = ref(false)

    const numToGuess = ref(0)
    const randomMakeNumToGuess = () => {
        if (twoHundredPrizeMember.value.some(({ comfirmGuessNumStatus }) => !comfirmGuessNumStatus)) {
            useResultSwal({
                title: "200元每一位先確認要猜的數字",
                icon: "error",
                showConfirmButton: true,
                timer: 0
            })
            return
        }

        numToGuess.value = getRandomNum(Array(101))

        const hitLuckyNumMember = twoHundredPrizeMember.value.find(({ guessNum }) => guessNum * 1 === numToGuess.value)
        if (hitLuckyNumMember !== undefined) {
            console.log(hitLuckyNumMember)
            return
        }
        console.log("沒命中")
        // for (const { guessNum } of twoHundredPrizeMember.value) {

        // }
    }

    const comfirmGuessNum = member => {
        if (member.guessNum === "") {
            useResultSwal({
                title: "數字不能為空",
                icon: "error",
                showConfirmButton: true,
                timer: 0
            })
            return
        }
        member.comfirmGuessNumStatus = true
    }

    return {
        prizes,
        familyArr,
        sortedArr,
        twoHundredPrizeMember,
        currentDrawer,
        sixHundredStep,
        numToGuess,
        randomSortFamilyMember,
        randomPrize,
        randomMakeNumToGuess,
        comfirmGuessNum
    }
}