import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Post } from "../types";

export const metadata: Metadata = {
  title: "list of all posts",
};

export default function Posts() {
  return (
    <>
      <h1>list of all posts</h1>
      <Suspense fallback={<div>loading posts...</div>}>
        <PostsList />
      </Suspense>
    </>
  );
}

const PostsList = async () => {
  const { data: posts } = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};
