# @mice-operations/n8n-nodes-miceoperations

This is an n8n community node for MICE Operations. It lets you work with events, clients, invoices, products, locations, webhooks, and external object mappings from MICE Operations in your n8n workflows.

MICE Operations is a platform for hospitality and event operations, including quoting, planning, and invoicing.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Use cases](#use-cases)
[Examples](#examples)
[Example workflow](#example-workflow)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Package name for installation:

- `@mice-operations/n8n-nodes-miceoperations`

## Operations

Supported resources and operations:

- Company
	- Get Me
- Event
	- Get Many
	- Get
	- Create
	- Update
	- Delete
	- Get Messages
	- Create Message
	- Add Activities
	- Update Activity
	- Delete Activity
	- Add Products
	- Update by Receipt
	- Get Billed Amount
- Client
	- Get Many
	- Get
	- Create
	- Update
- Product
	- Get Many
	- Get
	- Get Categories
- Location
	- Get Many
	- Get
- Invoice
	- Get Many
	- Get
	- Get File PDF
	- Create
	- Add Payment
	- Confirm Sync
- Webhook
	- Get Many
	- Create
	- Delete
- External Object
	- Create
	- Get

## Credentials

This node uses a single credential type:

- MICE Operations API
	- Field: API Key
	- Auth method: HTTP Basic header

How to set it up:

1. Generate or copy your API key in MICE Operations.
2. In n8n, create credentials for MICE Operations API.
3. Paste the API key in the API Key field.
4. Save and use these credentials in the node.

The node validates credentials with a request to:

- GET /companies/me

## Compatibility

This package uses n8nNodesApiVersion 1 and is intended for modern n8n versions that support community nodes and the current credential/node APIs.

If you run into compatibility issues, update n8n to the latest stable release and reinstall this node package.

## Usage

General usage pattern:

1. Add the MICE Operations node to your workflow.
2. Select Resource and Operation.
3. Configure required IDs (for example eventId, clientId, invoiceId).
4. For create and update operations, fill in the dedicated input fields shown by the selected operation.
5. For array-based operations such as Add Activities, Add Products, and Update by Receipt, provide the JSON array body in the JSON field.
6. Execute the node.

Notes:

- Get Many operations expose the API query filters and pagination options where available.
- Event get and get many operations support the documented include-flags for related data.
- Invoice resources include PDF retrieval through the Get File PDF operation.
- Most write operations now use explicit n8n fields instead of a generic payload field.
- The remaining JSON body fields are used only where the API expects a root-level array.

## Use cases

This community node is useful when you want to connect MICE Operations with the rest of your operational stack in n8n.

Common applications include:

- Event synchronization with CRM or sales tools
	Retrieve new or updated events from MICE Operations and sync them into HubSpot, Salesforce, Pipedrive, or a custom CRM so sales and operations stay aligned.

- Client synchronization between MICE Operations and back-office systems
	Create or update client records in MICE Operations based on changes in ERP, accounting, or CRM platforms, or do the reverse to keep contact data in sync.

- Automated event preparation flows
	Use an n8n schedule or webhook trigger to fetch upcoming events, enrich them with related client and location data, and notify planners, kitchen teams, or venue staff in Slack, Teams, email, or WhatsApp tools.

- Product and activity provisioning for events
	Automatically add standard products or activities to events based on event type, guest count, or information coming from a sales form or booking tool.

- Invoice creation after operational milestones
	Trigger invoice creation when an event reaches a specific stage in your workflow, for example after confirmation, after execution, or after an approval step in another system.

- Payment registration and accounting reconciliation
	Receive payment confirmations from a PSP, bookkeeping platform, or bank feed automation and register them on invoices in MICE Operations using the Add Payment operation.

- External accounting or ERP sync confirmation
	After sending invoice data from n8n to systems such as Exact or another finance platform, store the sync result back in MICE Operations with Confirm Sync.

- PDF distribution and document archiving
	Fetch invoice PDFs from MICE Operations and automatically send them by email, upload them to SharePoint, Google Drive, Dropbox, or archive them in a document management system.

- Webhook-driven event monitoring
	Register webhooks in MICE Operations and use them with n8n webhook endpoints to react to changes like `event.updated` or `invoice.created` in near real time.

- External ID mapping between systems
	Use External Object mappings to connect MICE Operations records to IDs from external systems such as CRMs, POS tools, finance tools, or custom internal platforms.

- Reporting and dashboards
	Collect events, invoices, locations, and product data on a schedule and push it into Google Sheets, Airtable, Power BI, Looker Studio, or a data warehouse for reporting.

- Data quality and control workflows
	Periodically check for missing references, unexpected statuses, missing client details, or incomplete planning information and notify the right team automatically.

## Examples

The examples below show typical configurations you can reproduce in n8n.

### Event examples

Get many upcoming events for a date range:

- Resource: Event
- Operation: Get Many
- Event Date After: `2026-07-01`
- Event Date Before: `2026-07-31`
- Status: `confirmed`
- Include Client: `true`
- Include Location: `true`
- Items Per Page: `50`

Create a new event:

- Resource: Event
- Operation: Create
- Name: `Summer Kick-off Dinner`
- Location ID: `12`
- Event Type ID: `3`
- Client ID: `245`
- Planner ID: `18`
- Datetime Start: `2026-07-18 18:00:00`
- Datetime End: `2026-07-18 23:00:00`
- Guests: `80`
- Locale: `nl_NL`
- Reference: `SKD-2026-001`
- Message: `VIP guests arrive at 17:30`

Create an event message:

- Resource: Event
- Operation: Create Message
- Event ID: `481`
- Subject: `Final guest count`
- Message: `Please confirm the final guest count before 12:00 tomorrow.`
- Type: `message`
- Author Email: `planner@example.com`

Add activities to an event:

- Resource: Event
- Operation: Add Activities
- Event ID: `481`
- Activities:

```json
[
	{
		"event_timeline_id": 4,
		"location_id": 12,
		"setup_id": 2,
		"datetime_start": "2026-07-18 17:00:00",
		"datetime_end": "2026-07-18 18:00:00",
		"name": "Room setup",
		"description": "Prepare dining room and welcome desk",
		"guests": 80,
		"memo": "Use the gold table setting"
	}
]
```

Add products to an event:

- Resource: Event
- Operation: Add Products
- Event ID: `481`
- Products:

```json
[
	{
		"product_id": 33,
		"quantity": 80,
		"price": 42.5,
		"description": "Three-course dinner package"
	},
	{
		"product_id": 41,
		"quantity": 80,
		"price": 7.5,
		"description": "Welcome drink"
	}
]
```

Update an event with only selected fields:

- Resource: Event
- Operation: Update
- Event ID: `481`
- Update Fields:
	- Name: `Summer Kick-off Dinner - Final`
	- Guests: `84`
	- Noticeboard Name: `Ballroom A`

Update an event from receipt lines:

- Resource: Event
- Operation: Update by Receipt
- Event ID: `481`
- Receipt Items:

```json
[
	{
		"description": "Dinner package",
		"quantity": 80,
		"price": 42.5,
		"vat_percentage": 9
	},
	{
		"description": "Welcome drink",
		"quantity": 80,
		"price": 7.5,
		"vat_percentage": 21
	}
]
```

### Client examples

Create a client:

- Resource: Client
- Operation: Create
- Type: `client`
- Name: `Acme Events BV`
- Email: `events@acme.example`
- Phone: `+31 20 123 4567`
- Address Line 1: `Herengracht 100`
- Postal Code: `1015 BS`
- City: `Amsterdam`
- Country: `Netherlands`
- VAT Number: `NL123456789B01`

Update a client:

- Resource: Client
- Operation: Update
- Client ID: `245`
- Update Fields:
	- Email: `finance@acme.example`
	- Phone: `+31 20 765 4321`
	- City: `Utrecht`

Find a supplier by type and city:

- Resource: Client
- Operation: Get Many
- Type: `supplier`
- City: `Rotterdam`
- Sort By: `sort`
- Sort Order: `asc`

### Invoice examples

Create an invoice for an event:

- Resource: Invoice
- Operation: Create
- Type: `invoice`
- Status: `concept`
- Event ID: `481`
- Client ID: `245`
- Client Name: `Acme Events BV`
- Client Email: `finance@acme.example`
- Client Address Line 1: `Herengracht 100`
- Client Postal Code: `1015 BS`
- Client City: `Amsterdam`
- Client Country: `Netherlands`
- Include VAT: `true`
- Payment Term: `14`
- Locale: `nl_NL`

Register an invoice payment:

- Resource: Invoice
- Operation: Add Payment
- Invoice ID: `9901`
- Amount: `1250`
- Date: `2026-07-21`
- Type: `banktransfer`

Confirm an external invoice sync:

- Resource: Invoice
- Operation: Confirm Sync
- Invoice ID: `9901`
- Provider: `exact`
- Datetime: `2026-07-21 10:15:00`
- External ID: `EXT-INV-7781`
- Status: `processed`

Download an invoice PDF:

- Resource: Invoice
- Operation: Get File PDF
- Invoice ID: `9901`

This operation returns the PDF response from the API instead of JSON, so it is suitable for downstream binary handling in n8n.

### Webhook example

Create a webhook subscription:

- Resource: Webhook
- Operation: Create
- Event: `event.updated`
- URL: `https://example.com/webhooks/miceoperations`
- Secret Key: `my-shared-secret`

### External object example

Create an external object mapping:

- Resource: External Object
- Operation: Create
- Object Type: `event`
- Object ID: `481`
- External ID: `crm-event-481`

Use the Get operation afterwards to retrieve the mapping again by Object Type and Object ID.

## Example workflow

An importable example workflow is included at [examples/miceoperations-demo.workflow.json](examples/miceoperations-demo.workflow.json).

This workflow contains:

- A Manual Trigger node
- A Company Get Me step to validate the MICE Operations credentials
- An Event Get Many step with example date filters and include flags

How to use it:

1. Import [examples/miceoperations-demo.workflow.json](examples/miceoperations-demo.workflow.json) into n8n.
2. Open both MICE Operations nodes and select your `MICE Operations API` credentials.
3. Adjust the event date filters if needed.
4. Execute the workflow manually.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [MICE Operations REST API documentation](https://www.miceoperations.com/developers/rest-api)
* [MICE Operations Help Center](https://help.miceoperations.com)

## Version history

- 0.1.0
	- Initial community node release.
	- Includes core MICE Operations resources for events, clients, products, locations, invoices, webhooks, external objects, and company profile retrieval.
