import React from 'react';
import ResultTable from './ResultTable';
import CustomButton from './customButton';

const Result = props => {
  return (
      <div className='result'>
        {props.counter} 問中 {props.quizResult} 問 正解!!
        <ResultTable log={props.log} counter={props.counter} />
        <form name='submit' onSubmit={props.handleSubmit}>
          <CustomButton label='TOP'/>
        </form>
      </div>
  )
}

export default Result;