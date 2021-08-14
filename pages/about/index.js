import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-tailwind/react/Card";
import Image from "@material-tailwind/react/Image";
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
        position: "relative",
        marginTop: 80,
    },
    icon: {
        color: "#2196f3",
    },
    image: {
        maxWidth: 160,
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
    }
}));

export default function About({ about }) {
    const classes = useStyles();
    const title = "MIZUAOI.NET";
    const description = "MIZUAOI.NETのサイトです";
    const profile = about[0];
    return (
        <Container maxWidth="lg" className={classes.root}>
            <CommonMeta title={title} description={description} />
            <Card className={classes.card}>
                <Image
                    className={classes.image}
                    src={`${profile.image.url}?fm=webp`}
                    rounded={true}
                    raised={true}
                />
                <Typography variant="h5" align="center">
                    {profile.name}
                </Typography>
                <Typography variant="body1" align="center" className={classes.description}
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