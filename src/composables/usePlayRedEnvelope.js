import _ningchang_ from "@/assets/_ningchang_.png"
import bigtako1972 from "@/assets/bigtako1972.png"
import cat6389061a from "@/assets/cat6389061a.png"
import ch541215 from "@/assets/ch541215.png"
import chiukillcat from "@/assets/chiukillcat.png"
import enidchuang from "@/assets/enidchuang.png"
import huei_0410 from "@/assets/huei_0410.png"
import moneylo9453 from "@/assets/moneylo9453.png"
import show621113 from "@/assets/show621113.png"
import showfengzhang from "@/assets/showfengzhang.png"
import sunnyyyyy1004 from "@/assets/sunnyyyyy1004.png"
import u_0206 from "@/assets/u_0206.png"

import logo from "@/assets/logo.png"

export const usePlay = () => {
<<<<<<< HEAD
  const familyArr = [
    'tako',
    'takoWife',
    'aunt',
    'auntHusband',
    'cat',
    'show',
    'huei',
    'hueiWife',
    'sister',
    'brother',
    'sun',
    'ning',
  ]
  const prizesSample = [
    { id: 0, label: 'A', money: 1200 },
    { id: 1, label: 'B', money: 800 },
    { id: 2, label: 'C', money: 600 },
    { id: 3, label: 'C', money: 600 },
    { id: 4, label: 'D', money: 200 },
    { id: 5, label: 'D', money: 200 },
    { id: 6, label: 'D', money: 200 },
    { id: 7, label: 'D', money: 200 },
    { id: 8, label: 'D', money: 200 },
    { id: 9, label: 'D', money: 200 },
    { id: 10, label: 'D', money: 200 },
    { id: 11, label: 'D', money: 200 },
  ]

  const prizes = ref(useCloned(prizesSample).cloned.value)
  const sortedArr = reactive(new Map())
  const sortedArrKeys = computed(() => sortedArr.keys())

  const currentDrawer = ref('')

  const randomSortFamilyMember = async () => {
    let checkResult = true
    if (sortedArr.size && prizes.value.length) {
      checkResult = await useConfirmSwal({ title: '尚有獎項, 確定要重排序?' })
    }
    if (!checkResult) return

    sortedArr.clear()
    const clonedFamilyArr = [...familyArr]
    do {
      const randomNum = getRandomNum(clonedFamilyArr)
      sortedArr.set(clonedFamilyArr[randomNum], '尚未抽獎')
      clonedFamilyArr.splice(randomNum, 1)
    } while (clonedFamilyArr.length !== 0)
    prizes.value = useCloned(prizesSample).cloned.value
    currentDrawer.value = sortedArrKeys.value.next().value ?? ''
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
=======
    const familyArr = [
        { name: "bigtako1972", img: bigtako1972 },
        { name: "moneylo9453", img: moneylo9453 },
        { name: "showfengzhang", img: showfengzhang },
        { name: "ch541215", img: ch541215 },
        { name: "cat6389061a", img: cat6389061a },
        { name: "show621113", img: show621113 },
        { name: "huei_0410", img: huei_0410 },
        { name: "enidchuang", img: enidchuang },
        { name: "chiukillcat", img: chiukillcat },
        { name: "u_0206", img: u_0206 },
        { name: "sunnyyyyy1004", img: sunnyyyyy1004 },
        { name: "_ningchang_", img: _ningchang_ }
    ]

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

    const defaultCurrentDrawerInfo = { name: "XXX", img: logo }
    const currentDrawer = ref(defaultCurrentDrawerInfo)

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
            sortedArr.set(clonedFamilyArr[randomNum].name, "尚未抽獎")
            clonedFamilyArr.splice(randomNum, 1)
        } while (clonedFamilyArr.length !== 0)
        prizes.value = useCloned(prizesSample).cloned.value
        const nextName = sortedArrKeys.value.next().value
        currentDrawer.value = familyArr.find(({ name }) => name === nextName)
    }

    const showAndHandlerPrize = (titleArr, prizeIndex) => {
        const { label, money } = prizes.value[prizeIndex]
        sortedArr.set(currentDrawer.value.name, `${label}賞 > ${money}元`)
        titleArr.value.push(`
            <span class="font-extrabold">${currentDrawer.value.name}</span> 恭喜抽中 <span class="text-red-500">${label}</span> 賞 獎金: <span class="text-red-500">${money} 元</span>
        `)
        const nextName = sortedArrKeys.value.next().value
        currentDrawer.value = familyArr.find(({ name }) => name === nextName) ?? defaultCurrentDrawerInfo
        prizes.value.splice(prizeIndex, 1)
    }
>>>>>>> 096996937a3daa8c493921d7d73231d0c67299e6

  const twoHundredPrizeMember = ref([])

  const randomPrize = () => {
    const titleArr = ref([])
    const randomNum = getRandomNum(prizes.value)
    showAndHandlerPrize(titleArr, randomNum)

    if (prizes.value.length === 1 || prizes.value.every(({ label }) => label === prizes.value[0].label)) {
      do {
        showAndHandlerPrize(titleArr, 0)
      } while (prizes.value.length !== 0)
    }

    if (prizes.value.length === 0) {
      for (const [key, value] of sortedArr.entries()) {
        if (value.startsWith('D')) {
          twoHundredPrizeMember.value.push({
            name: key,
            guessNum: 0,
            comfirmGuessNumStatus: false,
          })
        }
      }
    }

<<<<<<< HEAD
    useResultSwal({
      title: titleArr.value.join('\n'),
      showConfirmButton: true,
      timer: 0,
    })
  }

  const getRandomNum = (arr) => Math.floor(Math.random() * arr.length)

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
        title: '200元每一位先確認要猜的數字',
        icon: 'error',
        showConfirmButton: true,
        timer: 0,
      })
      return
    }

    stopRunLuckyNum()

    const numToGuess = (tensDigits.value + '' + tensDigits.value) * 1

    let minimalMinus = 100
    let minusNum = 0
    let level = 'B'
    let upMoney = 800
    let currentWinMember = []
    let titleArr = []
    let content = '最靠近幸運數字'

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
        level = 'A'
        upMoney = 1200
        content = '猜中幸運數字'
        break
      }
    }
=======
    const getRandomNum = arr => Math.floor(Math.random() * arr.length)

    const sixHundredStep = ref(false)
    const maxRangeNum = 19

    const tensDigits = ref(0)
    const digits = ref(0)
    const tensDigitsNumArray = [0, 1]
    const digitsNumArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const { pause: stopRunLuckyNum, resume: reRunLuckyNum, isActive } = useIntervalFn(() => {
        tensDigits.value = getRandomNum(tensDigitsNumArray)
        digits.value = getRandomNum(digitsNumArray)
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

        const numToGuess = (tensDigits.value + "" + digits.value) * 1

        let minimalMinus = maxRangeNum
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
            if (minusNum === 0) {
                currentWinMember = [name]
                level = "A"
                upMoney = 1200
                content = "猜中幸運數字"
                break
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
        }
>>>>>>> 096996937a3daa8c493921d7d73231d0c67299e6

    if (currentWinMember.length === 2) {
      level = 'C'
      upMoney = 600
      content = '是兩人中靠近幸運數字的其中一位'
    }

    currentWinMember.forEach((name) => {
      titleArr.push(`
                <span class="font-extrabold">${name}</span> 恭喜${content} 獎金提升為 <span class="text-red-500">${upMoney} 元</span>
            `)
      sortedArr.set(name, `提升為 ${level}賞 > ${upMoney}元`)
    })

    useResultSwal({
      title: titleArr.join('\n'),
      showConfirmButton: true,
      timer: 0,
    })
  }

  const comfirmGuessNum = async (member) => {
    if (member.guessNum === '') {
      useResultSwal({
        title: '數字不能為空',
        icon: 'error',
        showConfirmButton: true,
        timer: 0,
      })
      return
    }

<<<<<<< HEAD
    const filterComfirmedLuckNumMember = twoHundredPrizeMember.value.filter(
      ({ comfirmGuessNumStatus }) => comfirmGuessNumStatus
    )
    if (filterComfirmedLuckNumMember.some(({ guessNum }) => guessNum === member.guessNum)) {
      useResultSwal({
        title: '數字已被選擇, 不能重複',
        icon: 'error',
        showConfirmButton: true,
        timer: 0,
      })
      return
    }

    const checkStatus = await useConfirmSwal({ title: '確定這是你的幸運數字嗎?' })
    if (checkStatus) {
      member.comfirmGuessNumStatus = true
=======
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

        if (member.guessNum > maxRangeNum) {
            useResultSwal({
                title: "數字範圍在 0 ~ 19",
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
        isActive,
        randomSortFamilyMember,
        randomPrize,
        randomMakeNumToGuess,
        comfirmGuessNum,
        reRunLuckyNum
>>>>>>> 096996937a3daa8c493921d7d73231d0c67299e6
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
