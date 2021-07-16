<template>
  <v-app>
    <SectionObserver>
      <div class="section" id="header">
        <Header />
      </div>

      <div class="section" id="elements">
        <Elements />
      </div>

      <div class="section" id="block-libraries">
        <BlockLibraries />
      </div>

      <div class="section" id="text-insert">
        <TextInsert />
      </div>

      <div class="section" id="addons">
        <Addons />
      </div>

      <div class="section" id="settings">
        <Settings />
      </div>
    </SectionObserver>
    <Footer
      :previous="'Email Preview'"
      :prevTo="'/emailpreview'"
      :next="'Variable Editor'"
      :nextTo="'/variableeditor'"
    />
  </v-app>
</template>

<script>
import Footer from '../components/Footer.vue';
import SectionObserver from '../components/SectionObserver.vue';
import Header from '../components/EmailEditor/Header';
import Elements from '../components/EmailEditor/Elements';
import BlockLibraries from '../components/EmailEditor/BlockLibraries';
import TextInsert from '../components/EmailEditor/TextInsert';
import Addons from '../components/EmailEditor/Addons';
import Settings from '../components/EmailEditor/Settings';

export default {
  mounted() {
    this.$store.dispatch('updateSDK');
  },
  destroyed() {
    window.chamaileonSdk.destroy;
  },
  components: {
    SectionObserver,
    Header,
    Footer,
    Elements,
    BlockLibraries,
    TextInsert,
    Addons,
    Settings,
  },
};
</script>

<style>
.v-btn--example {
  position: fixed;
  bottom: 0;
  right: 31%;
  margin-bottom: 64px;
}

body {
  overflow: hidden !important;
}
iframe {
  position: fixed;
}
</style>
