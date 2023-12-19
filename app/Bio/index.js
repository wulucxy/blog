"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "../Link";
import HomeLink from "../HomeLink";
import icon from "./icon.png";

export default function Bio() {
  return (
    <header>
      <h1>
        <Link href="/" style={{ color: "inherit" }} className="no-underline">
          qingtong Blog
        </Link>
      </h1>
      <div className="flex">
        <Image
          src={icon}
          alt="Me"
          className="mr-2 rounded"
          style={{ width: "3.5rem", height: "3.5rem" }}
        />
        <p className="flex-1">
          来自接地气的一线实践开发经验，用心做原创
          <br />
          分享关于低代码、数据可视化、效率工具等，打造专业前端知识库
        </p>
      </div>
    </header>
  );
}
