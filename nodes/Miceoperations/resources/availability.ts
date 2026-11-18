import type { INodeProperties } from 'n8n-workflow';

import { byResource, queryStringField } from './helpers';

const optionalQueryNumber = (
	displayName: string,
	name: string,
	queryProperty: string,
	description: string,
): INodeProperties => ({
	displayName,
	name,
	type: 'number',
	default: 0,
	description,
	typeOptions: { minValue: 0 },
	displayOptions: {
		show: {
			resource: ['availability'],
			operation: ['getAll'],
		},
	},
	routing: {
		send: {
			type: 'query',
			property: queryProperty,
			value: '={{$value > 0 ? $value : undefined}}',
		},
	},
});

export const availabilityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('availability'),
		},
		default: 'getAll',
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many availability slots',
				description: 'Get availability slots for a date or a date range of up to 31 days',
				routing: { request: { method: 'GET', url: '/availability' } },
			},
		],
	},
	queryStringField(
		'Date',
		'availabilityDate',
		'availability',
		['getAll'],
		'date',
		'',
		'Single date (YYYY-MM-DD). Fill in this field, or both Date After and Date Before.',
	),
	queryStringField(
		'Date After',
		'availabilityDateAfter',
		'availability',
		['getAll'],
		'date_after',
		'',
		'Start of the date range (YYYY-MM-DD, inclusive)',
	),
	queryStringField(
		'Date Before',
		'availabilityDateBefore',
		'availability',
		['getAll'],
		'date_before',
		'',
		'End of the date range (YYYY-MM-DD, inclusive). The range can be at most 31 days.',
	),
	queryStringField(
		'Location ID',
		'availabilityLocationId',
		'availability',
		['getAll'],
		'location_id',
		'',
		'Filter by a single location ID',
	),
	queryStringField(
		'Location IDs (Comma-Separated)',
		'availabilityLocationIds',
		'availability',
		['getAll'],
		'location_ids',
		'',
		'Filter by multiple location IDs',
	),
	optionalQueryNumber(
		'Guests',
		'availabilityGuests',
		'guests',
		'Only return slots that can host this number of guests. Leave 0 to skip this filter.',
	),
	optionalQueryNumber(
		'Duration (Minutes)',
		'availabilityDuration',
		'duration',
		'Only return slots with at least this duration in minutes. Leave 0 to skip this filter.',
	),
];
