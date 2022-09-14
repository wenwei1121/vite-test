<script setup>
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>

<template>
    <button 
        class="button is-outlined is-clickable"
        @click="resetSearchInfo"
    >Favorite
    </button>
    <Popover class="relative">
        <PopoverButton>Favorite</PopoverButton>

        <PopoverPanel class="absolute z-10">
        <div class="grid grid-cols-2">
            <a href="/analytics">Analytics</a>
            <a href="/engagement">Engagement</a>
            <a href="/security">Security</a>
            <a href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" />
        </PopoverPanel>
    </Popover>
</template>

<style></style>
