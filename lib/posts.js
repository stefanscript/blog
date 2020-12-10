import fs from "fs";
import {join} from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export function getSortedPostsData(fields = []) {
  const ids = getPostIds();
  return ids
      .map((id) => getPostById(id, fields))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getPostIds() {
  return fs.readdirSync(postsDirectory).map(fileName => fileName.replace(/\.md$/, ""))
}

export function getPostById(id, fields = []) {
  const fullPath = join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "id") {
      items[field] = id;
    }
    if (field === "content") {
      
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}
