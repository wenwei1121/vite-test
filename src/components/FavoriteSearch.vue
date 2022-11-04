<script setup>
  // components
  import Modal from "./modal.vue";
  // headlessui
  import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
  // heroIcons
  import { HeartIcon, PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid";
  import { useFavoriteSearchActions } from "../composables/useApiFavoriteSearchActions";

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
  <Popover class="relative" v-slot="{ open }">
    <PopoverButton>
      <HeartIcon class="cursor-pointer h-8 w-8 text-red-400" />
    </PopoverButton>

    <PopoverPanel class="absolute z-10 rounded-md w-48 text-gray-100 bg-gray-800 p-3">
      <ul class="flex flex-col gap-y-2">
        <li
          class="flex justify-between cursor-pointer"
          v-for="item of favorites"
          :key="item.id"
        >
          <span class="w-full" @click="applyConditions(item.conditions)">{{
            item.name
          }}</span>
          <button @click="deleteFavorite(item)">
            <TrashIcon class="w-4 h-4 self-center" />
          </button>
        </li>
      </ul>
      <hr class="h-1 rounded-sm bg-gray-100 my-3" />
      <div class="flex flex-col gap-y-1">
        <button class="flex gap-x-1" @click="isOpen = true">
          <PlusCircleIcon class="w-4 h-4 self-center" />
          <span>add favorite</span>
        </button>
      </div>
    </PopoverPanel>
  </Popover>
  <Modal v-model:isOpen="isOpen" v-model:name="favoriteName" @save="addFavorite" />
</template>

<style></style>
