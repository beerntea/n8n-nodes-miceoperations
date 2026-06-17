import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { resourceDescription } from './resources/index';

export class Miceoperations implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MICE Operations',
		name: 'miceoperations',
		icon: { light: 'file:miceoperations.svg', dark: 'file:miceoperations.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the MICE Operations API',
		defaults: {
			name: 'MICE Operations',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'miceoperationsApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.miceoperations.com/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Client',
						value: 'client',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'External Object',
						value: 'externalObject',
					},
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Location',
						value: 'location',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'event',
			},
			...resourceDescription,
		],
	};
}
