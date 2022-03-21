<template>
	<div id="header">
		<v-card class="d-flex flex-nowrap align-center py-2" flat>
			<v-btn
				id="leaveEditorBtn"
				icon
				class="mx-2"
			>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>

			<div class="flex-shrink-0">
				{{ documentTitle }}
			</div>

			<div class="ml-auto d-flex flex-nowrap justify-self-end">
				<v-btn class="mx-2" icon>
					<v-icon>mdi-undo</v-icon>
				</v-btn>

				<v-btn class="mx-2" icon>
					<v-icon>mdi-redo</v-icon>
				</v-btn>

				<v-btn icon class="mx-2">
					<v-icon class="grey--text text--darken-2">
						mdi-content-save
					</v-icon>
				</v-btn>

				<div
					v-for="(button, index) in buttons"
					:key="index"
					class="mx-2"
				>
					<v-btn
						v-if="!button.items"
						:id="button.id"
						:label="button.label"
						:color="button.color"
						:depressed="button.style === 'depressed'"
						:text="button.style === 'text'"
						:outlined="button.style === 'outlined'"
						:rounded="button.style === 'rounded'"
						:icon="!button.label"
					>
						<div
							class="d-flex align-center"
							:class="{
								'white--text':
									button.style === 'depressed' || button.style === 'filled',
							}"
						>
							<v-icon v-if="button.icon">
								mdi-{{ button.icon }}
							</v-icon>
							<span v-if="button.label" class="ml-2">
								{{ button.label }}
							</span>
						</div>
					</v-btn>

					<v-menu
						v-if="button.items"
						transition="slide-y-transition"
						bottom
						left
						offset-y
					>
						<template #activator="{ on, attrs }">
							<v-btn
								v-bind="attrs"
								:id="button.id"
								:label="button.label"
								:color="button.color"
								:depressed="button.style === 'depressed'"
								:text="button.style === 'text'"
								:outlined="button.style === 'outlined'"
								:rounded="button.style === 'rounded'"
								:icon="!button.label"
								v-on="on"
							>
								<div
									class="d-flex align-center"
									:class="{
										'white--text':
											button.style === 'depressed' || button.style === 'filled',
									}"
								>
									<v-icon v-if="button.icon">
										mdi-{{ button.icon }}
									</v-icon>
									<span v-if="button.label" class="ml-2">
										{{ button.label }}
									</span>
								</div>
							</v-btn>
						</template>
						<v-list v-if="button.items">
							<v-list-item
								v-for="(listItem, liIndex) in button.items"
								:key="liIndex"
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
				</div>
			</div>
		</v-card>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	// eslint-disable-next-line vue/match-component-file-name
	name: "EditorHeader",

	computed: {
		...mapGetters({
			buttons: "getHeaderBtns",
		}),
		...mapGetters([ "documentTitle" ]),
	},
};
</script>

<style>
.btn-central {
	max-width: 1rem;
}

.successSave {
	background: rgb(16, 137, 16) !important;
}
.title-edit {
	z-index: 1101;
}
.link-text {
	color: #00c0e7;
}
.tutorial-video {
	cursor: pointer;
}
.help-center {
	text-decoration: none;
}
.custom-loader {
	display: flex;
}
.successText {
	vertical-align: text-bottom;
	color: white;
}

.demo-badge > .v-badge__badge {
	z-index: 1 !important;
	top: 0px !important;
	right: 0px !important;
}
</style>
