import CommonMeta from "../../components/CommonMeta";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    }
}));

export default function Tags() {
    const classes = useStyles();
    const title = "MIZUAOI.NET";
    const description = "MIZUAOI.NETのサイトです";
    return (
        <Container maxWidth="lg" className={classes.root}>
            <CommonMeta title={title} description={description} />
            <h1>Tags</h1>
        </Container>
    );
}