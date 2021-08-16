import React from "react";
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import Image from "@material-tailwind/react/Image";
import { motion } from "framer-motion";
import { client } from "../../libs/client";
import { makeStyles } from '@material-ui/core/styles';
import CommonMeta from "../../components/CommonMeta";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
    box: {
        textAlign: "center",
        '& > *': {
            margin: theme.spacing(0.3),
        },
    },
    card: {
        marginTop: 80,
        overflow: "visible",
        padding: theme.spacing(1),
    },
    icon: {
        color: "#2196f3",
    },
    image: {
        maxWidth: 130,
        position: "relative",
        marginTop: -80,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(3),
    },
    description: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    typography: {
        margin: theme.spacing(3),
    },
}));

export default function About({ about }) {
    const classes = useStyles();
    const title = "About | MIZUAOI.NET";
    const description = "MIZUAOI.NETのサイトです";
    const ogp = "/assets/ogp/OGP.png";
    const profile = about[0];
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
                    About
                </Typography>
                <Card className={classes.card} variant="outlined">
                    <Image
                        className={classes.image}
                        src={`${profile.image.url}?fm=webp`}
                        rounded={true}
                        raised={true}
                        alt="kiyopng"
                    />
                    <Typography variant="h5" align="center">
                        {profile.name}
                    </Typography>
                    <Typography variant="body1" component="div" align="center" className={classes.description}
                        dangerouslySetInnerHTML={{
                            __html: `${profile.description}`,
                        }}
                    />
                    <Box className={classes.box}>
                        <IconButton href={profile.twitter} target="_blank" className={classes.icon} aria-label="Twitter">
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href={profile.github} target="_blank" className={classes.icon} aria-label="Github">
                            <GitHubIcon />
                        </IconButton>
                    </Box>
                </Card>
            </Container>
        </motion.div>
    );
}

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "about" });
    return {
        props: {
        about: data.contents,
        },
    };
};