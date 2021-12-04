import React from "react";
import ResultTable from "./ResultTable";
import CustomButton from "./customButton";
import { makeStyles, Button } from "@material-ui/core";

const Result = (props) => {
  const useStyle = makeStyles((theme) => ({
    Button: {
      backgroundColor: "#40739e",
      color: "white",
      "&:hover": {
        backgroundColor: "#e1b12c",
        color: "white",
      },
    },
  }));

  const classes = useStyle();
  return (
    <div className="result">
      {props.counter} 問中 {props.quizResult} 問 正解!!
      <ResultTable log={props.log} counter={props.counter} />
      <form name="submit" onSubmit={props.handleSubmit}>
        <Button className={classes.Button} type="submit" variant="contained">
          TOPへ
        </Button>
      </form>
    </div>
  );
};

export default Result;
