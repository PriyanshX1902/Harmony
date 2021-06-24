import React from 'react';
import { Button, Typography, TextField, Grid, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useContext } from 'react';
import { SocketContext } from '../SocketContext';
import { useState } from 'react';
import { Assignment, PhoneDisabled, Phone } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
   }));
const Options = ({children}) =>{
    const classes = useStyles();
    const {me, callAccepted, name, setName, leaveCall, callUser, callEnded} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    return (
        <Container className = {classes.container}>
            <Paper elevation = {10}>
                <form className = {classes.root} noValidate autoComplete = "off">
                    <Grid container className = {classes.gridContainer}>
                        <Grid item className = {classes.padding} xs = {12} md = {6}>
                            <Typography variant = "h6" gutterBottom>Account Info</Typography>
                            <TextField label = "Name" value = {name} onChange = {(e)=>setName(e.target.value)}/>
                            <CopyToClipboard text = {me} className = {classes.margin}>
                                <Button variant = "contained" color = "primary" startIcon = {<Assignment fontSize = "large"/>}>
                                    Copy your ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item className = {classes.padding} xs = {12} md = {6}>
                            <Typography variant = "h6" gutterBottom>Make a call</Typography>
                            <TextField label = "ID to call" value = {idToCall} onChange = {(e)=>setIdToCall(e.target.value)}/>
                            {callAccepted && !callEnded ?(
                                <Button 
                                variant = "contained" 
                                color = "secondary" 
                                startIcon = {<PhoneDisabled fontSize = "large"/>}
                                fullWidth
                                onClick = {()=>leaveCall()}
                                className = {classes.margin}
                                >
                                    Hang up!
                                </Button>
                            ):(
                                <Button
                                variant = "contained" 
                                color = "primary"
                                startIcon = {<Phone fontSize = "large"/>}
                                fullWidth
                                onClick = {()=>{callUser(idToCall)}}
                                className = {classes.margin}
                                >
                                    Call User
                                </Button>
                            )}
                        </Grid>

                    </Grid>
                </form>
                {children}
            </Paper>
           
        </Container>
    );
}
export default Options;