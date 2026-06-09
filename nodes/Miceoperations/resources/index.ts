import type { INodeProperties } from 'n8n-workflow';

import { clientDescription } from './client';
import { companyDescription } from './company';
import { eventDescription } from './event';
import { externalObjectDescription } from './externalObject';
import { invoiceDescription } from './invoice';
import { locationDescription } from './location';
import { productDescription } from './product';
import { webhookDescription } from './webhook';

export const resourceDescription: INodeProperties[] = [
	...companyDescription,
	...eventDescription,
	...clientDescription,
	...productDescription,
	...locationDescription,
	...invoiceDescription,
	...webhookDescription,
	...externalObjectDescription,
];
