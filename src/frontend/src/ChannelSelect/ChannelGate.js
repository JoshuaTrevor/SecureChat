import React from 'react';
import './Widget.css';
import Channel from '../Channel/Channel'
//import JoinOrCreate from './JoinOrCreate';

class ChannelGate extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: "Join_Or_Create",
      channelName: "Test_Channel",
      username: "Josh"
    };
  }

  joinOrCreate = () => {
    return (
      <div className="widget">
        <h1>Welcome</h1>
        <form>
        <div>
            <button onClick={() => this.setState({mode: "Join"})}>Join Channel</button>
          </div>
          <div>
            <button onClick={() => this.setState({mode: "Create"})}>Create Channel</button>
          </div> <br/>
        </form>
      </div>
    );
  }

  join = () => {
    return (
      <div className="widget">
        <h1>Join Channel</h1>
          <label>Channel Id</label><br/>
          <input type="text" value={this.state.channelName} onChange={(e) => this.setState({channelName: e.target.value})}/><br/>

          <br/><label>Alias</label><br/>
          <input type="text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/><br/>
          
          <div>
            <button onClick={() => this.setState({mode: "Channel"})}>Join</button>
          </div>
      </div>
    );
  }

  //Change flow to:
  //Check if channel exists: if it does return a message denying creation
  //If channel does not exist, create channel and provide key.
  //Upon copying/acknowledging key, create channel
  create = () => {
    return this.join();
  }


  render() {
    console.log(this.state)
    if (this.state.mode === "Join_Or_Create") {
      return (
        <div>{this.joinOrCreate()}</div>
      );
    }
    else if (this.state.mode === "Join")
    {
      return(
         <div>{this.join()}</div>
      );
    }
      
    else if (this.state.mode === "Create")
    {
      return(
         <div>{this.create()}</div>
      );
    }
    else if (this.state.mode === ("Channel"))
    {
      return <Channel state={this.state} />
    }
      
  }
}

export default ChannelGate;