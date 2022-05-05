export default function () {
	const str = `//Key: libraryID, Value: Array of stored blocks
const blockLibraryData = new Map();

const emailEditorHooks = {
	onSave: ({ document }) => {
		emailDocument = document;

		return new Promise(resolve => {
			resolve();
		});
	},

	onAutoSave: ({ document }) => {
		emailDocument = document;

		return new Promise(resolve => {
			resolve();
		});
	},

	onChange: () => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onBeforeClose: () => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onAfterClose: () => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onEditTitle: ({ title }) => {
		return new Promise(resolve => {
			resolve();
		});
	},

	onEditImage: async ({ originalImage, lockDimensions: { width, height } }) => {
		const { src }  = await this.openGallery( { editImgSrc: originalImage, dimensions: lockDimensions });
		return { src };
	},

	onEditBackgroundImage: async ({ originalImage, lockDimensions: { width, height } }) => {
		const { src }  = await this.openGallery( { editImgSrc: originalImage, dimensions: lockDimensions });
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
};`;

	return str;
}
