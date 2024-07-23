"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Head() {
  const router = useRouter();
  return (
    <div className="p-5 border-b shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {" "}
          <Image src={"/logo.svg"} width={80} height={80} alt="image" />
          <p className="text-lg text-purple-800 font-bold">AI Mocker</p>
        </div>
        <Button onClick={() => router.replace("/dashboard")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Head;
