<template>
  <v-app>
    <h1>Email Thumbnail</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
      necessitatibus ad in saepe ducimus blanditiis voluptate nisi. Magni amet
      tempore aut. Mollitia, nobis adipisci! Impedit ducimus a itaque labore
      fugit!
    </p>

    <div class="section" id="settings">
      <Settings />
    </div>
  </v-app>
</template>

<script>
import Settings from '../components/Thumbnail/ThumbnailSettings.vue';

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

<style></style>
