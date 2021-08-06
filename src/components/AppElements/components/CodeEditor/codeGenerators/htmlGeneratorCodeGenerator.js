export default function (config) {
	return `const requestSettings = {
${printConfig(config)}
}

const genRequest = await fetch('https://sdk-api.chamaileon.io/api/v1/emails/generate', {
    method: 'POST',
    headers: {
        'Authorization': \`\${yourApiKey}\`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        document: jsonInput, //see "JSON Input" tab
        settings: requestSettings,
    })
})

if (!genRequest.ok) {
	throw new Error("Auth error")
}

const response = await genRequest.json()

const htmlOutput = response.result //see "HTML Output" tab
`;
}

const printConfig = (config) => {
	let str = "";
	for (const key in config) {
		str += "\t" + key + ": ";
		if (typeof config[key] === typeof "string") {
			str += "\"" + config[key] + "\",\n";
		} else {
			str += config[key] + ",\n";
		}
	}

	return str.slice(0, -1);
};
