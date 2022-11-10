<script setup>
// router
import { RouterLink, RouterView } from "vue-router"
// pinia
import { storeToRefs } from "pinia"
import { useCurrentPath } from "@/store/store.js"

const { currentPath } = storeToRefs(useCurrentPath())

const pathInfos = [
  { path: "/", tabName: "SHOW MEMBER" },
  { path: "/AddPipiFamilyMember", tabName: "ADD MEMBER" },
  { path: "/TestRedEnvelope", tabName: "Play Drawer RedEnvelope" },
]
</script>

<template>
  <div class="tabs is-centered is-large">
    <ul>
      <li
        v-for="pathItem of pathInfos"
        :key="pathItem.path"
        :class="[currentPath === pathItem.path ? 'is-active' : '']"
      >
        <RouterLink :to="pathItem.path">
          <span>{{ pathItem.tabName }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style>
@import "bulma/css/bulma.min.css";
</style>
