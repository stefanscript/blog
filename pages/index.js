import Head from "next/head";
import styles from "../styles/Home.module.css";
import {getAllPosts} from "../lib/api";
import Link from "next/link";

export default function Home({ allPosts }) {
  const heroPost = allPosts[0];

  return (
    <div className={styles.container}>
      <Head>
        <title>stefanscript blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to stefanscript blog</h1>

        <div className={styles.grid}>
          <Link as={`/posts/${heroPost.slug}`} href="/posts/[slug]">
          <a className={styles.card}>
            <h3>{heroPost.title}</h3>
            <p>{heroPost.excerpt}</p>
          </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
