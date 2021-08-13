
import Container from "@material-ui/core/Container";
import Card from "../components/Card";
import Grid from "@material-ui/core/Grid";
import { client } from "../libs/client";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  }
}));

export default function Home({ blog }) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        {blog.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6} md={4}>
            <Card data={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });
  return {
    props: {
      blog: data.contents,
    },
  };
};