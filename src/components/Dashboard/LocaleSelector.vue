<template>
  <v-card flat class="pa-4">
    <v-select
      hide-details="true"
      v-model="locale"
      :items="['en', 'hu']"
      outlined
      label="Language"
    ></v-select>
  </v-card>
</template>

<script>
export default {
  computed: {
    locale: {
      get() {
        return this.$store.state.sdkConfig.locale;
      },
      set(value) {
        this.$store.commit('updateSDKConfig', { locale: value });
      },
    },
  },
};
</script>

<style></style>
