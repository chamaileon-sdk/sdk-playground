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
			<v-card
				min-height="72px"
				flat
				class="rounded-0 rounded-t d-flex pa-4"
			>
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Static Assets
						</v-card-title>
					</v-col>

					<v-col
						class="align-self-center"
						cols="6"
						lg="6"
					>
						<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
							<v-text-field
								v-model="staticAssets"
								dense
								outlined
								label="URL"
								:hide-details="true"
							/>
						</v-card>
					</v-col>
				</v-row>
			</v-card>

			<v-divider />

			<v-card
				min-height="72px"
				flat
				class="rounded-0 rounded-t d-flex pa-4"
			>
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Autosave
						</v-card-title>
					</v-col>

					<v-col
						class="align-self-center"
						cols="5"
						lg="3"
					>
						<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
							<v-text-field
								v-model="autosave"
								suffix="ms"
								dense
								outlined
								label="Interval"
								:hide-details="true"
							/>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
		</OptionWrapper>

		<h3>Video element</h3>
		<p>
			This is the url that our video element uses for image generation.
			The default url is only provided to showcase the functionality and has a rate limit set up on it.
			If you want this functionality then you have to set up our video backend on your end.
		</p>
		<OptionWrapper>
			<v-card
				min-height="72px"
				flat
				class="rounded-0 rounded-t d-flex pa-4"
			>
				<v-row>
					<v-col class="align-self-center">
						<v-card-title
							class="ma-0 pa-0 text-subtitle-1"
							style="margin-bottom: -3px !important"
						>
							Video element base url
						</v-card-title>
					</v-col>

					<v-col
						class="align-self-center"
						cols="6"
						lg="6"
					>
						<v-card flat class="ma-0 pa-0 d-flex justify-end align-center">
							<v-text-field
								v-model="videoElementBaseUrl"
								dense
								outlined
								label="URL"
								:hide-details="true"
							/>
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
					v-model="avatarUserName"
					dense
					label="Displayed Name"
					class="rounded align-self-center py-4 px-2"
					outlined
					hide-details="true"
				/><v-text-field
					v-model="avatarImg"
					label="Avatar URL"
					dense
					class="rounded align-self-center py-4 px-2"
					outlined
					hide-details="true"
				/>
				<v-btn
					icon
					class="align-self-center px-2"
					@click="avatarEnabled = !avatarEnabled"
				>
					<v-icon
						:color="avatarEnabled ? 'primary' : ''"
					>
						mdi-{{ avatarEnabled ? "eye" : "eye-off" }}
					</v-icon>
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
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
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
								:input-value="toolboxes[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								@change="updateToolbox($event, name)"
							/>
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
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
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
								:input-value="blockActions[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								:true-value="true"
								@change="updateActionMenu($event, name)"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>

		<h3>Dropzones</h3>
		<p>
			You can easily turn off block level dropzones as well.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(value, name) in dropZones"
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
								:input-value="dropZones[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								:true-value="true"
								@change="updateDropZone($event, name)"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>

		<h3>Variables</h3>
		<p>
			You can disable variable actions for each variable type.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(variableTypeValues, variableTypeName) in variables"
							:key="variableTypeName"
							cols="12"
							class="d-flex justify-space-between align-center"
						>
							<v-row class="mb-4">
								<v-col cols="12">
									<h4>{{ variableTypeName }}</h4>
								</v-col>
								<v-col
									v-for="(value, name) in variableTypeValues"
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
										:input-value="variables[variableTypeName][name]"
										class="ma-0 pa-0"
										color="primary"
										hide-details
										@change="updateVariable($event, variableTypeName, name)"
									/>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>

		<h3>Components</h3>
		<p>
			You can disable component actions for each component type.
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(componentTypeValues, componentTypeName) in components"
							:key="componentTypeName"
							cols="12"
							class="d-flex justify-space-between align-center"
						>
							<v-row class="mb-4">
								<v-col cols="12">
									<h4>{{ componentTypeName }}</h4>
								</v-col>
								<v-col
									v-for="(value, name) in componentTypeValues"
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
										:input-value="components[componentTypeName][name]"
										class="ma-0 pa-0"
										color="primary"
										hide-details
										@change="updateComponent($event, componentTypeName, name)"
									/>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>

		<h3>Panels</h3>
		<p>
			You can toggle the default state of our panels as well
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(value, name) in panels"
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
								:input-value="panels[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								:true-value="true"
								@change="updatePanel($event, name)"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>

		<h3>Title</h3>
		<p>
			You can toggle the editing of the document title as well
		</p>
		<OptionWrapper>
			<v-card elevation="0" class="d-flex px-2">
				<v-card
					min-height="72px"
					flat
					class="rounded-0 rounded-t d-flex pa-4"
					width="100%"
				>
					<v-row>
						<v-col
							v-for="(value, name) in title"
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
								:input-value="title[name]"
								class="ma-0 pa-0"
								color="primary"
								hide-details
								:true-value="true"
								@change="updateTitleOption($event, name)"
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-card>
		</OptionWrapper>
	</div>
</template>

<script>
import OptionWrapper from "../../ViewUtilities/components/OptionWrapper.vue";
import { mapMutations, mapActions } from "vuex";

export default {
	components: {
		OptionWrapper,
	},
	computed: {
		avatarEnabled: {
			get() {
				return this.$store.state.editorConfig.settings.user.enabled;
			},
			set(val) {
				this.updateUser({ enabled: val });
				this.updateEditorSettings();
			},
		},
		avatarUserName: {
			get() {
				return this.$store.state.editorConfig.settings.user.name;
			},
			set(val) {
				this.updateUser({ name: val });
				this.updateEditorSettings();
			},
		},
		avatarImg: {
			get() {
				return this.$store.state.editorConfig.settings.user.avatar;
			},
			set(val) {
				this.updateUser({ avatar: val });
				this.updateEditorSettings();
			},
		},
		autosave: {
			get() {
				return this.$store.state.editorConfig.settings.autoSaveInterval;
			},
			set(val) {
				this.updateAutoSave(val);
				this.updateEditorSettings();
			},
		},
		staticAssets: {
			get() {
				return this.$store.state.editorConfig.settings.staticAssetsBaseUrl;
			},
			set(val) {
				this.updateStaticAssets(val);
				this.updateEditorSettings();
			},
		},
		toolboxes() {
			return this.$store.state.editorConfig.settings.toolboxes;
		},
		blockActions() {
			return this.$store.state.editorConfig.settings.actionMenu.block;
		},
		dropZones() {
			return this.$store.state.editorConfig.settings.dropzones;
		},
		variables() {
			return this.$store.state.editorConfig.settings.variables;
		},
		components() {
			return this.$store.state.editorConfig.settings.components;
		},
		panels() {
			return this.$store.state.editorConfig.settings.panels;
		},
		videoElementBaseUrl: {
			get() {
				return this.$store.state.editorConfig.settings.videoElementBaseUrl;
			},
			set(val) {
				this.updateVideoElementBaseUrl(val);
				this.updateEditorSettings();
			},
		},
		title() {
			return this.$store.state.editorConfig.settings.title;
		},
	},
	methods: {
		processName(name) {
			if (name.length > 6) return name.substr(0, name.indexOf(" ") + 1) + "...";

			return name;
		},
		updateDropZone(value, name) {
			this.updateDropZones({ [name]: !!value });
			this.updateEditorSettings();
		},
		updateActionMenu(value, name) {
			this.updateBlockActionMenu({ [name]: !!value });
			this.updateEditorSettings();
		},
		updateToolbox(value, name) {
			this.updateToolboxes({ [name]: !!value });
			this.updateEditorSettings();
		},
		updateVariable(value, variableTypeName, name) {
			this.updateVariablePermissions({ name, variableTypeName, value });
			this.updateEditorSettings();
		},
		updateComponent(value, componentTypeName, name) {
			this.updateComponentPermissions({ name, componentTypeName, value });
			this.updateEditorSettings();
		},
		updatePanel(value, name) {
			this.updatePanels({ [name]: !!value });
			this.updateEditorSettings();
		},
		updateTitleOption(value, name) {
			this.updateTitle({ [name]: !!value });
			this.updateEditorSettings();
		},
		...mapMutations([
			"updateUser",
			"updateAutoSave",
			"updateStaticAssets",
			"updateBlockActionMenu",
			"updateDropZones",
			"updateToolboxes",
			"updateVideoElementBaseUrl",
			"updateVariablePermissions",
			"updateComponentPermissions",
			"updatePanels",
			"updateTitle",
		]),
		...mapActions({
			updateEditorSettings: "updateEditorSettings",
		}),
	},
};
</script>

<style scoped>
/*.right-input >>> input {
	text-align: right;
}*/
</style>
