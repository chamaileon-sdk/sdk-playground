<template>
	<v-app>
		<h1>Settings</h1>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error ut
			voluptate unde facilis molestias, beatae necessitatibus, numquam sunt
			voluptatum soluta vitae, similique incidunt amet corporis molestiae!
			Laborum explicabo repudiandae facere!
		</p>

		<h3>Utilities</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, molestiae
			illo cumque exercitationem aliquid sunt praesentium cupiditate qui ipsa
			quidem, animi optio. Alias excepturi fuga in! Blanditiis corporis pariatur
			saepe.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex">
				<v-card-title class="text-subtitle-1">Autosave</v-card-title>
				<div class="ml-auto d-flex align-center">
					<v-card width="8em" elevation="0" color="transparent" class="d-flex">
						<v-text-field
							suffix="ms"
							dense
							class="right-input rounded align-self-center pa-4"
							outlined
							label="Interval"
							hide-details="true"
							v-model="autosave"
						></v-text-field>
					</v-card>
				</div>
			</v-card>
		</OptionWrapper>

		<h3>Avatar</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius voluptate,
			voluptas, quidem est laboriosam illo perspiciatis ut ea repudiandae
			reprehenderit facere eveniet quaerat aliquid facilis eos numquam dolores
			porro dignissimos.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<!--<v-card-title class="py-4 px-2 text-subtitle-1">Avatar</v-card-title>-->
				<v-text-field
					dense
					label="Displayed Name"
					class="rounded align-self-center py-4 px-2"
					outlined
					hide-details="true"
					v-model="avatarUserName"
				></v-text-field
				><v-text-field
					label="Avatar URL"
					dense
					class="rounded align-self-center py-4 px-2"
					outlined
					hide-details="true"
					v-model="avatarImg"
				></v-text-field>
				<v-btn
					icon
					class="align-self-center px-2"
					@click="avatarEnabled = !avatarEnabled"
				>
					<v-icon :color="avatarEnabled ? 'primary' : ''"
						>mdi-{{ avatarEnabled ? "eye" : "eye-off" }}</v-icon
					>
				</v-btn>
				<!--<v-switch
					class="align-self-center my-0 py-0 pl-4 pr-0"
					hide-details="true"
					inset
					color="primary"
					v-model="avatarEnabled"
				></v-switch>-->
			</v-card>
		</OptionWrapper>
	</v-app>
</template>

<script>
import OptionWrapper from "../optionWrapper.vue";
import { mapMutations } from "vuex";

export default {
	methods: {
		processName(name) {
			if (name.length > 6) return name.substr(0, name.indexOf(" ") + 1) + "...";

			return name;
		},
		...mapMutations(["updateUser", "updateAutosave"]),
	},

	computed: {
		avatarEnabled: {
			get() {
				return this.$store.state.editorConfig.user.enabled;
			},
			set(val) {
				this.updateUser({ enabled: val });
			},
		},
		avatarUserName: {
			get() {
				return this.$store.state.editorConfig.user.name;
			},
			set(val) {
				this.updateUser({ name: val });
			},
		},
		avatarImg: {
			get() {
				return this.$store.state.editorConfig.user.avatar;
			},
			set(val) {
				this.updateUser({ avatar: val });
			},
		},

		autosave: {
			get() {
				return this.$store.state.editorConfig.autoSaveInterval;
			},
			set(val) {
				this.updateAutosave(val);
			},
		},
	},

	components: {
		OptionWrapper,
	},
};
</script>

<style scoped>
.right-input >>> input {
	text-align: right;
}
</style>
