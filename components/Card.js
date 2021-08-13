import React from 'react';
import PropTypes from 'prop-types';
import Date from './Date';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

const useStyles = makeStyles((theme)=>({
    box: {
        display: 'flex',
        boxOrient: 'vertical',
        justifyContent: 'right',
        flexWrap: 'wrap',
        paddingBottom: theme.spacing(0.5),
        '& > *': {
            marginRight: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
    },
    datebox: {
        textAlign: 'right',
        boxOrient: 'vertical',
        '& > *': {
            marginRight: theme.spacing(0.5),
            marginBottom: theme.spacing(0.1),
        },
    },
    media: {
        [theme.breakpoints.down('sm')]: {
            height: 150,
        },
        [theme.breakpoints.up('md')]: {
            height: 220,
        },
    },
    title: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        minHeight: 65,
    },
    body: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden",
        minHeight: 40,
    }
}));

function CardLoad(props) {
    const { loading = false } = props.loading;
    const data = props.data;
    const classes = useStyles();
    const router = useRouter();

    return (
        <Card>
            <CardActionArea
                onClick={async () => {
                    router.push(`/blog/${data.id}`);
                }}
            >
            {loading ? (
                <Skeleton animation="wave" variant="rect" className={classes.media} />
            ) : (
                <CardMedia
                    className={classes.media}
                    image={`${data.image.url}?fm=webp`}
                />
            )}
            <CardContent>
            {loading ? (
                <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box className={classes.box}>
                    {data.category.map((tag) => (
                        <Chip
                            key={tag}
                            variant="outlined"
                            size="small"
                            label={`#${tag}`}
                            component="a"
                            clickable
                            href="#chip"
                        />
                    ))}
                    </Box>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
                        { data.description && data.description }
                    </Typography>
                    <Box className={classes.datebox}>
                        <QueryBuilderIcon fontSize="small" color="action" /><Date dateString={data.publishedAt} />
                    </Box>
                </React.Fragment>
                )}
            </CardContent>
            </CardActionArea>
        </Card>
    );
}

CardLoad.propTypes = {
    loading: PropTypes.bool,
};

export default function MyCard({ data }) {
    return (
        <CardLoad loading data={data} />
    );
}
