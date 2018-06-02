import React from 'react';

import Form from '@react-schema-form/form';
import fields from '@react-schema-form/fields';

import templates from './templates';
import widgets from './widgets';

export default props => {
  const components = {
    fields: { ...fields, ...(props.fields || {}) },
    templates: { ...templates, ...(props.templates || {}) },
    widgets: { ...widgets, ...(props.widgets || {}) }
  };

  return <Form {...props} {...components} />;
};
