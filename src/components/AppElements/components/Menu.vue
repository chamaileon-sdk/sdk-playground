<script>
/* eslint-disable vue/component-name-in-template-casing */
const chamaileonLogo = require("chamaileon-logo");
import { mapGetters } from "vuex";

export default {
	directives: {
		chamaileonLogo: {
			inserted(el) {
				el.appendChild(chamaileonLogo({ withText: true }));
			},
		},
	},
	data: () => ({
		primary: "",
	}),
	computed: {
		...mapGetters([ "getEditorConfigObject" ]),
		...mapGetters({ Menu: "getMenu" }),
	},
	mounted() {
		this.primary = this.$vuetify.presets.framework.theme.themes.light.primary;
	},
	methods: {
		isActive(path) {
			return "/" + path === this.$route.path;
		},
		addActiveClass(hash) {
			if (window.location.hash === hash) return "v-list-item--active";
			return "";
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
	},
};
</script>

<template>
	<scrollactive class="menuScroll">
		<v-card flat height="100%">
			<v-card
				id="logo"
				v-chamaileonLogo
				:ripple="false"
				to="/sdk#home"
				:style="`fill: ${$vuetify.presets.framework.theme.themes.light.primary}`"
				color="transparent"
				flat
				width="100%"
				class="px-6 pt-6 pb-4"
				@click="scrollToTop"
			/>
			<v-list>
				<template v-for="(m, ind) in Menu">
					<v-list-item
						v-if="!m.disabled"
						:key="ind"
						v-ripple="{ class: `primary--text` }"
						class="pl-6"
						color="primary"
						exact
						:to="{ path: m.to, hash: 'home' }"
						@click="scrollToTop"
					>
						<v-list-item-icon class="mr-6">
							<v-icon>mdi-{{ m.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-title>{{ m.title }}</v-list-item-title>
					</v-list-item>

					<template v-if="isActive(m.to)">
						<v-list-item
							v-for="c in m.children.filter(item => item.disabled !== true)"
							:key="c.to"
							v-ripple="{ class: `primary--text` }"
							color="primary"
							class="pl-xl-12 navLink scrollactive-item"
							:class="addActiveClass(c.to)"
							link
							:to="{ path: m.to, hash: c.to }"
						>
							<div
								v-if="!c.disabled"
								class="d-flex"
							>
								<v-list-item-icon class="ml-6 mr-6">
									<v-icon>mdi-{{ c.icon }}</v-icon>
								</v-list-item-icon>

								<v-list-item-title>{{ c.title }}</v-list-item-title>
							</div>
						</v-list-item>
					</template>
				</template>
			</v-list>
		</v-card>
	</scrollactive>
</template>

<style scoped>
.v-card--link:before {
	background: transparent;
}

.menuScroll {
	scrollbar-width: thin;
}

.menuScroll::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.menuScroll::-webkit-scrollbar-thumb {
	background: #757575;
	border-radius: 99999px;
}
.menuScroll::-webkit-scrollbar-thumb:hover {
	background: white;
}
.menuScroll::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 99999px;
}
</style>
