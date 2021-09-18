import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/Date";

export default function Home({ allPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hey I&rsquo;m Stefan, a software engineer. <br />I started exploring
          the world of software at a young age. It was then, whilst I was playing PC games, that I realised that if you tweak
          a few files you can get some different outcomes.
          I thought, this is big.
        </p>
        <p>
          Next, I started to build my own websites with mini games.
        </p>
          <p>It was this experience that got me my first junior developer job.</p>
        <p>This is my blog with posts from my experience.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getSortedPostsData([
    "id",
    "title",
    "date",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
