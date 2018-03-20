import React, { Component } from 'react';
import { Table, Loader } from 'semantic-ui-react'; 

class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      Commands: []
    };
  }

  componentDidMount(){
    fetch('/api').then(promise => {
      console.log(promise); 
      return promise.json();
    }).then(result => {
      this.setState({
        Commands: result
      });
    });
  }

  SetCommands = () => {
    if(!this.state.Commands.length > 0)
      return(
        <Table.Row>
            <Table.Cell colSpan='4'>
                <Loader active inline='centered'/>
            </Table.Cell>
        </Table.Row>
    );
    else
      return(
        this.state.Commands.map(command => {
          return(
            <Table.Row key={ command._id }>
              <Table.Cell content={ command.Command }width={3}/>
              <Table.Cell content={ command.Text }/>
            </Table.Row>
          )
        })
      )
  }
  
  render() {
    return (
      <div className="App">
          <Table fixed>
            <Table.Header>
              <Table.HeaderCell content="Command" width={3}/>
              <Table.HeaderCell content="Text"/>
            </Table.Header>
            <Table.Body>
              {
                this.SetCommands()
              }
            </Table.Body>
          </Table>
      </div>
    );
  }
}

export default App;
