<template>
  <div id="app">
    <router-view></router-view>
<!--    <router-link to="{path:'/'}">主页index</router-link>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  @import "assets/scss/basic.scss";
</style>
