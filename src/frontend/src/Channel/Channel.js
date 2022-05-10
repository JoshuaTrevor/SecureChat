import React from 'react'
import './Channel.css'
import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

//Test consistent key:
let pKey = "TKOLASDFNASDIOFNEWAIOJNSFDKLSAKLF"
class Channel extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.bottomMessageRef = React.createRef();
        this.state = {
            channelName: props.state.channelName,
            username: props.state.username,
            inputContents: "",
            privateKey: "",
            messageLog: [
                ["Josh", "This is a message"],
                ["James", "This is another message"],
                ["Josh", "This is another message but this one is really long wahhhhhh look at me type weeee hooooo ahahahahhahahha im crazy xdxdxdxdx"],
            ],
            messageOrig: [
                ["Josh", "This is a message"],
                ["James", "This is another message"],
                ["Josh", "This is another message but this one is really long wahhhhhh look at me type weeee hooooo ahahahahhahahha im crazy xdxdxdxdx"],
            ]
        }
        //Encrypt starting messages
        const newLog = [];
        const newLog2 = [];
        for(let i = 0; i < this.state.messageLog.length; i++)
        {
            const msg = this.state.messageLog[i];
            newLog.push([AES.encrypt(msg[0], pKey).toString(), AES.encrypt(msg[1], pKey).toString()]);
            newLog2.push([AES.encrypt(msg[0], pKey).toString(), AES.encrypt(msg[1], pKey).toString()]);
        }
        this.state.messageLog = newLog;
        this.state.messageOrig = newLog2; //Keep a record of encrypted messages which is never altered

        
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

    handleKeyChange = (e) => {
        this.setState({privateKey: e.target.value});
        //Decrnypt
        //Reset to original messagelog
        var origCopy = this.state.messageOrig.map(function(arr) {
            return arr.slice();
        });
        this.state.messageLog = origCopy;
        const newLog = [];
        for(let i = 0; i < this.state.messageLog.length; i++)
        {
            const msg = this.state.messageLog[i];
            try
            {
                newLog.push([AES.decrypt(msg[0], e.target.value).toString(Utf8) + "", AES.decrypt(msg[1], e.target.value).toString(Utf8) + ""])
            } catch (e) {
                newLog.push([this.random_string(20), this.random_string(30)]);
            }
        }
        this.state.messageLog = newLog;
    }

    random_string = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    sidebar = () => {
        return (
            <div id="sidebar">
                <h1>Private key:</h1>
                <input id="privateKey" type="text" value={this.state.privateKey} onChange={(e) => this.handleKeyChange(e)}/><br/>
            </div>
        )
    }


    //Todo: Add general encryption function and call here on one of the things
    //Should send message encrypted accoirding to key and store that in original, then store the decrypted using same key in messageLog
    addMessage = (sender, message) => {
        if(message.length === 0)
            return;
        if(sender === this.state.username &&message.startsWith("/"))
        {
            this.handleCommand(message.substring(1, message.length));
            return;
        }
        this.state.messageLog.push([sender, message]);
        this.state.messageOrig.push([sender, message]);

        //If sending a message, clear messagebox and set delay timer
        if(sender === this.state.username)
        {
            this.setState({inputContents: ""})
        }

        this.forceUpdate();
    }

    handleCommand = (cmd) =>
    {
        switch(cmd.split(" ")[0])
        {
            case "clear":
                this.setState({messageLog: [], messageOrig: []})
                break;

            case "rename":
                this.setState({channelName: cmd.split(" ")[1]});
                break;

            case "encrypt":
                let encrypted = "" + AES.encrypt(cmd.split(" ")[1], "Secret Passphrase");
                this.addMessage("Josh", encrypted);
                break;

            case "decrypt":
                let decrypted = "" + AES.decrypt(cmd.split(" ")[1], "Secret Passphrase");
                this.addMessage("Josh", decrypted);
                break;

            default:
                break;
        }
        this.setState({inputContents: ""})
    }

    checkEnter = (e) => {
        if (e.key === 'Enter') {
            // let str = "blahblah";
            // let encrypted = AES.encrypt(str, "Secret Passphrase").toString();
            // console.log(encrypted)
            // let decrypted = AES.decrypt(encrypted, "Secret Passphrase")
            // console.log(decrypted.toString(utf8))
            // return;
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
    
    componentDidUpdate()
    {
        this.bottomMessageRef.current.scrollIntoView();
    }

    render()
    {
        return (
            <div>
                <div className="page">
                    <label>
                        {this.heading()}
                        {this.messages()}
                        <div ref={this.bottomMessageRef}></div>
                        {this.inputBar()}
                    </label>
                </div>
                <div className="sidebar">
                    {this.sidebar()}
                </div>
            </div>
        )
    }
}

export default Channel;