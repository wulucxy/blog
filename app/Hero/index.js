"use client";

import { usePathname } from "next/navigation";
import Bio from "../Bio";
import HomeLink from "../HomeLink";

export const Hero = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";

  return <>{isActive ? <Bio /> : <HomeLink />}</>;
};
