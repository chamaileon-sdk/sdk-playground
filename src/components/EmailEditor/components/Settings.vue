<template>
	<div>
		<h2>Settings</h2>
		<p>Various general settings are also provided for better experience.</p>

		<h3>Utilities</h3>
		<p>
			Autosave interval is triggered periodically. When triggered, the
			onAutoSave hook is called. With Static Assets URL you can specify a path
			to your own asset library.
		</p>
		<OptionWrapper>
			<v-card min-height="72px" flat class="rounded-0 rounded-t d-flex pa-4">
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Static Assets
						</v-card-title>
						<!--<p class="ma-0">{{ item.description }}</p>-->
					</v-col>

					<v-col class="align-self-center" cols="6" lg="6">
						<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
							<v-text-field
								dense
								outlined
								label="URL"
								:hide-details="true"
								v-model="staticAssets"
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>
			</v-card>

			<v-divider></v-divider>

			<v-card min-height="72px" flat class="rounded-0 rounded-t d-flex pa-4">
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Autosave
						</v-card-title>
						<!--<p class="ma-0">{{ item.description }}</p>-->
					</v-col>

					<v-col class="align-self-center" cols="5" lg="3">
						<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
							<v-text-field
								suffix="ms"
								dense
								outlined
								label="Interval"
								:hide-details="true"
								v-model="autosave"
							></v-text-field>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
		</OptionWrapper>

		<h3>Avatar</h3>
		<p>
			You can customize the name and the avatar of the current user, but it's
			also possible to hide this feature.
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
		<h3>Toolboxes</h3>
		<p>
			You can disable the toolboxes for any element type. With disabled toolboxes, elements will not be customizable.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card min-height="72px" flat class="rounded-0 rounded-t d-flex pa-4" width="100%">
					<v-row>
						<v-col 
							v-for="(value, name) in toolboxes"
							:key="name"
							cols="6" 
							class="d-flex justify-space-between align-center"
						>
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ name }}
							</v-card-title>
							<v-switch
								class="ma-0 pa-0"
								v-model="toolboxes[name]"
								color="primary"
								hide-details
							></v-switch>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>
		<h3>Block Action Menu</h3> 
		<p>
			You can control what your users capable to do with blocks. Drag, save, duplicate or delete. All this functionality can be turned off.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card min-height="72px" flat class="rounded-0 rounded-t d-flex pa-4" width="100%">
					<v-row>
						<v-col 
							v-for="(value, name) in blockActions"
							:key="name"
							cols="6" 
							class="d-flex justify-space-between align-center"
						>
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ name }}
							</v-card-title>
							<v-switch
								class="ma-0 pa-0"
								v-model="blockActions[name]"
								color="primary"
								hide-details
							></v-switch>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>

		<h3>Dropzones</h3> 
		<p>
			We did not stop here, you can easily turn off block level dropzones as well.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card min-height="72px" flat class="rounded-0 rounded-t d-flex pa-4" width="100%">
					<v-row>
						<v-col 
							v-for="(value, name) in blockDropzones"
							:key="name"
							cols="6" 
							class="d-flex justify-space-between align-center"
						>
							<v-card-title
								class="ma-0 pa-0 text-subtitle-1"
								style="margin-bottom: -3px !important"
							>
								{{ name }}
							</v-card-title>
							<v-switch
								class="ma-0 pa-0"
								v-model="blockDropzones[name]"
								color="primary"
								hide-details
							></v-switch>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapMutations } from "vuex";

export default {
	components: {
		OptionWrapper,
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

		staticAssets: {
			get() {
				return this.$store.state.editorConfig.staticAssetsBaseUrl;
			},
			set(val) {
				this.updateSaticAssets(val);
			},
		},
		toolboxes: {
			get() {
				return this.$store.state.editorConfig.settings.toolboxes;
			},
			set(val) {
				this.updateToolboxes(val);
			}
		},
		blockActions: {
			get() {
				return this.$store.state.editorConfig.settings.actionMenu.block
			},
			set(val) {
				this.updateBlockActionMenu(val);
			}
		},
		blockDropzones: {
			get() {
				return this.$store.state.editorConfig.settings.dropzones
			},
			set(val) {
				this.updateBlockActionMenu(val);
			}
		}
	},
	methods: {
		...mapMutations(["updateUser", "updateAutosave", "updateSaticAssets", "updateToolboxes"]),
		processName(name) {
			if (name.length > 6) return name.substr(0, name.indexOf(" ") + 1) + "...";

			return name;
		},
	},
};
</script>

<style scoped>
/*.right-input >>> input {
	text-align: right;
}*/
</style>
