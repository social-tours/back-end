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

## findAll(table) ⇒

Database model to get all records in a table

**Kind**: global function  
**Returns**: result - array of table contents

| Param | Type                |
| ----- | ------------------- |
| table | <code>string</code> |

<a name="findById"></a>

## findById(table, id) ⇒

Database model to get a single record by id

**Kind**: global function  
**Returns**: result - database record

| Param | Type            |
| ----- | --------------- |
| table | <code>\*</code> |
| id    | <code>\*</code> |

<a name="addRecord"></a>

## addRecord(table, data) ⇒

Database model to add a record

**Kind**: global function  
**Returns**: results - newly created record

| Param | Type            |
| ----- | --------------- |
| table | <code>\*</code> |
| data  | <code>\*</code> |

<a name="updateRecord"></a>

## updateRecord(table, id, data) ⇒

Database method to update existing record

**Kind**: global function  
**Returns**: result - updated record

| Param | Type            |
| ----- | --------------- |
| table | <code>\*</code> |
| id    | <code>\*</code> |
| data  | <code>\*</code> |

<a name="removeRecord"></a>

## removeRecord(table, id) ⇒

Database method to remove record from the database

**Kind**: global function  
**Returns**: delete confirmation message in a json object

| Param | Type            |
| ----- | --------------- |
| table | <code>\*</code> |
| id    | <code>\*</code> |
