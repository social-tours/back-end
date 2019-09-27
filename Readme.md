# Social Tours API Reference

[![Build Status](https://travis-ci.com/social-tours/back-end.svg?branch=master)](https://travis-ci.com/social-tours/back-end)

The Social Tours API is based on the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) architecture. The API uses a predefined set of URLs to represent various resources, accepts form-endcoded responses, and uses standard HTTP response codes, authentication and verbs.

<a name="toc"></a>

## Table of Contents

- [ER Diagram](#erd)
- [Data Models](#models)
- [Endpoints](#endpoints)
- [Services](#services)

#### API

https://prod-socialtours.herokuapp.com/api

<a name="erd"></a>

#### ER Diagram

https://dbdiagram.io/d/5d4b8094ced98361d6dd6837

---

<a name="models"></a>

## Data Models

<dl>
<dt><a href="#findAll">findAll(table)</a> ⇒</dt>
<dd><p>Database model to get all records in a table</p>
</dd>
<dt><a href="#findAllbyId">findAllbyId(table)</a> ⇒</dt>
<dd><p>Database model to get all records in a table given some search criteria</p>
</dd>
<dt><a href="#findById">findById(table, id)</a> ⇒</dt>
<dd><p>Database model to get a single record by id</p>
</dd>
<dt><a href="#findByEmail">findByEmail(email)</a> ⇒</dt>
<dd><p>Database model to get a user record by email</p>
</dd>
<dt><a href="#addRecord">addRecord(table, data)</a> ⇒</dt>
<dd><p>Database model to add a record</p>
</dd>
<dt><a href="#updateRecord">updateRecord(table, id, data)</a> ⇒</dt>
<dd><p>Database method to update existing record</p>
</dd>
<dt><a href="#removeRecord">removeRecord(table, id)</a> ⇒</dt>
<dd><p>Database method to remove record from the database</p>
</dd>
</dl>

<a name="findAll"></a>

### findAll(table) ⇒

Database model to get all records in a table

**Kind**: global function  
**Returns**: array of table records

| Param | Type                |
| ----- | ------------------- |
| table | <code>string</code> |

<a name="findAllbyId"></a>

### findAllbyId(table) ⇒

Database model to get all records in a table given some search criteria

**Kind**: global function  
**Returns**: array of table records

| Param | Type                |
| ----- | ------------------- |
| table | <code>string</code> |

<a name="findById"></a>

### findById(table, id) ⇒

Database model to get a single record by id

**Kind**: global function  
**Returns**: database record

| Param | Type                 |
| ----- | -------------------- |
| table | <code>string</code>  |
| id    | <code>integer</code> |

<a name="findByEmail"></a>

### findByEmail(email) ⇒

Database model to get a user record by email

**Kind**: global function  
**Returns**: database record

| Param | Type                |
| ----- | ------------------- |
| email | <code>string</code> |

<a name="addRecord"></a>

### addRecord(table, data) ⇒

Database model to add a record

**Kind**: global function  
**Returns**: newly created record

| Param | Type                |
| ----- | ------------------- |
| table | <code>string</code> |
| data  | <code>object</code> |

<a name="updateRecord"></a>

### updateRecord(table, id, data) ⇒

Database method to update existing record

**Kind**: global function  
**Returns**: updated record

| Param | Type                 |
| ----- | -------------------- |
| table | <code>string</code>  |
| id    | <code>integer</code> |
| data  | <code>object</code>  |

<a name="removeRecord"></a>

### removeRecord(table, id) ⇒

Database method to remove record from the database

**Kind**: global function  
**Returns**: deletion confirmation message in a json object

| Param | Type                 |
| ----- | -------------------- |
| table | <code>string</code>  |
| id    | <code>integer</code> |

---

<a name="endpoints"></a>

## Endpoints

#### Register

| Method | Endpoint               | Description                                                             |
| ------ | ---------------------- | ----------------------------------------------------------------------- |
| POST   | <code>/register</code> | Registers a new user with the system. Requires 'email', and 'password'. |

#### Users

| Method | Endpoint                | Description                                                      |
| ------ | ----------------------- | ---------------------------------------------------------------- |
| GET    | <code>/users</code>     | Retrieves an array of objects listing all users in the database. |
| GET    | <code>/users/:id</code> | Retrieves a specific user based on the id.                       |
| PUT    | <code>/users/:id</code> | Modifies an existing user.                                       |
| DELETE | <code>/users/:id</code> | Delete a user.                                                   |

### Events

| HTTP | Path                         | Description                                                       |
| ---- | ---------------------------- | ----------------------------------------------------------------- |
| GET  | <code>/api/events</code>     | Retrieves an array of objects listing all events in the database. |
| GET  | <code>/api/events/:id</code> | Retrieves a specific event based on the id.                       |
| POST | <code>/api/events</code>     | Create a new event.                                               |
| PUT  | <code>/api/events/:id</code> | Modifies an existing event.                                       |
| DEL  | <code>/api/events/:id</code> | Delete an event.                                                  |

### Schedules

| HTTP | Path                            | Description                                                                 |
| ---- | ------------------------------- | --------------------------------------------------------------------------- |
| GET  | <code>/api/schedules</code>     | Retrieves an array of objects listing all scheduled events in the database. |
| GET  | <code>/api/schedules/:id</code> | Retrieves a specific scheduled event based on the id.                       |
| POST | <code>/api/schedules</code>     | Schedule an event.                                                          |
| PUT  | <code>/api/schedules/:id</code> | Modifies an existing scheduled event.                                       |
| DEL  | <code>/api/schedules/:id</code> | Delete a scheduled event.                                                   |

### Tickets

| HTTP | Path                          | Description                                                        |
| ---- | ----------------------------- | ------------------------------------------------------------------ |
| GET  | <code>/api/tickets</code>     | Retrieves an array of objects listing all tickets in the database. |
| GET  | <code>/api/tickets/:id</code> | Retrieves a specific ticket based on the id.                       |
| POST | <code>/api/tickets</code>     | Create a new ticket.                                               |
| PUT  | <code>/api/tickets/:id</code> | Modifies an existing ticket.                                       |
| DEL  | <code>/api/tickets/:id</code> | Delete a ticket.                                                   |

### Sales

| HTTP | Path                        | Description                                                             |
| ---- | --------------------------- | ----------------------------------------------------------------------- |
| GET  | <code>/api/sales</code>     | Retrieves an array of objects listing all ticket sales in the database. |
| GET  | <code>/api/sales/:id</code> | Retrieves a specific ticket sale based on the id.                       |
| POST | <code>/api/sales</code>     | Create a new ticket sale.                                               |
| PUT  | <code>/api/sales/:id</code> | Modifies an existing sales transaction.                                 |
| DEL  | <code>/api/sales/:id</code> | Delete a sales transaction.                                             |

### Subscriptions

| HTTP | Path                                | Description                                                     |
| ---- | ------------------------------------|---------------------------------------------------------------- |
| GET  | <code>/api/subscritions</code>      | Retrieves  all subscriptions in the database.                   |
| GET  | <code>/api/subscriptions/:id</code> | Retrieves all subscriptions for a specific user.                |
| POST | <code>/api/subscriptions</code>     | Create a new subscription.                                      |
| DEL  | <code>/api/subscriptions/:id</code> | Delete a subscription.                                          |
 
---

<a name="services"></a>

## Services

<a name="sendMail"></a>

### sendMail(recipients, message, subject) ⇒

Function which emails event notifications
to Followers

**Kind**: global function  
**Returns**: email message to Followers

| Param      | Type                |
| ---------- | ------------------- |
| recipients | <code>string</code> |
| message    | <code>string</code> |
| subject    | <code>string</code> |

<a name="sendText"></a>

### sendText(message, userPhone) ⇒

Function which sends SMS via Twilio API

**Kind**: global function  
**Returns**: SMS message

| Param     | Type                |
| --------- | ------------------- |
| message   | <code>string</code> |
| userPhone | <code>string</code> |

<a name="verifyPhone"></a>

### verifyPhone(phoneNumber) ⇒ <code>boolean</code>

Function which verifies phone numbers via
Twilio API

**Kind**: global function

| Param       | Type                |
| ----------- | ------------------- |
| phoneNumber | <code>string</code> |

_Updated September 26, 2019_

