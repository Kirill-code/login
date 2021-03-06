import React, {useState, useContext} from "react";
import {AuthContext} from "./app";
import firebase from 'firebase/app';
import 'firebase/auth';
import {Link} from "react-router-dom";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    var emailField = "почта";
    var passwordField = "пароль";

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();

        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(res => {
                        console.log(res)
                        if (res.user) Auth.setLoggedIn(true);
                    })
                    .catch(e => {
                        setErrors(e.message);
                    });
            })

    };
    var inner = {
        width: '50%',
        margin: 'auto',
        padding: '25% 0',
        textAlign: 'center',
        color: '#fff'
    };
    var inp = {
        width: '70%',
        borderRadius: "30px"
    };
    var submit = {
        borderRadius: "30px"

    }
    var circle = {
        /*width:'300px',
         height:'300px',
         backgroundImage: 'url('+logo+')',
         backgroundRepeat  : 'no-repeat',
         backgroundPosition: 'center',
         backgroundSize: 'contain'*/
        display: "inline-block",
        backgroundColor: '#E94F37',
        borderRadius: "50%",
        width: 300,
        height: 300,
    };


    /*
    TO-DO in future
    const handleGoogleLogin = () => {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            console.log(result)
            Auth.setLoggedIn(true)
          })
          .catch(e => setErrors(e.message))
        })

    }
  */
    return (
        <div style={circle}>
            <div style={inner}>
                <h2>Регистрация</h2>
                <form onSubmit={e => handleForm(e)}>
                    <input
                        style={inp}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder={email}
                    /><br/>
                    <input
                        style={inp}
                        onChange={e => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        type="password"
                        placeholder={passwordField}
                    />
                    {/*<button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
              Join With Google
            </button>*/}
                    <br/>
                    {<button type="submit" style={submit}>Регистрация</button>}
                    <p></p>
                    <Link to="/">назад</Link>
                    <p></p>
                    <span>{error}</span>
                </form>
            </div>
        </div>
    );
};

export default Join;