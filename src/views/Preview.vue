<template>
  <v-app>
    <div class="section" id="header">
      <Header :actLogoCreator="this.creatorFunction" />
    </div>
  </v-app>
</template>

<script>
import Header from '../components/Preview/PreviewButtons.vue';

export default {
  components: {
    Header,
  },
  mounted() {
    this.$store.dispatch('updateSDK');

    this.observer = new IntersectionObserver(this.handleIntersect, {
      threshold: 0.75,
      // rootMargin: '-20% 0% -20% 0%',
    });

    const sections = document.querySelectorAll('.section');

    sections.forEach(c => this.observer.observe(c));
  },

  destroyed() {
    window.chamaileonSdk.destroy;
    this.observer.disconnect();
  },

  data() {
    return {
      creatorFunction: window.createLogo,
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

<style></style>
