<template>
  <v-app>
    <h1>Settings</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore sunt
      excepturi ipsa recusandae illo fugiat natus, sequi architecto repudiandae
      sed atque veniam unde possimus perspiciatis, corporis minima alias non
      quis?
    </p>
    <OptionWrapper>
      <v-card elevation="0" class="d-flex justify-center align-center pa-4">
        <v-text-field
          v-model="width"
          class="rounded mr-2"
          hide-details="true"
          label="Width"
          outlined
          suffix="px"
          @change="openThumbnail"
        ></v-text-field>
        <v-text-field
          v-model="height"
          class="rounded mx-2"
          hide-details="true"
          label="Height"
          outlined
          suffix="px"
          @change="openThumbnail"
        ></v-text-field>
        <v-text-field
          v-model="scale"
          class="rounded mx-2"
          hide-details="true"
          label="Scale"
          outlined
          @change="openThumbnail"
        ></v-text-field>
        <v-switch
          v-model="scroll"
          class="ma-0 pa-0 ml-2"
          label="Scroll"
          hide-details="true"
          color="primary"
          inset
          @change="openThumbnail"
        ></v-switch>
      </v-card>
    </OptionWrapper>

    <h3>Preview</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, voluptatibus,
      saepe maxime autem asperiores consequatur quod, eligendi consectetur
      repellendus dolore recusandae nobis fugit optio tempore deleniti.
      Consectetur similique adipisci porro!
    </p>
    <OptionWrapper>
      <v-card
        elevation="0"
        id="email-thumbnail"
        class="d-flex justify-center align-center"
        color="transparent"
      >
      </v-card>
    </OptionWrapper>
  </v-app>
</template>

<script>
import OptionWrapper from '../optionWrapper.vue';

export default {
  mounted() {
    this.openThumbnail();
  },
  data() {
    return {
      width: 320,
      height: 240,
      scale: 1,
      scroll: false,
    };
  },
  components: {
    OptionWrapper,
  },
  methods: {
    openThumbnail() {
      document.getElementById('email-thumbnail').innerHTML = '';
      this.$store.state.sdk.createThumbnail({
        document: this.$store.getters.getEmail(), // email document JSON
        container: '#email-thumbnail',
        height: this.height,
        width: this.width,
        scale: this.scale, // the real size will be 320x240 in this case
        scroll: this.scroll,
      });
    },
  },
};
</script>

<style>
#email-thumbnail div iframe {
  position: inherit !important;
  transform-origin: 50% 0 !important;
}

#email-thumbnail div {
  display: flex;
  justify-content: center;
}
</style>
