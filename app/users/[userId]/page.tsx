import { Post, User } from "@/app/types";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async ({
  params: { userId },
}: {
  params: { userId: string };
}): Promise<Metadata> => {
  try {
    const { data: user } = await axios.get<User>(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );
    return { title: user.username };
  } catch (e) {
    notFound();
  }
};

export default function UserPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  return (
    <>
      <Suspense fallback={<div>loading user...</div>}>
        <UserCard userId={userId} />
      </Suspense>
      <h2>list of all posts</h2>
      <Suspense fallback={<div>loading posts...</div>}>
        <PostsList userId={userId} />
      </Suspense>
    </>
  );
}

const UserCard = async ({ userId }: { userId: string }) => {
  try {
    const { data: user } = await axios.get<User>(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );
    return (
      <>
        <h1>{user.username}</h1>
        <div>{user.email}</div>
      </>
    );
  } catch (e) {
    notFound();
  }
};

const PostsList = async ({ userId }: { userId: string }) => {
  const { data: posts } = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts/?userId=" + userId
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
