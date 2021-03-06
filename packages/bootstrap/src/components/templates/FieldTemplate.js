import React from 'react';
import PropTypes from 'prop-types';

export const REQUIRED_FIELD_SYMBOL = '*';

/**
 * @typedef {object} Props
 * @prop {string} label
 * @prop {boolean} required
 * @prop {string} id
 *
 * @param {Props} props
 */
const Label = props => {
  const { label, required, id } = props;
  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  return (
    <label className="control-label" htmlFor={id}>
      {label}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </label>
  );
};

/**
 * @typedef {object} Props
 * @prop {string[]} errors - error messages
 *
 * @param {Props} props
 */
export const ErrorList = props => {
  const { errors = [] } = props;
  if (errors.length === 0) {
    return <div />;
  }
  return (
    <ul>
      {errors.map((error, index) => {
        return (
          <li className="text-danger" key={index} data-testid="error-detail">
            {error}
          </li>
        );
      })}
    </ul>
  );
};

const FieldTemplate = props => {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel
  } = props;
  const classNames = [
    props.classNames,
    errors && errors.length > 0 ? 'has-error has-danger' : ''
  ]
    .join(' ')
    .trim();

  if (hidden) {
    return children;
  }

  return (
    <div className={classNames} data-testid={id}>
      {displayLabel && <Label label={label} required={required} id={id} />}
      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  FieldTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    errors: PropTypes.element,
    rawErrors: PropTypes.arrayOf(PropTypes.string),
    help: PropTypes.element,
    rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.element,
    rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hidden: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    displayLabel: PropTypes.bool,
    fields: PropTypes.object,
    formContext: PropTypes.object
  };
}

FieldTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true
};

export default FieldTemplate;
