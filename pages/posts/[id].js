import { getPostById, getPostIds } from "../../lib/posts";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import Layout from "../../components/Layout";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/Date";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostById(params.id, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getPostIds();

  return {
    paths: posts.map((postId) => {
      return {
        params: {
          id: postId,
        },
      };
    }),
    fallback: false,
  };
}
