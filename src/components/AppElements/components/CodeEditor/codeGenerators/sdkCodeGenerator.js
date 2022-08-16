export default function (sdkConfig) {
	return `async function getAccessToken(){
	const accessTokenRequest = await fetch("https://yourdomain.com/getAccessToken", {
		method: "GET",
	});

	if (accessTokenRequest.ok) {
		const accessTokenResponse = await accessTokenRequest.json();
		return accessTokenResponse.result;
	}
}

const chamaileonPlugins = await window.chamaileonSdk({
	accessToken: await getAccessToken(),
	getAccessToken,
	urls: {
		createLogoJS: "${sdkConfig.urls.createLogoJS}",
		splashScreen: "${sdkConfig.urls.splashScreen}",
	},
	colors: {
		primary: "${sdkConfig.colors.primary}",
		secondary: "${sdkConfig.colors.secondary}",
		error: "${sdkConfig.colors.error}",
		info: "${sdkConfig.colors.info}",
		success: "${sdkConfig.colors.success}",
		warning: "${sdkConfig.colors.warning}",
	},
	font: {
		family: "${sdkConfig.font.family}",
		url: "${sdkConfig.font.url}",
	}
	locale: "${sdkConfig.locale}",
});`;
}
