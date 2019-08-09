import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Greeting } from "./app";
import logo from '../images/logo.png';

var loading="Загрузка...";
var againtry="Пожалуйста, попробуйте позже.";
var textName="Ф.И.";
var textInstr="Инструктор";
var textHowlong="Длительность";

var subscription= {
    width:"350px",
    height:"300px",
    fontFamily: 'Roboto, sans-serif'

};

var topHead={
    backgroundColor: '#d7b039',
    height:"130px"

};
var lines={
    float:"left",
    width:"80%",
    height:"30px",
    display:"inline-block"
}
var left={
    float:"left",
    width: "70%"
}
var right={
    float:"left",
    width:"30%"
}
var tableiro={
    float:"left",
    width:"100%",
    marginTop:"5px"
}
var plaintext={
    float:"left",
    fontcolor:"#b18a2a",
    width:"55%"
};
var field= {
    float:"right",
    height:"20px",
    width:"40%",
    display:"inline-block",
    backgroundColor: '#ddd78a',
    borderRadius: "6px",
};

var dates= {
    float:"left",
    display:"inline-block",
    backgroundColor: '#ffffff',
    borderRadius: "5px",
    marginLeft:"3px"
};



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
        const {error, isLoaded, visits, items} = this.state;
        const chunkArray = (arr, cnt) => arr.reduce((prev, cur, i, a) => !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev, []);
        const output=chunkArray(visits, 4);
        console.log(items);
        if (error) {
            return <div>
                <div><h1>{againtry}</h1></div>
                <Greeting/></div>;
        }else if (!isLoaded) {
            return <div>{loading}</div>;
        } else {
            return (
                <div style={subscription}>
                        <div style={topHead}>
                            <div  style={left}/*left*/>
                                <div style={lines}>
                                    <h2>Абонемент</h2>

                                </div>
                                <div style={lines}>
                                    <p style={plaintext}>{textName}</p>
                                    <p style={field}>123</p>
                                </div>
                                <div  style={lines}>
                                    <p style={plaintext}>{textInstr}</p>
                                    <p style={field}>123</p>
                                </div>
                                <div  style={lines}>
                                    <p style={plaintext}>{textHowlong}</p>
                                    <p style={field}>123</p>
                                </div>
                            </div>
                            <div style={right}>
                                <img src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div style={tableiro}>
                            <table>
                                <tbody>
                                {
                                    output.map((row, index) => (
                                        <tr key={index}>
                                            {row.map((cellId,index2) => <td style={dates} key={index2}>{cellId.date}</td>)}
                                        </tr>
                                    ))
                                }</tbody>

                            </table>
                        </div>
                </div>
            );
        }
    }

}
  