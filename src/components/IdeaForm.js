import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';

class IdeaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.idea.title,
      body: this.props.idea.body,
    }

    this.handleInput = e => {
      this.props.resetNotification();
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    this.handleBlur = () => {
      const idea = {
        title: this.state.title,
        body: this.state.body,
      }

      axios.put(`http://localhost:3001/api/v1/ideas/${this.props.idea.id}`, { idea })
        .then(res => {
          this.props.updateIdea(res.data);
        })
        .catch(err => console.log(err))
    }
  }
  

  render() {
    return (
      <div className='title'>
        <form onBlur={this.handleBlur}>
          <TextField
            type="text"
            name="title"
            variant="outlined"
            label="Title"
            placeholder="Enter a title"
            margin='normal'
            value={this.state.title}
            onChange={this.handleInput}
            ref={this.props.titleRef}
          />
          <br />
          <TextField
            type="text"
            name="body"
            variant="outlined"
            label="Describe"
            placeholder="Describe your idea"
            margin='normal'
            value={this.state.body}
            onChange={this.handleInput}
          />
          {/*}<input type="text" className="input" name="title" placeholder="Enter a title" value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef} />
          <textarea placeholder="Describe your idea" className="input" name="body" value={this.state.body} onChange={this.handleInput}></textarea>8*/}
        </form>
      </div>
    )
  }
}

export default IdeaForm;
