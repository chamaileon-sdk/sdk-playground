<template>
  <v-app>
    <h1>SDK</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <h3>Logo</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <OptionsWrapper>
      <LogoSelector />
    </OptionsWrapper>

    <h3>Splash Screen</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <OptionsWrapper>
      <SplashScreenSelector />
    </OptionsWrapper>

    <h3>Colors</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <OptionsWrapper>
      <v-row>
        <v-col>
          <ColorPicker
            :index="0"
            :value="primaryColor"
            @colorChange="changePrimary"
            :label="'Primary Color'"
          />
        </v-col>
        <v-col>
          <ColorPicker
            :index="1"
            :value="secondaryColor"
            @colorChange="changeSecondary"
            :label="'Secondary Color'"
          />
        </v-col>
      </v-row>
    </OptionsWrapper>

    <h3>Language</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <OptionsWrapper>
      <v-select
        hide-details="true"
        v-model="locale"
        :items="['en', 'hu']"
        outlined
        label="Language"
      ></v-select>
    </OptionsWrapper>
  </v-app>
</template>

<script>
import LogoSelector from './LogoSelector.vue';
import SplashScreenSelector from './SplashScreenSelector.vue';
import OptionsWrapper from '../optionWrapper.vue';
import ColorPicker from '../EmailEditor/ColorPicker.vue';
import { mapState } from 'vuex';

export default {
  components: {
    ColorPicker,
    OptionsWrapper,
    LogoSelector,
    SplashScreenSelector,
  },
  methods: {
    changePrimary(value) {
      this.$store.commit('updateSDKConfig', {
        colors: { ...this.$store.state.sdkConfig.colors, primary: value },
      });
    },
    changeSecondary(value) {
      this.$store.commit('updateSDKConfig', {
        colors: { ...this.$store.state.sdkConfig.colors, secondary: value },
      });
    },
  },
  computed: {
    locale: {
      get() {
        return this.$store.state.sdkConfig.locale;
      },
      set(value) {
        this.$store.commit('updateSDKConfig', { locale: value });
      },
    },

    ...mapState({
      primaryColor: state => state.sdkConfig.colors.primary,
      secondaryColor: state => state.sdkConfig.colors.secondary,
    }),

    border() {
      return `box-sizing: border-box; border: 4px solid ${this.$vuetify.presets.framework.theme.themes.light.primary}; border-radius: 12px;`;
    },
  },
};
</script>

<style>
.v-snack__action {
  margin: 0 !important;
}
</style>
