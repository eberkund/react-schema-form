# React Schema Form

[Playground](http://react-schema-form-bootstrap.surge.sh) with React Schema Form - Bootstrap 4

# It's still **WIP**

## Changes in API:

* `react-jsonschema-form` replaced with `@react-schema-form/bootstrap` or generally `@react-schema-form/<uiName>`
* added `props.templates` which contains:
  * `ErrorListTemplate` (used exclusively in Form component),
  * `FieldTemplate`,
  * `FieldErrorsTemplate` (used exclusively in FieldTemplate),
  * `HelpTemplate` (used exclusively in FieldTemplate),
  * `TitleTemplate` (used in FieldTemplate and ArrayFieldTemplate),
  * `DescriptionTemplate` (used in FieldTemplate and ArrayFieldTemplate),
  * `SubmitTemplate` (used in Form component),
  * `ArrayFieldNormalTemplate`,
  * `ArrayFieldFixedTemplate`,
  * `ObjectFieldTemplate`,
  * `UnsupportedTemplate` (used in SchemaField and ArrayField)
* removed `props.ArrayFieldTemplate`(replaced with `props.templates.ArrayFieldNormalTemplate` and `props.templates.ArrayFieldNormalTemplate`)
* removed `props.FieldTemplate`(replaced with `props.templates.FieldTemplate`)
* removed `props.ObjectFieldTemplate`(replaced with `props.templates.ObjectFieldTemplate`)
* added support for individual templates:

```js
const uiSchema = {
  foo: {
    'ui:FieldTemplate': 'CustomFieldTemplate',
    'ui:ArrayFieldTemplate': 'CustomArrayFieldTemplate',
    'ui:ObjectFieldTemplate': 'CustomObjectFieldTemplate'
  }
};
const templates = {
  CustomFieldTemplate,
  CustomArrayFieldTemplate,
  CustomObjectFieldTemplate
}

<Form templates={templates} uiSchema={uiSchema} {...} />
```

## Internal changes:

* `react-jsonschema-form` splitted into multiple packages:
  * `@react-schema-form/form` - Form component
  * `@react-schema-form/fields` - fields
    * `SchemaField`,
    * `ArrayField`,
    * `ObjectField`,
    * `StringField`,
    * `NumberField`,
    * `BooleanField`,
  * `@react-schema-form/bootstrap` - **the actual replacement** of `react-jsonschema-form` with almost the same functionality
    * contains Bootstrap UI (templates and widgets components)
    * contains prewired Form with fields, templates and widgets
  * `@react-schema-form/utils` - common utilities (replaced `utils.js`)
    * `@react-schema-form/utils/lib/compatibility` - reusable compatibility tests for basic or third party packages
    * `@react-schema-form/utils/lib/samples` - samples for playgrounds
    * `@react-schema-form/utils/lib/validate` - replaced `validate.js`
    * `@react-schema-form/utils/lib/test-utils` - test utilities with Jest and `react-testing-library`
      * `const { getState, getField, ...tools } = renderForm(props)`
      * `suppressLogs(type, test)`
* update: Bootstrap 3 -> Bootstrap 4
* repo was restructured to the monorepo with Lerna and Yarn workspaces
  * packages are in `packages` folder
  * playgrounds were moved into `examples` folder
* development:
  * uses Neutrino (compiles for UMD builds) and babel-cli (compiles for `package.module`)
  * all packages can be used in `<script>...</script>` and their global variable names are under `package.variable`
  * playgrounds HTML titles are read from the `package.description`

## TODOs:

* [ ] compatibility tests
* [ ] CodeMirror in playground
* [ ] READMEs (root and for each package in `packages` folder)
  * [ ] root (this)
  * [ ] bootstrap-form
  * [ ] bootstrap-ui
  * [ ] fields
  * [ ] form
  * [ ] utils
  * [ ] utils-compatibility
  * [ ] utils-samples
  * [ ] utils-test
  * [ ] utils-validate
* [ ] repo related
  * [ ] websites
  * [ ] publishing
  * [ ] `lint-staged`
  * [ ] Prettier
  * [ ] Travis
  * [ ] `.npmignore`
  * [ ] settings for debugging in VS Code and Chrome (optional)
* [ ] other UI components
  * [ ] Material
  * [ ] Ant
  * [ ] UI with CSS in JS and with the option of higher CSS specificity (for example including in website - isolating styles)
  * [ ] ...

## Future:

* create Redux version `@react-redux-schema-form`
* extends with debounce

## Development

* requirements: Node.js (I use v10.3.0) and Yarn (uses Yarn workspaces so you need v1.0.0 at least)

### Dependencies

At the root of the repository:

```
$ yarn install
```

or

```
$ lerna bootstrap
```

### Scripts

Start development:

```
$ yarn start
```

Build for production/distribution:

```
$ yarn build
```

Test all packages:

```
$ yarn test
```

TDD development:

```
$ yarn tdd
```

# ORIGINAL content

[![Build Status](https://travis-ci.org/mozilla-services/react-jsonschema-form.svg)](https://travis-ci.org/mozilla-services/react-jsonschema-form)

A simple [React](http://facebook.github.io/react/) component capable of building HTML forms out of a [JSON schema](http://json-schema.org/) and using [Bootstrap](http://getbootstrap.com/) semantics by default.

A [live playground](https://mozilla-services.github.io/react-jsonschema-form/) is hosted on gh-pages.

![](http://i.imgur.com/M8ZCES5.gif)

## Table of Contents

* [Philosophy](#philosophy)
* [Installation](#installation)
  * [As a npm-based project dependency](#as-a-npm-based-project-dependency)
  * [As a script served from a CDN](#as-a-script-served-from-a-cdn)
* [Usage](#usage)
  * [Form initialization](#form-initialization)
  * [Form event handlers](#form-event-handlers)
    * [Form submission](#form-submission)
    * [Form error event handler](#form-error-event-handler)
    * [Form data changes](#form-data-changes)
    * [Form field blur events](#form-field-blur-events)
    * [Form field focus events](#form-field-focus-events)
* [Form customization](#form-customization)
  * [The uiSchema object](#the-uischema-object)
  * [Alternative widgets](#alternative-widgets)
    * [For boolean fields](#for-boolean-fields)
    * [For string fields](#for-string-fields)
      * [String formats](#string-formats)
    * [For number and integer fields](#for-number-and-integer-fields)
    * [Disabled fields](#disabled-fields)
    * [Read-only fields](#read-only-fields)
    * [Hidden widgets](#hidden-widgets)
    * [File widgets](#file-widgets)
      * [Multiple files](#multiple-files)
      * [File widget input ref](#file-widget-input-ref)
  * [Object fields ordering](#object-fields-ordering)
  * [Array item options](#array-item-options)
    * [orderable option](#orderable-option)
    * [addable option](#addable-option)
    * [removable option](#removable-option)
  * [Custom CSS class names](#custom-css-class-names)
  * [Custom labels for enum fields](#custom-labels-for-enum-fields)
    * [Alternative JSON-Schema compliant approach](#alternative-json-schema-compliant-approach)
  * [Disabled attribute for enum fields](#disabled-attribute-for-enum-fields)
  * [Multiple choices list](#multiple-choices-list)
  * [Autogenerated widget ids](#autogenerated-widget-ids)
  * [Form action buttons](#form-action-buttons)
  * [Help texts](#help-texts)
  * [Title texts](#title-texts)
  * [Description texts](#description-texts)
  * [Auto focus](#auto-focus)
  * [Textarea rows option](#textarea-rows-option)
  * [Placeholders](#placeholders)
  * [Field labels](#field-labels)
  * [HTML5 Input Types](#html5-input-types)
  * [Form attributes](#form-attributes)
* [Advanced customization](#advanced-customization)
  * [Field template](#field-template)
  * [Array Field Template](#array-field-template)
  * [Object Field Template](#object-field-template)
  * [Error List template](#error-list-template)
  * [Id prefix](#id-prefix)
  * [Custom widgets and fields](#custom-widgets-and-fields)
  * [Custom widget components](#custom-widget-components)
    * [Custom component registration](#custom-component-registration)
    * [Custom widget options](#custom-widget-options)
    * [Customizing widgets text input](#customizing-widgets-text-input)
  * [Custom field components](#custom-field-components)
    * [Field props](#field-props)
    * [The registry object](#the-registry-object)
    * [The formContext object](#the-formcontext-object)
  * [Custom array field buttons](#custom-array-field-buttons)
  * [Custom SchemaField](#custom-schemafield)
  * [Customizing the default fields and widgets](#customizing-the-default-fields-and-widgets)
  * [Custom titles](#custom-titles)
  * [Custom descriptions](#custom-descriptions)
* [Form data validation](#form-data-validation)
  * [Live validation](#live-validation)
  * [HTML5 Validation](#html5-validation)
  * [Custom validation](#custom-validation)
  * [Custom error messages](#custom-error-messages)
  * [Error List Display](#error-list-display)
  * [The case of empty strings](#the-case-of-empty-strings)
* [Styling your forms](#styling-your-forms)
* [Schema definitions and references](#schema-definitions-and-references)
* [Property dependencies](#property-dependencies)
  * [Unidirectional](#unidirectional)
  * [Bidirectional](#bidirectional)
* [Schema dependencies](#schema-dependencies)
  * [Conditional](#conditional)
  * [Dynamic](#dynamic)
* [JSON Schema supporting status](#json-schema-supporting-status)
* [Tips and tricks](#tips-and-tricks)
* [Contributing](#contributing)
  * [Coding style](#coding-style)
  * [Development server](#development-server)
  * [Tests](#tests)
    * [TDD](#tdd)
  * [Releasing](#releasing)
* [FAQ](#faq)
  * [Q: Does rjsf support oneOf, anyOf, multiple types in an array, etc.?](#q-does-rjsf-support-oneof-anyof-multiple-types-in-an-array-etc)
  * [Q: Will react-jsonschema-form support Material, Ant-Design, Foundation, or [some other specific widget library or frontend style]?](#q-will-react-jsonschema-form-support-material-ant-design-foundation-or-some-other-specific-widget-library-or-frontend-style)
  * [Q: Is there a way to &quot;collapse&quot; fields, for instance to show/hide individual fields?](#q-is-there-a-way-to-collapse-fields-for-instance-to-show-hide-individual-fields)
* [License](#license)

---

## Philosophy

react-jsonschema-form is meant to automatically generate a React form based on a [JSON Schema](http://json-schema.org/). It is a major component in the [kinto-admin](https://github.com/Kinto/kinto-admin/). If you want to generate a form for any data, sight unseen, simply given a JSON schema, react-jsonschema-form may be for you. If you have _a priori_ knowledge of your data and want a toolkit for generating forms for it, you might look elsewhere.

react-jsonschema-form validates that the data conforms to the given schema, but doesn't prevent the user from inputing data that doesn't fit (for example, stripping non-numbers from a number field, or not letting the user add values to an array that is already "full".

## Installation

Requires React 15.0.0+.

> Note: The `master` branch of the repository reflects ongoing development. Releases are published as [tags](https://github.com/mozilla-services/react-jsonschema-form/releases).
>
> You should never blindly install from `master`, but rather check what the available stable releases are.

### As a npm-based project dependency

```
$ npm install react-jsonschema-form --save
```

> Note: While the library renders [Bootstrap](http://getbootstrap.com/) HTML semantics, you have to build/load the Bootstrap styles on your own.

### As a script served from a CDN

```html
  <script src="https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js"></script>
```

Source maps are available at [this url](https://unpkg.com/react-jsonschema-form/dist/react-jsonschema-form.js.map).

> Note: The CDN version **does not** embed _react_ nor _react-dom_.
>
> You'll also need to alias the default export property to use the Form component:

```jsx
const Form = JSONSchemaForm.default;
// or
const { default: Form } = JSONSchemaForm;
```

## Usage

```jsx
import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false }
  }
};

const log = type => console.log.bind(console, type);

render(
  <Form
    schema={schema}
    onChange={log("changed")}
    onSubmit={log("submitted")}
    onError={log("errors")}
  />,
  document.getElementById("app")
);
```

That should give something like this (if you took care of loading the standard [Bootstrap](http://getbootstrap.com/) stylesheet):

![](http://i.imgur.com/DZQYPyu.png)

### Form initialization

Often you'll want to prefill a form with existing data; this is done by passing a `formData` prop object matching the schema:

```jsx
const formData = {
  title: "First task",
  done: true
};

render(
  <Form schema={schema} formData={formData} />,
  document.getElementById("app")
);
```

NOTE: If your form have a single field, pass a single value to `formData`. ex: `formData='Charlie'`

WARNING: If you have situations where your parent component can re-render, make sure you listen to the `onChange` event and update the data you pass to the `formData` attribute.

### Form event handlers

#### Form submission

You can pass a function as the `onSubmit` prop of your `Form` component to listen to when the form is submitted and its data are valid. It will be passed a result object having a `formData` attribute, which is the valid form data you're usually after:

```js
const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);

render(
  <Form schema={schema} onSubmit={onSubmit} />,
  document.getElementById("app")
);
```

#### Form error event handler

To react to when submitted form data are invalid, pass an `onError` handler, which is passed the list of encountered errors:

```js
const onError = errors => console.log("I have", errors.length, "errors to fix");

render(
  <Form schema={schema} onError={onError} />,
  document.getElementById("app")
);
```

#### Form data changes

If you plan on being notified every time the form data are updated, you can pass an `onChange` handler, which will receive the same args as `onSubmit` any time a value is updated in the form.

#### Form field blur events

Sometimes you may want to trigger events or modify external state when a field has been touched, so you can pass an `onBlur` handler, which will receive the id of the input that was blurred and the field value.

#### Form field focus events

Sometimes you may want to trigger events or modify external state when a field has been focused, so you can pass an `onFocus` handler, which will receive the id of the input that is focused and the field value.

## Form customization

### The `uiSchema` object

JSONSchema is limited for describing how a given data type should be rendered as a form input component, that's why this lib introduces the concept of _UI schema_.

A UI schema is basically an object literal providing information on **how** the form should be rendered, while the JSON schema tells **what**.

The uiSchema object follows the tree structure of the form field hierarchy, and for each allows to define how it should be rendered:

```js
const schema = {
  type: "object",
  properties: {
    foo: {
      type: "object",
      properties: {
        bar: { type: "string" }
      }
    },
    baz: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: {
            type: "string"
          }
        }
      }
    }
  }
};

const uiSchema = {
  foo: {
    bar: {
      "ui:widget": "textarea"
    }
  },
  baz: {
    // note the "items" for an array
    items: {
      description: {
        "ui:widget": "textarea"
      }
    }
  }
};

render(
  <Form schema={schema} uiSchema={uiSchema} />,
  document.getElementById("app")
);
```

### Alternative widgets

The uiSchema `ui:widget` property tells the form which UI widget should be used to render a certain field:

Example:

```jsx
const uiSchema = {
  done: {
    "ui:widget": "radio" // could also be "select"
  }
};

render(
  <Form schema={schema} uiSchema={uiSchema} formData={formData} />,
  document.getElementById("app")
);
```

Here's a list of supported alternative widgets for different JSONSchema data types:

#### For `boolean` fields

* `radio`: a radio button group with `true` and `false` as selectable values;
* `select`: a select box with `true` and `false` as options;
* by default, a checkbox is used

> Note: To set the labels for a boolean field, instead of using `true` and `false` you can set `enumNames` in your schema. Note that `enumNames` belongs in your `schema`, not the `uiSchema`, and the order is always `[true, false]`.

#### For `string` fields

* `textarea`: a `textarea` element is used;
* `password`: an `input[type=password]` element is used;
* `color`: an `input[type=color]` element is used;
* by default, a regular `input[type=text]` element is used.

##### String formats

The built-in string field also supports the JSONSchema `format` property, and will render an appropriate widget by default for the following string formats:

* `email`: An `input[type=email]` element is used;
* `uri`: An `input[type=url]` element is used;
* `data-url`: By default, an `input[type=file]` element is used; in case the string is part of an array, multiple files will be handled automatically (see [File widgets](#file-widgets)).
* `date`: By default, an `input[type=date]` element is used;
* `date-time`: By default, an `input[type=datetime-local]` element is used.

![](http://i.imgur.com/xqu6Lcp.png)

Please note that while standardized, `datetime-local` and `date` input elements are not yet supported by Firefox and IE. If you plan on targeting these platforms, two alternative widgets are available:

* `alt-datetime`: Six `select` elements are used to select the year, the month, the day, the hour, the minute and the second;
* `alt-date`: Three `select` elements are used to select the year, month and the day.

![](http://i.imgur.com/VF5tY60.png)

You can customize the list of years displayed in the _year_ select by providing a `yearsRange` property to `ui:options` in your uiSchema:

```jsx
uiSchema: {
  a_date: {
    "alt-datetime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        yearsRange: [1980, 2030],
      },
    },
  },
},
```

#### For `number` and `integer` fields

* `updown`: an `input[type=number]` updown selector;
* `range`: an `input[type=range]` slider;
* `radio`: a radio button group with enum values. **can only be used when `enum` values are specified for this input**
* by default, a regular `input[type=text]` element is used.

> Note: for numbers, `min`, `max` and `step` input attributes values will be handled according to JSONSchema's `minimum`, `maximum` and `multipleOf` values when they're defined.

#### Disabled fields

The `ui:disabled` uiSchema directive will disable all child widgets from a given field.

#### Read-only fields

The `ui:readonly` uiSchema directive will mark all child widgets from a given field as read-only.

> Note: if you're about the difference between a _disabled_ field and a _readonly_ one: marking a field as read-only will render it greyed but its text value will be selectable; disabling it will prevent its value to be selected at all.

#### Hidden widgets

It's possible to use a hidden widget for a given field by setting the `ui:widget` uiSchema directive to `hidden` for this field:

```js
const schema = {
  type: "object",
  properties: {
    foo: { type: "boolean" }
  }
};

const uiSchema = {
  foo: { "ui:widget": "hidden" }
};
```

> Notes
>
> * Hiding widgets is only supported for `boolean`, `string`, `number` and `integer` schema types;
> * A hidden widget takes its value from the `formData` prop.

#### File widgets

This library supports a limited form of `input[type=file]` widgets, in the sense that it will propagate file contents to form data state as [data-url](http://dataurl.net/#about)s.

There are two ways to use file widgets:

**By declaring a `string` json schema type along a `data-url` [format](#string-formats):**

```js
const schema = {
  type: "string",
  format: "data-url"
};
```

**By specifying a `ui:widget` field uiSchema directive as `file`:**

```js
const schema = {
  type: "string"
};

const uiSchema = {
  "ui:widget": "file"
};
```

##### Multiple files

Multiple files selectors are supported by defining an array of strings having `data-url` as a format:

```js
const schema = {
  type: "array",
  items: {
    type: "string",
    format: "data-url"
  }
};
```

> Note that storing large dataURIs into form state might slow rendering.

##### File widget input ref

The included `FileWidget` exposes a reference to the `<input type="file" />` element node as an `inputRef` component property.

This allows you to programmatically trigger the browser's file selector which can be used in a custom file widget.

### Object fields ordering

Since the order of object properties in Javascript and JSON is not guaranteed, the `uiSchema` object spec allows you to define the order in which properties are rendered using the `ui:order` property:

```jsx
const schema = {
  type: "object",
  properties: {
    foo: { type: "string" },
    bar: { type: "string" }
  }
};

const uiSchema = {
  "ui:order": ["bar", "foo"]
};

render(
  <Form schema={schema} uiSchema={uiSchema} />,
  document.getElementById("app")
);
```

If a guaranteed fixed order is only important for some fields, you can insert a wildcard `"*"` item in your `ui:order` definition. All fields that are not referenced explicitly anywhere in the list will be rendered at that point:

```js
const uiSchema = {
  "ui:order": ["bar", "*"]
};
```

### Array item options

#### `orderable` option

Array items are orderable by default, and react-jsonschema-form renders move up/down buttons alongside them. The `uiSchema` object spec allows you to disable ordering:

```jsx
const schema = {
  type: "array",
  items: {
    type: "string"
  }
};

const uiSchema = {
  "ui:options": {
    orderable: false
  }
};
```

#### `addable` option

If either `items` or `additionalItems` contains a schema object, an add button for new items is shown by default. You can turn this off with the `addable` option in `uiSchema`:

```jsx
const uiSchema = {
  "ui:options": {
    addable: false
  }
};
```

#### `removable` option

A remove button is shown by default for an item if `items` contains a schema object, or the item is an `additionalItems` instance. You can turn this off with the `removable` option in `uiSchema`:

```jsx
const uiSchema = {
  "ui:options": {
    removable: false
  }
};
```

### Custom CSS class names

The uiSchema object accepts a `classNames` property for each field of the schema:

```jsx
const uiSchema = {
  title: {
    classNames: "task-title foo-bar"
  }
};
```

Will result in:

```html
<div class="field field-string task-title foo-bar" >
  <label>
    <span>Title*</span>
    <input value="My task" required="" type="text">
  </label>
</div>
```

### Custom labels for `enum` fields

This library supports the [`enumNames`](https://github.com/json-schema/json-schema/wiki/enumNames-%28v5-proposal%29) property for `enum` fields, which allows defining custom labels for each option of an `enum`:

```js
const schema = {
  type: "number",
  enum: [1, 2, 3],
  enumNames: ["one", "two", "three"]
};
```

This will be rendered using a select box that way:

```html
<select>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>
```

Note that string representations of numbers will be cast back and reflected as actual numbers into form state.

#### Alternative JSON-Schema compliant approach

The JSON Schema team concluded an alternative approach instead of enumNames and react-jsonschema-form supports it as well.

```js
const schema = {
  type: "number",
  anyOf: [
    {
      type: "number",
      title: "one",
      enum: [1]
    },
    {
      type: "number",
      title: "two",
      enum: [2]
    },
    {
      type: "number",
      title: "three",
      enum: [3]
    }
  ]
};
```

As above this will be rendered using a select box as so:

```html
<select>
  <option value="1">one</option>
  <option value="2">two</option>
  <option value="3">three</option>
</select>
```

A live example of both approaches side-by-side can be found in the **Alternatives** playground preset.

### Disabled attribute for `enum` fields

This library supports the 'disabled' attribute for `enum` options. Enum disabled allows disabling options for 'enum' fields.This attribute can be added as a part of uiSchema.

```js
const schema = {
  type: "string",
  enum: ["one", "two", "three"]
};

const uiSchema = {
  "ui:enumDisabled": ["two"]
};
```

This will be rendered using a select box that way:

```html
<select>
  <option value="1">one</option>
  <option value="2" disabled>two</option>
  <option value="3">three</option>
</select>
```

### Multiple choices list

The default behavior for array fields is a list of text inputs with add/remove buttons. Though there are two alternative simpler widgets for common situations like picking elements against a list of choices; typically this maps to a schema having:

* an `enum` list for the `items` property of an `array` field
* with the `uniqueItems` property set to `true`

Example:

```js
const schema = {
  type: "array",
  title: "A multiple choices list",
  items: {
    type: "string",
    enum: ["foo", "bar", "fuzz", "qux"]
  },
  uniqueItems: true
};
```

By default, this will automatically render a multiple select box. If you prefer a list of checkboxes, just set the uiSchema `ui:widget` directive to `"checkboxes"` for that field:

```js
const uiSchema = {
  "ui:widget": "checkboxes"
};
```

Care should be taken when using the `required` property with arrays. An empty array is sufficient to pass that validation check. If you wish to ensure the user populates the array, you can specify the minimum number of items the user must select with the `minItems` property.

Example:

```js
const schema = {
  type: "array",
  minItems: 2,
  title: "A multiple choices list",
  items: {
    type: "string",
    enum: ["foo", "bar", "fuzz", "qux"]
  },
  uniqueItems: true
};
```

By default, checkboxes are stacked but if you prefer them inline:

```js
const uiSchema = {
  "ui:widget": "checkboxes",
  "ui:options": {
    inline: true
  }
};
```

See the "Arrays" section of the playground for cool demos.

### Autogenerated widget ids

By default, the lib will generate ids unique to the form for all rendered widgets. But if you plan on using multiple instances of the `Form` component in a same page, it's wise to declare a root prefix for these, using the `ui:rootFieldId` uiSchema directive:

```js
const uiSchema = {
  "ui:rootFieldId": "myform"
};
```

So all widgets will have an id prefixed with `myform`.

### Form action buttons

You can provide custom buttons to your form via the `Form` component's `children`. A default submit button will be rendered if you don't provide children to the `Form` component.

```jsx
render(
  <Form schema={schema}>
    <div>
      <button type="submit">Submit</button>
      <button type="button">Cancel</button>
    </div>
  </Form>,
  document.getElementById("app")
);
```

**Warning:** there should be a button or an input with `type="submit"` to trigger the form submission (and then the form validation).

### Help texts

Sometimes it's convenient to add some text next to a field to guide the end user filling it; this is the purpose of the `ui:help` uiSchema directive:

```js
const schema = { type: "string" };
const uiSchema = {
  "ui:widget": "password",
  "ui:help": "Hint: Make it strong!"
};
```

![](http://i.imgur.com/scJUuZo.png)

Help texts work for any kind of field at any level, and will always be rendered immediately below the field component widget(s), but after contextualized errors, if any.

### Title texts

Sometimes it's convenient to change title a field; this is the purpose of the `ui:title` uiSchema directive:

```js
const schema = { type: "string" };
const uiSchema = {
  "ui:widget": "password",
  "ui:title": "Your password"
};
```

### Description texts

Sometimes it's convenient to change description a field; this is the purpose of the `ui:description` uiSchema directive:

```js
const schema = { type: "string" };
const uiSchema = {
  "ui:widget": "password",
  "ui:description": "The best password"
};
```

### Auto focus

If you want to focus on a text input or textarea input/on a widget automatically, just set `ui:autofocus` uiSchema directive to `true`.

```js
const schema = { type: "string" };
const uiSchema = {
  "ui:widget": "textarea",
  "ui:autofocus": true
};
```

### Textarea `rows` option

You can set initial height of a textarea widget by specifying `rows` option.

```js
const schema = { type: "string" };
const uiSchema = {
  "ui:widget": "textarea",
  "ui:options": {
    rows: 15
  }
};
```

### Placeholders

Text fields can benefit from placeholders by using the `ui:placeholder` uiSchema directive:

```jsx
const schema = { type: "string", format: "uri" };
const uiSchema = {
  "ui:placeholder": "http://"
};
```

![](http://i.imgur.com/MbHypKg.png)

Fields using `enum` can also use `ui:placeholder`. The value will be used as the text for the empty option in the select widget.

```jsx
const schema = { type: "string", enum: ["First", "Second"] };
const uiSchema = {
  "ui:placeholder": "Choose an option"
};
```

### Field labels

Field labels are rendered by default. Labels may be omitted by setting the `label` option to `false` from `ui:options` uiSchema directive.

```jsx
const schema = { type: "string" };
const uiSchema = {
  "ui:options": {
    label: false
  }
};
```

### HTML5 Input Types

If all you need to do is change the input type (for using things like input type="tel") you can specify the `inputType` from `ui:options` uiSchema directive.

```jsx
const schema = { type: "string" };
const uiSchema = {
  "ui:options": {
    inputType: "tel"
  }
};
```

### Form attributes

Form component supports the following html attributes:

```jsx
<Form
  id="edit-form"
  className="form form-wide"
  name="awesomeForm"
  method="post"
  target="_blank"
  action="/users/list"
  autocomplete="off"
  enctype="multipart/form-data"
  acceptcharset="ISO-8859-1"
  schema={} />
```

## Advanced customization

### Field template

To take control over the inner organization of each field (each form row), you can define a _field template_ for your form.

A field template is basically a React stateless component being passed field-related props so you can structure your form row as you like:

```jsx
function CustomFieldTemplate(props) {
  const {id, classNames, label, help, required, description, errors, children} = props;
  return (
    <div className={classNames}>
      <label htmlFor={id}>{label}{required ? "*" : null}</label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

render((
  <Form schema={schema}
        FieldTemplate={CustomFieldTemplate} />,
), document.getElementById("app"));
```

If you want to handle the rendering of each element yourself, you can use the props `rawHelp`, `rawDescription` and `rawErrors`.

The following props are passed to a custom field template component:

* `id`: The id of the field in the hierarchy. You can use it to render a label targeting the wrapped widget.
* `classNames`: A string containing the base bootstrap CSS classes merged with any [custom ones](#custom-css-class-names) defined in your uiSchema.
* `label`: The computed label for this field, as a string.
* `description`: A component instance rendering the field description, if any defined (this will use any [custom `DescriptionField`](#custom-descriptions) defined).
* `rawDescription`: A string containing any `ui:description` uiSchema directive defined.
* `children`: The field or widget component instance for this field row.
* `errors`: A component instance listing any encountered errors for this field.
* `rawErrors`: An array of strings listing all generated error messages from encountered errors for this field.
* `help`: A component instance rendering any `ui:help` uiSchema directive defined.
* `rawHelp`: A string containing any `ui:help` uiSchema directive defined. **NOTE:** `rawHelp` will be `undefined` if passed `ui:help` is a React component instead of a string.
* `hidden`: A boolean value stating if the field should be hidden.
* `required`: A boolean value stating if the field is required.
* `readonly`: A boolean value stating if the field is read-only.
* `disabled`: A boolean value stating if the field is disabled.
* `displayLabel`: A boolean value stating if the label should be rendered or not. This is useful for nested fields in arrays where you don't want to clutter the UI.
* `fields`: An array containing all Form's fields including your [custom fields](#custom-field-components) and the built-in fields.
* `schema`: The schema object for this field.
* `uiSchema`: The uiSchema object for this field.
* `formContext`: The `formContext` object that you passed to Form.

> Note: you can only define a single field template for a form. If you need many, it's probably time to look at [custom fields](#custom-field-components) instead.

### Array Field Template

Similarly to the `FieldTemplate` you can use an `ArrayFieldTemplate` to customize how your
arrays are rendered. This allows you to customize your array, and each element in the array.

```jsx
function ArrayFieldTemplate(props) {
  return (
    <div>
      {props.items.map(element => element.children)}
      {props.canAdd && <button type="button" onClick={props.onAddClick}></button>}
    </div>
  );
}

render((
  <Form schema={schema}
        ArrayFieldTemplate={ArrayFieldTemplate} />,
), document.getElementById("app"));
```

Please see [customArray.js](https://github.com/mozilla-services/react-jsonschema-form/blob/master/playground/samples/customArray.js) for a better example.

The following props are passed to each `ArrayFieldTemplate`:

* `DescriptionField`: The `DescriptionField` from the registry (in case you wanted to utilize it)
* `TitleField`: The `TitleField` from the registry (in case you wanted to utilize it).
* `canAdd`: A boolean value stating whether new elements can be added to the array.
* `className`: The className string.
* `disabled`: A boolean value stating if the array is disabled.
* `idSchema`: Object
* `items`: An array of objects representing the items in the array. Each of the items represent a child with properties described below.
* `onAddClick: (event) => void`: A function that adds a new item to the array.
* `readonly`: A boolean value stating if the array is read-only.
* `required`: A boolean value stating if the array is required.
* `schema`: The schema object for this array.
* `uiSchema`: The uiSchema object for this array field.
* `title`: A string value containing the title for the array.
* `formContext`: The `formContext` object that you passed to Form.
* `formData`: The formData for this array.

The following props are part of each element in `items`:

* `children`: The html for the item's content.
* `className`: The className string.
* `disabled`: A boolean value stating if the array item is disabled.
* `hasMoveDown`: A boolean value stating whether the array item can be moved down.
* `hasMoveUp`: A boolean value stating whether the array item can be moved up.
* `hasRemove`: A boolean value stating whether the array item can be removed.
* `hasToolbar`: A boolean value stating whether the array item has a toolbar.
* `index`: A number stating the index the array item occurs in `items`.
* `onDropIndexClick: (index) => (event) => void`: Returns a function that removes the item at `index`.
* `onReorderClick: (index, newIndex) => (event) => void`: Returns a function that swaps the items at `index` with `newIndex`.
* `readonly`: A boolean value stating if the array item is read-only.

### Object Field Template

Similarly to the `FieldTemplate` you can use an `ObjectFieldTemplate` to customize how your
objects are rendered.

```jsx
function ObjectFieldTemplate(props) {
  return (
    <div>
      {props.title}
      {props.description}
      {props.properties.map(element => <div className="property-wrapper">{element.children}</div>)}
    </div>
  );
}

render((
  <Form schema={schema}
        ObjectFieldTemplate={ObjectFieldTemplate} />,
), document.getElementById("app"));
```

Please see [customObject.js](https://github.com/mozilla-services/react-jsonschema-form/blob/master/playground/samples/customObject.js) for a better example.

The following props are passed to each `ObjectFieldTemplate`:

* `DescriptionField`: The `DescriptionField` from the registry (in case you wanted to utilize it)
* `TitleField`: The `TitleField` from the registry (in case you wanted to utilize it).
* `title`: A string value containing the title for the object.
* `description`: A string value containing the description for the object.
* `properties`: An array of object representing the properties in the array. Each of the properties represent a child with properties described below.
* `required`: A boolean value stating if the object is required.
* `schema`: The schema object for this object.
* `uiSchema`: The uiSchema object for this object field.
* `idSchema`: An object containing the id for this object & ids for it's properties.
* `formData`: The form data for the object.
* `formContext`: The `formContext` object that you passed to Form.

The following props are part of each element in `properties`:

* `content`: The html for the property's content.
* `name`: A string representing the property name.
* `disabled`: A boolean value stating if the object property is disabled.
* `readonly`: A boolean value stating if the property is read-only.

### Error List template

To take control over how the form errors are displayed, you can define an _error list template_ for your form. This list is the form global error list that appears at the top of your forms.

An error list template is basically a React stateless component being passed errors as props so you can render them as you like:

```jsx
function ErrorListTemplate(props) {
  const {errors} = props;
  return (
    <div>
      {errors.map((error, i) => {
        return (
          <li key={i}>
            {error.stack}
          </li>
        );
      })}
    </div>
  );
}

render((
  <Form schema={schema}
        showErrorList={true}
        ErrorList={ErrorListTemplate} />,
), document.getElementById("app"));
```

> Note: Your custom `ErrorList` template will only render when `showErrorList` is `true`.

The following props are passed to `ErrorList`

* `errors`: An array of the errors.
* `errorSchema`: The errorSchema constructed by `Form`.
* `schema`: The schema that was passed to `Form`.
* `uiSchema`: The uiSchema that was passed to `Form`.
* `formContext`: The `formContext` object that you passed to Form.

### Id prefix

To avoid collisions with existing ids in the DOM, it is possible to change the prefix used for ids (the default is `root`).

```jsx
render((
  <Form schema={schema}
        idPrefix={"rjsf_prefix"}/>,
), document.getElementById("app"));
```

This will render `<input id="rjsf_prefix_key">` instead of `<input id="root_key">`

### Custom widgets and fields

The API allows to specify your own custom _widget_ and _field_ components:

* A _widget_ represents a HTML tag for the user to enter data, eg. `input`, `select`, etc.
* A _field_ usually wraps one or more widgets and most often handles internal field state; think of a field as a form row, including the labels.

### Custom widget components

You can provide your own custom widgets to a uiSchema for the following json data types:

* `string`
* `number`
* `integer`
* `boolean`

```jsx
const schema = {
  type: "string"
};

const uiSchema = {
  "ui:widget": (props) => {
    return (
      <input type="text"
        className="custom"
        value={props.value}
        required={props.required}
        onChange={(event) => props.onChange(event.target.value)} />
    );
  }
};

render((
  <Form schema={schema}
        uiSchema={uiSchema} />,
), document.getElementById("app"));
```

The following props are passed to custom widget components:

* `id`: The generated id for this field;
* `schema`: The JSONSchema subschema object for this field;
* `value`: The current value for this field;
* `required`: The required status of this field;
* `disabled`: `true` if the widget is disabled;
* `readonly`: `true` if the widget is read-only;
* `onChange`: The value change event handler; call it with the new value everytime it changes;
* `onBlur`: The input blur event handler; call it with the the widget id and value;
* `onFocus`: The input focus event handler; call it with the the widget id and value;
* `options`: A map of options passed as a prop to the component (see [Custom widget options](#custom-widget-options)).
* `formContext`: The `formContext` object that you passed to Form.

> Note: Prior to v0.35.0, the `options` prop contained the list of options (`label` and `value`) for `enum` fields. Since v0.35.0, it now exposes this list as the `enumOptions` property within the `options` object.

#### Custom component registration

Alternatively, you can register them all at once by passing the `widgets` prop to the `Form` component, and reference their identifier from the `uiSchema`:

```jsx
const MyCustomWidget = props => {
  return (
    <input
      type="text"
      className="custom"
      value={props.value}
      required={props.required}
      onChange={event => props.onChange(event.target.value)}
    />
  );
};

const widgets = {
  myCustomWidget: MyCustomWidget
};

const uiSchema = {
  "ui:widget": "myCustomWidget"
};

render(
  <Form schema={schema} uiSchema={uiSchema} widgets={widgets} />,
  document.getElementById("app")
);
```

This is useful if you expose the `uiSchema` as pure JSON, which can't carry functions.

> Note: Until 0.40.0 it was possible to register a widget as object with shape `{ component: MyCustomWidget, options: {...} }`. This undocumented API has been removed. Instead, you can register a custom widget with a React `defaultProps` property. `defaultProps.options` can be an object containing your custom options.

#### Custom widget options

If you need to pass options to your custom widget, you can add a `ui:options` object containing those properties. If the widget has `defaultProps`, the options will be merged with the (optional) options object from `defaultProps`:

```jsx
const schema = {
  type: "string"
};

function MyCustomWidget(props) {
  const { options } = props;
  const { color, backgroundColor } = options;
  return <input style={{ color, backgroundColor }} />;
}

MyCustomWidget.defaultProps = {
  options: {
    color: "red"
  }
};

const uiSchema = {
  "ui:widget": MyCustomWidget,
  "ui:options": {
    backgroundColor: "yellow"
  }
};

// renders red on yellow input
render(
  <Form schema={schema} uiSchema={uiSchema} />,
  document.getElementById("app")
);
```

> Note: This also applies to [registered custom components](#custom-component-registration).

> Note: Since v0.41.0, the `ui:widget` object API, where a widget and options were specified with `"ui:widget": {component, options}` shape, is deprecated. It will be removed in a future release.

#### Customizing widgets text input

All the widgets that render a text input use the `BaseInput` component internally. If you need to customize all text inputs without customizing all widgets individially, you can provide a `BaseInput` component in the `widgets` property of `Form` (see [Custom component registration](#custom-component-registration).

### Custom field components

You can provide your own field components to a uiSchema for basically any json schema data type, by specifying a `ui:field` property.

For example, let's create and register a dumb `geo` component handling a _latitude_ and a _longitude_:

```jsx
const schema = {
  type: "object",
  required: ["lat", "lon"],
  properties: {
    lat: { type: "number" },
    lon: { type: "number" }
  }
};

// Define a custom component for handling the root position object
class GeoPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name) {
    return event => {
      this.setState(
        {
          [name]: parseFloat(event.target.value)
        },
        () => this.props.onChange(this.state)
      );
    };
  }

  render() {
    const { lat, lon } = this.state;
    return (
      <div>
        <input type="number" value={lat} onChange={this.onChange("lat")} />
        <input type="number" value={lon} onChange={this.onChange("lon")} />
      </div>
    );
  }
}

// Define the custom field component to use for the root object
const uiSchema = { "ui:field": "geo" };

// Define the custom field components to register; here our "geo"
// custom field component
const fields = { geo: GeoPosition };

// Render the form with all the properties we just defined passed
// as props
render(
  <Form schema={schema} uiSchema={uiSchema} fields={fields} />,
  document.getElementById("app")
);
```

> Note: Registered fields can be reused across the entire schema.

#### Field props

A field component will always be passed the following props:

* `schema`: The JSON schema for this field;
* `uiSchema`: The [uiSchema](#the-uischema-object) for this field;
* `idSchema`: The tree of unique ids for every child field;
* `formData`: The data for this field;
* `errorSchema`: The tree of errors for this field and its children;
* `registry`: A [registry](#the-registry-object) object (read next).
* `formContext`: A [formContext](#the-formcontext-object) object (read next next).

#### The `registry` object

The `registry` is an object containing the registered custom fields and widgets as well as root schema definitions.

* `fields`: The [custom registered fields](#custom-field-components). By default this object contains the standard `SchemaField`, `TitleField` and `DescriptionField` components;
* `widgets`: The [custom registered widgets](#custom-widget-components), if any;
* `definitions`: The root schema [definitions](#schema-definitions-and-references), if any.
* `formContext`: The [formContext](#the-formcontext-object) object.

The registry is passed down the component tree, so you can access it from your custom field and `SchemaField` components.

#### The `formContext` object

You can provide a `formContext` object to the Form, which is passed down to all fields and widgets (including [TitleField](#custom-titles) and [DescriptionField](#custom-descriptions)). Useful for implementing context aware fields and widgets.

### Custom array field buttons

The `ArrayField` component provides a UI to add, remove and reorder array items, and these buttons use [Bootstrap glyphicons](http://getbootstrap.com/components/#glyphicons). If you don't use glyphicons but still want to provide your own icons or texts for these buttons, you can easily do so using CSS:

```css
i.glyphicon {
  display: none;
}
.btn-add::after {
  content: "Add";
}
.array-item-move-up::after {
  content: "Move Up";
}
.array-item-move-down::after {
  content: "Move Down";
}
.array-item-remove::after {
  content: "Remove";
}
```

### Custom SchemaField

**Warning:** This is a powerful feature as you can override the whole form behavior and easily mess it up. Handle with care.

You can provide your own implementation of the `SchemaField` base React component for rendering any JSONSchema field type, including objects and arrays. This is useful when you want to augment a given field type with supplementary powers.

To proceed so, pass a `fields` object having a `SchemaField` property to your `Form` component; here's a rather silly example wrapping the standard `SchemaField` lib component:

```jsx
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

const CustomSchemaField = function(props) {
  return (
    <div id="custom">
      <p>Yeah, I'm pretty dumb.</p>
      <SchemaField {...props} />
    </div>
  );
};

const fields = {
  SchemaField: CustomSchemaField
};

render(
  <Form
    schema={schema}
    uiSchema={uiSchema}
    formData={formData}
    fields={fields}
  />,
  document.getElementById("app")
);
```

If you're curious how this could ever be useful, have a look at the [Kinto formbuilder](https://github.com/Kinto/formbuilder) repository to see how it's used to provide editing capabilities to any form field.

Props passed to a custom SchemaField are the same as [the ones passed to a custom field](#field-props).

### Customizing the default fields and widgets

You can override any default field and widget, including the internal widgets like the `CheckboxWidget` that `ObjectField` renders for boolean values. You can override any field and widget just by providing the customized fields/widgets in the `fields` and `widgets` props:

```jsx
const CustomCheckbox = function(props) {
  return (
    <button
      id="custom"
      className={props.value ? "checked" : "unchecked"}
      onClick={() => props.onChange(!props.value)}
    >
      {props.value}
    </button>
  );
};

const widgets = {
  CheckboxWidget: CustomCheckbox
};

render(
  <Form
    schema={schema}
    uiSchema={uiSchema}
    formData={formData}
    widgets={widgets}
  />,
  document.getElementById("app")
);
```

This allows you to create a reusable customized form class with your custom fields and widgets:

```jsx
const customFields = { StringField: CustomString };
const customWidgets = { CheckboxWidget: CustomCheckbox };

function MyForm(props) {
  return <Form fields={customFields} widgets={customWidgets} {...props} />;
}

render(
  <MyForm schema={schema} uiSchema={uiSchema} formData={formData} />,
  document.getElementById("app")
);
```

### Custom titles

You can provide your own implementation of the `TitleField` base React component for rendering any title. This is useful when you want to augment how titles are handled.

Simply pass a `fields` object having a `TitleField` property to your `Form` component:

```jsx
const CustomTitleField = ({ title, required }) => {
  const legend = required ? title + "*" : title;
  return <div id="custom">{legend}</div>;
};

const fields = {
  TitleField: CustomTitleField
};

render(
  <Form
    schema={schema}
    uiSchema={uiSchema}
    formData={formData}
    fields={fields}
  />,
  document.getElementById("app")
);
```

### Custom descriptions

You can provide your own implementation of the `DescriptionField` base React component for rendering any description.

Simply pass a `fields` object having a `DescriptionField` property to your `Form` component:

```jsx
const CustomDescriptionField = ({ id, description }) => {
  return <div id={id}>{description}</div>;
};

const fields = {
  DescriptionField: CustomDescriptionField
};

render(
  <Form
    schema={schema}
    uiSchema={uiSchema}
    formData={formData}
    fields={fields}
  />,
  document.getElementById("app")
);
```

## Form data validation

### Live validation

By default, form data are only validated when the form is submitted or when a new `formData` prop is passed to the `Form` component.

You can enable live form data validation by passing a `liveValidate` prop to the `Form` component, and set it to `true`. Then, everytime a value changes within the form data tree (eg. the user entering a character in a field), a validation operation is performed, and the validation results are reflected into the form state.

Be warned that this is an expensive strategy, with possibly strong impact on performances.

To disable validation entirely, you can set Form's `noValidate` prop to `true`.

### HTML5 Validation

By default, required field errors will cause the browser to display its standard HTML5 `required` attribute error messages and prevent form submission. If you would like to turn this off, you can set Form's `noHtml5Validate` prop to `true`, which will set `noValidate` on the `form` element.

### Custom validation

Form data is always validated against the JSON schema.

But it is possible to define your own custom validation rules. This is especially useful when the validation depends on several interdependent fields.

```js
function validate(formData, errors) {
  if (formData.pass1 !== formData.pass2) {
    errors.pass2.addError("Passwords don't match");
  }
  return errors;
}

const schema = {
  type: "object",
  properties: {
    pass1: { type: "string", minLength: 3 },
    pass2: { type: "string", minLength: 3 }
  }
};

render(
  <Form schema={schema} validate={validate} />,
  document.getElementById("app")
);
```

> Notes:
>
> * The `validate()` function must **always** return the `errors` object
>   received as second argument.
> * The `validate()` function is called **after** the JSON schema validation.

### Custom error messages

Validation error messages are provided by the JSON Schema validation by default. If you need to change these messages or make any other modifications to the errors from the JSON Schema validation, you can define a transform function that receives the list of JSON Schema errors and returns a new list.

```js
function transformErrors(errors) {
  return errors.map(error => {
    if (error.name === "pattern") {
      error.message = "Only digits are allowed";
    }
    return error;
  });
}

const schema = {
  type: "object",
  properties: {
    onlyNumbersString: { type: "string", pattern: "^\\d*$" }
  }
};

render(
  <Form schema={schema} transformErrors={transformErrors} />,
  document.getElementById("app")
);
```

> Notes:
>
> * The `transformErrors()` function must return the list of errors. Modifying the list in place without returning it will result in an error.

### Error List Display

To disable rendering of the error list at the top of the form, you can set the `showErrorList` prop to `false`. Doing so will still validate the form, but only the inline display will show.

```js
render(
  <Form schema={schema} showErrorList={false} />,
  document.getElementById("app")
);
```

> Note: you can also use your own [ErrorList](#error-list-template)

### The case of empty strings

When a text input is empty, the field in form data is set to `undefined`. String fields that use `enum` and a `select` widget will have an empty option at the top of the options list that when selected will result in the field being `undefined`.

One consequence of this is that if you have an empty string in your `enum` array, selecting that option in the `select` input will cause the field to be set to `undefined`, not an empty string.

If you want to have the field set to a default value when empty you can provide a `ui:emptyValue` field in the `uiSchema` object.

## Styling your forms

This library renders form fields and widgets leveraging the [Bootstrap](http://getbootstrap.com/) semantics. That means your forms will be beautiful by default if you're loading its stylesheet in your page.

You're not necessarily forced to use Bootstrap; while it uses its semantics, it also provides a bunch of other class names so you can bring new styles or override default ones quite easily in your own personalized stylesheet. That's just HTML after all :)

If you're okay with using styles from the Bootstrap ecosystem though, then the good news is that you have access to many themes for it, which are compatible with our generated forms!

Here are some examples from the [playground](http://mozilla-services.github.io/react-jsonschema-form/), using some of the [Bootswatch](http://bootswatch.com/) free themes:

![](http://i.imgur.com/1Z5oUK3.png)
![](http://i.imgur.com/IMFqMwK.png)
![](http://i.imgur.com/HOACwt5.png)

Last, if you really really want to override the semantics generated by the lib, you can always create and use your own custom [widget](#custom-widget-components), [field](#custom-field-components) and/or [schema field](#custom-schemafield) components.

## Schema definitions and references

This library partially supports [inline schema definition dereferencing](http://json-schema.org/latest/json-schema-core.html#rfc.section.7.2.3), which is Barbarian for _avoiding to copy and paste commonly used field schemas_:

```json
{
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  },
  "type": "object",
  "properties": {
    "billing_address": { "$ref": "#/definitions/address" },
    "shipping_address": { "$ref": "#/definitions/address" }
  }
}
```

_(Sample schema courtesy of the [Space Telescope Science Institute](http://spacetelescope.github.io/understanding-json-schema/structuring.html))_

Note that it only supports local definition referencing, we do not plan on fetching foreign schemas over HTTP anytime soon. Basically, you can only reference a definition from the very schema object defining it.

## Property dependencies

This library supports conditionally making fields required based on the presence of other fields.

### Unidirectional

In the following example the `billing_address` field will be required if `credit_card` is defined.

```json
{
  "type": "object",

  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" },
    "billing_address": { "type": "string" }
  },

  "required": ["name"],

  "dependencies": {
    "credit_card": ["billing_address"]
  }
}
```

### Bidirectional

In the following example the `billing_address` field will be required if `credit_card` is defined and the `credit_card`
field will be required if `billing_address` is defined making them both required if either is defined.

```json
{
  "type": "object",

  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" },
    "billing_address": { "type": "string" }
  },

  "required": ["name"],

  "dependencies": {
    "credit_card": ["billing_address"],
    "billing_address": ["credit_card"]
  }
}
```

_(Sample schemas courtesy of the [Space Telescope Science Institute](https://spacetelescope.github.io/understanding-json-schema/reference/object.html#property-dependencies))_

## Schema dependencies

This library also supports modifying portions of a schema based on form data.

### Conditional

```json
{
  "type": "object",

  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" }
  },

  "required": ["name"],

  "dependencies": {
    "credit_card": {
      "properties": {
        "billing_address": { "type": "string" }
      },
      "required": ["billing_address"]
    }
  }
}
```

In this example the `billing_address` field will be displayed in the form if `credit_card` is defined.

_(Sample schemas courtesy of the [Space Telescope Science Institute](https://spacetelescope.github.io/understanding-json-schema/reference/object.html#schema-dependencies))_

### Dynamic

The JSON Schema standard says that the dependency is triggered if the property is present. However, sometimes it's useful to have more sophisticated rules guiding the application of the dependency. For example, maybe you have three possible values for a field, and each one should lead to adding a different question. For this, we support a very restricted use of the `oneOf` keyword.

```json
{
  "title": "Person",
  "type": "object",
  "properties": {
    "Do you have any pets?": {
      "type": "string",
      "enum": ["No", "Yes: One", "Yes: More than one"],
      "default": "No"
    }
  },
  "required": ["Do you have any pets?"],
  "dependencies": {
    "Do you have any pets?": {
      "oneOf": [
        {
          "properties": {
            "Do you have any pets?": {
              "enum": ["No"]
            }
          }
        },
        {
          "properties": {
            "Do you have any pets?": {
              "enum": ["Yes: One"]
            },
            "How old is your pet?": {
              "type": "number"
            }
          },
          "required": ["How old is your pet?"]
        },
        {
          "properties": {
            "Do you have any pets?": {
              "enum": ["Yes: More than one"]
            },
            "Do you want to get rid of any?": {
              "type": "boolean"
            }
          },
          "required": ["Do you want to get rid of any?"]
        }
      ]
    }
  }
}
```

In this example the user is prompted with different follow-up questions dynamically based on their answer to the first question.

Note that this is quite far from complete `oneOf` support!

In these examples, the "Do you have any pets?" question is validated against the corresponding property in each schema in the `oneOf` array. If exactly one matches, the rest of that schema is merged with the existing schema.

## JSON Schema supporting status

This component follows [JSON Schema](http://json-schema.org/documentation.html) specs. Due to the limitation of form widgets, there are some exceptions as follows:

* `additionalItems` keyword for arrays
  This keyword works when `items` is an array. `additionalItems: true` is not supported because there's no widget to represent an item of any type. In this case it will be treated as no additional items allowed. `additionalItems` being a valid schema is supported.
* `anyOf`, `allOf`, and `oneOf`, or multiple `types` (i.e. `"type": ["string", "array"]`
  Nobody yet has come up with a PR that adds this feature with a simple and easy-to-understand UX.
  You can use `oneOf` with [schema dependencies](#schema-dependencies) to dynamically add schema properties based on input data but this feature does not bring general support for `oneOf` elsewhere in a schema.

## Tips and tricks

* Custom field template: https://jsfiddle.net/hdp1kgn6/1/
* Multi-step wizard: https://jsfiddle.net/sn4bnw9h/1/
* Using classNames with uiSchema: https://jsfiddle.net/gfwp25we/1/
* Conditional fields: https://jsfiddle.net/69z2wepo/88541/
* Advanced conditional fields: https://jsfiddle.net/cowbellerina/zbfh96b1/
* Use radio list for enums: https://jsfiddle.net/f2y3fq7L/2/
* Reading file input data: https://jsfiddle.net/f9vcb6pL/1/
* Custom errors messages with transformErrors : https://jsfiddle.net/revolunet/5r3swnr4/
* 2 columns form with CSS and FieldTemplate : https://jsfiddle.net/n1k0/bw0ffnz4/1/
* Validate and submit form from external control : https://jsfiddle.net/spacebaboon/g5a1re63/

## Contributing

### Coding style

All the JavaScript code in this project conforms to the [prettier](https://github.com/prettier/prettier) coding style. A command is provided to ensure your code is always formatted accordingly:

```
$ npm run cs-format
```

The `cs-check` command ensures all files conform to that style:

```
$ npm run cs-check
```

### Development server

```
$ npm start
```

A live development server showcasing components with hot reload enabled is available at [localhost:8080](http://localhost:8080).

If you want the development server to listen on another host or port, you can use the RJSF_DEV_SERVER env variable:

```
$ RJSF_DEV_SERVER=0.0.0.0:8000 npm start
```

### Tests

```
$ npm test
```

#### TDD

```
$ npm run tdd
```

### Releasing

```
$ edit package.json # update version number
$ git commit -m "Bump version $VERSION"
$ git tag v$VERSION
$ npm run dist
$ npm publish
$ git push --tags origin
```

## FAQ

### Q: Does rjsf support `oneOf`, `anyOf`, multiple types in an array, etc.?

A: Not yet (except for a special case where you can use `oneOf` in [schema dependencies](#schema-dependencies)), but perhaps you will be the person whose PR will finally add the feature in a way that gets merged. For inspiration, see [#329](https://github.com/mozilla-services/react-jsonschema-form/pull/329) or [#417](https://github.com/mozilla-services/react-jsonschema-form/pull/417). See also: [#52](https://github.com/mozilla-services/react-jsonschema-form/issues/52), [#151](https://github.com/mozilla-services/react-jsonschema-form/issues/151), [#171](https://github.com/mozilla-services/react-jsonschema-form/issues/171), [#200](https://github.com/mozilla-services/react-jsonschema-form/issues/200), [#282](https://github.com/mozilla-services/react-jsonschema-form/issues/282), [#302](https://github.com/mozilla-services/react-jsonschema-form/pull/302), [#330](https://github.com/mozilla-services/react-jsonschema-form/issues/330), [#430](https://github.com/mozilla-services/react-jsonschema-form/issues/430), [#522](https://github.com/mozilla-services/react-jsonschema-form/issues/522), [#538](https://github.com/mozilla-services/react-jsonschema-form/issues/538), [#551](https://github.com/mozilla-services/react-jsonschema-form/issues/551), [#552](https://github.com/mozilla-services/react-jsonschema-form/issues/552), or [#648](https://github.com/mozilla-services/react-jsonschema-form/issues/648).

### Q: Will react-jsonschema-form support Material, Ant-Design, Foundation, or [some other specific widget library or frontend style]?

A: Probably not. We use Bootstrap v3 and it works fine for our needs. We would like for react-jsonschema-form to support other frameworks, we just don't want to support them ourselves. Ideally, these frontend styles could be added to react-jsonschema-form with a third-party library. If there is a technical limitation preventing this, please consider opening a PR. See also: [#91](https://github.com/mozilla-services/react-jsonschema-form/issues/91), [#99](https://github.com/mozilla-services/react-jsonschema-form/issues/99), [#125](https://github.com/mozilla-services/react-jsonschema-form/issues/125), [#237](https://github.com/mozilla-services/react-jsonschema-form/issues/237), [#287](https://github.com/mozilla-services/react-jsonschema-form/issues/287), [#299](https://github.com/mozilla-services/react-jsonschema-form/issues/299), [#440](https://github.com/mozilla-services/react-jsonschema-form/issues/440), [#461](https://github.com/mozilla-services/react-jsonschema-form/issues/461), [#546](https://github.com/mozilla-services/react-jsonschema-form/issues/546), [#555](https://github.com/mozilla-services/react-jsonschema-form/issues/555), [#626](https://github.com/mozilla-services/react-jsonschema-form/issues/626), and [#623](https://github.com/mozilla-services/react-jsonschema-form/pull/623).

### Q: Is there a way to "collapse" fields, for instance to show/hide individual fields?

A: There's no specific built-in way to do this, but you can write your own FieldTemplate that supports hiding/showing fields according to user input. We don't yet have an example of this use, but if you write one, please add it to the "tips and tricks" section, above. See also: [#268](https://github.com/mozilla-services/react-jsonschema-form/issues/268), [#304](https://github.com/mozilla-services/react-jsonschema-form/pull/304), [#598](https://github.com/mozilla-services/react-jsonschema-form/issues/598), [#920](https://github.com/mozilla-services/react-jsonschema-form/issues/920).

## License

Apache 2
