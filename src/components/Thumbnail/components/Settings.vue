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
						v-model.lazy="width"
						dense
						class="rounded mr-2"
						hide-details="true"
						label="Width"
						outlined
						suffix="px"
					/>
				</v-col>
				<v-col :cols="columns" class="pa-0 ma-0">
					<v-text-field
						v-model.lazy="height"
						dense
						class="rounded ml-2 mr-xl-2"
						hide-details="true"
						label="Height"
						outlined
						suffix="px"
					/>
				</v-col>
				<v-col :cols="columns" class="pa-0 ma-0 mt-4 mt-xl-0">
					<v-text-field
						v-model.lazy="scale"
						dense
						class="rounded mr-2 ml-xl-2"
						hide-details="true"
						label="Scale"
						outlined
					/>
				</v-col>
				<v-col :cols="Math.max(columns, 2)" class="pa-0 ma-0 mt-4 mt-xl-0">
					<v-switch
						v-model.lazy="scroll"
						class="ma-0 pa-0 ml-2"
						label="Scroll"
						hide-details="true"
						color="primary"
						inset
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-card width="100%" class="mt-4 px-2">
					<v-slider
						v-model.lazy="scale"
						step="0.1"
						height="20"
						ticks
						:tick-labels="['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']"
						class="mt-5 mb-3"
						max="1"
						min="0.1"
					/>
				</v-card>
			</v-row>
		</OptionWrapper>

		<h3>Thumbnail</h3>
		<p>
			If you change the settings above, the thumbnail below will automatically
			update.
		</p>
		<v-row class="d-flex justify-center grey lighten-3  rounded mt-4">
			<v-card
				:style="`max-width: 100%; width: ${width*scale}px;`"
				:height="height*scale"
				class="my-4 "
			>
				<v-card-text
					id="PreviewJSON"
					elevation="2"
					class="d-flex justify-center align-center PreviewJSON my-0 pa-0 "
					color="white"
					:style="`max-width: 100%; width: ${width}px; max-height: ${height};`"
				/>
			</v-card>
		</v-row>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

let timeoutId;

export default {
	components: {
		OptionWrapper,
	},
	computed: {
		...mapState(["thumbnailInited", "sdkInited", "document"]),
		...mapGetters([ "getConfigObject" ]),
		isInited() {
			if (this.sdkInited === true) {
				return this.thumbnailInited;
			}
			return "pending";
		},
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
				this.updateSettings({ width: val });
			},
		},

		height: {
			get() {
				return this.configObj.height;
			},
			set(val) {
				this.updateSettings({ height: val });
			},
		},

		scroll: {
			get() {
				return this.configObj.scroll;
			},
			set(val) {
				this.updateSettings({ scroll: val });
			},
		},

		scale: {
			get() {
				return this.configObj.scale;
			},
			set(val) {
				this.updateSettings({ scale: val });
			},
		},
	},
	watch: {
		isInited: {
			async handler(isThumbnailInited) {
				if (isThumbnailInited === false) {
					await this.updateThumbnail();
				}
			},
			immediate: true,
		},
	},
	mounted() {
		if (this.isInited !== "pending") {
			this.updateThumbnail();
		}
	},
	methods: {
		...mapMutations([ "setThumbnailInited" ]),
		async updateThumbnail() {
			if (this.$chamaileon.thumbnail) {
				this.$chamaileon.thumbnail.destroy();
				this.setThumbnailInited(false);
			}
			const container = document.getElementById("PreviewJSON");
			container.innerHTML = "";
			await this.$store.dispatch("initThumbnail", document.getElementById("PreviewJSON"));
		},
		updateSettings(obj) {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(async () => {
				this.$store.commit("updateThumbnail", obj);
				await this.updateThumbnail();
			}, 750);
		},
	},
};
</script>

<style>
	.PreviewJSON {
		position: relative;
		z-index: 1;
		text-align: center;
		overflow-y: auto;
		overflow-x: auto;
	}
	.PreviewJSON > div > iframe {
		position: absolute !important;
		left: 0px !important;
		border: none;
	}
	.PreviewJSON > div > iframe html{
		overflow: hidden;
	}
</style>
