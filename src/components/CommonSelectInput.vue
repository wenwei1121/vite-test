<script setup>
// heroIcon
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  selectTarget: {
    type: String,
    default: ''
  },
  // 每一個物件裡要有 text & value 屬性
  selectItems: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['update:selectTarget'])
// VueUse: useVModel => (Shorthand for v-model binding, props + emit -> ref) 賦予的變數需要 .value
const useSelectTarget = useVModel(props, 'selectTarget', emits)

const selectTargetText = computed(() => {
  return props.selectItems.find(({ value }) => value === useSelectTarget.value).text
})
</script>
<template>
  <Listbox v-model="useSelectTarget">
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span class="truncate">{{ selectTargetText }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption
            v-for="person of props.selectItems"
            v-slot="{ active, selected }"
            :key="person.text"
            :value="person.value"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
                {{ person.text }}
              </span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<style scoped></style>