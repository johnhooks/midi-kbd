module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"prettier",
	],
	plugins: ["@typescript-eslint"],
	ignorePatterns: ["*.cjs"],
	rules: {
		"import/order": [
			"error",
			{
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				"newlines-between": "always",
				groups: ["builtin", "external", "parent", "sibling", "index"],
				pathGroupsExcludedImportTypes: ["builtin"],
			},
		],
	},
	overrides: [
		{
			files: ["**/?(*.)+(spec|test).ts"],
			extends: ["plugin:testing-library/dom", "plugin:jest-dom/recommended"],
		},
	],
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts"],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: ["./src", "./example"],
			},
		},
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
};
