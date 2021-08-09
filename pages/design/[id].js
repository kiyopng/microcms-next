// pages/desgin/[id].js
import { client } from "../../libs/client";

export default function BlogId({ design }) {
    return (
    <main>
        <h1>{design.title}</h1>
        <p>{design.publishedAt}</p>
        <div
        dangerouslySetInnerHTML={{
            __html: `${design.theme}`,
        }}
        />
    </main>
    );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "design" });

    const paths = data.contents.map((content) => `/design/${content.id}`);
    return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "design", contentId: id });

    return {
    props: {
        design: data,
    },
    };
};