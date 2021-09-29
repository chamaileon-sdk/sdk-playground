<template>
	<scrollactive class="menuScroll">
		<v-card flat height="100%">
			<v-card
				:ripple="false"
				to="/sdk#home"
				:style="`fill: ${this.$vuetify.presets.framework.theme.themes.light.primary}`"
				color="transparent"
				flat
				width="100%"
				class="px-6 pt-6 pb-4"
				id="logo"
				v-chamaileonLogo
				@click="scrollToTop"
			></v-card>
			<v-list>
				<template v-for="(m, ind) in Menu">
					<v-list-item
						v-if="!m.disabled"
						:key="ind"
						class="pl-6"
						color="primary"
						v-ripple="{ class: `primary--text` }"
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
							color="primary"
							class="pl-xl-12 navLink scrollactive-item"
							v-ripple="{ class: `primary--text` }"
							:class="addActiveClass(c.to)"
							v-for="c in m.children.filter(item => item.disabled !== true)"
							:key="c.to"
							link
							:to="{ path: m.to, hash: c.to }"
						>
							<div
								v-if="!c.disabled" class="d-flex"
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

<script>
const chamaileonLogo = require("chamaileon-logo");
import { mapGetters } from "vuex";

export default {
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
	directives: {
		chamaileonLogo: {
			inserted: function (el) {
				el.appendChild(chamaileonLogo({ withText: true }));
			},
		},
	},
	computed: {
		...mapGetters(["getConfigObject"]),
		...mapGetters({ Menu: "getMenu" }),
	},
	data: () => ({
		primary: "",
	}),
};
</script>

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
