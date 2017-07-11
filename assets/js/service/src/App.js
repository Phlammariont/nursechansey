import React from 'react';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      txt: 'mi estado txt',
      cat: 0
    }
  }
  update ( e ) {
    this.setState({txt: e.target.value})
  }
  render () {
    let txt = this.props.text;
    return (
      <div>

        <h1>Hello World Leon {this.state.txt} - {this.state.cat}</h1>

        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        <Widget update={this.update.bind(this)}/>
        I <Heart/> {txt}
      </div>
    )
  }
}

class Heart extends React.Component {
  constructor () {
    super();
    this.state = {
    }
  }
  render () {
    return <div><span>&hearts;</span></div>
  }
}

const Widget = ( props ) => <input type="text"  onChange={props.update}/>
export default App
