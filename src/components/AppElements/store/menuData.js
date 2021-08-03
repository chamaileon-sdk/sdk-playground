export default {
	state: () => ({
		menuArr: [
			{
				title: "SDK",
				icon: "at",
				to: "sdk",
				children: [
					{
						title: "Logo",
						icon: "at",
						to: "#sdklogo",
						codePropToMatch: "createLogoJS",
					},
					{
						title: "Splash Screen",
						icon: "image-size-select-actual",
						to: "#splashscreen",
						codePropToMatch: "splashScreen",
					},
					{
						title: "Colors",
						icon: "eyedropper-variant",
						to: "#colors",
						codePropToMatch: "colors",
					},
					{
						title: "Language",
						icon: "web",
						to: "#language",
						codePropToMatch: "locale",
					},
				],
			},
			{
				title: "Email Thumbnail",
				icon: "image-outline",
				to: "emailthumbnail",
				children: [
					{
						title: "Settings",
						icon: "cog-outline",
						to: "#settings",
						codePropToMatch: "document",
					},
				],
			},
			{
				title: "Email Preview",
				icon: "email-search-outline",
				to: "emailpreview",
				children: [
					{
						title: "Header",
						icon: "border-top-variant",
						to: "#header",
						codePropToMatch: "header",
					},
				],
			},
			{
				title: "Email Editor",
				icon: "email-edit-outline",
				to: "emaileditor",
				children: [
					{
						title: "Header",
						icon: "border-top-variant",
						to: "#header",
						codePropToMatch: "header",
					},
					{
						title: "Text Insert",
						icon: "format-text",
						to: "#text-insert",
						codePropToMatch: "textInsert",
					},
					{
						title: "Elements",
						icon: "card-plus-outline",
						to: "#elements",
						codePropToMatch: "elements",
					},
					{
						title: "Block Libraries",
						icon: "database-edit-outline",
						to: "#block-libraries",
						codePropToMatch: "blockLibraries",
					},
					{
						title: "Addons",
						icon: "puzzle-outline",
						to: "#addons",
						codePropToMatch: "addons",
					},
					{
						title: "Settings",
						icon: "cog-outline",
						to: "#settings",
						codePropToMatch: "autoSaveInterval",
					},
				],
			},
			{
				title: "Variable Editor",
				icon: "iframe-variable-outline",
				to: "variableeditor",
				children: [
					{
						title: "Variables To Edit",
						icon: "variable",
						to: "#variablestoedit",
						codePropToMatch: "variablesToEdit",
					},
					{
						title: "Header",
						icon: "border-top-variant",
						to: "#header",
						codePropToMatch: "header",
					},
					{
						title: "Footer",
						icon: "border-bottom-variant",
						to: "#footer",
						codePropToMatch: "footer",
					},
					{
						title: "Text Insert",
						icon: "format-text",
						to: "#text-insert",
						codePropToMatch: "textInsertPlugin",
					},
				],
			},
			{
				title: "Email HTML Generator",
				icon: "code-json",
				to: "htmlgenerator",
				children: [
					{
						title: "Settings",
						icon: "cog-outline",
						to: "#settings",
						codePropToMatch: "document",
					},
				],
			},
			{
				title: "Email HTML Import",
				icon: "xml",
				to: "htmlimport",
				children: [
					{
						title: "Settings",
						icon: "cog-outline",
						to: "#settings",
						codePropToMatch: "document",
					},
				],
			},
		],
	}),
	mutations: {},
	actions: {},
	getters: {
		getMenu(state) {
			return state.menuArr;
		},
	},
};
