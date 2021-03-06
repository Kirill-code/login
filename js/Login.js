import React, {useState, useContext} from "react";
import {AuthContext} from "./app";
import firebase from 'firebase/app';
import 'firebase/auth';
import {Link} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    var emailField = "почта";
    var passwordField = "пароль";

    var inner = {
        width: '50%',
        margin: 'auto',
        padding: '25% 0',
        textAlign: 'center',
        color: '#fff'
    };
    var inp = {
        width: '70%',
        fontSize:'18pt',
        borderRadius: "30px"
    };
    var submit = {
        fontSize:'18pt',
        borderRadius: "30px"

    }

    const Auth = useContext(AuthContext);
    const handleForm = e => {

        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                if (res.user) Auth.setLoggedIn(true);

            })
            .catch(e => {
                setErrors(e.message);
            });
    };

    /*
    TO-DO in future
    const signInWithGoogle = () => {
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

        <div style={inner}>
            <h1>Логин</h1>
            <form onSubmit={e => handleForm(e)}>
                <input
                    style={inp}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder={emailField}
                /><br/>
                <input
                    style={inp}
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder={passwordField}
                />
                {/*<button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>*/}
        <br/>
                <button type="submit" style={submit}>Логин</button>
                <br/><span>{error}</span>
                <p></p>

                <Link to="/join">Регистрация</Link>

            </form>
        </div>
    );
};

export default Login;
