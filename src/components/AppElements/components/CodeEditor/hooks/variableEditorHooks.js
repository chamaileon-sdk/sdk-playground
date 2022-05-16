export default function () {
	const str = `const variableEditorHooks = {
	onEditImage: () => {
		return new Promise(resolve => {
			await galleryInstance.methods.updateData({ currentImgSrc: "", dimensions: null });
			await galleryInstance.show();
			const { src } = await galleryInstance.methods.pickImage();
			await galleryInstance.hide();

			resolve({ src });
		});
	},

	onTextInsertPluginButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			resolve({ value: "Your inserted text." });
		});
	},

	onButtonClicked: ({ buttonId }) => {
		return new Promise(resolve => {
			if (buttonId === "close") variableEditorInstance.close();
			resolve();
		});
	},
}`;

	return str;
}
