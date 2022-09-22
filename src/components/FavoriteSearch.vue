<script setup>
    import { ref, onMounted } from 'vue'
    // pinia
    import { useSearchState } from "@/store/store"
    // composables
    import { getApiResult } from "@/composables/useApiResult";
    // headlessui
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
    // heroIcons
    import { HeartIcon } from "@heroicons/vue/24/solid"

    const { searchInfo } = useSearchState()

    const favorites = ref([])

    onMounted(async () => {
        const result = await getApiResult("favorites", "readFavorites")
        favorites.value = [...result]
    })

    const applyConditions = conditions => {
        searchInfo.inputName = conditions.name
        searchInfo.selectComparisonOperator = conditions.operator
        searchInfo.inputAge = conditions.age
        searchInfo.selectGender = conditions.gender
    }

</script>

<template>
    <Popover class="relative" v-slot="{ open }">
        <PopoverButton>
            <HeartIcon class="cursor-pointer h-8 w-8 text-red-400"/>
        </PopoverButton>

        <PopoverPanel class="absolute z-10 p-3 text-gray-100 bg-gray-800">
            <ul class="flex flex-col gap-y-1">
                <li
                    class="cursor-pointer"
                    v-for="item of favorites"
                    :key="item.id"
                    @click="applyConditions(item.conditions)"
                >{{ item.name }}</li>
            </ul>
            <div>
                
            </div>
        </PopoverPanel>
    </Popover>
</template>

<style></style>
