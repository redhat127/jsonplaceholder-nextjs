import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { User } from "../types";

export const metadata: Metadata = {
  title: "list of all users",
};

export default function Users() {
  return (
    <>
      <h1>list of all users</h1>
      <Suspense fallback={<div>loading users...</div>}>
        <UsersList />
      </Suspense>
    </>
  );
}

const UsersList = async () => {
  const { data: users } = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>{user.username}</Link>
        </li>
      ))}
    </ul>
  );
};
