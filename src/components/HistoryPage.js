import { React, useState, useEffect } from "react";
import { firebase, auth, firestore } from "../api/firebase";
import ResultCard from "./ResultCard";
import Button from "@material-ui/core/Button";

import "./HistoryPage.css";

const HistoryPage = () => {
  const [dateData, setDateData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [showResultData, setShowResultData] = useState([]);
  const [resultCard, setResultCard] = useState(false);

  useEffect(async () => {
    if (auth.currentUser === null) {
      console.log("no currentUser");
    } else {
      const historyRef = firestore
        .collection("users")
        .doc(`${auth.currentUser.uid}`)
        .collection("results")
        .orderBy("createdAt", "desc");
      const historyDoc = await historyRef.get();
      setDateData(historyDoc.docs.map((doc) => doc.data().createdAt));
      setResultData(historyDoc.docs.map((doc) => doc.data()));
      console.log(resultData);
    }
  }, []);

  const resultSelected = (clickedValue) => {
    setShowResultData(resultData[clickedValue]);
  };

  const handleClick = (event) => {
    setResultCard(true);
    console.log(event.currentTarget.value);
    resultSelected(event.currentTarget.value);
  };

  const handleClose = () => {
    setResultCard(false);
  };

  return (
    <div className="history-page">
      <h3>↓日時をクリックすると結果が見られます</h3>
      <ul>
        {dateData.map((date) => (
          <li>
            <Button value={dateData.indexOf(date)} onClick={handleClick}>
              {date.toDate().toLocaleString()}
            </Button>
          </li>
        ))}
      </ul>
      {resultCard ? (
        <ResultCard
          userResult={showResultData}
          open={resultCard}
          onClose={handleClose}
        />
      ) : null}
    </div>
  );
};

export default HistoryPage;
