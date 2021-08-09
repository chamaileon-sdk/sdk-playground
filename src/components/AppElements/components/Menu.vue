<template>
	<scrollactive>
		<v-card flat height="100%">
			<v-card
				:ripple="false"
				to="/sdk#home"
				:style="`fill: ${this.$vuetify.presets.framework.theme.themes.light.primary}`"
				color="transparent"
				flat
				width="100%"
				class="px-6 pt-6 pb-4 scrollactive-item"
				id="logo"
				v-chamaileonLogo
			></v-card>
			<v-list>
				<template v-for="(m, ind) in Menu">
					<v-list-item
						:key="ind"
						class="pl-6 scrollactive-item"
						color="primary"
						v-ripple="{ class: `primary--text` }"
						exact
						:to="{ path: m.to, hash: 'home' }"
					>
						<v-list-item-icon class="mr-6">
							<v-icon>mdi-{{ m.icon }}</v-icon>
						</v-list-item-icon>

						<v-list-item-title>{{ m.title }}</v-list-item-title>
					</v-list-item>

					<template v-if="isActive(m.to)">
						<v-list-item
							color="primary"
							class="pl-12 navLink scrollactive-item"
							v-ripple="{ class: `primary--text` }"
							:class="addActiveClass(c.to)"
							v-for="c in m.children"
							:key="c.to"
							link
							:to="{ path: m.to, hash: c.to }"
						>
							<v-list-item-icon class="ml-6 mr-6">
								<v-icon>mdi-{{ c.icon }}</v-icon>
							</v-list-item-icon>

							<v-list-item-title>{{ c.title }}</v-list-item-title>
						</v-list-item>
					</template>
				</template>
			</v-list>
		</v-card>
	</scrollactive>
</template>

<script>
const chamaileonLogo = require("chamaileon-logo");
import { mapGetters, mapState } from "vuex";

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
	},
	directives: {
		chamaileonLogo: {
			inserted: function (el) {
				el.appendChild(chamaileonLogo({ withText: true }));
			},
		},
	},
	computed: {
		...mapState(["sdk"]),
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
</style>
