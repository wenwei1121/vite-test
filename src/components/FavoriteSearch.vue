<script setup>
    import { onMounted } from 'vue'
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
    import { getApiResult } from "@/composables/useApiResult";
    import { HeartIcon } from "@heroicons/vue/24/solid"

    onMounted(async () => {
        const result = await getApiResult("favorites", "readFavorites")
        console.log(result);
    })
    
</script>

<template>
    <Popover class="relative" v-slot="{ open }">
        <PopoverButton>
            <HeartIcon class="cursor-pointer h-8 w-8 text-red-400"/>
        </PopoverButton>

        <PopoverPanel class="absolute z-10 p-3 text-gray-100 bg-gray-800">
            <div class="flex flex-col gap-y-1">
                <a href="/analytics">Analytics</a>
                <a href="/engagement">Engagement</a>
                <a href="/security">Security</a>
                <a href="/integrations">Integrations</a>
            </div>
            <div>
                
            </div>

        </PopoverPanel>
    </Popover>
</template>

<style></style>
