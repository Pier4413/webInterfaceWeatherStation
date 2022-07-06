<script setup>
import { RouterView } from 'vue-router'
</script>

<script>
export default {
  name: "App",
  mounted() {
    let userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    userLocale = userLocale.split("-")[0];
    this.$i18n.locale = userLocale;
  }
}
</script>

<template>
  <metainfo>
    <title>{{ $t("title")}}</title>
  </metainfo>
  <header>

  </header>
  <RouterView />
</template>
