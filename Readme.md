# Form Builder

This project let to users on form generation.

## Steps

1. Download 'resources' folder.
2. Define 'Div' element (use an identifier for this).
3. Append to html file the 'form-builder.js' script.
4. Initialize 'FormBuilder' object. This object should has the following fields:
 * **action**: Basically this is the URI who receives form data.
 * **method**: get or post.
 * **identifier**: the ID. 
 * **class**: HTML class.
 * **action_type**: The operation on backend side: at this time we only support insert or update.
5. Define fields array object list.
6. Call generate method from FormBuilder object.
7. Add 'form-validation.js' script to this HTML file to add the functionality for send this data. 

## Features

*Generate form component from data setup through an array object list.
*Generate form component from data setup through an external database servers.
*List data (at this time though table component).
*Edit data.

## Components

- **Input text element**: We need to generate an object with the following fields:
  -- **name**: html input name.
  -- **type**: input
  --**others**: this is an object and we need to define the following fields:
  * **input_type**: text.
  * **label**: The alias for this item.
  * **placeholder**: Text to display through input element.
  
```javascript
fields = [{"name":"first_name","type":"input","others":{"input_type":"text","label":"First Name","placeholder":"First name"}}]
```
- **Select element**: We need to generate an object with the following fields:
  -- **name**: html select name.
  -- **type**: select
  --**others**: this is an object and we need to define the following fields:
  * **label**: The alias for this item.
  * **options**: This is an object list array and basically we need to define the options:
  --**value**: Text.
  --**text**: Text.
  
```javascript
fields = [{"name":"genre","type":"select","others":{"label":"Genre","options":[{"value":"male","text":"Male"},{"value":"female","text":"Female"}]}}]
```
- **TextArea  element**: We need to generate an object with the following fields:
  -- **name**: html input name.
  -- **type**: textarea
  --**others**: this is an object and we need to define the following fields:
  * **label**: The alias for this item.
  * **html-editor**: false.
  
```javascript
fields = [{"name":"comments","type":"textarea","others":{"label":"Comments","html-editor":false}}]
```
- **HtmlEditor  element**: We need to generate an object with the following fields:
  -- **name**: html input name.
  -- **type**: textarea
  --**others**: this is an object and we need to define the following fields:
  * **label**: The alias for this item.
  * **html-editor**: true.
  
```javascript
fields = [{"name":"comments","type":"textarea","others":{"label":"Comments","html-editor":true}}]
```
- **Datetime  element**: We need to generate an object with the following fields:
  -- **name**: html input name.
  -- **type**: input
  --**others**: this is an object and we need to define the following fields:
  * **input_type**: datetime.
  * **label**: Field name.
  
```javascript
fields = [{"name":"created_at","type":"input","others":{"input_type":"datetime","label":"Created at"}}]
```

**Please check the index file on this repository for check a basic implementation for all this components.**