export default function () {
	let str = `const variableEditorHooks = {
    onEditImage: ({ originalImg }) => {
        return new Promise(resolve => {
            resolve({ src });
        });
    },
    
    onTextInsertPluginButtonClicked: ({ buttonId }) => {
        return new Promise(resolve => {
            resolve({ value: "Your inserted text." });
        });
    },
    
    onButtonClicked: ({ buttonId }) => {

        if (buttonId === "close") variableEditorInstance.close();

        return new Promise(resolve => {
            resolve();
        });
    },
}`;

	return str;
}
