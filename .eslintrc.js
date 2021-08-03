module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 6,
		parser: "babel-eslint",
	},
	env: {
		es6: true,
		browser: true,
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		"plugin:vue/essential",
	],
	plugins: ["json", "vue"],
	rules: {
		quotes: ["error", "double"],
		indent: ["error", "tab"],
		"no-tabs": "off",
		"no-console": "off",
		"no-throw-literal": "off",
		"no-return-await": "off",
		"no-underscore-dangle": "off",
		"arrow-body-style": "off",
		"consistent-return": "warn",
		"prefer-promise-reject-errors": "warn",
		"no-undef": "off",
		"prefer-destructuring": "off",
		"prefer-template": "off",
		"no-await-in-loop": "off",
		"no-restricted-globals": "off",
		"import/no-unresolved": "off",
		"no-param-reassign": "off",
		"new-cap": "off",
	},
};
