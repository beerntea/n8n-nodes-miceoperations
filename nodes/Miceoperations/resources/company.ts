import type { INodeProperties } from 'n8n-workflow';

import { byResource } from './helpers';

export const companyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: byResource('company'),
		},
		default: 'getMe',
		options: [
			{
				name: 'Get Me',
				value: 'getMe',
				action: 'Get authenticated company',
				routing: {
					request: {
						method: 'GET',
						url: '/companies/me',
					},
				},
			},
		],
	},
];
