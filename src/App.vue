<script setup>
import { storeToRefs } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import { useCurrentPath } from './store/store.js';

const usePath = useCurrentPath()
const { currentPath } = storeToRefs(usePath)

</script>

<template>
  <div class="tabs is-centered is-large">
    <ul>
      <li :class="[currentPath === '/' ? 'is-active' : '']">
        <RouterLink to="/" @click="usePath.setCurrentPath('/')">
          <span>SHOW MEMBER</span>
        </RouterLink>
      </li>
      <li :class="[currentPath === 'AddPipiFamilyMember' ? 'is-active' : '']">
        <RouterLink to="/AddPipiFamilyMember" @click="usePath.setCurrentPath('AddPipiFamilyMember')">
          <span>Add MEMBER</span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style>
@import 'bulma/css/bulma.min.css';
</style>