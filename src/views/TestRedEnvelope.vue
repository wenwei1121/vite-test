<script setup>
// directives
import { vNumOnly } from "@/directives/useDealInput"

const { setCurrentPath } = useCurrentPath()
setCurrentPath("/TestRedEnvelope")

const {
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
} = usePlay()

</script>

<template>
  <div
    v-show="!sixHundredStep"
    class="flex justify-evenly gap-3"
  >
    <!-- 成員與剩餘獎項 -->
    <div class="w-full max-w-xl bg-gray-800 rounded-lg border border-gray-700 shadow-md">
      <div class="flex justify-evenly py-8">
        <div class="flex flex-col items-center">
          <span class="text-lg text-gray-200 font-extrabold">抽獎成員</span>
          <div class="mt-5 overflow-x-auto rounded-lg relative">
            <table class="text-md text-left">
              <thead class="uppercase bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    class="py-3 px-6 text-gray-400 font-semibold" 
                  >
                    名字
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="{ name } of familyArr"
                  :key="name"
                  class="border-b bg-gray-600 border-gray-700"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium whitespace-nowrap text-gray-100"
                  >
                    {{ name }}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-col items-center">
          <span class="text-lg text-gray-200 font-extrabold">剩餘獎項</span>
          <div class="mt-5 overflow-x-auto rounded-lg relative">
            <table class="text-md text-left">
              <thead class="uppercase bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    class="py-3 px-6 text-gray-400 font-semibold"
                  >
                    級別
                  </th>
                  <th
                    scope="col"
                    class="py-3 px-6 text-gray-400 font-semibold"
                  >
                    獎金
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item of prizes"
                  :key="item.id"
                  class="border-b bg-gray-600 border-gray-700"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium whitespace-nowrap text-gray-100"
                  >
                    {{ item.label }}賞
                  </th>
                  <td class="py-4 px-6 font-medium whitespace-nowrap text-gray-100">
                    {{ item.money }}元
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- 目前抽獎人 -->
    <div class="w-full max-w-sm rounded-lg border shadow-md bg-gray-800 border-gray-700">
      <div class="flex flex-col items-center p-8">
        <span class="text-lg text-gray-200 font-extrabold">目前抽獎人</span>
        <img
          class="mt-5 mb-3 w-36 h-36 rounded-full shadow-lg bg-white"
          :src="currentDrawer.img"
          alt=""
        />
        <h5 class="text-4xl font-semibold text-gray-100">
          {{ currentDrawer.name }}
        </h5>
        <div class="flex mt-5 space-x-3 md:mt-6">
          <button
            v-show="prizes.length"
            :disabled="!sortedArr.size || !prizes.length"
            type="button"
            class="inline-flex items-center py-2 px-4 font-medium rounded-lg text-sm text-center"
            :class="[
              !sortedArr.size || !prizes.length
                ? 'cursor-not-allowed text-gray-300 bg-gray-500'
                : 'cursor-pointer text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none'
            ]"
            @click="randomPrize"
          >
            抽獎
          </button>
          <button
            v-show="!prizes.length"
            type="button"
            class="
              inline-flex items-center py-2 px-4 font-medium rounded-lg text-sm text-center
              cursor-pointer text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none
            "
            @click="sixHundredStep = true"
          >
            600元昇格戰
          </button>
        </div>
      </div>
    </div>
    <!-- 抽獎結果 -->
    <div class="w-full max-w-xl rounded-lg border shadow-md bg-gray-800 border-gray-700">
      <div class="flex flex-col items-center px-4 py-8">
        <span class="text-lg text-gray-200 font-extrabold">抽獎結果</span>
        <div class="mt-5 overflow-x-auto rounded-lg relative">
          <table class="text-md text-left">
            <thead class="uppercase bg-gray-700">
              <tr>
                <th
                  scope="col"
                  class="py-3 px-6 text-gray-400 font-semibold"
                >
                  順序
                </th>
                <th
                  scope="col"
                  class="py-3 px-6 text-gray-400 font-semibold"
                >
                  成員
                </th>
                <th
                  scope="col"
                  class="py-3 px-6 text-gray-400 font-semibold"
                >
                  抽中獎項
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(keyName, index) of sortedArr.keys()"
                :key="keyName"
                class="border-b bg-gray-600 border-gray-700"
              >
                <th
                  scope="row"
                  class="py-4 px-6 font-medium whitespace-nowrap text-gray-100"
                >
                  {{ index + 1 }}
                </th>
                <td class="py-4 px-6 font-medium whitespace-nowrap text-gray-100">
                  {{ keyName }}
                </td>
                <td class="py-4 px-6 font-medium whitespace-nowrap text-gray-100">
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
              cursor-pointer inline-flex items-center font-medium rounded-lg text-sm py-2 px-4 text-center mr-2 mb-2
              text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none
            "     
            @click="randomSortFamilyMember"
          >
            隨機排序
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    v-show="sixHundredStep"
    class="flex justify-evenly gap-3"
  >
    <!-- 600元昇格戰成員 -->
    <div class="w-full max-w-xl bg-gray-800 rounded-lg border border-gray-700 shadow-md">
      <div class="flex justify-evenly py-8">
        <div class="flex flex-col items-center">
          <span class="text-lg text-gray-200 font-extrabold">600元昇格戰成員</span>
          <div class="mt-5 overflow-x-auto rounded-lg relative">
            <table class="text-md text-left">
              <thead class="uppercase bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    class="py-3 px-6 text-gray-400 font-semibold" 
                  >
                    名字
                  </th>
                  <th
                    scope="col"
                    class="py-3 px-6 text-gray-400 font-semibold"
                  >
                    猜的數字
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="member of twoHundredPrizeMember"
                  :key="member.name"
                  class="border-b bg-gray-600 border-gray-700"
                >
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium whitespace-nowrap text-2xl text-gray-100"
                  >
                    {{ member.name }}
                  </th>
                  <td class="py-4 px-6 font-medium whitespace-nowrap text-gray-100 flex gap-3">
                    <input
                      v-show="!member.comfirmGuessNumStatus"
                      v-model.number="member.guessNum"
                      v-num-only
                      class="input"
                      type="number"
                    />
                    <span
                      v-show="member.comfirmGuessNumStatus"
                      class="text-2xl"
                    >
                      {{ member.guessNum }}
                    </span>
                    <button
                      v-show="!member.comfirmGuessNumStatus"
                      class="
                        inline-flex items-center py-2 px-4 font-medium rounded-lg text-sm text-center
                        cursor-pointer text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none
                      "
                      @click="comfirmGuessNum(member)"
                    >
                      comfirm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full max-w-sm rounded-lg border shadow-md bg-gray-800 border-gray-700">
      <div class="flex flex-col items-center p-8">
        <span class="text-lg text-gray-200 font-extrabold">幸運數字</span>
        <h2 class="text-8xl font-semibold text-gray-100">
          {{ tensDigits }}{{ digits }}
        </h2>
        <div class="flex flex-col gap-3 mt-5 md:mt-6">
          <button
            v-show="isActive"
            type="button"
            class="
              inline-flex justify-center items-center py-2 px-4 font-medium rounded-lg text-sm text-center
              cursor-pointer text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none
            "
            @click="randomMakeNumToGuess"
          >
            產生幸運數字
          </button>
          <button
            v-show="!isActive"
            type="button"
            class="
              inline-flex justify-center items-center py-2 px-4 font-medium rounded-lg text-sm text-center
              cursor-pointer text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none
            "
            @click="reRunLuckyNum"
          >
            重跑幸運數字
          </button>
          <button
            v-show="!prizes.length"
            type="button"
            class="
              inline-flex justify-center items-center py-2 px-4 font-medium rounded-lg text-sm text-center
              cursor-pointer text-white bg-blue-500 hover:bg-blue-300 focus:ring-4 focus:outline-none
            "
            @click="sixHundredStep = false"
          >
            返回抽獎名單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>