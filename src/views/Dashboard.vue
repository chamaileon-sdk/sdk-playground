<template>
  <v-app>
    <div class="section" id="sdk">
      <Sdk />
    </div>
  </v-app>
</template>

<script>
import Sdk from '../components/Dashboard/Sdk';

export default {
  mounted() {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      threshold: 0.75,
      //rootMargin: '-20% 0% -80% 0%',
    });

    const sections = document.querySelectorAll('.section');

    sections.forEach(c => this.observer.observe(c));
  },
  destroyed() {
    this.observer.disconnect();
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
  components: {
    Sdk,
  },
};
</script>

<style></style>
