<template>
	<div>
		<v-treeview
			class="cursor-pointer white rounded"
			v-model="parents"
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
					:placeholder="item.name"
					v-model="newFolderName[item._id]"
					@click.stop
					@change="editName(item)"
				>
				</v-text-field>
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
				<v-btn v-if="(!item.children || item.children.length === 0) && item._id !== 'root'" fab x-small text outlined class="mx-1"  @click.stop="deleteFolder(item)">
					<v-icon
						color="red"
						class="mx-3"
					>
						mdi-delete
					</v-icon>
				</v-btn>
			
				<v-btn fab x-small text outlined class="mx-1" @click.stop="addChild(item)">
					<v-icon
						color="green"
						class="mx-3"
					>
						mdi-plus
					</v-icon>
				</v-btn>
			</template>
		</v-treeview>		
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

function searchTree(obj, id){
	 if(obj._id == id){
		  return obj;
	 }else if (obj.children){
		  let i;
		  let result = null;
		  for(i=0; result == null && i < obj.children.length; i++){
			   result = searchTree(obj.children[i], id);
		  }
		  return result;
	 }
	 return null;
}

export default {
	data() {
		return {
			parents: [],
			openFolders: [],
			activeFolders: [],
			newFolderName: {},		
		}
	},
	computed: {
		...mapState({
			folderTree: (state) => state.megaGalleryConfig.settings.folderTree,
			selectedFolderId: (state) => state.megaGalleryConfig.settings.selectedFolderId,
		}),
		...mapGetters({
			fullPathsToFoldersById: "fullPathsToFoldersById",
		}),
		folders: {
			get() {
				return [ this.folderTree ]
			},
			set(newValue) {
				this.setFolderTree(newValue)
			}
		}
	},
	watch: {
		activeFolders: {
			handler: function (value) {
				if(!value[0]) return;
				this.setSelectedFolderId(value[0]);
			},
			deep: true,
		}
	},
	methods: {
		...mapMutations({
			setFolderTree: "setFolderTree",
			setSelectedFolderId: "setSelectedFolderId"
		}),
		editName(item) {
			const obj = JSON.parse(JSON.stringify(this.folderTree));			
			const node = searchTree(obj, item._id);
			node.name = this.newFolderName[item._id];
			this.setFolderTree(obj);
		},
		addChild(item) {
			const obj = JSON.parse(JSON.stringify(this.folderTree));
			const _id = ((new Date().valueOf() + Math.random()) * 10000).toString();
			const child = {
				name: "New Folder",
				_id, 
			}
			const node = searchTree(obj, item._id);		
			if(!node.children) node.children = [];
			node.children.push(child);
			this.setFolderTree(obj);
			this.openFolders.push(item._id);
			this.activeFolders[0] = _id
		},
		deleteFolder(item) {
			if(item._id === "root") return;
			const parentId = this.fullPathsToFoldersById.get(item._id)[this.fullPathsToFoldersById.get(item._id).length - 2]._id;			
			const obj = JSON.parse(JSON.stringify(this.folderTree));		
			const node = searchTree(obj, parentId);		
			node.children = node.children.filter(folder => folder._id !== item._id);
			this.setFolderTree(obj);
		}
	},
}
</script>

<style scoped>	
	.cursor-pointer {
		cursor: pointer;
		user-select: none;
	}
</style>

