import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
}

class QuestionCard extends Component{
    
    //#region init
    constructor(props){
        super(props)

        this.state = {
        }
    }
    //#endregion

    //#region Actions

    handleHover = (event) => {
        event.currentTarget.style.backgroundColor = 'lightgrey'
    }

    handleLeave = (event) => {
        event.currentTarget.style.backgroundColor = 'white'
    }

    //#endregion

    //#region toggles

    //#endregion

    //#region Render Methods

    render(){
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Question: {this.props.questionNumber} of {this.props.totalQuestions}
                </Typography>
                <Typography variant="h5" component="h2">
                  {this.props.question}
                </Typography>
              </CardContent>
            </Card>
        )
    }

    //#endregion

}

export default withStyles(styles)(QuestionCard)