<template>
  <v-card app height="64" flat class="d-flex align-center px-3 flex-wrap">
    <span v-for="button in footerButtons.left" :key="button.label">
      <v-btn v-if="!button.icon" outlined class="mr-2">
        {{ button.label }}
      </v-btn>

      <v-btn v-if="button.icon" icon small class="mr-2">
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </span>

    <v-spacer></v-spacer>

    <span v-for="button in footerButtons.right" :key="button.label">
      <v-btn v-if="!button.icon" outlined class="ml-2">
        {{ button.label }}
      </v-btn>

      <v-btn v-if="button.icon" icon small class="ml-2">
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </span>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['footerButtons']),
  },
};
</script>

<style></style>
