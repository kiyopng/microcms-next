import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        boxOrient: 'vertical',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function BasicPagination({totalCount}) {
    const classes = useStyles();
    const limit = 12;
    const count = totalCount > 12 ? Math.ceil(totalCount / limit) : 1;

    return (
        <Box align="center" className={classes.root}>
            <Pagination count={count} />
        </Box>
    );
}