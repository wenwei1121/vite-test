<script setup>
  import { ref } from 'vue';
  // components
  import DisplayMember from '../components/DisplayMember.vue';
  import SearchInput from '../components/searchInput.vue';
  // pinia
  import { useCurrentPath } from '../store/store.js';

  const usePath = useCurrentPath()
  usePath.setCurrentPath('/')

  const passSearchName = ref('')

  function changeMemberList(newInputName) {
    passSearchName.value = newInputName
  }
</script>

<template>
  <SearchInput @changeInputName="changeMemberList" />
  <DisplayMember :passSearchName="passSearchName" />
</template>

<style scoped>

</style>