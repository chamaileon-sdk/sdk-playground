<template>
  <div>
    <h1>Addons</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum autem,
      saepe optio officia laudantium sunt architecto quis praesentium explicabo
      quo veniam ducimus atque deleniti asperiores cupiditate molestiae et.
      Recusandae, cum!
    </p>
    <v-card v-for="item in addonArr" :key="item.id" class="d-flex">
      <v-icon>mdi-eye</v-icon>
      <div>
        <v-card-title>{{ item.id }}</v-card-title>
        <v-card-text>{{ item.description }}</v-card-text>
      </div>
      <v-select
        :items="['enabled', 'disabled', 'hidden']"
        label="State"
        outlined
        :value="getAddonStateById(item.id)"
        @change="updateAddonState({ id: item.id, state: $event })"
      ></v-select>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['updateAddonState']),
  },
  computed: {
    ...mapGetters(['getAddonStateById']),
    addonArr() {
      return this.$store.state.editorConfig.addons;
    },
  },
};
</script>

<style></style>
