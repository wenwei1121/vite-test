<script setup>
    import { ref } from 'vue'
    // components
    import Modal from "./modal.vue"
    // pinia
    import { useLoadingState, useSearchState } from "@/store/store"
    // composables
    import { comfirmSwal, resultSwal } from '@/composables/useAlert';
    import { getApiResult } from "@/composables/useApiResult";
    // headlessui
    import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
    // heroIcons
    import { HeartIcon, PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/solid"

    const { changeLoadingState } = useLoadingState()

    const { searchInfo } = useSearchState()
    const applyConditions = conditions => {
        searchInfo.inputName = conditions.name
        searchInfo.selectComparisonOperator = conditions.operator
        searchInfo.inputAge = conditions.age
        searchInfo.selectGender = conditions.gender
    }

    const favorites = ref([])
    const getFavorites = async () => {
        const result = await getApiResult("favorites", "readFavorites")
        favorites.value = [...result]
    }
    getFavorites()

    const isOpen = ref(false)
    const favoriteName = ref("")
    const addFavorite = async () => {
        if (favoriteName.value === "") {
            resultSwal("favorite name is empty", "error")
            return
        }

        const { 
            inputName: name,
            inputAge: age,
            selectComparisonOperator: operator,
            selectGender: gender
         } = searchInfo

        const parameter = {
            name: favoriteName.value,
            conditions: { name, age, operator, gender }
        }
        
        try {
            changeLoadingState(1)
            const data = await getApiResult("favorites", "addFavorite", parameter)
            if (data.status === "ok") {
                resultSwal("add favorite success", "success")
                getFavorites()
                favoriteName.value = ""
                isOpen.value = false
            } else {
                resultSwal("add favorite failed", "error")
            }
        } catch (error) {
            resultSwal("add favorite failed", "error")
        } finally {
            changeLoadingState(0)
        }
    }

    const deleteFavorite = async (favorite) => {
        const check = await comfirmSwal(`sure to delete ${favorite.name} favoriteItem ?`, "warning")
        if (!check) {
            return
        }

        try {
            changeLoadingState(1)
            const data = await getApiResult("favorites", "deleteFavorite", { id: favorite.id })
            if (data.status === "ok") {
                resultSwal("delete favorite success", "success")
                getFavorites()
            } else {
                resultSwal("delete favorite failed", "error")
            }
        } catch (err) {
            resultSwal("delete favorite failed", "error")
        } finally {
            changeLoadingState(0)
        }
    }

</script>

<template>
    <Popover class="relative" v-slot="{ open }">
        <PopoverButton>
            <HeartIcon class="cursor-pointer h-8 w-8 text-red-400"/>
        </PopoverButton>

        <PopoverPanel class="absolute z-10 rounded-md w-48 text-gray-100 bg-gray-800 p-3">
            <ul class="flex flex-col gap-y-2">
                <li
                    class="flex justify-between cursor-pointer"
                    v-for="item of favorites"
                    :key="item.id"
                >
                    <span class="w-full" @click="applyConditions(item.conditions)">{{ item.name }}</span>
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
    <Modal
        v-model:isOpen="isOpen"
        v-model:name="favoriteName"
        @save="addFavorite"
    />
</template>

<style></style>
