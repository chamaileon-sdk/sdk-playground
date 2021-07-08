<template>
  <div>
    <h1>Addons</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum autem,
      saepe optio officia laudantium sunt architecto quis praesentium explicabo
      quo veniam ducimus atque deleniti asperiores cupiditate molestiae et.
      Recusandae, cum!
    </p>
    <OptionWrapper>
      <v-card
        v-for="item in addonArr"
        :key="item.id"
        elevation="0"
        class="rounded-lg d-flex"
        :class="
          Object.values(addonArr)[Object.values(addonArr).length - 1].id !==
          item.id
            ? 'mb-8'
            : ''
        "
      >
        <!-- <v-card class="ml-4 d-flex" elevation="0">
          <v-icon size="100">mdi-{{ item.icon }}</v-icon>
        </v-card> -->
        <div>
          <v-card-title>{{ item.id }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </div>
        <v-select
          style="width: 22em;"
          :items="['enabled', 'disabled', 'hidden']"
          class="align-self-center rounded mr-4"
          hide-details="true"
          label="State"
          outlined
          :value="getAddonStateById(item.id)"
          @change="updateAddonState({ id: item.id, state: $event })"
        ></v-select>
      </v-card>
    </OptionWrapper>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import OptionWrapper from '../optionWrapper.vue';

export default {
  components: {
    OptionWrapper,
  },
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
