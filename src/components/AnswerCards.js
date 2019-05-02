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

class AnswerCards extends Component{
    
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

    handleClick = question => event => {
        if(question.correct){
            event.currentTarget.style.backgroundColor = 'green'
        }else{
            event.currentTarget.style.backgroundColor = 'red'
        }
    }

    //#endregion

    //#region toggles

    //#endregion

    //#region Render Methods

    render(){
        const { classes } = this.props;

        console.log(this.props.answers)

        return this.props.answers.map(currentQuestion => {
            return (
                <Card className={classes.card} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave} onClick={this.handleClick(currentQuestion)}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {currentQuestion.answer}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })

        return null
    }

    //#endregion

}

export default withStyles(styles)(AnswerCards)