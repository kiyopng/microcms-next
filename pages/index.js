
import Container from "@material-ui/core/Container";
import Card from "../components/Card";
import Grid from "@material-ui/core/Grid";
import { client } from "../libs/client";

export default function Home({ blog }) {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {blog.map((blog) => (
          <Grid item key={blog.id} xs={12} sm={6}>
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