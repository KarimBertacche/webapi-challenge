import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StylesApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: scroll;

  .project-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    border: 3px solid dodgerblue;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .7);

    h2 {
      margin: 0;
      margin-top: 10px;
    }

    p {
      text-align: center;
    }

    button {
      border: 3px solid dodgerblue;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: none;
      font-size: 1rem;
      font-weight: bold;
      padding: 5px 20px;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: dodgerblue;
        color: #fff;
      }
    }
  }

  .action-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50px;
    border-top: 3px solid dodgerblue;
  }

`;

class App extends React.Component {
  state = {
    projects: null,
    actions: null,
    toggleAction: false
  }

  componentDidMount() {
    this.getProjectsHandler();
  }

  getProjectsHandler = () => {
    axios
      .get('http://localhost:4000/api/projects')
        .then(response => {
          this.setState({ projects: response.data });
        })
        .catch(error => {
          console.log(error);
        });
  }

  getActionsHandler = (id) => {
    axios
      .get(`http://localhost:4000/api/projects/actions/${id}`)
        .then(response => {
          this.setState({ actions: response.data });
        })
        .catch(error => {
          console.log(error);
        });
  }

  toggleActionHandler = (id) => {
    this.getActionsHandler(id);
    if(this.state.toggleAction === false) {
      this.setState({ toggleAction: true });
    } else {
      this.setState({ toggleAction: false });
    }
  }

  render() {
    return (
      <StylesApp>
        {
          this.state.projects
          ? this.state.projects.map(project => {
              return (
                <div className="project-wrapper">
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                  <button onClick={() => this.toggleActionHandler(project.id)}>Show details</button>
                  {
                    this.state.actions
                    ? this.state.actions.map(action => {
                        return (
                          <div 
                            className="action-wrapper" 
                            // style={this.state.toggleAction ? 'display: flex' : 'display: none'}
                          >
                            <p>{action.description}</p>
                            <p>{action.note}</p>
                          </div>
                        );
                      })
                    : null
                  }
                </div>
              );
            })
          : null
        }
      </StylesApp>
    );
  }
}

export default App;
