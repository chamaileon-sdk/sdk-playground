<template>
  <v-navigation-drawer permanent app color="white">
    <scrollactive>
      <v-card flat height="100%" width="300">
        <v-card
          :ripple="false"
          to="/"
          :style="
            `fill: ${this.$vuetify.presets.framework.theme.themes.light.primary}`
          "
          color="transparent"
          flat
          width="100%"
          class=" pa-4 pr-5 "
          id="logo"
          v-chamaileonLogo
        ></v-card>
        <v-list>
          <template v-for="(m, ind) in Menu">
            <v-list-item
              color="primary"
              v-ripple="{ class: `primary--text` }"
              :key="ind"
              exact
              :to="{ path: m.to }"
            >
              <v-list-item-icon>
                <v-icon>mdi-{{ m.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-title>{{ m.title }}</v-list-item-title>
            </v-list-item>

            <template v-if="isActive(m.to)">
              <v-list-item
                color="primary"
                class="pl-14 navLink scrollactive-item"
                v-ripple="{ class: `primary--text` }"
                :class="addActiveClass(c.to)"
                v-for="c in m.children"
                :key="c.to"
                link
                :href="c.to"
              >
                <v-list-item-icon>
                  <v-icon>mdi-{{ c.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{ c.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </template>
        </v-list>
      </v-card>
    </scrollactive>

    <v-card v-if="this.$route.path === '/emaileditor'" flat>
      <v-btn @click="openEditor">Open Editor</v-btn>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
const chamaileonLogo = require('chamaileon-logo');
import { mapGetters, mapState } from 'vuex';

export default {
  mounted() {
    this.primary = this.$vuetify.presets.framework.theme.themes.light.primary;
  },
  methods: {
    openEditor() {
      this.sdk.editEmail(this.getConfigObject);
    },
    isActive(path) {
      return '/' + path === this.$route.path;
    },
    addActiveClass(hash) {
      if (window.location.hash === hash) return 'v-list-item--active';
      return '';
    },
  },
  directives: {
    chamaileonLogo: {
      inserted: function(el) {
        el.appendChild(chamaileonLogo({ withText: true }));
      },
    },
  },
  computed: {
    ...mapState(['sdk']),
    ...mapGetters(['getConfigObject']),
  },
  data: () => ({
    primary: '',
    Menu: [
      {
        title: 'SDK',
        icon: 'at',
        to: 'sdk',
        children: [
          { title: 'Logo', icon: 'at', to: '#sdklogo' },
          {
            title: 'Splash Screen',
            icon: 'image-size-select-actual',
            to: '#splashscreen',
          },
          { title: 'Colors', icon: 'eyedropper-variant', to: '#colors' },
          { title: 'Language', icon: 'web', to: '#language' },
        ],
      },
      {
        title: 'Email Thumbnail',
        icon: 'image-outline',
        to: 'emailthumbnail',
        children: [{ title: 'Settings', icon: 'cog-outline', to: '#settings' }],
      },
      {
        title: 'Email Preview',
        icon: 'email-search-outline',
        to: 'emailpreview',
        children: [
          { title: 'Header', icon: 'border-top-variant', to: '#header' },
        ],
      },
      {
        title: 'Email Editor',
        icon: 'email-edit-outline',
        to: 'emaileditor',
        children: [
          { title: 'Header', icon: 'border-top-variant', to: '#header' },
          { title: 'Elements', icon: 'card-plus-outline', to: '#elements' },
          {
            title: 'Block Libraries',
            icon: 'database-edit-outline',
            to: '#block-libraries',
          },
          { title: 'Text Insert', icon: 'format-text', to: '#text-insert' },
          {
            title: 'Addons',
            icon: 'puzzle-outline',
            to: '#addons',
          },
          { title: 'Settings', icon: 'cog-outline', to: '#settings' },
        ],
      },
      {
        title: 'Variable Editor',
        icon: 'iframe-variable-outline',
        to: 'varibleeditor',
        children: [
          {
            title: 'Header',
            icon: 'border-top-variant',
            to: '#header',
          },
          {
            title: 'Footer',
            icon: 'border-bottom-variant',
            to: '#footer',
          },
          {
            title: 'Text Insert',
            icon: 'format-text',
            to: '#text-insert',
          },
        ],
      },
    ],
  }),
};
</script>

<style scoped></style>
