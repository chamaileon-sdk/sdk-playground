<template>
  <v-app>
    <SectionObserver>
      <div class="section" id="sdk">
        <Sdk />
      </div>
    </SectionObserver>
  </v-app>
</template>

<script>
import SectionObserver from '../components/SectionObserver.vue';
import Sdk from '../components/Dashboard/Sdk';

export default {
  components: {
    SectionObserver,
    Sdk,
  },
};
</script>

<style></style>
