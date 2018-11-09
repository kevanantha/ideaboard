import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const style = {
  Card: {  marginTop: 10, marginBottom: 10 }
}

class Idea extends Component {
  handleClick = () => {
    this.props.onClick(this.props.idea.id);
  }

  handleDelete = () => {
    this.props.onDelete(this.props.idea.id);
  }

  render() {
    return (
      <Grid item sm key={this.props.idea.id}>
      <Card style={style.Card}>
        <CardHeader
          title = {
            <>
              <Typography variant='h5' gutterBottom onClick={this.handleClick}>
                {this.props.idea.title}
              </Typography>
              <Typography variant='body1' gutterBottom onClick={this.handleClick}>
                {this.props.idea.body}
              </Typography>
            </>
          }
          action = {
            <IconButton>
              <Close onClick={this.handleDelete}/>
            </IconButton>
          }
        >
        </CardHeader>
      </Card>
      </Grid>
    )
  }
}

export default Idea;
