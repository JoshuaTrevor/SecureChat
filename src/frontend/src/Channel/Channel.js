import React from 'react'
import './Channel.css'

//Feature idea:
//Chat user types name=WhateverName
//This message is encrypted, but when message log is loaded, most recent name= string will be used to show name
//But only when chat is decrypted
//Requires cooperation, but allows chat to be given encrypted name without telling anyone who doesn't have the key
class Channel extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            channelName: props.state.channelName,
            username: props.state.username,
            inputContents: "",
            privateKey: "",
            messageLog: [
                ["Josh", "This is a message"],
                ["James", "This is another message"],
                ["Josh", "This is another message but this one is really long wahhhhhh look at me type weeee hooooo ahahahahhahahha im crazy xdxdxdxdx"],
            ]
        }
    }
    
    heading = () => {
        return (
            <div>
                <b>Channel:</b> {this.state.channelName.substring(0, 3) + "..."} <br/>
                <b>User: </b>{this.state.username}
            </div>
        )
    }

    //Render the area the user enters text
    inputBar = () => {
        return (
            <div>
                <input className="messageInput" type="text" value={this.state.inputContents} onChange={(e) => this.setState({inputContents: e.target.value})} onKeyDown={(e) => this.checkEnter(e)}/><br/>
                <button className="messageInput" id="send" onClick={() => this.addMessage(this.state.username, this.state.inputContents)}>Send</button>
            </div>
        )
    }

    sidebar = () => {
        return (
            <div id="sidebar">
                <h1>Private key:</h1>
                <input id="privateKey" type="text" value={this.state.privateKey} onChange={(e) => this.setState({privateKey: e.target.value})}/><br/>
            </div>
        )
    }

    //Make this into real ID distributor later.
    generateID = () => {
        return Math.round(Math.random()*100000);
    }

    addMessage = (sender, message) => {
        console.log("called");
        let messageLog = this.state.messageLog;
        messageLog.push([sender, message]);
        this.forceUpdate();
    }

    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.addMessage(this.state.username, this.state.inputContents);
          }
    }

    message = (sender, message) => {
        let className = sender === this.state.username ? "selfMsg" : "otherMsg";
        return (
            <div className="blocker">
                <div className={className}>
                    <p>{sender}: {message}</p>
                </div>
            </div>
        )
    }

    messages = () => {
        const messages = [];
        for(let i = 0; i < this.state.messageLog.length; i++)
        {
            let [sender, msg] = this.state.messageLog[i];
            messages.push(this.message(sender, msg));
        }
        return messages;
    }
    

    render()
    {
        return (
            <div>
                <div className="page">
                    <label>
                        {this.heading()}
                        {this.messages()}
                        {this.inputBar()}
                    </label>
                </div>
                <div className="sidebar">
                    {this.sidebar()}
                </div>
            </div>
        )
        //return (<h>Welcome to {this.state.channelName}, {this.state.username}</h>)
    }
}

export default Channel;