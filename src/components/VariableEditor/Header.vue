<template>
  <v-app>
    <h1>Header</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quasi
      exercitationem porro quaerat iusto reiciendis vero accusamus nam libero
      ipsum, vitae non a distinctio beatae! Libero pariatur voluptate commodi
      sapiente?
    </p>
    <OptionWrapper> </OptionWrapper>
  </v-app>
</template>

<script>
import OptionWrapper from '../optionWrapper.vue';

export default {
  components: {
    OptionWrapper,
  },
};
</script>

<style></style>
