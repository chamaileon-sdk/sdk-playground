<template>
  <v-app>
    <SectionObserver>
      <div class="section" id="header">
        <Header />
      </div>

      <div class="section" id="footer">
        <Footer />
      </div>

      <div class="section" id="text-insert">
        <TextInsert />
      </div>
    </SectionObserver>
  </v-app>
</template>

<script>
import SectionObserver from '../components/SectionObserver.vue';
import Header from '../components/VariableEditor/Header.vue';
import Footer from '../components/VariableEditor/Footer.vue';
import TextInsert from '../components/VariableEditor/TextInsert.vue';

export default {
  mounted() {
    this.$store.dispatch('updateSDK');
  },
  destroyed() {
    window.chamaileonSdk.destroy;
  },
  components: {
    Header,
    Footer,
    TextInsert,
    SectionObserver,
  },
};
</script>

<style></style>
