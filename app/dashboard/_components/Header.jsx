"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm border-b">
      <div className="flex gap-4 items-center">
        {" "}
        <Image
          src={"/logo.svg"}
          width={50}
          height={50}
          alt="logo"
          className="transition transform cursor-pointer hover:scale-125"
        />
        <p className="text-purple-950 text-lg font-bold">AI Mocker</p>
      </div>

      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/home" && "text-primary font-bold"
          }`}
        >
          <Link href={"/"}> Home</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>

        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-primary font-bold"
          }`}
        >
          <Link href={"/dashboard/upgrade"}> Upgrade</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
