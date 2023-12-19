import AutoRefresh from "./AutoRefresh";
import { Hero } from "./Hero";
import "./style.css";

export default function RootLayout({ children }) {
  return (
    <AutoRefresh>
      <html lang="en">
        <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
          <header className="flex flex-row place-content-between">
            <Hero />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </AutoRefresh>
  );
}
