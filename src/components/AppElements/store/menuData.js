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
					{
						title: "Developer",
						icon: "alarm-light",
						disabled: process.env.NODE_ENV === "development" ? false : true,
						to: "#developer",
						codePropToMatch: "developer",
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
						title: "Custom Fonts",
						icon: "format-font",
						to: "#custom-fonts",
						codePropToMatch: "fontFiles",
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
				title: "Gallery",
				icon: "image",
				to: "gallery",
				children: [
					{
						title: "Folder Tree",
						icon: "folder",
						to: "#folder",
						codePropToMatch: "folder",
					},
					{
						title: "Settings",
						icon: "cog-outline",
						to: "#settings",
						codePropToMatch: "settings",
					}
				],
			},
			{
				title: "Variable Editor",
				icon: "application-variable-outline",
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
				icon: "xml",
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
				icon: "code-json",
				to: "htmlimport",
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
