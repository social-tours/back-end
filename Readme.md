# Social Tours API Reference

The Social Tours API is based on the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) architecture. The API uses a predefined set of URLs to represent various resources, accepts form-endcoded responses, and uses standard HTTP response codes, authentication and verbs.

#### Endpoint

https://prod-socialtours.herokuapp.com/api

#### ER Diagram

https://dbdiagram.io/d/5d4b8094ced98361d6dd6837

## Data Models

<dl>
<dt><a href="#findAll">findAll(table)</a> ⇒</dt>
<dd><p>Database model to get all records in a table</p>
</dd>
<dt><a href="#findById">findById(table, id)</a> ⇒</dt>
<dd><p>Database model to get a single record by id</p>
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

<a name="findById"></a>

### findById(table, id) ⇒

Database model to get a single record by id

**Kind**: global function  
**Returns**: database record

| Param | Type                 |
| ----- | -------------------- |
| table | <code>string</code>  |
| id    | <code>integer</code> |

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
