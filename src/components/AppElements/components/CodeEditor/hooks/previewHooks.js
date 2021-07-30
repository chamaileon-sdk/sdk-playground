export default function () {
	let str = `const emailPreviewHooks = {
    onHeaderButtonClicked: ({ buttonId }) => {
        return new Promise(resolve => {
            resolve();
        });
    },
}`;

	return str;
}
