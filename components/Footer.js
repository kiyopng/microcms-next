import React from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        color: "#fff",
        backgroundColor: "rgba(33, 150, 243)",
        width: "100%",
        position: "absolute",
        bottom: 0,
        lineHeight:3,
        textAlign:"center",
    },
});

const Footer = () => {
    const classes = useStyles();
    return <Box className={classes.footer}>MIZUAOI.NET</Box>;
};

export default Footer;