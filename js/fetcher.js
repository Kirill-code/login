import React from "react";
import firebase from 'firebase/app';
import 'firebase/auth';
import { Greeting } from "./app";
import QRCode from 'qrcode.react';



var loading="Загрузка...";
var againtry="Пожалуйста, попробуйте позже.";
var textName="Ф.И.";
var textInstr="Инструктор";
var textHowlong="Дата окончания";

var subscription= {
    width:"100%",
    height:"100%",
/*    fontFamily: 'Roboto, sans-serif',*/
    borderRadius:"15px"
};

var topHead={
    backgroundImage: 'linear-gradient(-70deg, #F6A000, #DE7400)',
    height:"150px",
    paddingTop:"10px"
};
var lines={
    float:"left",
    width:"100%",
    display:"inline-block",
}
var left={
    float:"left",
    width: "68%",
    paddingLeft:"3px"
}
var right={
    float:"left",
    width:"30%"
}
var tableiro={
    float:"left",
    width:"100%",
    backgroundColor:"#F6A000",
    padding:"3px 0"
}
var plaintext={
    float:"left",
    fontcolor:"#b18a2a",
    width:"55%"
};
var field= {
    float:"right",
    height:"10%",
    width:"40%",
    display:"inline-block",
    backgroundColor: '#ddd78a',
    borderRadius: "6px",
    textAlign:"center"

};

var dates= {
    float:"left",
    display:"inline-block",
    backgroundColor: '#ffffff',
    borderRadius: "5px",
    marginLeft:"5px"
};
var logoStyle={
    display:"block",
    margin:"0 auto",
    paddingTop:"15px"
}


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

            fetch("https://suryaschoolapi.ru.com:8443/subscription-server/uidsubscription/" + firebase.auth().currentUser.uid)
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
        const output=chunkArray(visits, 3);
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
                                    <p style={plaintext}>{textName}</p>
                                    <p style={field}>{items.userName+" "+items.userSurName}</p>
                                </div>
                                <div  style={lines}>
                                    <p style={plaintext}>{textInstr}</p>
                                    <p style={field}>{items.instrName}</p>
                                </div>
                                <div  style={lines}>
                                    <p style={plaintext}>{textHowlong}</p>
                                    <p style={field}>{items.finishDate}</p>
                                </div>
                            </div>
                            <div style={right}>
{/*
                                <img style={logoStyle} src="https://static.tildacdn.com/tild6130-6561-4136-b262-326537376464/logo_school_80.png" alt="Логотип" />
*/}<QRCode value={"suryuid"+firebase.auth().currentUser.uid} />
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
  