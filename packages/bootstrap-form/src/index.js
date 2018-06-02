import React from 'react';

import Form from '@react-schema-form/form';
import defaultFields from '@react-schema-form/fields';
import {
  templates as defaultTemplates,
  widgets as defaultWidgets
} from '@react-schema-form/bootstrap-ui';

export default props => {
  const components = {
    fields: { ...defaultFields, ...(props.fields || {}) },
    templates: { ...defaultTemplates, ...(props.templates || {}) },
    widgets: { ...defaultWidgets, ...(props.widgets || {}) }
  };
  
  return <Form {...props} {...components} />;
};
