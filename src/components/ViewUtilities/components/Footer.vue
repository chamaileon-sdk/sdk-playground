<template>
  <div>
    <v-divider></v-divider>
    <v-row class="my-3">
      <v-col class="d-flex justify-start primary--text" cols="4">
        <v-card
          v-if="previous.length > 0"
          flat
          class="pa-0 ma-0 primary--text d-flex align-center"
          :to="prevTo"
        >
          <v-icon color="primary">mdi-chevron-left</v-icon>
          {{ previous }}
        </v-card>
      </v-col>

      <v-col cols="4" class="d-flex justify-center">
        <v-btn
          tile
          text
          color="primary"
          class="rounded-pill"
          href="https://help.chamaileon.io/en/"
          target="_blank"
        >
          <v-icon left>
            mdi-message-reply
          </v-icon>
          Need help?
        </v-btn>
      </v-col>

      <v-col class="d-flex  justify-end " cols="4">
        <v-card
          v-if="next.length > 0"
          flat
          class="pa-0 ma-0 primary--text d-flex align-center"
          :to="nextTo"
        >
          {{ next }}
          <v-icon color="primary">mdi-chevron-right</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
	props: {
		previous: { type: String, default: "" },
		next: { type: String, default: "" },
		prevTo: String,
		nextTo: String,
	},
};
</script>

<style></style>
