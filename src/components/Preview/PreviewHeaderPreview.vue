<template>
	<div class="d-flex align-center" id="preview-header">
		<div class="d-flex pt-2 pb-2 px-2 header-container align-center">
			<div class="title-container d-flex align-center">
				<v-btn text icon id="btnLeavePreview">
					<v-icon dark> mdi-arrow-left </v-icon>
				</v-btn>
				<div class="template-title">{{ documentTitle }}</div>
			</div>

			<div
				class="d-flex justify-center align-center"
				id="logo"
				v-dlogo="logo"
				style="max-height: 61px"
				:style="`fill: ${primary}`"
			></div>

			<div class="share-button-container">
				<div v-if="headerButtons" class="d-flex align-center justify-end">
					<div v-for="button in headerButtons" :key="button.id" class="mx-2">
						<!--<v-badge
              class="badge"
              :color="button.badge.color"
              :value="button.badge"
              offset-x="10"
              offset-y="10"
              overlap
            >
              <template v-if="button.badge" v-slot:badge>
                <v-icon> mdi-{{ button.badge.icon }} </v-icon>
              </template>-->
						<v-menu transition="slide-y-transition" bottom left offset-y>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									:id="button.id"
									:color="button.color"
									:label="button.label"
									:icon="!button.label"
									:depressed="button.style === 'depressed'"
									:text="button.style === 'text'"
									:outlined="button.style === 'outlined'"
									:rounded="button.style === 'rounded'"
								>
									<div
										class="d-flex align-center"
										:class="{ 'white--text': button.style === 'depressed' }"
									>
										<v-icon v-if="button.icon"> mdi-{{ button.icon }} </v-icon>
										<span v-if="button.label" class="ml-2">
											{{ button.label }}
										</span>
									</div>
								</v-btn>
							</template>
							<v-list v-if="button.items">
								<v-list-item
									v-for="listItem in button.items"
									:key="listItem.id"
								>
									<v-list-item-action class="mx-2">
										<v-icon> mdi-{{ listItem.icon }} </v-icon>
									</v-list-item-action>
									<v-list-item-title class="mx-2 px-0 text-left">
										{{ listItem.label }}
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
						<!--</v-badge>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			primary: this.$store.state.sdkConfig.colors.primary,
		};
	},
	directives: {
		dlogo: {
			inserted: function (el, binding) {
				if (typeof binding.value === "function") {
					let x = el.children[0];
					if (x) x.remove();
					el.appendChild(binding.value());
				}
			},
			update: function (el, binding) {
				if (typeof binding.value === "function") {
					let x = el.children[0];
					if (x) x.remove();
					el.appendChild(binding.value());
				}
			},
		},
	},
	computed: {
		...mapGetters({ headerButtons: "getPreviewBtns" }),
		...mapGetters(["documentTitle"]),

		logo() {
			return this.$store.state.logoCreatorFunction;
		},
	},
};
</script>

<style>
#preview-header {
	background-color: #ffffff;
	height: 61px;
}

#logo {
	display: block;
	position: relative;
	align-items: center;
	overflow: hidden;
	width: 200px;
	z-index: 3;
	margin: auto;
	text-align: center;
}

/* TODO: make it general for all kind of logos */
#logo svg {
	display: inline-block;
	vertical-align: middle;
	transform: translate3d(0px, 0px, 0px);
	-webkit-transform: translate3d(0px, 0px, 0px);
	-webkit-transition: fill 0.3s linear;
	transition: fill 0.3s linear;
}

#logo > * {
	margin: auto;
	display: block;
}

.header-container {
	position: relative;
	width: 100%;
}

.demo-badge > .v-badge__badge {
	z-index: 1 !important;
	top: 0px !important;
	right: 0px !important;
}

.share-button-container {
	min-width: 160px;
	position: absolute;
	right: 0;
}

.title-container {
	position: absolute;
}
</style>
