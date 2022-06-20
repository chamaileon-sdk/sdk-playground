export default function (generatorConfig) {
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

	return `const requestSettings = {
${printConfig(generatorConfig)}
}

const genRequest = await fetch('https://sdk-api.chamaileon.io/api/v1/emails/generate', {
	method: 'POST',
	headers: {
		'Authorization': \`\${yourApiKey}\`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		document: jsonInput, //see "Input JSON" tab
		settings: requestSettings,
	})
})

if (!genRequest.ok) {
	throw new Error("Auth error")
}

const response = await genRequest.json()

const htmlOutput = response.result //see "Output HTML" tab
`;
}
