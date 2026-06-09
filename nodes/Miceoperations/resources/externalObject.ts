import type { INodeProperties } from 'n8n-workflow';

import {
	bodyNumberField,
	bodyStringField,
	byResource,
	queryNumberField,
	queryStringField,
} from './helpers';

export const externalObjectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('externalObject'),
		},
		default: 'create',
		options: [
			{ name: 'Create', value: 'create', action: 'Create external object mapping', routing: { request: { method: 'POST', url: '/external_objects' } } },
			{ name: 'Get', value: 'get', action: 'Get external object mapping', routing: { request: { method: 'GET', url: '/external_objects/get' } } },
		],
	},
	bodyStringField('Object Type', 'externalObjectCreateType', 'externalObject', ['create'], 'object_type', 'event', true),
	bodyNumberField('Object ID', 'externalObjectCreateId', 'externalObject', ['create'], 'object_id', 0, true),
	bodyStringField('External ID', 'externalObjectExternalId', 'externalObject', ['create'], 'external_id', '', true),
	queryStringField('Object Type', 'objectType', 'externalObject', ['get'], 'object_type', 'event'),
	queryNumberField('Object ID', 'objectId', 'externalObject', ['get'], 'object_id', 0),
];
