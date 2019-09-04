import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onDataChange = this.onDataChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.add = this.add.bind(this);
    this.socketCon = this.socketCon.bind(this);
    this.soc = this.soc.bind(this);
    this.state = {
      data: []
    };
  }
  serverUrl = 'ws://172.17.24.200:8081/user';
  aWebSocket = new WebSocket(this.serverUrl);
  componentDidMount(){
    this.socketCon();

  }

  socketCon(){
    this.aWebSocket.onopen = () => {
      this.aWebSocket.send("submited");
    }
  }
  soc(){
    this.aWebSocket.send('hello2');
  }

  add(data) {
    const requestOptions = {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    fetch(`http://172.17.24.200:8081/saveData`, requestOptions)
    .then(Response=> {
      setTimeout(() => {
        this.soc();
      }, 1000);
      console.log(Response)
        
      
    });
  

  }

  onDataChange = event => {
    this.setState({ data: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.add(this.state.data);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <textarea
            rows="20"
            cols="50"
            id="data"
            name="data"
            value={this.state.data}
            onChange={this.onDataChange}
          ></textarea>
        </div>
        <div>
          <button>submit</button>
        </div>
      </form>
    );
  }
}

export default App;
