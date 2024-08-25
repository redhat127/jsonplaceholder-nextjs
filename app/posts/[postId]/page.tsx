import { Comment, Post, User } from "@/app/types";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateMetadata = async ({
  params: { postId },
}: {
  params: { postId: string };
}): Promise<Metadata> => {
  try {
    const { data: post } = await axios.get<Post>(
      "https://jsonplaceholder.typicode.com/posts/" + postId
    );
    return { title: post.title };
  } catch (e) {
    notFound();
  }
};

export default function PostPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  return (
    <>
      <Suspense fallback={<div>loading post...</div>}>
        <PostCard postId={postId} />
      </Suspense>
      <h2>list of all comments</h2>
      <Suspense fallback={<div>loading comments</div>}>
        <PostComments postId={postId} />
      </Suspense>
    </>
  );
}

const PostComments = async ({ postId }: { postId: string }) => {
  const { data: comments } = await axios.get<Comment[]>(
    "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments"
  );
  return comments.map((comment) => (
    <div
      key={comment.id}
      style={{
        padding: "1rem",
        borderRadius: "0.2rem",
        border: "1px solid black",
        marginBottom: "1rem",
      }}
    >
      {comment.body}
    </div>
  ));
};

const PostCard = async ({ postId }: { postId: string }) => {
  try {
    const { data: post } = await axios.get<Post>(
      "https://jsonplaceholder.typicode.com/posts/" + postId
    );
    return (
      <>
        <h1>{post.title}</h1>
        <Suspense
          fallback={
            <div>
              <b>author: </b>
              loading author...
            </div>
          }
        >
          <PostAuthor userId={post.userId.toString()} />
        </Suspense>
        <p>{post.body}</p>
      </>
    );
  } catch (e) {
    notFound();
  }
};

const PostAuthor = async ({ userId }: { userId: string }) => {
  const { data: user } = await axios.get<User>(
    "https://jsonplaceholder.typicode.com/users/" + userId
  );
  return (
    <>
      <div>
        <b>author: </b>
        <Link href={`/users/${user.id}`}>{user.username}</Link>
      </div>
    </>
  );
};
