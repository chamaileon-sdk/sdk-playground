<template>
  <v-navigation-drawer permanent app color="primary">
    <v-card
      color="transparent"
      flat
      to="/"
      width="100%"
      class=" pa-4 pr-5"
      id="logo"
      v-chamaileonLogo
      :ripple="false"
    ></v-card>

    <v-list dark shaped>
      <v-list-item
        v-for="(item, ind) in items"
        :key="ind"
        link
        :to="item.title.toLowerCase().replaceAll(' ', '')"
      >
        <v-list-item-icon class="white--text mr-4">
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content class="white--text">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append v-if="isEditor">
      <div class="pa-4">
        <v-btn
          width="100%"
          depressed
          color="rgba(255,255,255,0.25)"
          class="rounded-pill white--text"
          @click="openEditor"
          >Open Editor</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');
import { mapGetters, mapState } from 'vuex';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openEditor() {
      this.sdk.editEmail(this.getConfigObject);
    },
  },
  computed: {
    isEditor() {
      return this.$route.path.includes('emaileditor');
    },
    ...mapState(['sdk']),
    ...mapGetters(['getConfigObject']),
  },
  directives: {
    chamaileonLogo: {
      inserted: function(el) {
        el.appendChild(chamaileonLogo({ withText: true }));
      },
    },
  },
};
</script>

<style>
#logo {
  width: 200px;
  fill: white;
}

.element-break-word {
  word-wrap: break-word;
}

.biggerText {
  font-size: 20px !important;
  text-transform: uppercase;
}
</style>
