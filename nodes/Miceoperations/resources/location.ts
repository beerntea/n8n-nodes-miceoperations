import type { INodeProperties } from 'n8n-workflow';

import {
	byResource,
	queryBooleanField,
	queryStringField,
	sortOrderField,
} from './helpers';

export const locationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('location'),
		},
		default: 'getAll',
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get many locations', routing: { request: { method: 'GET', url: '/locations' } } },
			{ name: 'Get', value: 'get', action: 'Get a location', routing: { request: { method: 'GET', url: '=/locations/{{$parameter.locationId}}' } } },
		],
	},
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['location'],
				operation: ['get'],
			},
		},
	},
	queryBooleanField('Include Disabled', 'locationIncludeDisabled', 'location', ['getAll'], 'include_disabled'),
	queryStringField('Locale', 'locationLocale', 'location', ['getAll'], 'locale'),
	queryStringField('Sort By', 'locationSortBy', 'location', ['getAll'], 'sort_by', 'sort'),
	sortOrderField('locationSortOrder', 'location', ['getAll']),
];
