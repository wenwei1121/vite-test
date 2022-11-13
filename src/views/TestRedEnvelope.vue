<script setup>
// pinia
import { useCurrentPath } from "@/store/store.js"
// composables
import { usePlay } from "@/composables/usePlayRedEnvelope"

const { setCurrentPath } = useCurrentPath()
setCurrentPath("/TestRedEnvelope")

const {
  familyArr,
  sortedArr,
  randomSortFamilyMember,
  prizes,
  gameOverResult,
  currentDrawer,
  randomPrize
} = usePlay()

</script>

<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th
            scope="col"
            class="py-3 px-6"
          >
            Product name
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Apple MacBook Pro 17"
          </th>
          <td class="py-4 px-6">
            Sliver
          </td>
          <td class="py-4 px-6">
            Laptop
          </td>
          <td class="py-4 px-6">
            $2999
          </td>
        </tr>
      </tbody>
    </table>
  </div>

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
  <div>
    <span>抽獎結果</span>
    <ul>
      <li
        v-for="(item) of gameOverResult"
        :key="item.drawer"
      >
        <span>
          {{ item.drawer + " : " + item.prizeItem.label + " > " + item.prizeItem.money }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>