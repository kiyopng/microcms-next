import Link from "next/link";
import { client } from "../libs/client";

export default function Home({ design }) {
  return (
    <div>
      <ul>
        {design.map((design) => (
          <li key={design.id}>
            <Link href={`/design/${design.id}`}>
              <a>{design.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "design" });

  return {
    props: {
      design: data.contents,
    },
  };
};