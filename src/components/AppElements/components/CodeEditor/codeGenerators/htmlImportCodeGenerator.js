export default function () {
	return `const htmlString = document.querySelector('textarea').value;

	const genRequest = await fetch('https://sdk-api.chamaileon.io/api/v1/emails/import', {
	method: 'POST',
	headers: {
		'Authorization': \`\${yourApiKey}\`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		html: htmlInput //see "HTML Input" tab
	})
});

if (!genRequest.ok) {
	throw new Error("Auth error");
}

const response = await genRequest.json();

jsonOutput = response.result.document; //see "JSON Output" tab`
}