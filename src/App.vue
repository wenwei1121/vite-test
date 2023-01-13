<script setup>
// eslint-disable-next-line no-undef
const { currentPath } = $(useCurrentPath())

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
        <RouterLink
          :to="pathItem.path"
          class="border-gray-700 text-gray-400"
        >
          <span>{{ pathItem.tabName }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style>
@import "bulma/css/bulma.min.css";

.tabs ul {
  border-color: rgb(55 65 81 / var(--tw-border-opacity));
}

.tabs li a {
  color: rgb(156 163 175 / var(--tw-text-opacity));
  border-color: rgb(55 65 81 / var(--tw-border-opacity));
}

.tabs li a:hover {
  color: rgb(229 231 235 / var(--tw-text-opacity));
  border-color: rgb(55 65 81 / var(--tw-border-opacity));
}

.tabs li.is-active a {
  color: rgb(229 231 235 / var(--tw-text-opacity));
  border-bottom-color: rgb(229 231 235 / var(--tw-text-opacity));
}
/* // .tabs {
//   ul {
//     border-color: rgb(55 65 81 / var(--tw-border-opacity));
//   }

//   li {
//     a {
//       color: rgb(156 163 175 / var(--tw-text-opacity));
//       border-color: rgb(55 65 81 / var(--tw-border-opacity));

//       :hover {
//         color: rgb(229 231 235 / var(--tw-text-opacity));
//         border-color: rgb(55 65 81 / var(--tw-border-opacity));
//       }
//     }
//   }

//   li.is-active a {
//     color: rgb(229 231 235 / var(--tw-text-opacity));
//     border-bottom-color: rgb(229 231 235 / var(--tw-text-opacity));
//   }
// } */
</style>
