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
    <NavFooter :previous="'Email Editor'" :prevTo="'/emaileditor'" />
  </v-app>
</template>

<script>
import SectionObserver from '../components/SectionObserver.vue';
import Header from '../components/VariableEditor/Header.vue';
import Footer from '../components/VariableEditor/Footer.vue';
import TextInsert from '../components/VariableEditor/TextInsert.vue';
import NavFooter from '../components/Footer.vue';

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
    NavFooter,
    TextInsert,
    SectionObserver,
  },
};
</script>

<style></style>
