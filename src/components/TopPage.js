import React from 'react';
import { useHistory } from 'react-router-dom';

const TopPage = props => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/quiz');
  }
  return (
    <div className="topPage">
      <h1>Pokemon Quiz</h1>
      <form　name="select" onSubmit={props.onSubmit}>
        <label>
            <select onChange={props.onChange}>
                {props.numbers.map(number => (
                    <option>{number}</option>
                ))}
            </select>
        </label>
      </form>
      <button　onClick={handleClick}>クイズへ</button>
    </div>
  )
}

export default TopPage;