<script setup>
const { loadingState } = storeToRefs(useLoadingState())

const props = defineProps({
  isOpen: {
    type: Boolean
  },
  title: {
    type: String,
    default: "title"
  }
})
const emits = defineEmits(["update:isOpen", "save"])
const useIsOpen = useVModel(props, "isOpen", emits)
</script>

<template>
  <TransitionRoot
    appear
    :show="useIsOpen"
  >
    <Dialog
      class="relative z-50"
      @close="useIsOpen = false"
    >
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div
          class="fixed inset-0 bg-black/30"
          aria-hidden="true"
        ></div>
      </TransitionChild>

      <!-- Full-screen container to center the panel -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <!-- The actual dialog panel -->
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="w-full max-w-sm rounded bg-gray-800 text-gray-100 p-5 lg:p-7"
          >
            <DialogTitle class="text-2xl lg:text-3xl text-center">
              {{ title }}
            </DialogTitle>

            <div class="mt-3 mb-5">
              <slot name="modalBody"></slot>
            </div>

            <div class="flex justify-end gap-x-2">
              <button
                class="button inline-flex rounded-sm bg-purple-500 text-white px-3 py-1"
                :class="[loadingState ? 'is-loading' : '']"
                @click="emits('save')"
              >
                Save
              </button>
              <button
                class="inline-flex text-white py-1"
                @click="useIsOpen = false"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
