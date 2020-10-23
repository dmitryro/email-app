import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TagSelector from './TagSelector';
import TextBlock from './TextBlock';
import SendButton from './SendButton';
import ReviewButton from './ReviewButton';
import SentMessage from './SentMessage';
import Canvas from './Canvas';
import TemplatePreview from './TemplatePreview';

import { default as tagStore } from '../store/tagStore';


const useStyles = makeStyles((theme) => ({
  message: {
    width: '100%',
    height:'20px',
    color: 'red',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  textarea: {
    width: 400, 
    height: 135,
    border: 1,
    borderColor: '#DDDDDD',
    borderRadius: 3,
    padding: '0 30px',
  },
  root: {
    padding: '0.6em 2.2em 0.6em 1.2em',
    width: '90%',
    minHeight: '500px',
    height: '100%',
  },
  middle: {
    padding: '0.6em 0.0em 0.6em 1.0em',
    border: 0
  },
  right: {
    display: 'box',
    background:'#FFFF00',
    marginRight: '1.2em',
    marginLeft: '-2.2em',
    width:'94%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
}));

function Design() {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [visible, setVisible] = useState(true);
  var previewpan = null;

  let style = {fontSize:'1.0em', display:'none'};

  useEffect(() => {
  });

  const handle_preview = () => {
     setVisible(true);
     tagStore.setTemplate('test template');
     if(visible) style.display = "box";
  }

  const reset = () => {
     tagStore.reset();      
  }


  return (
      <Grid container spacing={6}>
        <Grid item xs={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>Tags
                    </Typography>
                    <TagSelector/>
                    <TextBlock/>    
            </CardContent>
            </Card>
        </Grid>          
        <Grid item xs={8}> 
                    <Grid container spacing={6}>
                         <Grid item xs={6}>
                              <Typography className={classes.title} color="textSecondary" gutterBottom>Template
                               </Typography>
                         </Grid>
                         <Grid item xs={6}>
                              <Typography className={classes.title} color="textSecondary" gutterBottom>Preview
                               </Typography>
                         </Grid> 
                    </Grid>
                    <Grid container spacing={6}>
                         <Grid item xs={6}>
                             <Canvas used={tagStore.used}/>
                         </Grid>
                         <Grid item xs={6}>
                             <TemplatePreview/>
                         </Grid>      
                    </Grid>

                    <Grid container spacing={6}>
                         <Grid item xs={4}>
                           
                         </Grid>
                         <Grid item xs={2}>

                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={reset}
                              className={classes.submit}>
                              Reset
                             </Button>                    
       
                         </Grid>
                         <Grid item xs={4}>
                             <SentMessage/>
                         </Grid>
                         <Grid item xs={2}>
                             <ReviewButton/>
                         </Grid>

                    </Grid>


        </Grid>
      </Grid>
  );
}

export default observer(Design);
