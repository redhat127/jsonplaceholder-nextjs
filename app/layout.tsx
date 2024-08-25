import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">home</Link>
              </li>
              <li>
                <Link href="/todos">todos</Link>
              </li>
              <li>
                <Link href="/users">users</Link>
              </li>
              <li>
                <Link href="/posts">posts</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
