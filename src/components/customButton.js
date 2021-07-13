import React from 'react';

const CustomButton = props => {
  return (
    <div className='customButton'>
        <button type='submit'>
          {props.label}
        </button>
    </div>
  );
}

export default CustomButton;