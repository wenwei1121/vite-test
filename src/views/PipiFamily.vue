<script setup>
// pinia
import { useCurrentPath } from "@/store/store"

const { setCurrentPath } = useCurrentPath()
setCurrentPath("/")
</script>

<template>
  <SearchInput />
  <DisplayMember />
</template>

<style scoped></style>