<template>
	<div>
		<h2>Custom Fonts</h2>
		<div v-if="!noFontFiles">
			<div class="title pb-6">
				How to add custom fonts?
			</div>

			<v-row class="pb-6" align="center">
				<v-col md="12" class="pb-2">
					<p>To display a new font in the Chamaileon editor and your emails (depending on email clients), you need to provide a font URL under the font URL settings.</p>
					<p style="margin-bottom: 0;">
						Every font URL should include the following font styles:
					</p>
					<ul>
						<li>Regular 400</li>
						<li>Regular 400 italic</li>
						<li>Bold 700</li>
						<li>Bold 700 italic </li>
					</ul>
					<br>
					<p style="margin-bottom: 0;">
						As an example, the URL for Poppins would look like this:
					</p>
					<a
						target="_blank"
						href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
						style="font-family: monospace;"
					>https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap</a>
					<p>Once you added the required Font URL, you need to define the Font stack to ensure that email clients (like Gmail) that don't support custom fonts will display your text in a similar web-safe font. </p>
					<p style="margin-bottom: 0;">
						As an example, the Font stack for Poppins would look like this:
					</p>
					<p style="font-family: monospace;">
						Poppins, Helvetica Neue, Helvetica, Arial, sans-serif
					</p>
				</v-col>
				<!-- <v-col md="1" class="text-right">
				</v-col> -->
			</v-row>

			<div class="title pb-6">
				Font Files
			</div>
			<OptionWrapper>
				<template>
					<v-row
						align="center"
						justify="end"
						class="ma-0"
					>
						<AddButton @click="addFontFileMethod">
							New Font File
						</AddButton>
					</v-row>
				</template>
				<v-card
					class="mx-auto mt-8 list3 rounded"
					elevation="0"
					max-height="396"
					style="overflow-y: auto"
				>
					<!-- <draggable handle=".dtrigger" v-model="getFontFiles"> -->
					<div v-for="(font, fontIndex) in fontFilesArray" :key="fontIndex">
						<v-card
							class="ma-0 pa-2 d-flex align-center"
							elevation="0"
							tile
						>
							<!-- <v-list-item-icon class="align-self-center ma-0 mx-3">
									<v-icon class="dtrigger">mdi-menu</v-icon>
								</v-list-item-icon> -->
							<v-list-item-content class="ma-0 pa-0">
								<v-row class="ma-0 pa-0">
									<v-col
										cols="6"
										xl="3"
										class="pa-2"
										align-self="center"
									>
										<v-text-field
											dense
											hide-details="true"
											label="Font name"
											:value="font.fontName"
											outlined
											@input="updateFontFileDebounced({ fontName: $event, fontFile: font.fontFile, fontIndex })"
										/>
									</v-col>

									<v-col
										v-if="breakpoint.lgAndDown"
										cols="6"
										xl="3"
										align-self="center"
										class="ml-auto pa-2"
									>
										<DeleteButton
											@click="removeFontFile(font.fontName)"
										/>
									</v-col>

									<v-col
										cols="6"
										xl="6"
										class="pa-2"
										align-self="center"
									>
										<v-text-field
											dense
											hide-details="true"
											label="Font file"
											:value="font.fontFile"
											outlined
											@input="updateFontFileDebounced({ fontName: font.fontName, fontFile: $event, fontIndex })"
										/>
									</v-col>

									<v-col
										v-if="!breakpoint.lgAndDown"
										cols="6"
										xl="3"
										align-self="center"
										class="ml-auto pa-2"
									>
										<DeleteButton
											@click="removeFontFile(font.fontName)"
										/>
									</v-col>
								</v-row>
							</v-list-item-content>
						</v-card>
					</div>
					<!-- </draggable> -->
				</v-card>
			</OptionWrapper>
		</div>

		<div class="title pb-6">
			Font Stacks
		</div>

		<p>Font stacks are displayed in an alphabetical order in the editor.</p>

		<OptionWrapper>
			<template>
				<v-row
					align="center"
					justify="end"
					class="ma-0"
				>
					<AddButton @click="addFontStackMethod">
						New Font Stack
					</AddButton>
				</v-row>
			</template>
			<v-card
				class="mx-auto mt-8 list3 rounded"
				elevation="0"
				max-height="396"
				style="overflow-y: auto"
			>
				<!-- <draggable handle=".dtrigger" v-model="fontStacks"> -->
				<div v-for="(value, index) in fontStacks" :key="index">
					<v-card
						class="ma-0 pa-2 d-flex align-center"
						elevation="0"
						tile
					>
						<!-- <v-list-item-icon class="align-self-center ma-0 mx-3">
								<v-icon class="dtrigger">mdi-menu</v-icon>
							</v-list-item-icon> -->
						<v-list-item-content class="ma-0 pa-0">
							<v-row class="ma-0 pa-0">
								<v-col
									cols="6"
									xl="9"
									class="pa-2"
									align-self="center"
								>
									<v-text-field
										dense
										hide-details="true"
										label="Font stack"
										:value="value"
										outlined
										@input="updateFontStackDebounced({ index, fontStackString: $event })"
									/>
								</v-col>

								<v-col
									v-if="breakpoint.lgAndDown"
									cols="6"
									xl="3"
									align-self="center"
									class="ml-auto pa-2"
								>
									<DeleteButton
										@click="removeFontStack(index)"
									/>
								</v-col>

								<v-col
									v-if="!breakpoint.lgAndDown"
									cols="6"
									xl="3"
									align-self="center"
									class="ml-auto pa-2"
								>
									<DeleteButton
										@click="removeFontStack(index)"
									/>
								</v-col>
							</v-row>
						</v-list-item-content>
					</v-card>
				</div>
				<!-- </draggable> -->
			</v-card>
		</OptionWrapper>
		<OptionWrapper>
			<v-switch
				v-model="hideDefaultFontsValue"
				inset
				:label="'Hide default fonts'"
			/>
		</OptionWrapper>
	</div>
</template>

<script>
import DeleteButton from "../ViewUtilities/components/DeleteButton.vue";
import AddButton from "../ViewUtilities/components/AddButton.vue";
// import Draggable from "vuedraggable";
import OptionWrapper from "../ViewUtilities/components/OptionWrapper.vue";
import { mapMutations, mapGetters } from "vuex";

function debounce(callback, wait = 500) {
	let timoutId = "";

	return function (...args) {
		clearTimeout(timoutId);
		timoutId = setTimeout(callback.bind(this, ...args), wait);
	};
}

export default {
	components: {
		DeleteButton,
		AddButton,
		// draggable,
		OptionWrapper,
	},
	props: [ "noFontFiles" ],
	methods: {
		...mapMutations([
			"updateBlockLibsOrder",
			"updateBlockLibs",
			"removeBlockLibs",
			"addFontFile",
			"removeFontFile",
			"updateFontFile",
			"addFontStack",
			"updateFontStack",
			"removeFontStack",
			"setHideDefaultFont",
		]),

		addFontFileMethod() {
			this.addFontFile();
		},

		updateFontFileDebounced: debounce(function (payload) {
			const newFontFilesArray = JSON.parse(JSON.stringify(this.fontFilesArray));
			newFontFilesArray[payload.fontIndex] = { fontName: payload.fontName, fontFile: payload.fontFile };
			const newFontFiles = newFontFilesArray.reduce((map, font) => ({
				...map,
				[font.fontName]: font.fontFile,
			}), {});
			this.updateFontFile(newFontFiles);
		}),

		addFontStackMethod() {
			this.addFontStack();
		},

		removeFontStackMethod() {
			this.removeFontStack();
		},

		updateFontStackDebounced: debounce(function ({ index, fontStackString }) {
			this.updateFontStack({ index, fontStackString });
		}),

	},
	computed: {
		...mapGetters({
			fontFiles: "getFontFiles",
			fontStacks: "getFontStacks",
			hideDefaultFonts: "gethideDefaultFonts",
		}),
		hideDefaultFontsValue: {
			get() {
				return this.hideDefaultFonts;
			},
			set(value) {
				this.setHideDefaultFont(value);
			},
		},
		fontFilesArray() {
			if (!this.fontFiles) {
				return;
			}
			const fontFilesArray = [];
			for (const [key, value] of Object.entries(this.fontFiles)) {
				fontFilesArray.push({ fontName: key, fontFile: value });
			}
			// eslint-disable-next-line consistent-return
			return fontFilesArray;
		},
		breakpoint() {
			return this.$vuetify.breakpoint;
		},
	},
};
</script>

<style></style>
