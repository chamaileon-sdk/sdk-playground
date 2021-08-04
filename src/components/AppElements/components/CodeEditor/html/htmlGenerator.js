export default async function (config, emailDocument) {
	const genRequest = await fetch(
		"https://sdk-api.chamaileon.io/api/v1/emails/generate",
		{
			method: "POST",
			headers: {
				Authorization: "Y8mbu7S5Qh4cyCqJCVBn",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				document: emailDocument, // see "document" tab
				settings: config,
			}),
		}
	);

	if (!genRequest.ok) {
		throw new Error("Auth error");
	}

	const response = await genRequest.json();

	console.log(response.result);

	return response.result;
}
