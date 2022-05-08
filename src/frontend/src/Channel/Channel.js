import React from 'react'

//Feature idea:
//Chat user types name=WhateverName
//This message is encrypted, but when message log is loaded, most recent name= string will be used to show name
//But only when chat is decrypted
//Requires cooperation, but allows chat to be given encrypted name without telling anyone who doesn't have the key
class Channel extends React.Component 
{
    constructor(props)
    {
        super();
        this.state = {
            name: props.name
        }
    }
    

    render()
    {
        console.log(this.state);
        return (
            <h>{this.state.name}</h>
        )
    }
}

export default Channel;