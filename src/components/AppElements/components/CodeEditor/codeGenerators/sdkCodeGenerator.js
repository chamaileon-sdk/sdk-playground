export default function (sdkConfig) {
	return `const chamaileonPlugins = await window.chamaileonSdk.init({
		mode: "serverless",
		accessToken: accessToken,
		whitelabel: {
			urls: {
				createLogoJS: "${sdkConfig.urls.createLogoJS}",
				splashScreen: "${sdkConfig.urls.splashScreen}",
			},
			colors: {
				primary: "${sdkConfig.colors.primary}",
				secondary: "${sdkConfig.colors.secondary}",
			},
			locale: '${sdkConfig.locale}',
		}
	});`;
}