<template>
  <v-app>
    <v-app-bar flat app color="#00C0E7">
      <v-flex class="xs6" text-left></v-flex>
      <v-flex text-center>
        <div id="logo" v-chamaileonLogo></div>
      </v-flex>
      <v-flex class="xs6" text-right></v-flex>
    </v-app-bar>

    <div>
      <v-row class="pa-14 ma-0">
        <v-col v-for="(elem, ind) in editors" :key="ind" cols="3" class="px-10">
          <v-card
            flat
            class="d-flex flex-column justify-center rounded-lg grey lighten-3 grey--text text--darken-1"
            height="760px"
            link
            :to="elem.to"
          >
            <v-icon class="grey--text text--darken-1" size="100">
              mdi-{{ elem.icon }}
            </v-icon>
            <v-card-title class="biggerText text-center justify-center">{{
              elem.type
            }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');

export default {
  data() {
    return {
      editors: [
        {
          type: 'Email Thumbnail',
          icon: 'image-outline',
        },
        {
          type: 'Email Preview',
          icon: 'email-search-outline',
          to: 'emaileditor',
        },
        {
          type: 'Email Editor',
          icon: 'email-edit-outline',
        },
        {
          type: 'Email Variable Editor',
          icon: 'iframe-variable-outline',
        },
      ],
    };
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
