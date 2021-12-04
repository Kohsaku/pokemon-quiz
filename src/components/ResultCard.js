import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ResultCard = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        {props.userResult.createdAt.toDate().toLocaleString()}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.userResult.userResults.map((unitResult) => (
            <ul>
              <li>問題</li>
              <li>{unitResult.question}</li>
              <li>選択肢</li>
              <li>{unitResult.answers.map((answer) => answer.content)}</li>
              <li>正解</li>
              <li>{unitResult.correct}</li>
              <li>あなたの回答</li>
              <li>{unitResult.yourAnswer}</li>
            </ul>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultCard;
