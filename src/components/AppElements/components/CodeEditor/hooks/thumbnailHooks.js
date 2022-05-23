export default function () {
	const str = `const thumbnailHooks = {
	sendDOMHeight: () => {
		return new Promise(resolve => {
			resolve();
		});
	},
}`;
	return str;
}
