import React from 'react';
import PropTypes from 'prop-types';

const DescriptionTemplate = props => {
  const { id, description } = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  if (typeof description === 'string') {
    return (
      <p id={id} className="field-description">
        <small>{description}</small>
      </p>
    );
  } else {
    return (
      <div id={id} className="field-description">
        {description}
      </div>
    );
  }
};

if (process.env.NODE_ENV !== 'production') {
  DescriptionTemplate.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  };
}

export default DescriptionTemplate;
