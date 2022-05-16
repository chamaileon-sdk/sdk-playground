export default function () {
	const str = `const emailPreviewHooks = {
		close: () => {
			return new Promise(resolve => {
				previewInstance.hide();
				resolve();
			});
		},

		onHeaderButtonClicked: ({ buttonId }) => {
			return new Promise(resolve => {
				resolve();
		});
	},
}`;

	return str;
}
