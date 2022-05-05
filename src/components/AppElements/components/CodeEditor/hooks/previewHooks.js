export default function () {
	const str = `const emailPreviewHooks = {
		onHeaderButtonClicked: ({ buttonId }) => {
			return new Promise(resolve => {
				resolve();
		});
	},
}`;

	return str;
}
