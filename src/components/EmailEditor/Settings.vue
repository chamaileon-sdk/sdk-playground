<template>
  <div>
    <h1>Utilities</h1>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error ut
      voluptate unde facilis molestias, beatae necessitatibus, numquam sunt
      voluptatum soluta vitae, similique incidunt amet corporis molestiae!
      Laborum explicabo repudiandae facere!
    </p>
    <OptionWrapper>
      <v-card elevation="0" class="d-flex">
        <v-card-title>Autosave</v-card-title>
        <div class="ml-auto d-flex align-center">
          <div>Intervall:</div>
          <v-card width="8em" elevation="0" color="transparent" class="d-flex">
            <v-text-field
              suffix="ms"
              dense
              class="right-input rounded align-self-center pa-4"
              outlined
              hide-details="true"
            ></v-text-field>
          </v-card>
        </div>
      </v-card>
    </OptionWrapper>

    <h1>User Settings</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius voluptate,
      voluptas, quidem est laboriosam illo perspiciatis ut ea repudiandae
      reprehenderit facere eveniet quaerat aliquid facilis eos numquam dolores
      porro dignissimos.
    </p>
    <OptionWrapper>
      <v-card elevation="0" class="d-flex">
        <v-card-title>Avatar</v-card-title>
        <v-text-field
          dense
          label="Displayed Name"
          class="rounded align-self-center pa-4"
          outlined
          hide-details="true"
        ></v-text-field
        ><v-text-field
          label="Avatar URL"
          dense
          class="rounded align-self-center pa-4"
          outlined
          hide-details="true"
        ></v-text-field>
        <v-switch
          class="align-self-center my-0 py-0 mr-2"
          hide-details="true"
          inset
          color="success"
        ></v-switch>
      </v-card>
    </OptionWrapper>
  </div>
</template>

<script>
import OptionWrapper from '../optionWrapper.vue';

export default {
  methods: {
    processName(name) {
      if (name.length > 6) return name.substr(0, name.indexOf(' ') + 1) + '...';

      return name;
    },
  },
  components: {
    OptionWrapper,
  },
};
</script>

<style scoped>
.right-input >>> input {
  text-align: right;
}
</style>
