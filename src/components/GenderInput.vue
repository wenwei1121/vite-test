<script setup>
// heroIcon
import { CheckIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  genderValue: {
    type: Number,
    default: 0
  },
  radioItems: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['update:genderValue'])
// VueUse: useVModel => (Shorthand for v-model binding, props + emit -> ref)
const useVModelGenderValue = useVModel(props, 'genderValue', emits)
</script>

<template>
  <div class="w-full">
    <div class="mx-auto w-full max-w-md">
      <RadioGroup v-model="useVModelGenderValue">
        <RadioGroupLabel class="sr-only">
          Server size
        </RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            v-for="plan in props.radioItems"
            :key="plan.genderText"
            v-slot="{ active, checked }"
            :value="plan.genderValue"
            as="template"
          >
            <div
              :class="[
                active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300' : '',
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
                    >
                      {{ plan.genderText }}
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
