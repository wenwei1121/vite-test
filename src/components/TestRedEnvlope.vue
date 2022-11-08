<script setup>
import { ref, computed } from "vue"
import { useResultSwal } from "@/composables/useAlert"
import { useCloned } from "@vueuse/core"

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
  drawerNum.value = 0
}

const showPrize = ref({})
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
  useResultSwal({
    title: `恭喜抽中${showPrize.value.label}賞 獎金: ${showPrize.value.money}`,
    icon: "warning",
    showConfirmButton: true,
    timer: 0
  })
  prizes.value.splice(randomNum, 1)
  drawerNum.value++
}

const drawerNum = ref(0)

const getRandomNum = arr => {
  return Math.floor(Math.random() * arr.length)
}

const currentDrawer = computed(() => {
  if (sortedArr.value.length) {
    return sortedArr.value[drawerNum.value]
  }

  return ""
})

// const gameOverResult = ref([])
</script>

<template>
  <span>參加成員</span>
  <div>
    <ul>
      <li
        v-for="name of familyArr"
        :key="name"
      >
        <span>
          {{ name }}
        </span>
      </li>
    </ul>
  </div>
  <button
    class="bg-black text-white"
    @click="randomSortFamilyMember"
  >
    隨機排序
  </button>
  <div>
    <ul>
      <li
        v-for="(name, index) of sortedArr"
        :key="name"
      >
        <span>
          {{ (index + 1) + " : " + name }}
        </span>
      </li>
    </ul>
  </div>
  <div>
    <span>目前抽獎人: {{ currentDrawer }}</span>
  </div>
  <button
    :class="[sortedArr.length ? 'bg-black text-white' : 'text-gray-300']"
    :disabled="!sortedArr.length"
    @click="randomPrize"
  >
    抽獎
  </button>
  <div>
    <span>剩餘獎項</span>
    <ul v-if="prizes.length">
      <li
        v-for="(item, index) of prizes"
        :key="item.id"
      >
        <span>
          {{ (index + 1) + " : " + item.label + " > " + item.money }}
        </span>
      </li>
    </ul>
    <span v-else>無獎項</span>
  </div>
</template>

<style scoped></style>