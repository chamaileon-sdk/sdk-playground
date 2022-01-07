export default function () {
	const str =  `	
const galleryHooks = {
    onUploadImage: async ( { selectedFolderId, parents, image } ) => {	
        // Store image data
    },
    onSaveUrl:	async ( { selectedFolderId, parents, image } ) => {
        // Save image with URL src
    },
    onFolderSelected: async ({ selectedFolderId, parents, searchValue, orderValue, maxImagePerPage, pageNumber }) => {
        // Return images for the selected folder
    },
    onUpdateImage: async ({ imageId, parents, selectedFolderId, image }) => {
        // Update image 
    },
    onDeleteImage: async ({ imageId, parents, selectedFolderId }) => {
        // Delete image					
    },
}` 
	return str;
};