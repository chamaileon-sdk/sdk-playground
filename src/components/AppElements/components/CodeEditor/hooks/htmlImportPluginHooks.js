export default function () {
	return `const htmlImportPluginHooks = {
	cancel: () => {
		return new Promise(resolve => {
			importInstance.hide();
			resolve();
		});
	},
	close: () => {
		return new Promise(resolve => {
			importInstance.hide();
			resolve();
		});
	},
	onReplaceImages: (imageSrcArray) => {
		const imageSrcArrayReplaced = imageSrcArray.map(src => { oldSrc: src, newSrc: src });
		return new Promise(resolve => {
			resolve(imageSrcArrayReplaced);
		});
	},
	onImportReady: (result) => {
		return new Promise(resolve => {
			resolve();
		});
	},
}`;
}
