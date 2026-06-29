// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
	{
		ignores: ['dist/**', 'coverage/**', 'projects/**']
	},
	{
		files: ['**/*.ts'],
		extends: [eslint.configs.recommended, tseslint.configs.recommended, angular.configs.tsRecommended, eslintConfigPrettier],
		processor: angular.processInlineTemplates,
		rules: {
			'max-params': [
				'error',
				{
					max: 4
				}
			],
			'no-nested-ternary': 'error',
			'no-duplicate-imports': 'error',
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase'
				}
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case'
				}
			],
			'@typescript-eslint/no-explicit-any': 'warn'
		}
	},
	{
		files: ['**/*.html'],
		extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility, eslintConfigPrettier],
		rules: {}
	}
]);
