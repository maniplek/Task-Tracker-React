import PropTypes from 'prop-types';
import React from 'react';

const Button = ({color , text , onClick}) => {
  return (
  <div>
       <button 
       onClick={onClick}
       style={{backgroundColor: color}} 
       className='btn'>{text}</button>
  </div>);
};

Button.defaultProps = {
    color: 'steelBlue',
}

Button.propTypes ={
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button;
