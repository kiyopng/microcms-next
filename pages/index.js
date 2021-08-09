import Card from "./components/Card";
import { client } from "../libs/client";

export default function Home({ blog }) {
  return (
    <main className="container mx-auto py-4">
      <ul>
        {blog.map((blog) => (
          <Card data={blog} />
        ))}
      </ul>
    </main>
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