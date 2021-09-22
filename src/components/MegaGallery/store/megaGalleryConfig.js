import zango from "zangodb";

let db = new zango.Db("chamaileonSDKGalleryDataBase", { images: ["_id", "parentId", "name", "createdAt", "src",] });
let images = db.collection("images");

const rootImages = [
	{
		parentId: "root",
		name: "Favorite image",
		src: "https://images.pexels.com/photos/22221/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "root",
		name: "Favorite image 2",
		src: "https://images.pexels.com/photos/761993/pexels-photo-761993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: "002",
		createdAt: new Date(),
	},
	{
		parentId: "root",
		name: "Favorite image 3",
		src: "https://images.pexels.com/photos/2050999/pexels-photo-2050999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
];

images.update(rootImages).catch(error => console.error(error));
let count = 0;
let loadedItems = [];

function closeGallery() {
	const wrapper = document.getElementById("mega-gallery-wrapper");
	window.setTimeout(() => {
		wrapper.innerHTML = "";
		wrapper.style.marginTop = "100%";
	}, 0);
}


export default {
	state: () => ({
		settings: {
			folderTree: {
				_id: "root",
				name: "root",
				children: [
					{
						_id: "16322284940689326",
						name: "Favorite Images"
					},
				],	
			},
			selectedFolderId: "root",
			maxImagePerPage: 12,
			maxFileSize: 6,
		},
	}),
	getters: {
		fullPathsToFoldersById(state) {
			const fullPathsToFoldersById = new Map();
			const parentsArray = [];

			const findParents = (node, array) => {
				const parents = [...array];
				parents.push( node );
				fullPathsToFoldersById.set(
					node._id,
					[...parents],
				);
				if (node.children && node.children.length > 0) {
					node.children.forEach((child) => {
						findParents(child, [...parents]);
					});
				}
			};

			[ state.settings.folderTree ].forEach((node) => {
				findParents(node, parentsArray);
			});

			return fullPathsToFoldersById;
		},
	},
	mutations: {
		setGallery(state, payload) {
			Object.entries(payload).forEach(([key, value]) => {
				state[key] = value;
			})
		},
		setSelectedFolderId(state, payload) {
			state.settings.selectedFolderId = payload;
		},
		setMaxFileSize(state, payload) {
			state.settings.maxFileSize = payload;
		},
		setMaxImagePerPage(state, payload) {
			state.settings.maxImagePerPage = payload;
		},
		setFolderTree(state, payload) {
			state.settings.folderTree = payload;
		}
	},
	actions: {
		async openGallery({ state, rootState }, { editImgSrc = null, dimensions = null, resolve = null } = {}) {
			rootState.sdk.openGallery({
				container: document.getElementById("mega-gallery-wrapper"),
				editImgSrc: editImgSrc,
				dimensions: dimensions,
				settings: state.settings,
				hooks: {
					onUploadImage: async ( { selectedFolderId, parents, image } ) => {	
						const _id = Date.now() + Math.random();	
						const newImageData = {
							name: image.name,
							parentId: selectedFolderId,
							src: image.data || null,
							createdAt: new Date(),
							_id,
						};
						try {
							await images.insert([newImageData]);
							return newImageData;

						} catch (e) {
							throw e;
						}
					},
					onSaveUrl:	async ( { selectedFolderId, parents, image } ) => {
						const _id = Date.now() + Math.random();	
						const newImageData = {
							name: image.name,
							folderId: selectedFolderId,
							src: image.url || null,
							createdAt: new Date(),
							_id,
						};
						try {
							await images.insert([newImageData]);
							return newImageData;

						} catch (e) {
							throw e;
						}
					},
					onFolderSelected: async ({ selectedFolderId, parents, searchValue, orderValue, maxImagePerPage, pageNumber }) => {
						// reset when the first banch of items loaded
						if(pageNumber === 0) {
							loadedItems = []; 
							count = 0;
							await images.find({ parentId: { $eq: selectedFolderId } }).forEach(() => count++);
						}

						const exclude = loadedItems.map(item => item._id);

						const query = searchValue ? {
							parentId: { $eq: selectedFolderId },
							_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
							name: {	$regex: searchValue, $options: "i" },
						} : {
							parentId: { $eq: selectedFolderId },
							_id: { $nin: exclude.length > 0 ? exclude : "notavalidId" },
						}

						try {
							let result = [];
							await images.find({
								...query
							}).limit(maxImagePerPage).sort(orderValue).forEach((
								image => {
									result.push(image)
									loadedItems = [...loadedItems, ...result ]
								}))

							return { images: result, count }					
						} catch (e) {
							throw e; 
						}
					},
					onUpdateImage: async ({ imageId, parents, selectedFolderId, image }) => {
						try {
							await images.update({
								_id: { $eq: imageId }
							}, { name: image.name })
					
						} catch (e) {
							throw e;
						}
					},
					onDeleteImage: async ({ imageId, parents, selectedFolderId }) => {
						try {
							await images.remove({ _id: { $eq: imageId }})

						} catch (e) {
							throw e;
						}						
					},  		
					onError: (err) => {
						closeGallery();
						reject(err);
					},
					onPick: (data) => {
						closeGallery();
						resolve({
							src: data.url,
						});
					}
				},
			});
		},
	},
};
