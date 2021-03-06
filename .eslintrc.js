module.exports = {
	'parser': 'babel-eslint',

	// 'sourceType': 'module',
	// 'ecmaVersion': 6,

	'ecmaFeatures': {
		'modules': true,
		'spread': true,
		'restParams': true,
	},

	'env': {
		'es6': true,
		'node': true,
		'mocha': true,
	},

	'plugins': [
		'import',
		'no-unused-vars-rest',
		'react',
	],

	'extends': [
		'eslint:recommended',
		'plugin:no-unused-vars-rest/recommended',
		'plugin:react/recommended',
	],

	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true,
			'experimentalObjectRestSpread': true,
		},
	},

	'rules': {

		// ES5 rules
		'array-bracket-spacing': [2, 'never'],
		'block-spacing': [2, 'always'],
		'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],
		'camelcase': 2,
		'comma-dangle': [2, 'always-multiline'],
		'comma-spacing': [2, { 'before': false, 'after': true }],
		'computed-property-spacing': [2, 'never'],
		'consistent-this': [2, 'self'],
		'curly': 2,
		'dot-notation': 2,
		'eol-last': 2,
		'eqeqeq': 2,
		'indent': [2, 'tab', { 'SwitchCase': 1 }],
		'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
		'keyword-spacing': 2,
		'linebreak-style': [2, 'unix'],
		'max-len': [0, 100],
		'no-array-constructor': 2,
		'no-console': 0,
		'no-debugger': 0,
		'no-eval': 2,
		'no-extend-native': 2,
		'no-fallthrough': 2,
		'no-implied-eval': 2,
		'no-lonely-if': 2,
		'no-loop-func': 2,
		'no-mixed-spaces-and-tabs': 2,
		'no-redeclare': [2, { 'builtinGlobals': true }],
		'no-spaced-func': 2,
		'no-trailing-spaces': 2,
		'no-undefined': 0,
		'no-underscore-dangle': 0,
		'no-unused-vars': 0,
		'no-useless-call': 2,
		'no-use-before-define': 0,
		'object-curly-spacing': [2, 'always'],
		'quotes': [2, 'single'],
		'radix': 2,
		'semi': [2, 'always'],
		'space-before-blocks': 2,
		'space-before-function-paren': [2, 'always'],
		'space-in-parens': [2, 'never'],
		'space-infix-ops': 2,
		'strict': 0,
		'yoda': 2,

		// ES6 rules
		'no-var': 2,
		'object-shorthand': 2,
		'prefer-arrow-callback': 2,
		'prefer-spread': 2,
		'prefer-template': 2,
		'import/order': 2,
		'import/default': 2,
		'import/first': 2,
		'import/named': 2,
		'import/no-named-as-default': 2,
		'import/no-named-as-default-member': 2,
		'import/no-unresolved': 2,
		'import/no-extraneous-dependencies': 2,
		'import/no-mutable-exports': 2,
		'import/no-named-default': 2,

		// JSX/React rules
		'jsx-quotes': [2, 'prefer-double'],
		'react/display-name': [2, { 'ignoreTranspilerName': true }],
		'react/jsx-boolean-value': [2, 'always'],
		'react/jsx-curly-spacing': [2,  'never', { 'allowMultiline': true }],
		'react/jsx-equals-spacing': [2, 'never'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-key': 2,
		'react/jsx-no-bind': [2],
		'react/jsx-pascal-case': 2,
		'react/no-multi-comp': [2, { 'ignoreStateless': true }],
		'react/prefer-es6-class': [2, 'never'],
		'react/sort-prop-types': 2,
	},
}
