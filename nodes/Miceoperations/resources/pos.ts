import type { INodeProperties } from 'n8n-workflow';

import { bodyBooleanField, bodyJsonField, bodyStringField, byResource } from './helpers';

export const posDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('pos'),
		},
		default: 'getSetup',
		options: [
			{
				name: 'Get Setup',
				value: 'getSetup',
				action: 'Get the POS setup for an event',
				description: 'Get the products and deposit credit lines for an event',
				routing: { request: { method: 'POST', url: '=/pos/{{$parameter.posEventId}}/setup' } },
			},
			{
				name: 'Submit Receipt',
				value: 'submitReceipt',
				action: 'Submit a POS receipt for an event',
				description: 'Submit receipt lines and synchronize event products and invoicing',
				routing: { request: { method: 'POST', url: '=/pos/{{$parameter.posEventId}}/receipt' } },
			},
		],
	},
	{
		displayName: 'Event ID',
		name: 'posEventId',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['pos'],
				operation: ['getSetup', 'submitReceipt'],
			},
		},
	},
	{
		...bodyJsonField(
			'Items',
			'posReceiptItems',
			'pos',
			['submitReceipt'],
			'items',
			'[]',
			true,
			'JSON array of receipt lines. Each line has name, amount, date, object_type (product, location or credit), object_code (required unless object_type is credit) and vat_rates.',
		),
		routing: {
			send: {
				type: 'body',
				property: 'items',
				value: '={{ typeof $value === "string" ? JSON.parse($value) : $value }}',
			},
		},
	},
	bodyBooleanField(
		'Billed',
		'posReceiptBilled',
		'pos',
		['submitReceipt'],
		'billed',
		false,
		'Whether the generated invoice is created as externally billed',
	),
	{
		...bodyStringField(
			'Identifier',
			'posReceiptIdentifier',
			'pos',
			['submitReceipt'],
			'identifier',
			'',
			true,
			'External invoice identifier',
		),
		displayOptions: {
			show: {
				resource: ['pos'],
				operation: ['submitReceipt'],
				posReceiptBilled: [true],
			},
		},
	},
	bodyBooleanField(
		'Synced',
		'posReceiptSynced',
		'pos',
		['submitReceipt'],
		'synced',
		false,
		'Whether the created invoice is marked as synchronized',
	),
];
