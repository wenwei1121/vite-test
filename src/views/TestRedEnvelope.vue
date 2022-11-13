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
            成員
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="name of familyArr"
          :key="name"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ name }}
          </th>
        </tr>
      </tbody>
    </table>
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
    <div class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              class="py-3 px-6"
            >
              級別
            </th>
            <th
              scope="col"
              class="py-3 px-6"
            >
              獎金
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item of prizes"
            :key="item.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.label }}賞
            </th>
            <td class="py-4 px-6">
              {{ item.money }}元
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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