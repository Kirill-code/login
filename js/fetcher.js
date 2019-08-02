import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Greeting } from "./app";

export default class Fetcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            visits: []
        };
    }


    componentDidMount() {
        var user = firebase.auth().currentUser;
        console.log('User-', user);
        if (user != null) {

            fetch("http://localhost:8080/uidsubscription/" + firebase.auth().currentUser.uid)
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong.');
                })
                .then(
                    (text) => this.setState({
                        error:null,
                        isLoaded: true,
                        items: text,
                        visits: text.visitDates
                    })

                )
                .catch((error) => this.setState({
                    error: 'server'
                }));
        } else {

                 this.setState({
                    error: 'user'
                })

        }
    }


    render() {
        const {error, isLoaded, visits} = this.state;
        if (error) {
            return <div>
                <div><h1>Пожалуйста, попробуйте позже.</h1></div>
                <Greeting/></div>;
        }else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <ul>
                    {visits.map(item => (
                        <li key={item.id}>
                            {item.date} {item.id}
                        </li>
                    ))}
                </ul>
            );
        }
    }

}
  