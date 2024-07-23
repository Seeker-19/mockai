"use client";
import Image from "next/image";
import Head from "./Head";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Head />
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Practice Mock Interviews
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                With AI Mocker.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Unlock Your Potential with AI Mocker: The Ultimate AI-Powered Mock
              Interview Experience for Future Success!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="block w-full rounded bg-purple-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-purple-500 focus:outline-none focus:ring active:bg-purple-500 sm:w-auto">
                Start Practising
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
