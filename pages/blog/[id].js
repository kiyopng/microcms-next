import React from "react";
import Date from '../../components/Date';
import { client } from "../../libs/client";
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CachedIcon from '@material-ui/icons/Cached';

export default function BlogId({ blog }) {
    const useStyles = makeStyles((theme) => ({
        box: {
            display: 'flex',
            boxOrient: 'vertical',
            justifyContent: 'right',
            flexWrap: 'wrap',
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1.5),
            paddingBottom: theme.spacing(0.5),
            '& > *': {
                marginRight: theme.spacing(0.5),
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
        bgImage: {
            position: "relative",
            top:-12,
            minHeight: 400,
            backgroundImage: `url(${blog.image.url}?fm=webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        },
        bgFilter: {
            minHeight: 400,
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        paper: {
            position: "relative",
            top: -250,
            minHeight:400,
            padding:theme.spacing(5),
        },
        contents: {
            paddingTop: theme.spacing(2),
            paddingBottom:theme.spacing(1.5),
        }
    }));
    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper elevation={0} square className={classes.bgImage}>
                <Paper elevation={0} square className={classes.bgFilter} />
            </Paper>
            <Container>
                <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h4" component="h1">{blog.title}</Typography>
                    <Box className={classes.box}>
                    {blog.category.map((tag) => (
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
                    <Box className={classes.datebox}>
                        <CachedIcon fontSize="small" color="action" /><Date dateString={blog.revisedAt} />
                        <QueryBuilderIcon fontSize="small" color="action" /><Date dateString={blog.publishedAt} />
                    </Box>
                    <Typography variant="body1" content="div" className={classes.contents}
                    dangerouslySetInnerHTML={{
                        __html: `${blog.body}`,
                    }}
                    />
                </Paper>
            </Container>
        </React.Fragment>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "blog" });

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "blog", contentId: id });

    return {
        props: {
            blog: data,
        },
    };
};