import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
    media: {
        height: 300,
    },
});

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
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.body}
                    </Typography>
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
