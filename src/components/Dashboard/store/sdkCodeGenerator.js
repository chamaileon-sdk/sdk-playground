export default function (sdkConfig) {
	return `const chamaileonPlugins = await window.chamaileonSdk.init({
        accessToken: accessToken,
        whitelabel: {
            urls: {
                updateSdkConfig: "${sdkConfig.urls.updateSdkConfig}",
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
