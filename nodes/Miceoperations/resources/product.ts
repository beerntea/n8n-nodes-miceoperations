import type { INodeProperties } from 'n8n-workflow';

import { byResource, queryNumberField, queryStringField } from './helpers';

export const productDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('product'),
		},
		default: 'getAll',
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get many products', routing: { request: { method: 'GET', url: '/products' } } },
			{ name: 'Get', value: 'get', action: 'Get a product', routing: { request: { method: 'GET', url: '=/products/{{$parameter.productId}}' } } },
			{ name: 'Get Categories', value: 'getCategories', action: 'Get product categories', routing: { request: { method: 'GET', url: '/products/categories' } } },
		],
	},
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['get'],
			},
		},
	},
	queryStringField('Search Query', 'productQuery', 'product', ['getAll'], 'q'),
	queryStringField('Locale', 'productLocale', 'product', ['getAll'], 'locale'),
	queryNumberField('Product Category ID', 'productCategoryId', 'product', ['getAll'], 'product_category_id', 0),
	queryStringField('Locale', 'productCategoryLocale', 'product', ['getCategories'], 'locale'),
];
