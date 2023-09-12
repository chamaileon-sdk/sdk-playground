<template>
	<div>
		<v-treeview
			v-model="parents"
			class="cursor-pointer white rounded"
			:items="folders"
			:open.sync="openFolders"
			:active.sync="activeFolders"
			item-text="name"
			item-key="_id"
			activatable
			on-icon
			open-all
			transition
		>
			<template
				slot="label"
				slot-scope="{ item }"
				class=""
			>
				<v-text-field
					v-if="activeFolders.includes(item._id)"
					v-model="newFolderName[item._id]"
					:placeholder="item.name"
					@click.stop
					@change="editName(item)"
				/>
				<div v-else>
					{{ item.name }}
				</div>
			</template>
			<template
				slot="prepend"
				slot-scope="{ item, open }"
			>
				<v-icon
					v-if="selectedFolderId === item._id"
					color="orange"
					class="mr-1"
				>
					mdi-star
				</v-icon>
				<v-icon
					color="primary"
				>
					{{ item._id === "root" ? "mdi-home-city" : open ? "mdi-folder-open" : "mdi-folder" }}
				</v-icon>
			</template>
			<template
				slot="append"
				slot-scope="{ item }"
			>
				<v-btn
					v-if="item._id !== 'root' && item._id !== '16322284940689326'"
					fab
					x-small
					text
					outlined
					class="mx-1"
					@click.stop="deleteFolder(item)"
				>
					<v-icon
						color="red"
						class="mx-3"
					>
						mdi-delete
					</v-icon>
				</v-btn>

				<v-btn
					fab
					x-small
					text
					outlined
					class="mx-1"
					@click.stop="addChild(item)"
				>
					<v-icon
						color="green"
						class="mx-3"
					>
						mdi-plus
					</v-icon>
				</v-btn>
				<v-menu offset-x>
					<template #activator="{ on, attrs }">
						<v-btn
							icon
							v-bind="attrs"
							v-on="on"
						>
							<v-icon>
								mdi-dots-vertical
							</v-icon>
						</v-btn>
					</template>
					<v-list>
						<div
							v-for="(config, index) in folderConfigOptions"
							:key="index"
						>
							<v-list-item
								v-if="!config.notAllowedIds.includes(item._id)"
								@click.stop="toggleConfigOption(item, config.name)"
							>
								<v-icon
									:color="item[config.name] ? 'primary' : ''"
								>
									{{ config.icon }}{{
										item[config.name] ? "" : "-outline"
									}}
								</v-icon>
								<v-list-item-title class="pl-2">
									{{ config.name }}
								</v-list-item-title>
							</v-list-item>
						</div>
					</v-list>
				</v-menu>
			</template>
		</v-treeview>
	</div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import searchTree from "../../../../utils/searchTree.js";

export default {
	data() {
		return {
			parents: [],
			openFolders: [],
			activeFolders: [],
			newFolderName: {},
			folderConfigOptions: [
				{
					name: "canCreateSubfolder",
					icon: "mdi-plus-circle",
					notAllowedIds: [],
				},
				{
					name: "canRename",
					icon: "mdi-pencil-circle",
					notAllowedIds: [
						"root",
					],
				},
				{
					name: "canDelete",
					icon: "mdi-delete-circle",
					notAllowedIds: [
						"root",
						"16322284940689326",
					],
				},
				{
					name: "canDeleteImages",
					icon: "mdi-file-image-remove",
					notAllowedIds: [],
				},
				{
					name: "canEditImages",
					icon: "mdi-file-image-minus",
					notAllowedIds: [],
				},
				{
					name: "canCropImages",
					icon: "mdi-image-edit",
					notAllowedIds: [],
				},
				{
					name: "canRenameImages",
					icon: "mdi-file-image-remove",
					notAllowedIds: [],
				},
			],
		};
	},
	computed: {
		...mapState({
			folderTree: state => state.megaGalleryConfig.settings.folderTree,
			selectedFolderId: state => state.megaGalleryConfig.settings.selectedFolderId,
		}),
		...mapGetters({
			fullPathsToFoldersById: "fullPathsToFoldersById",
		}),
		folders: {
			get() {
				return [ this.folderTree ];
			},
			set(newValue) {
				this.setFolderTree(newValue);
			},
		},
	},
	watch: {
		activeFolders: {
			handler(value) {
				if (!value[0]) return;
				this.setSelectedFolderId(value[0]);
				this.updateGallerySettings();
			},
			deep: true,
		},
	},
	methods: {
		...mapMutations({
			setFolderTree: "setFolderTree",
			setSelectedFolderId: "setSelectedFolderId",
		}),
		...mapActions({
			updateGallerySettings: "updateGallerySettings",
		}),
		editName(item) {
			const obj = JSON.parse(JSON.stringify(this.folderTree));
			const node = searchTree(obj, item._id);
			node.name = this.newFolderName[item._id];
			this.setFolderTree(obj);
			this.updateGallerySettings();
		},
		addChild(item) {
			const obj = JSON.parse(JSON.stringify(this.folderTree));
			const _id = ((new Date().valueOf() + Math.random()) * 10000).toString();
			const child = {
				name: "New Folder",
				_id,
				canCreateSubfolder: true,
				canDelete: true,
				canRename: true,
				canDeleteImages: true,
				canEditImages: true,
				canCropImages: true,
				canRenameImages: true,
			};
			const node = searchTree(obj, item._id);
			if (!node.children) node.children = [];
			node.children.push(child);
			this.setFolderTree(obj);
			this.openFolders.push(item._id);
			this.activeFolders[0] = _id;
			this.updateGallerySettings();
		},
		deleteFolder(item) {
			if (item._id === "root") return;
			const parentId = this.fullPathsToFoldersById.get(item._id)[this.fullPathsToFoldersById.get(item._id).length - 2]._id;
			const obj = JSON.parse(JSON.stringify(this.folderTree));
			const node = searchTree(obj, parentId);
			const foundIdx = node.children.findIndex(folder => folder._id === item._id);
			if (foundIdx === -1) {
				return;
			}
			const selectedDeletedNode = searchTree(node.children[foundIdx], this.selectedFolderId);
			if (selectedDeletedNode) {
				this.setSelectedFolderId(node._id);
			}
			node.children.splice(foundIdx, 1);
			this.setFolderTree(obj);
			this.updateGallerySettings();
		},
		toggleConfigOption(item, configName) {
			const obj = JSON.parse(JSON.stringify(this.folderTree));
			const node = searchTree(obj, item._id);
			if (!Object.prototype.hasOwnProperty.call(node, configName)) {
				Vue.set(node, configName, false);
			}
			node[configName] = !node[configName];
			this.setFolderTree(obj);
			this.updateGallerySettings();
		},
	},
};
</script>

<style scoped>
	.cursor-pointer {
		cursor: pointer;
		user-select: none;
	}
</style>
