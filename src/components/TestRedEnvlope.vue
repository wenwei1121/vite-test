<script setup>
import { ref } from "vue"
import { useResultSwal } from "@/composables/useAlert"

const sortedArr = ref([])
const randomSortFamilyMember = () => {
  const familyArr = ["tako", "takoWife", "aunt", "auntHusband", "cat", "show", "huei", "hueiWife", "sister", "sisterBoyfriend", "brother", "sunBoyfriend", "sun", "ning"]
  sortedArr.value = []
  do {
    const randomNum = getRandomNum(familyArr)
    sortedArr.value.push(familyArr[randomNum])
    familyArr.splice(randomNum, 1)
  } while (familyArr.length !== 0)
}

const showPrize = ref({})
const prizes = ref([
  { id: 0, label: "A", money: 1200 },
  { id: 1, label: "B", money: 600 },
  { id: 2, label: "B", money: 600 },
  { id: 3, label: "B", money: 600 },
  { id: 4, label: "C", money: 200 },
  { id: 5, label: "C", money: 200 },
  { id: 6, label: "C", money: 200 },
  { id: 7, label: "C", money: 200 },
  { id: 8, label: "C", money: 200 },
  { id: 9, label: "C", money: 200 },
  { id: 10, label: "C", money: 200 },
  { id: 11, label: "C", money: 200 },
  { id: 12, label: "C", money: 200 },
  { id: 13, label: "C", money: 200 },
])
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
}

const getRandomNum = arr => {
  return Math.floor(Math.random() * arr.length)
}
</script>

<template>
  <button @click="randomSortFamilyMember">
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
  <button @click="randomPrize">
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
    <span>無獎項</span>
  </div>
</template>

<style scoped></style>