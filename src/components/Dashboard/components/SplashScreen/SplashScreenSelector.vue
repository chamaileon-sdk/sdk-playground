<template>
	<v-card color="transparent" elevation="0">
		<v-tabs
			height="auto"
			color="primary"
			background-color="transparent"
			show-arrows="always"
			hide-slider
			slider-size="3"
		>
			<v-tab
				class="pa-0 mr-3 rounded-lg"
				@click="
					changeSplash(
						'https://cdn.chamaileon.io/assets/splashScreen.html',
					)
				"
			>
				<v-card
					v-chamaileonLogoNoText
					class="rounded-lg primary pa-5"
					style="fill: white; opacity: 0.3"
					width="300px"
					height="200px"
					elevation="0"
					:style="
						calculateOpacity(
							'https://cdn.chamaileon.io/assets/splashScreen.html',
						)
					"
				/>
			</v-tab>
			<v-tab
				v-for="(l, i) in splashs"
				:key="i"
				class="pa-0 mx-3 rounded-lg"
				@click="changeSplash(l.url)"
			>
				<v-card
					class="rounded-lg"
					width="300px"
					height="200px"
					elevation="0"
					:style="calculateOpacity(l.url)"
					@mouseenter="hoverOnSplashContainer($event, l.url)"
				>
					<div style="position: relative; height: 100%">
						<div
							style="
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								z-index: 1;
							"
						/>
						<iframe
							class="rounded-lg"
							width="100%"
							height="100%"
							style="z-index: 0; top: 0; left: 0; position: relative"
							:src="l.url"
							frameborder="0"
						/>
					</div>
				</v-card>
			</v-tab>
			<v-tab
				class="pa-0 mx-3"
				href="https://github.com/chamaileon-sdk/splashscreen-and-logo-examples"
				target="_blank"
			>
				<v-card
					class="pa-5 d-flex align-center justify-center flex-column createNew"
					width="300px"
					height="200px"
					elevation="0"
					outlined
					color="grey--text"
				>
					<v-icon class="pa-0 ma-0" x-large>
						mdi-plus
					</v-icon>
					<v-card-text class="pa-0 ma-0">
						Create your own
					</v-card-text>
				</v-card>
			</v-tab>
		</v-tabs>
	</v-card>
</template>

<script>

export default {
	directives: {
		chamaileonLogoNoText: {
			async inserted(el) {
				let tryCount = 0;
				while (!window.createLogo && tryCount < 5) {
					tryCount++;
					await new Promise(resolve => setTimeout(resolve, 1000));
				}
				if (window.createLogo) {
					const logo = window.createLogo();
					logo.style.height = "100%";
					el.appendChild(logo);
				}
			},
		},
	},
	data() {
		return {
			splashs: [
				{
					url: "https://chamaileon-sdk.github.io/splashscreen-and-logo-examples/splashScreen.html",
				},
			],
		};
	},
	computed: {
		storedUrl() {
			return this.$store.state.sdkConfig.urls.splashScreen;
		},
	},
	methods: {
		hoverOnSplashContainer(e, url) {
			const x = e.target;
			const y = x.querySelector("iframe");
			y.src = url;
		},

		changeSplash(value) {
			this.$store.dispatch("updateSdkConfig", {
				urls: { ...this.$store.state.sdkConfig.urls, splashScreen: value },
			});
		},

		calculateOpacity(url) {
			if (url === this.storedUrl) return "opacity: 1; transition: 200ms;";

			return "opacity: 0.5; transition: 200ms;";
		},
	},
};
</script>

<style scoped>
.v-card:hover {
	opacity: 1 !important;
	transition: 200ms;
}

.createNew {
	border: 1px solid;
	opacity: 0.3;
}
</style>
