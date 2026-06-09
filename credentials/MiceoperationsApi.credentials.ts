import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MiceoperationsApi implements ICredentialType {
	name = 'miceoperationsApi';

	displayName = 'MICE Operations API';

	icon = 'file:../nodes/Miceoperations/miceoperations.svg' as const;

	documentationUrl = 'https://www.miceoperations.com/developers/rest-api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Basic " + $credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.miceoperations.com/api/v1',
			url: '/companies/me',
		},
	};
}
