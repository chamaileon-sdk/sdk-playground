<template>
	<div>
		<PreviewButton
			button-text="Open gallery"
			:preview-button-visible="previewButtonVisible"
			@previewClick="openGallery"
		/>
		<SectionObserver>
			<div id="home" class="section">
				<Description
					:title="'Gallery'"
					:doc-url="'https://chamaileon.io/sdk/docs/gallery/'"
					:image="'EmailThumbnailIllustration.svg'"
					button-text="Open gallery"
					@showPreviewButton="showPreviewButton"
					@previewClick="openGallery"
				>
					<p>
						The Gallery plugin shows stored image assets to choose from and insert into emails during creation.
						Out of the box supports some basic editing features like cropping and resizing, but
						with 3rd party image-editor, you can extend it's capability.
						<br>
						<br>
						After set up, open the Gallery from the editor with editing an image element.
					</p>
				</Description>
			</div>
			<div id="folder" class="section">
				<FolderTree />
			</div>
			<div id="settings" class="section">
				<Settings />
			</div>
		</SectionObserver>
		<Footer
			:previous="'Email Editor'"
			:prev-to="'/emaileditor'"
			:next="'Variable Editor'"
			:next-to="'/variableeditor'"
		/>
	</div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Footer from "../../ViewUtilities/components/Footer.vue";
import SectionObserver from "../../AppElements/components/SectionObserver.vue";
import Description from "../../ViewUtilities/components/ViewDescription.vue";
import FolderTree from "../components/FolderTree";
import Settings from "../components/Settings.vue";
import PreviewButton from "../../AppElements/components/PreviewButton.vue";

import { mapState, mapActions } from "vuex";
import zango from "zangodb";
import favoriteImages from "./favoriteImages";

let count = 0;
let loadedItems = [];
let db;
let images = [];

export default {
	components: {
		SectionObserver,
		FolderTree,
		Footer,
		Description,
		Settings,
		PreviewButton,
	},
	data() {
		return {
			previewButtonVisible: true,
		};
	},
	computed: {
		...mapState({
			gallerySettings: state => state.megaGalleryConfig.settings,
		}),
	},
	async mounted() {
		db = new zango.Db("chamaileonSDKGalleryDataBase", { images: ["_id", "parentId", "name", "createdAt", "src"] });
		images = db.collection("images");
		const isFavoritesExists = !!await images.findOne({ parentId: { $eq: "16322284940689326" } });

		if (!isFavoritesExists) {
			try {
				await images.insert(favoriteImages);
				return;
			} catch (error) {
				console.error(error);
			}
		}
	},
	methods: {
		...mapActions({
			openGallery: "openGallery",
		}),
		showPreviewButton(isVisible) {
			this.previewButtonVisible = isVisible;
		},
		async openGallery() {
			if (!this.$chamaileon.gallery) {
				this.$chamaileon.gallery = await this.$chamaileon.createGallery({
					data: {
						editedImageUrl: null,
						dimensions: null,
					},
					settings: this.gallerySettings,
					hooks: {
						close: () => {
							this.$chamaileon.gallery.hide();
						},
						onUploadImage: async ({ selectedFolderId, parents, image }) => {
							const _id = Date.now() + Math.random();
							const newImageData = {
								name: image.name,
								parentId: selectedFolderId,
								src: image.data || null,
								createdAt: new Date(),
								_id,
							};
							await images.insert([ newImageData ]);
							return newImageData;
						},
						onSaveUrl:	async ({ selectedFolderId, parents, image }) => {
							const _id = Date.now() + Math.random();
							const newImageData = {
								name: image.name,
								parentId: selectedFolderId,
								src: image.url || null,
								createdAt: new Date(),
								_id,
							};
							await images.insert([ newImageData ]);
							return newImageData;
						},
						onFolderSelected: async ({ selectedFolderId, parents, searchValue, orderValue, maxImagePerPage, pageNumber }) => {
							// reset when the first banch of items loaded
							if (pageNumber === 0) {
								loadedItems = [];
								count = 0;
								await images.find({ parentId: { $eq: selectedFolderId } }).forEach(() => count++);
							}

							const exclude = loadedItems.map(item => item._id);

							const query = searchValue
								? 							{
									parentId: { $eq: selectedFolderId },
									_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
									name: {	$regex: searchValue, $options: "i" },
								}
								: 							{
									parentId: { $eq: selectedFolderId },
									_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
								};

							const result = [];
							await images.find({
								...query,
							}).limit(maxImagePerPage).sort(orderValue)
								.forEach((
									(image) => {
										result.push(image);
										loadedItems = [...loadedItems, ...result];
									}));

							console.log(images);
							return { images: result, count };
						},
						onUpdateImage: async ({ imageId, parents, selectedFolderId, image }) => {
							await images.update({
								_id: { $eq: imageId },
							}, { name: image.name });
						},
						onDeleteImage: async ({ imageId, parents, selectedFolderId }) => {
							await images.remove({ _id: { $eq: imageId } });
						},
					},
				});
			}
			this.$chamaileon.gallery.show();
			const image = await this.$chamaileon.gallery.methods.pickImage();
			console.log(image);
			this.$chamaileon.gallery.hide();
		},
	},
};
</script>

<style>
.v-btn--example {
	position: fixed;
	bottom: 0;
	right: 31%;
	margin-bottom: 64px;
}

body {
	overflow: hidden !important;
}
iframe {
	position: fixed;
}
</style>
