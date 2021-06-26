import React from 'react';
import CustomButton from './customButton';

const Result = props => {
  return (
      <div className='result'>
        {props.counter} 問中 {props.quizResult} 問 正解!!
        {/* <ResultTable /> */}
        <CustomButton handleSubmit={props.handleSubmit} label='TOP'/>
      </div>
  )
}

export default Result;