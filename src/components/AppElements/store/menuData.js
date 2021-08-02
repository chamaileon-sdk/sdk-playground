export default {
	state: () => ({
		menuArr: [
			{
				title: "SDK",
				icon: "at",
				to: "sdk",
				children: [
					{ title: "Logo", icon: "at", to: "#sdklogo" },
					{
						title: "Splash Screen",
						icon: "image-size-select-actual",
						to: "#splashscreen",
					},
					{ title: "Colors", icon: "eyedropper-variant", to: "#colors" },
					{ title: "Language", icon: "web", to: "#language" },
				],
			},
			{
				title: "Email Thumbnail",
				icon: "image-outline",
				to: "emailthumbnail",
				children: [{ title: "Settings", icon: "cog-outline", to: "#settings" }],
			},
			{
				title: "Email Preview",
				icon: "email-search-outline",
				to: "emailpreview",
				children: [
					{ title: "Header", icon: "border-top-variant", to: "#header" },
				],
			},
			{
				title: "Email Editor",
				icon: "email-edit-outline",
				to: "emaileditor",
				children: [
					{ title: "Header", icon: "border-top-variant", to: "#header" },
					{ title: "Text Insert", icon: "format-text", to: "#text-insert" },
					{ title: "Elements", icon: "card-plus-outline", to: "#elements" },
					{
						title: "Block Libraries",
						icon: "database-edit-outline",
						to: "#block-libraries",
					},
					{
						title: "Addons",
						icon: "puzzle-outline",
						to: "#addons",
					},
					{ title: "Settings", icon: "cog-outline", to: "#settings" },
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
					},
					{
						title: "Header",
						icon: "border-top-variant",
						to: "#header",
					},
					{
						title: "Footer",
						icon: "border-bottom-variant",
						to: "#footer",
					},
					{
						title: "Text Insert",
						icon: "format-text",
						to: "#text-insert",
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
