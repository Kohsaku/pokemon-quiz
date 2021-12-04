import React from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  TopPage: {
    padding: theme.spacing(5),
  },
  Button: {
    marginTop: theme.spacing(5),
    backgroundColor: "#40739e",
    color: "white",
    "&:hover": {
      backgroundColor: "#e1b12c",
      color: "white",
    },
  },
  FormSelect: {
    width: 160,
  },
}));

const TopPage = (props) => {
  const classes = useStyle();
  return (
    <div className={classes.TopPage}>
      <h1>↓ 問題数を選んでください</h1>
      <Box>
        <FormControl>
          <InputLabel id="number-select-label">問題数</InputLabel>
          <Select
            className={classes.FormSelect}
            onChange={props.onChange}
            label="Age"
            value={props.numberOfQuestion}
            variant="standard"
          >
            {props.numbers.map((number) => (
              <MenuItem value={number}>{number}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button
        className={classes.Button}
        variant="contained"
        onClick={props.onClick}
      >
        クイズへ
      </Button>
    </div>
  );
};

export default TopPage;
