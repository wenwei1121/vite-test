<script setup>
// components
import DisplayMember from "@/components/DisplayMember.vue"
import SearchInput from "@/components/searchInput.vue"
import TestRedEnvlope from "@/components/TestRedEnvlope.vue"
// pinia
import { useCurrentPath } from "@/store/store"

const { setCurrentPath } = useCurrentPath()
setCurrentPath("/")
</script>

<template>
  <SearchInput />
  <DisplayMember />
  <TestRedEnvlope />
</template>

<style scoped></style>