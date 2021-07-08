<template>
  <div>
    <v-card class="white rounded-lg pa-3 mb-3" flat>
      <div d-flex>
        <v-btn
          v-if="btnArr.length === 0"
          disabled
          depressed
          style="background-color: rgba(1,1,1,0) !important"
        >
        </v-btn>
        <v-btn
          v-for="item in btnArr"
          :key="item.id"
          text
          :icon="item.icon.length !== 0"
        >
          <img v-if="item.icon" style="max-width: 30px" :src="item.icon" />
          <div v-else>{{ item.label }}</div>
        </v-btn>
      </div>
    </v-card>
    <v-card
      class="mb-3 grey lighten-1 rounded-0 rounded-sm"
      height="12px"
      flat
    ></v-card>
    <v-card
      class="mb-3 grey lighten-1 rounded-0 rounded-sm"
      height="12px"
      flat
    ></v-card>
    <v-card
      class="grey lighten-1 rounded-0 rounded-sm"
      height="12px"
      width="61.78%"
      flat
    ></v-card>
  </div>
</template>

<script>
export default {
  computed: {
    btnArr() {
      return this.$store.state.editorConfig.settings.buttons.textInsert;
    },
  },
};
</script>

<style></style>
