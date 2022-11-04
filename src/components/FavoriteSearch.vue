<script setup>
  // components
  import CommonModal from "./CommonModal.vue"
  // headlessui
  import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
  // heroIcons
  import { HeartIcon, PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid"
  import { useFavoriteSearchActions } from "../composables/useApiFavoriteSearchActions"

  const {
    favorites,
    isOpen,
    favoriteName,
    applyConditions,
    addFavorite,
    deleteFavorite,
  } = useFavoriteSearchActions()
</script>

<template>
  <Popover class="relative">
    <PopoverButton>
      <HeartIcon class="cursor-pointer h-8 w-8 text-red-400" />
    </PopoverButton>

    <PopoverPanel class="absolute z-10 rounded-md w-48 text-gray-100 bg-gray-800 p-3">
      <ul class="flex flex-col gap-y-2">
        <li
          v-for="item of favorites"
          :key="item.id"
          class="flex justify-between cursor-pointer"
        >
          <span
            class="w-full"
            @click="applyConditions(item.conditions)"
          >
            {{ item.name }}
          </span>
          <button @click="deleteFavorite(item)">
            <TrashIcon class="w-4 h-4 self-center" />
          </button>
        </li>
      </ul>
      <hr class="h-1 rounded-sm bg-gray-100 my-3" />
      <div class="flex flex-col gap-y-1">
        <button
          class="flex gap-x-1"
          @click="isOpen = true"
        >
          <PlusCircleIcon class="w-4 h-4 self-center" />
          <span>add favorite</span>
        </button>
      </div>
    </PopoverPanel>
  </Popover>
  <CommonModal
    v-model:isOpen="isOpen"
    v-model:name="favoriteName"
    @save="addFavorite"
  />
</template>

<style></style>
