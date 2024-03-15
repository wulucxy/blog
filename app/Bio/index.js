"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "../Link";
import HomeLink from "../HomeLink";
import icon from "./icon.png";
import wechat from "./wechat.jpg";

export default function Bio() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header>
      <h1>
        <Link href="/" style={{ color: "inherit" }} className="no-underline">
          qingtong Blog
        </Link>
      </h1>
      <div className="flex">
        <div className="flex flex-1">
          <Image
            src={icon}
            alt="Me"
            className="mr-2 rounded"
            style={{ width: "3.5rem", height: "3.5rem" }}
          />
          <p className="flex-1">
            江湖夜雨十年灯，一名跨界前端工程师的呓语
            <br />
            感兴趣可以关注， 聊聊AI、低代码和其他
          </p>
        </div>
        {!isHome && (
          <img src={wechat.src} alt="wecaht" style={{ width: "10rem" }} />
        )}
      </div>
    </header>
  );
}
