<template>
  <v-lazy>
    <v-app>
      <SectionObserver>
        <div class="section" id="header">
          <Header :actLogoCreator="this.creatorFunction" />
        </div>
      </SectionObserver>
      <Footer
        :previous="'Email Thumbnail'"
        :prevTo="'/emailthumbnail'"
        :next="'Email Editor'"
        :nextTo="'/emaileditor'"
      />
    </v-app>
  </v-lazy>
</template>

<script>
import Footer from "../components/Footer.vue";
import SectionObserver from "../components/SectionObserver.vue";
import Header from "../components/Preview/PreviewButtons.vue";

export default {
	components: {
		Header,
		Footer,
		SectionObserver,
	},
	mounted() {
		this.$store.dispatch("updateSDK");
	},

	destroyed() {
		window.chamaileonSdk.destroy;
	},
};
</script>

<style></style>
