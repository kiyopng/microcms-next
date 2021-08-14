import CommonMeta from "../../components/CommonMeta";
import Container from "@material-ui/core/Container";
import Card from "../../components/Card";
import Grid from "@material-ui/core/Grid";
import { motion } from "framer-motion";
import { client } from "../../libs/client";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    }
}));

export default function Home({ blog }) {
    const classes = useStyles();
    const title = "MIZUAOI.NET";
    const description = "MIZUAOI.NETのサイトです";
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
        >
            <Container maxWidth="lg" className={classes.root}>
            <CommonMeta title={title} description={description} />
            <Grid container spacing={3}>
                {blog.map((blog) => (
                <Grid item key={blog.id} xs={12} sm={6} md={4}>
                    <Card data={blog} />
                </Grid>
                ))}
            </Grid>
            </Container>
        </motion.div>
    );
}

export const getStaticPaths = async (context) => {
    const data = await client.get({ endpoint: "blog" });
    const categorys = data.contents.map((item) => { return item.category });
    let taglist = [];
    categorys.map((tags) => {
        tags.map((tag) => {
            taglist.push(tag);
        })
    });
    taglist = [...new Set(taglist)];
    const paths = taglist.map((tag) => `/tags/${tag}`);
    return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
    const query = context.params.slug;
    const data = await client.get({ endpoint: "blog", queries: { filters: `category[contains]${query}` } });
    return {
        props: {
            blog: data.contents,
        },
    };
};