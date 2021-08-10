<template>
	<div>
		<h2>Settings</h2>
		<p>
			The width and height properties define the viewport in which the thumbnail
			will be rendered, whereas the scale property defines the scale of the
			rendered thumbnail. This allows you to showcase the exact look of an email
			on any device.
		</p>
		<OptionWrapper>
			<v-row
				elevation="0"
				class="d-flex white rounded justify-center align-center pa-4"
			>
				<v-col :cols="columns" class="pa-0 ma-0">
					<v-text-field
						dense
						v-model="width"
						class="rounded mr-2"
						hide-details="true"
						label="Width"
						outlined
						suffix="px"
						@change="openThumbnail"
					></v-text-field>
				</v-col>
				<v-col :cols="columns" class="pa-0 ma-0">
					<v-text-field
						dense
						v-model="height"
						class="rounded ml-2 mr-xl-2"
						hide-details="true"
						label="Height"
						outlined
						suffix="px"
						@change="openThumbnail"
					></v-text-field>
				</v-col>
				<v-col :cols="columns" class="pa-0 ma-0 mt-4 mt-xl-0">
					<v-text-field
						dense
						v-model="scale"
						class="rounded mr-2 ml-xl-2"
						hide-details="true"
						label="Scale"
						outlined
						@change="openThumbnail"
					></v-text-field>
				</v-col>
				<v-col :cols="Math.max(columns, 2)" class="pa-0 ma-0 mt-4 mt-xl-0">
					<v-switch
						v-model="scroll"
						class="ma-0 pa-0 ml-2"
						label="Scroll"
						hide-details="true"
						color="primary"
						inset
						@change="openThumbnail"
					></v-switch>
				</v-col>
			</v-row>
		</OptionWrapper>

		<h3>Thumbnail</h3>
		<p>
			If you change the settings above, the thumbnail below will automatically
			update.
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
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";

export default {
	mounted() {
		console.log(this.$vuetify.breakpoint.name);

		let interval = setInterval(() => {
			if (this.$store.state.sdk && document.getElementById("email-thumbnail")) {
				clearInterval(interval);
				this.openThumbnail();
			}
		}, 500);
	},
	components: {
		OptionWrapper,
	},

	computed: {
		columns() {
			switch (this.$vuetify.breakpoint.name) {
			case "xl":
				return 0;

			default:
				return 6;
			}
		},

		configObj() {
			return this.$store.getters.getThumbnailSettings;
		},

		width: {
			get() {
				return this.configObj.width;
			},
			set(val) {
				this.$store.commit("updateThumbnail", { width: val });
			},
		},

		height: {
			get() {
				return this.configObj.height;
			},
			set(val) {
				this.$store.commit("updateThumbnail", { height: val });
			},
		},

		scroll: {
			get() {
				return this.configObj.scroll;
			},
			set(val) {
				this.$store.commit("updateThumbnail", { scroll: val });
			},
		},

		scale: {
			get() {
				return this.configObj.scale;
			},
			set(val) {
				this.$store.commit("updateThumbnail", { scale: val });
			},
		},
	},

	methods: {
		openThumbnail() {
			document.getElementById("email-thumbnail").innerHTML = "";
			this.$store.state.sdk.createThumbnail({
				document: this.$store.getters.getEmail, // email document JSON
				container: this.configObj.container,
				height: this.configObj.height,
				width: this.configObj.width,
				scale: this.configObj.scale, // the real size will be 320x240 in this case
				scroll: this.configObj.scroll,
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
