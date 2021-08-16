import CommonMeta from "../../components/CommonMeta";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import { client } from "../../libs/client";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
    card: {
        padding:theme.spacing(3),
    },
    box: {
        display: 'flex',
        boxOrient: 'vertical',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            marginRight: theme.spacing(0.8),
            marginTop: theme.spacing(0.8),
            marginBottom: theme.spacing(0.8),
        },
    },
    typography: {
        margin: theme.spacing(3),
    },
}));

export default function Tags({ tags }) {
    const classes = useStyles();
    const title = "Tags | MIZUAOI.NET";
    const description = "MIZUAOI.NETのサイトです";
    const ogp = "/ogp/OGP.png";
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 0.4 }}
        >
            <Container maxWidth="lg" className={classes.root}>
                <CommonMeta title={title} description={description} ogp={ogp} />
                <Typography variant="h4" conponent="h2" align="center" className={classes.typography}>
                    Tags
                </Typography>
                <Card className={classes.card} variant="outlined">
                    <Box className={classes.box}>
                        {tags.map((tag) => (
                            <Chip
                                key={tag}
                                variant="outlined"
                                size="normal"
                                label={`#${tag}`}
                                component="a"
                                clickable
                                href={`/tags/${tag}`}
                            />
                        ))}
                    </Box>
                </Card>
            </Container>
        </motion.div>
    );
}

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "blog" });
    const categorys = data.contents.map((item) => { return item.category });
    let taglist = [];
    categorys.map((tags) => {
        tags.map((tag) => {
            taglist.push(tag);
        })
    });
    taglist = [...new Set(taglist)];
    
    return {
        props: {
            tags: taglist,
        },
    };
};