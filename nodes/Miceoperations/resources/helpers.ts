import type { INodeProperties } from 'n8n-workflow';

export const byResource = (resource: string) => ({ resource: [resource] });

export const show = (resource: string, operation: string) => ({
	resource: [resource],
	operation: [operation],
});

export const payloadField = (
	resource: string,
	operation: string,
	required = true,
): INodeProperties => ({
	displayName: 'Payload',
	name: 'payload',
	type: 'json',
	default: '{}',
	required,
	displayOptions: {
		show: show(resource, operation),
	},
	description: 'JSON payload to send as request body',
});

export const queryStringField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	queryProperty: string,
	defaultValue = '',
	description?: string,
): INodeProperties => ({
	displayName,
	name,
	type: 'string',
	default: defaultValue,
	description,
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: queryProperty,
		},
	},
});

export const queryNumberField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	queryProperty: string,
	defaultValue: number,
	typeOptions?: INodeProperties['typeOptions'],
): INodeProperties => ({
	displayName,
	name,
	type: 'number',
	default: defaultValue,
	typeOptions,
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: queryProperty,
		},
	},
});

export const queryBooleanField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	queryProperty: string,
): INodeProperties => ({
	displayName,
	name,
	type: 'boolean',
	default: false,
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
	routing: {
		send: {
			type: 'query',
			property: queryProperty,
		},
	},
});

export const sortOrderField = (
	name: string,
	resource: string,
	operations: string[],
): INodeProperties => ({
	displayName: 'Sort Order',
	name,
	type: 'options',
	default: 'DESC',
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
	options: [
		{ name: 'ASC', value: 'ASC' },
		{ name: 'DESC', value: 'DESC' },
	],
	routing: {
		send: {
			type: 'query',
			property: 'sort_order',
		},
	},
});

type BodyFieldType = 'string' | 'number' | 'boolean' | 'json';

export const bodyField = (
	displayName: string,
	name: string,
	type: BodyFieldType,
	resource: string,
	operations: string[],
	bodyProperty: string,
	defaultValue: string | number | boolean,
	required = false,
	description?: string,
	typeOptions?: INodeProperties['typeOptions'],
): INodeProperties => ({
	displayName,
	name,
	type,
	default: defaultValue,
	required,
	description,
	typeOptions,
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
	routing: {
		send: {
			type: 'body',
			property: bodyProperty,
		},
	},
});

export const bodyStringField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	bodyProperty: string,
	defaultValue = '',
	required = false,
	description?: string,
): INodeProperties =>
	bodyField(
		displayName,
		name,
		'string',
		resource,
		operations,
		bodyProperty,
		defaultValue,
		required,
		description,
	);

export const bodyNumberField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	bodyProperty: string,
	defaultValue = 0,
	required = false,
	description?: string,
	typeOptions?: INodeProperties['typeOptions'],
): INodeProperties =>
	bodyField(
		displayName,
		name,
		'number',
		resource,
		operations,
		bodyProperty,
		defaultValue,
		required,
		description,
		typeOptions,
	);

export const bodyBooleanField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	bodyProperty: string,
	defaultValue = false,
	description?: string,
): INodeProperties =>
	bodyField(
		displayName,
		name,
		'boolean',
		resource,
		operations,
		bodyProperty,
		defaultValue,
		false,
		description,
	);

export const bodyJsonField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	bodyProperty: string,
	defaultValue = '[]',
	required = false,
	description?: string,
): INodeProperties =>
	bodyField(
		displayName,
		name,
		'json',
		resource,
		operations,
		bodyProperty,
		defaultValue,
		required,
		description,
	);

export const bodyOptionsField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	bodyProperty: string,
	options: Array<{ name: string; value: string }>,
	defaultValue: string,
	required = false,
	description?: string,
): INodeProperties => ({
	displayName,
	name,
	type: 'options',
	default: defaultValue,
	required,
	description,
	options,
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
	routing: {
		send: {
			type: 'body',
			property: bodyProperty,
		},
	},
});

export const bodyCollectionField = (
	displayName: string,
	name: string,
	resource: string,
	operations: string[],
	options: INodeProperties[],
	placeholder = 'Add Field',
): INodeProperties => ({
	displayName,
	name,
	type: 'collection',
	default: {},
	placeholder,
	options,
	displayOptions: {
		show: {
			resource: [resource],
			operation: operations,
		},
	},
});
