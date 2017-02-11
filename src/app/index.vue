
<template>
  <div><link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css" rel="stylesheet" integrity="sha384-G3G7OsJCbOk1USkOY4RfeX1z27YaWrZ1YuaQ5tbuawed9IoreRDpWpTkZLXQfPm3" crossorigin="anonymous">    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <router-view></router-view>
  </div>
</template>
<script>
  /* ============
   * Entry Point
   * ============
   *
   * The entry point of the application
   */

  import store from './store';
  import { router } from './../bootstrap';

  export default {
    /**
     * The Vuex store
     */
    store,

    /**
     * The router
     */
    router,
  };
</script>
