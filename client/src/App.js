import React from 'react';
import axios from 'axios';

const url = "http://localhost:4000";

class App extends React.Component {
  state = {
    projects: null
  }

  componentDidMount() {
    this.getProjectsHandler();
  }

  getProjectsHandler = () => {
    axios
      .get('http://localhost:4000/api/projects')
        .then(response => {
          debugger
          this.setState({ projects: response.data });
        })
        .catch(error => {
          debugger
          console.log(error);
        });
  }

  render() {
    return (
      <div className="App">
        {
          this.state.projects
          ? this.state.projects.map(project => {
              return (
                <div>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>
              );
            })
          : null
        }
      </div>
    );
  }
}

export default App;
