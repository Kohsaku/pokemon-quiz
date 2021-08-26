import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { auth, firestore } from '../api/firebase';


const HistoryPage = async () => {
  const currentUser = auth.currentUser;
  const userRef = firestore.doc(`user/${currentUser.uid}`);
  const timeRef = userRef.collection('results').doc();
  const snapShot = await timeRef.get();

  return(
    <Router>
      <div>
        History Page
        <ul>
          <li>
            {snapShot.map( result => <Link>{result.createdAt}</Link>)}
          </li>
        </ul>
      </div>
    </Router>
  );
}

export default HistoryPage;