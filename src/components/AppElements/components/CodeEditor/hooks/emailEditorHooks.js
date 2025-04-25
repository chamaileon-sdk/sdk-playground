export default function () {
	const str = `//Key: libraryID, Value: Array of stored blocks
const blockLibraryData = new Map();

const emailEditorHooks = {
	close: () => {
		return new Promise(resolve => {
			editorInstance.hide();
			resolve();
		});
	},

	onSave: ({ document }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onAutoSave: ({ document }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onChange: ({ mutation }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onEditTitle: ({ title }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onEditSubjectLineAndPreviewText: ({ subjectLine, previewText }) => {
		return new Promise(resolve => {
			resolve();
		});
	},


	onAiAssistant: ({ context, action, tone, customContext,	target }) => {
		return new Promise(resolve => {
			resolve({ result });
		});
	},

	onEditImage: async ({ originalImage, lockDimensions }) => {
		await galleryInstance.methods.updateData({ currentImgSrc: originalImage, dimensions: lockDimensions });
		await galleryInstance.show();
		const { src } = await galleryInstance.methods.pickImage();
		await galleryInstance.hide();

		return { src };
	},

	onEditBackgroundImage: async ({ originalImage }) => {
		await galleryInstance.methods.updateData({ currentImgSrc: originalImage, dimensions: null });
		await galleryInstance.show();
		const { src } = await galleryInstance.methods.pickImage();
		await galleryInstance.hide();

		return { src };
	},

	onLoadBlocks: ({ libId }) => {
		let blocks = [];

		if (!blockLibraryData.has(libId)) {
			blocks = [];
		} else {
			blocks = blockLibraryData.get(libId);
		}

		return new Promise(resolve => {
			resolve({ blocks });
		});
	},

	onBlockSave: ({ libId, block }) => {
		if (!blockLibraryData.has(libId)) {
			blockLibraryData.set(libId, []);
		}

		blockLibraryData.get(libId).push(block);

		return new Promise(resolve => {
			resolve({ block });
		});
	},

	onBlockRename: ({ libId, block: { _id, title } }) => {
		let array = blockLibraryData.get(libId);

		array.forEach(c => {
			if (c._id == _id) {
				c.title = title;
			}
		});

		blockLibraryData.set(libId, array);

		return new Promise(resolve => {
			resolve();
		});
	},

	onBlockDelete: ({ libId, block: { _id } }) => {
		let array = blockLibraryData.get(libId);

		array = array.filter(c => c._id !== _id);

		blockLibraryData.set(libId, array);

		return new Promise(resolve => {
			resolve();
		});
	},

	onHeaderButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onTextInsertPluginButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve({ value: "Your inserted text." });
		});
	},

	onExpressionEditClicked: ({ expression }) => {
		return new Promise(resolve => {
			resolve({ expression: "<Your inserted expression>" });
		});
	},

	onUserEvent = ({ userEvent }) => {
		return new Promise(resolve => {
			resolve();
		});
	},
};`;

	return str;
}
