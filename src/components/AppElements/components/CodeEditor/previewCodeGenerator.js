export default function (previewConfig) {
	return `const previewConfig = {
    document: emailDocument, // see 'document' tab
    settings: {
        buttons: {
            header: ${calculatePreviewHeader(previewConfig)}
        }
    },
    hooks: emailPreviewHooks //see 'hooks' tab
};
    
const previewInstance = await chamaileonPlugins.previewEmail(previewConfig);`;
}

const calculatePreviewHeader = (previewConfig) => {
	let literal = "";
	let arr = previewConfig.settings.buttons.header;

	if (arr.length === 0) return "[]";

	literal += "[";
	arr.forEach((c) => {
		literal += `
        {
            ${c.type === "button" ? `id: '${c.id}',\n\t\t\t\t\t` : ""}type: '${
	c.type
}',
            icon: '${c.icon}',
            label: '${c.label}',
            color: '${c.color}',
            style: '${c.style}'${
	c.items ? `,\n\t\t\t\t\titems: ${calculatePreviewDDItems(c.items)}` : ""
}
        },`;
	});
	literal += `
    ]`;
	return literal;
};

const calculatePreviewDDItems = (arr) => {
	if (arr.length === 0) return "[]";

	let literal = "";

	literal += "[";

	arr.forEach((c) => {
		literal += `\n\t\t\t\t\t\t{
                    id: "${c.id}",
                    label: "${c.label}",
                    icon: "${c.icon}",
        \t\t},`;
	});

	literal += "\n\t\t\t\t\t]";

	return literal;
};
