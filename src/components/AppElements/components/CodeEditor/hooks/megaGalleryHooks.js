export default function () {
	const str =  `
	import zango from "zangodb";

	let db = new zango.Db("chamaileonSDKGalleryDataBase", { images: ["_id", "parentId", "name", "createdAt", "src",] });
	let images = db.collection("images");

	const rootImages = [ ... ];

	images.insert(rootImages).catch(error => console.error(error));
	let count = 0;
	let loadedItems = [];

	function closeGallery() {
		const wrapper = document.getElementById("mega-gallery-wrapper");
		window.setTimeout(() => {
			wrapper.innerHTML = "";
			wrapper.style.marginTop = "100%";
		}, 0);
	}
	
	const megaGalleryHooks = {
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
			parentId: selectedFolderId,
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
		console.log(data)
		resolve({
			src: data.url,
		});
	}
}` 
	return str;
};