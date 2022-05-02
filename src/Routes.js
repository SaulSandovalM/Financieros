import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import Login from "./components/common/login/Login";
// import firebase from "./Firebase";

const store = configureStore();

function Routes() {
  // const [user, setUser] = useState(null);
  // const [unsubscribe, setUnsubscribe] = useState();

  // firebase.auth().onAuthStateChanged((firebaseUser) => {
  //   if (firebaseUser) {
  //     if (!user) {
  //       setUserWithFirebaseAndRole(firebaseUser);
  //     }
  //   } else {
  //     setUser(null);
  //   }
  // });

  // function setUserWithFirebaseAndRole(firebaseUser) {
  //   getRole(firebaseUser.uid).then((role) => {
  //     const userData = {
  //       uid: firebaseUser.uid,
  //       email: firebaseUser.email,
  //       role: role,
  //     };
  //     setUser(userData);
  //     console.log("final userData:", userData);
  //   });
  // }

  // async function getRole(uid) {
  //   const docRef = firebase.firestore().collection("users").doc(`${uid}`);
  //   docRef.onSnapshot(onCollectionUpdate);
  //   // const docSecret = await getDoc(docRef);
  //   // const finalInfo = getData.data().role;
  //   // return finalInfo;
  // }

  // const onCollectionUpdate = (querySnapshot) => {
  //   const comprometidos = [];
  //   querySnapshot.querySnapshot.forEach((doc) => {
  //     const { role } = doc.data();
  //     comprometidos.push({
  //       key: doc.id,
  //       role,
  //     });
  //   });
  //   setUnsubscribe(comprometidos);
  // };

  // console.log(unsubscribe);

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/Login" component={Login} />
            <App />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default Routes;
