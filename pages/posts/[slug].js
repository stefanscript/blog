import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import Link from "next/link";
import markdownStyles from "../../components/markdown-styles.module.css";
import styles from "../../styles/Home.module.css";

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className={styles.container}>
      <div>
        <div>
          <Link href="/">
            <a className="hover:underline">Back to Home</a>
          </Link>
        </div>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{post.title}</title>
              </Head>
              <h1 className={"text-4xl mt-12 mb-4 leading-snug"}>
                {post.title}
              </h1>
              <div className={"mb-5"}>Date:{post.date} | Author:{post.author}</div>
              <div
                className={markdownStyles["markdown"]}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
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
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
