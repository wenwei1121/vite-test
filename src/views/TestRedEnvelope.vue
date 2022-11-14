<script setup>
// pinia
import { useCurrentPath } from "@/store/store.js"
// composables
import { usePlay } from "@/composables/usePlayRedEnvelope"

const { setCurrentPath } = useCurrentPath()
setCurrentPath("/TestRedEnvelope")

const {
  prizes,
  familyArr,
  sortedArr,
  currentDrawer,
  randomSortFamilyMember,
  randomPrize
} = usePlay()

</script>

<template>
  <div class="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col items-center p-8">
      <span>目前抽獎人</span>
      <img
        v-show="currentDrawer !== ''"
        class="mt-5 mb-3 w-24 h-24 rounded-full shadow-lg"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Bonnie image"
      />
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        {{ currentDrawer }}
      </h5>
      <div class="flex mt-5 space-x-3 md:mt-6">
        <button
          :disabled="!sortedArr.size || !prizes.length"
          type="button"
          class="inline-flex items-center py-2 px-4 font-medium rounded-lg text-sm text-center"
          :class="[
            !sortedArr.size || !prizes.length
              ? 'cursor-not-allowed text-gray-300 bg-gray-500'
              : 'cursor-pointer text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
          ]"
          @click="randomPrize"
        >
          抽獎
        </button>
      </div>
    </div>
  </div>
  <div class="w-full max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col items-center px-4 py-8">
      <span>抽獎結果</span>
      <div class="mt-5 overflow-x-auto relative">
        <table class="w-100 text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                class="py-3 px-6"
              >
                順序
              </th>
              <th
                scope="col"
                class="py-3 px-6"
              >
                成員
              </th>
              <th
                scope="col"
                class="py-3 px-6"
              >
                抽中獎項
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(keyName, index) of sortedArr.keys()"
              :key="keyName"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ index + 1 }}
              </th>
              <td class="py-4 px-6">
                {{ keyName }}
              </td>
              <td class="py-4 px-6">
                {{ sortedArr.get(keyName) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex mt-5 space-x-3 md:mt-6">
        <button
          type="button"
          class="
          text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl
            focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800
            cursor-pointer inline-flex items-center font-medium rounded-lg text-sm py-2 px-4 text-center mr-2 mb-2
          "     
          @click="randomSortFamilyMember"
        >
          隨機排序
        </button>
      </div>
    </div>
  </div>
  <div class="w-full max-w-xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-evenly py-8">
      <div class="flex flex-col items-center">
        <span>剩餘獎項</span>
        <div class="mt-5 overflow-x-auto relative">
          <table class="text-sm text-left text-gray-500 dark:text-gray-400">
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
      </div>
      <div class="flex flex-col items-center">
        <span>剩餘獎項</span>
        <div class="mt-5 overflow-x-auto relative">
          <table class="w-50 text-sm text-left text-gray-500 dark:text-gray-400">
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
    </div>
  </div>
</template>

<style scoped></style>