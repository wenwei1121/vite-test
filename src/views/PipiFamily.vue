<script setup>
  // components
  import DisplayMember from '../components/DisplayMember.vue';
  import SearchInput from '../components/searchInput.vue';
  // pinia
  import { useCurrentPath } from '../store/store.js';

  const { setCurrentPath } = useCurrentPath()
  setCurrentPath('/')
  
</script>

<template>
  <SearchInput />
  <DisplayMember />
</template>

<style scoped>

</style>