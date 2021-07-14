<template>
  <v-app>
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
  </v-app>
</template>

<script>
import Header from '../components/EmailEditor/Header';
import Elements from '../components/EmailEditor/Elements';
import BlockLibraries from '../components/EmailEditor/BlockLibraries';
import TextInsert from '../components/EmailEditor/TextInsert';
import Addons from '../components/EmailEditor/Addons';
import Settings from '../components/EmailEditor/Settings';

export default {
  mounted() {
    this.$store.dispatch('updateSDK');
    this.observer = new IntersectionObserver(this.handleIntersect, {
      threshold: 0.75,
      //rootMargin: '-20% 0% -80% 0%',
    });

    const sections = document.querySelectorAll('.section');

    sections.forEach(c => this.observer.observe(c));
  },
  destroyed() {
    window.chamaileonSdk.destroy;
    this.observer.disconnect();
  },
  components: {
    Header,
    Elements,
    BlockLibraries,
    TextInsert,
    Addons,
    Settings,
  },

  data() {
    return {
      observer: null,
    };
  },
  methods: {
    handleIntersect(e) {
      let inserted = false;
      e.forEach(c => {
        if (c.isIntersecting && !inserted) {
          window.history.pushState(
            null,
            null,
            this.$route.path + '#' + c.target.id
          );

          this.$router
            .replace({
              ...this.$route,
              hash: '#' + c.target.id,
            })
            .catch(() => {});

          inserted = true;
        }
      });
    },
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
/*.observerRoot {
  position: fixed;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80%;
  background-color: red;
}*/
</style>
