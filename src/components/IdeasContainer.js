import React, { Component } from "react";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import update from "immutability-helper";
import Idea from "./Idea";
import IdeaForm from "./IdeaForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ideasActions from "../actions/ideaActions";

class IdeasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      editingIdeaId: null,
      notification: "",
    };

    this.updateIdea = idea => {
      const ideaIndex = this.state.ideas.findIndex(x => x.id === idea.id);
      const ideas = update(this.state.ideas, { [ideaIndex]: { $set: idea } });
      this.setState({ ideas, notification: "All changes saved." });
    };

    this.resetNotification = () => {
      this.setState({ notification: "" });
    };

    this.enableEditing = id => {
      this.setState({ editingIdeaId: id });
      console.log(this.title);
    };
  }

  componentDidMount() {
    this.props.Idea.loadAlldIdeas()
      .then(res => {
        console.log("cDM", res);
        const ideas = res.data;
        this.setState({ ideas });
      })
      .catch(err => console.log(err));
    // axios.get('http://localhost:3001/api/v1/ideas.json')
    //  .then(res => {
    //    console.log(res.data)
    //    this.setState({ ideas: res.data });
    //  })
    //  .catch(err => console.log(err));
  }

  addNewIdea = () => {
    axios
      .post("http://localhost:3001/api/v1/ideas", {
        idea: { title: "", body: "" },
      })
      .then(res => {
        const ideas = update(this.state.ideas, {
          $splice: [[0, 0, res.data]],
        });
        this.setState({
          ideas,
          editingIdeaId: res.data.id,
        });
      })
      .catch(err => console.log(err));
  };

  deleteIdea = id => {
    axios
      .delete(`http://localhost:3001/api/v1/ideas/${id}`)
      .then(res => {
        const ideaIndex = this.state.ideas.findIndex(x => x.id === id);
        const ideas = update(this.state.ideas, { $splice: [[ideaIndex, 1]] });
        this.setState({ ideas });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log("asdfasdf", this.props.ideas.ideas);
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.addNewIdea}
          style={{ margin: 10 }}>
          Create New Idea
        </Button>
        <span>{this.state.notification}</span>
        <Grid container spacing={24}>
          {this.state.ideas.map(idea => {
            if (this.state.editingIdeaId === idea.id) {
              return (
                <IdeaForm
                  idea={idea}
                  key={idea.id}
                  updateIdea={this.updateIdea}
                  titleRef={input => (this.title = input)}
                  resetNotification={this.resetNotification}
                />
              );
            } else {
              return (
                <Idea
                  idea={idea}
                  key={idea.id}
                  onClick={this.enableEditing}
                  onDelete={this.deleteIdea}
                />
              );
            }
          })}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ideas: state.ideas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Idea: bindActionCreators(ideasActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IdeasContainer);
