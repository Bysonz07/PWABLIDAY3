<script setup>
import HelloWorld from './components/HelloWorld.vue'
import FetchApi from './components/FetchApi.vue'
import CRUDApi from './components/CRUDApi.vue';
import FetchBlobApi from './components/FetchBlobApi.vue';
import LoadManyImages from './components/LoadManyImages.vue';
import BackGroundSyncEg from './components/BackGroundSyncEg.vue';
import MediaQueryBasicNativeCss from './components/MediaQueryBasicNativeCss.vue';
import ExampleVuetify from './components/ExampleVuetify.vue';
import PushNotification from './components/PushNotification.vue';
import PusNotification2 from './components/PusNotification2.vue';
import Home from './components/dayFiveTask/Home.vue';
import Camera from './components/dayFiveTask/Camera.vue';
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!-- <FetchApi />-->
  <!-- <CRUDApi />-->
  <!--<LoadManyImages />-->
  <!-- <BackGroundSyncEg />
            <MediaQueryBasicNativeCss />
            <ExampleVuetify />
            <PushNotification /> -->
  <!-- <PusNotification2 /> -->
  <!-- <Home /> -->
  <Camera />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
