<script setup>
const { setCurrentPath } = useCurrentPath()
setCurrentPath('/')
</script>

<template>
  <SearchInput />
  <DisplayMember />
</template>

<style scoped></style>