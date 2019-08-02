
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Join from "./Join";
import Fetcher from "./fetcher";
import { Link,MemoryRouter, Switch , Route} from 'react-router-dom'


import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from "./firebase.config";
firebase.initializeApp(firebaseConfig);

var circle = {

    display:"inline-block",
    backgroundColor: '#E94F37',
    borderRadius: "50%",
    width:300,
    height:300,
};

export const AuthContext = React.createContext(null);

export function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <div><Fetcher/></div>);
  }else{
    return (
      <div style={circle}>
           <Login isLoggedIn={isLoggedIn} />

      </div>);
      } 
}

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  function readSession() {
    const user = window.sessionStorage.getItem(
			`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
		);
    console.log('Session -',user);
		if (user) {
		    console.log('user exist');
		    setLoggedIn(true)
        }
  }
  useEffect(() => {
    readSession()
  }, [])


  return (

    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
        <main>
            <Switch>
                <Route path='/join' component={Join}/>
                <Route  path='/' render={(props) => <Greeting isLoggedIn={isLoggedIn} {...props} />} />
            </Switch>
        </main>
        </AuthContext.Provider>

  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(
    <MemoryRouter>
        <App />
    </MemoryRouter>
    , rootElement);
