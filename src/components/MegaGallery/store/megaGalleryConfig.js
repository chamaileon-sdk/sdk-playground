import zango from "zangodb";

let db = new zango.Db("chamaileonSDKGalleryDataBase", { images: ["_id", "parentId", "name", "createdAt", "src",] });
let images = db.collection("images");

const favoriteImages = [
	{
		parentId: "16322284940689326",
		name: "Choose Joy",
		src: "https://images.pexels.com/photos/22221/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Happy girl with tablet",
		src: "https://images.pexels.com/photos/761993/pexels-photo-761993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Happy girl in the garden",
		src: "https://images.pexels.com/photos/2050999/pexels-photo-2050999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Flowers",
		src: "https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Love <3 is love",
		src: "https://images.pexels.com/photos/2519130/pexels-photo-2519130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Happy family",
		src: "https://images.pexels.com/photos/5792901/pexels-photo-5792901.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Kitty cat",
		src: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Best friend",
		src: "https://images.pexels.com/photos/34504/soldier-dog-companion-service.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Chamaileon Logo",
		src: "https://scontent.fbud5-1.fna.fbcdn.net/v/t31.18172-8/13958031_207694299633505_3207991402669478877_o.png?_nc_cat=107&ccb=1-5&_nc_sid=973b4a&_nc_ohc=Ea0CT0G5B1AAX8uCHYQ&_nc_ht=scontent.fbud5-1.fna&oh=6eae5f3aa70fb20b3b32d38b125b41aa&oe=617868EE",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Branding",
		src: "https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Abc ...",
		src: "https://images.pexels.com/photos/1337382/pexels-photo-1337382.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Keep distance",
		src: "https://images.pexels.com/photos/6999226/pexels-photo-6999226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
	{
		parentId: "16322284940689326",
		name: "Support a small business",
		src: "https://images.pexels.com/photos/7661216/pexels-photo-7661216.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
		_id: ((new Date().valueOf() + Math.random()) * 10000).toString(),
		createdAt: new Date(),
	},
];

images.remove({ parentId: { $eq: "16322284940689326" } });
images.insert(favoriteImages).catch(error => console.error(error));

let count = 0;
let loadedItems = [];

function closeGallery() {
	const wrapper = document.getElementById("mega-gallery-wrapper");
	window.setTimeout(() => {
		wrapper.innerHTML = "";
		wrapper.style.marginTop = "100%";
	}, 0);
}

const getDefaultState = () => {
	return {
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
	}
}


export default {
	state: getDefaultState(),
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
		resetGalleryState (state) {
			Object.assign(state, getDefaultState());
		},
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
		async openGallery({ state, rootState }, { editImgSrc, dimensions, resolve } = {}) {
			rootState.sdk.openGallery({
				container: document.getElementById("mega-gallery-wrapper"),
				editImgSrc,
				dimensions,
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
							await images.insert([ newImageData ]);
							return newImageData;

						} catch (e) {
							throw e;
						}
					},
					onSaveUrl:	async ( { selectedFolderId, parents, image } ) => {
						const _id = Date.now() + Math.random();	
						const newImageData = {
							name: image.name,
							parentId: selectedFolderId,
							src: image.url || null,
							createdAt: new Date(),
							_id,
						};
						try {
							await images.insert([ newImageData ]);
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
								}));
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
