<script setup>
import DisplayMember from '../components/DisplayMember.vue';
import SearchInput from '../components/searchInput.vue';
import { ref } from 'vue';

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