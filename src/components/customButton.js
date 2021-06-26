import React from 'react';

const CustomButton = props => {
  return (
    <div className='customButton'>
      <form name='submit' method='post' onSubmit={props.handleSubmit}>
        <input type='submit' value={props.label} />
      </form>
    </div>
  );
}

export default CustomButton;