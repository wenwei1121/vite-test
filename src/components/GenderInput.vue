<script setup>
    import { reactive } from 'vue';
    // headlessui
    import {
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption
    } from '@headlessui/vue'
    // heroIcon
    import { CheckIcon } from '@heroicons/vue/20/solid'

    const props = defineProps(["genderValue", "radioItems"])
    const emits = defineEmits(["update:genderValue", "update:modelValue"])
    
</script>
  
<template>
    <div class="w-full px-4 py-16">
        <div class="mx-auto w-full max-w-md">
        <RadioGroup
            :modelValue="props.genderValue"
            @update:modelValue="value => emits('update:genderValue', value)"
        >
            <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
            <div class="space-y-2">
            <RadioGroupOption
                as="template"
                v-for="plan in props.radioItems"
                :key="plan.genderText"
                :value="plan.genderValue"
                v-slot="{ active, checked }"
            >
                <div
                    :class="[
                        active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : '',
                        checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-gray-400 ',
                    ]"
                    class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                >
                    <div class="flex w-full items-center justify-between">
                        <div class="flex items-center">
                            <div class="text-sm">
                                <RadioGroupLabel
                                    as="p"
                                    :class="checked ? 'text-white' : 'text-gray-900'"
                                    class="font-medium"
                                >{{ plan.genderText }}
                                </RadioGroupLabel>
                            </div>
                        </div>
                        <CheckIcon v-show="checked" class="w-5 h-5" />
                    </div>
                </div>
            </RadioGroupOption>
            </div>
        </RadioGroup>
        </div>
    </div>
</template>
  
<style></style>