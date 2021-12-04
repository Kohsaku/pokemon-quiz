import React from "react";
import { makeStyles } from "@material-ui/core";

const ResultTableRow = (props) => {
  const useStyle = makeStyles((theme) => ({
    Right: {
      color: "#40739e",
    },
    Wrong: {
      color: "#c23616",
    },
  }));

  const classes = useStyle();
  return (
    <tr key={props.key}>
      <td>{props.log.question}</td>
      <td
        className={
          props.log.yourAnswer === props.log.correct
            ? classes.Right
            : classes.Wrong
        }
      >
        {props.log.yourAnswer}
      </td>
      <td>{props.log.correct}</td>
    </tr>
  );
};

export default ResultTableRow;
