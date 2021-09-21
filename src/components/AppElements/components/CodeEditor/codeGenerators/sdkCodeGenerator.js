export default function (sdkConfig) {
	return `const chamaileonPlugins = await window.chamaileonSdk.init({
		container: document.getElementById("mega-gallery-wrapper"),
		editImgSrc: editImgSrc,
		dimensions: dimensions,
		settings: state.settings,
    });`;
}
