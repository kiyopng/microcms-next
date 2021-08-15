import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CommonMeta from "../components/CommonMeta";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

export default function Custom404() {
    const classes = useStyles();
    const title = "MIZUAOI.NET";
    const description = "MIZUAOI.NETのサイトです";
    
    return (
        <Container maxWidth="lg" className={classes.root}>
            <CommonMeta title={title} description={description} />
            <Box className={classes.root}>
                <Typography align="center" variant="h1" component="h3">
                    404
                </Typography>
                <Typography align="center" variant="h3" component="h3">
                    NOT FOUND
                </Typography>
                <Typography align="center" variant="body1" component="h3">
                    ページが見つかりません。
                </Typography>
            </Box>
        </Container>
    );
}