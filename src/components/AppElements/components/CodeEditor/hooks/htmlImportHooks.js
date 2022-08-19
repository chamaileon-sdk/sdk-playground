export default function () {
	return `const htmlImportHooks = {
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
