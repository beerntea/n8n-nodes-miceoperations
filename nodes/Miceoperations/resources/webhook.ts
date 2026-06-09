import type { INodeProperties } from 'n8n-workflow';

import { bodyOptionsField, bodyStringField, byResource } from './helpers';

export const webhookDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('webhook'),
		},
		default: 'getAll',
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get many webhooks', routing: { request: { method: 'GET', url: '/webhooks' } } },
			{ name: 'Create', value: 'create', action: 'Create a webhook', routing: { request: { method: 'POST', url: '/webhooks' } } },
			{ name: 'Delete', value: 'delete', action: 'Delete a webhook', routing: { request: { method: 'DELETE', url: '=/webhooks/{{$parameter.webhookId}}' } } },
		],
	},
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
	},
	bodyOptionsField(
		'Event',
		'webhookEvent',
		'webhook',
		['create'],
		'event',
		[
			{ name: 'Event Created', value: 'event.created' },
			{ name: 'Event Updated', value: 'event.updated' },
			{ name: 'Event Deleted', value: 'event.deleted' },
			{ name: 'Event Status', value: 'event.status' },
			{ name: 'Event Activity Created', value: 'event_activity.created' },
			{ name: 'Event Activity Updated', value: 'event_activity.updated' },
			{ name: 'Event Activity Deleted', value: 'event_activity.deleted' },
			{ name: 'Invoice Created', value: 'invoice.created' },
			{ name: 'Invoice Updated', value: 'invoice.updated' },
			{ name: 'Invoice Deleted', value: 'invoice.deleted' },
		],
		'event.created',
		true,
	),
	bodyStringField('URL', 'webhookUrl', 'webhook', ['create'], 'url', '', true, 'Your callback URL'),
	bodyStringField(
		'Secret Key',
		'webhookSecretKey',
		'webhook',
		['create'],
		'secret_key',
	),
];
