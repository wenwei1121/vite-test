import { ref, reactive, computed } from "vue"
// composables
import { useConfirmSwal, useResultSwal } from "@/composables/useAlert"
// vueuse
import { useCloned, useIntervalFn } from "@vueuse/core"

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

    const tensDigits = ref(0)
    const digits = ref(0)
    const numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const { pause: stopRunLuckyNum } = useIntervalFn(() => {
        tensDigits.value = getRandomNum(numArray)
        digits.value = getRandomNum(numArray)
    }, 30)
    
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

        stopRunLuckyNum()

        const numToGuess = (tensDigits.value + "" + tensDigits.value) * 1

        let minimalMinus = 100
        let minusNum = 0
        let level = "B"
        let upMoney = 800
        let currentWinMember = []
        let titleArr = []
        let content = "最靠近幸運數字"

        for (const { name, guessNum } of twoHundredPrizeMember.value) {
            minusNum = Math.abs(guessNum * 1 - numToGuess)
            if (minusNum > minimalMinus) {
                continue
            }
            if (minusNum < minimalMinus) {
                minimalMinus = minusNum
                currentWinMember = [name]
                continue
            }
            if (minusNum === minimalMinus) {
                currentWinMember.push(name)
                continue
            }
            if (minusNum === 0) {
                currentWinMember = [name]
                level = "A"
                upMoney = 1200
                content = "猜中幸運數字"
                break
            }
        }

        if (currentWinMember.length === 2) {
            level = "C"
            upMoney = 600
            content = "是兩人中靠近幸運數字的其中一位"
        }

        currentWinMember.forEach(name => {
            titleArr.push(`
                <span class="font-extrabold">${name}</span> 恭喜${content} 獎金提升為 <span class="text-red-500">${upMoney} 元</span>
            `)
            sortedArr.set(name, `提升為 ${level}賞 > ${upMoney}元`)
        })

        useResultSwal({
            title: titleArr.join("\n"),
            showConfirmButton: true,
            timer: 0
        })
    }

    const comfirmGuessNum = async (member) => {
        if (member.guessNum === "") {
            useResultSwal({
                title: "數字不能為空",
                icon: "error",
                showConfirmButton: true,
                timer: 0
            })
            return
        }
        
        const filterComfirmedLuckNumMember = twoHundredPrizeMember.value.filter(({ comfirmGuessNumStatus }) => comfirmGuessNumStatus)
        if (filterComfirmedLuckNumMember.some(({ guessNum }) => guessNum === member.guessNum)) {
            useResultSwal({
                title: "數字已被選擇, 不能重複",
                icon: "error",
                showConfirmButton: true,
                timer: 0
            })
            return
        }

        const checkStatus = await useConfirmSwal({ title: "確定這是你的幸運數字嗎?" })
        if (checkStatus) {
            member.comfirmGuessNumStatus = true
        }
    }

    return {
        prizes,
        familyArr,
        sortedArr,
        twoHundredPrizeMember,
        currentDrawer,
        sixHundredStep,
        tensDigits,
        digits,
        randomSortFamilyMember,
        randomPrize,
        randomMakeNumToGuess,
        comfirmGuessNum,
    }
}