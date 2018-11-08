import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Idea from './Idea';
import IdeaForm from './IdeaForm';

class IdeasContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: "",
    }

    this.updateIdea = (idea) => {
      const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id);
      const ideas = update(this.state.ideas, { [ideaIndex]: { $set: idea } })
      this.setState({ ideas, notification: "All changes saved." })
    }

    this.resetNotification = () => {
      this.setState({notification: ""})
    }

    this.enableEditing = (id) => {
      this.setState({editingIdeaId: id}, () => { this.title.focus() })
    }
  }

componentDidMount() {
  axios.get('http://localhost:3001/api/v1/ideas.json')
    .then(res => {
      this.setState({ ideas: res.data });
    })
    .catch(err => console.log(err));
}

addNewIdea = () => {
  axios.post('http://localhost:3001/api/v1/ideas', { idea: { title: "", body: "" } })
    .then(res => {
      const ideas = update(this.state.ideas, {
        $splice: [[0, 0, res.data]]
      })
      this.setState({
        ideas,
        editingIdeaId: res.data.id,
      })
    })
    .catch(err => console.log(err))
}

deleteIdea = id => {
  axios.delete(`http://localhost:3001/api/v1/ideas/${id}`)
    .then(res => {
      const ideaIndex = this.state.ideas.findIndex(x => x.id === id);
      const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]] })
      this.setState({ ideas })
    })
    .catch(err => console.log(err))
}

  render() {
    return (
      <div>
        {this.state.ideas.map(idea => {
          if (this.state.editingIdeaId === idea.id) {
            return (<IdeaForm idea={idea} key={idea.id} updateIdea={this.updateIdea} titleRef={input => this.title = input} resetNotification={this.resetNotification} />)
          } else {
            return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.deleteIdea} />)
          }
        })}
        <button className='newIdeaButton' onClick={this.addNewIdea}>
          New Idea
        </button>
        <span className='notification'>
          {this.state.notification}
        </span>
      </div>
    )
  }
}

export default IdeasContainer;
