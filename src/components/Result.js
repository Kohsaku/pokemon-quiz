import React from 'react';
import ResultTable from './ResultTable';
import CustomButton from './customButton';

const Result = props => {
  return (
      <div className='result'>
        {props.counter} 問中 {props.quizResult} 問 正解!!
        <ResultTable log={props.log}/>
        <CustomButton handleSubmit={props.handleSubmit} label='TOP'/>
      </div>
  )
}

export default Result;