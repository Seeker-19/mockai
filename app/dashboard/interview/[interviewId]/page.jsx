"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function page({ params }) {
  //console.log(params.interviewId);

  const [interviewData, setInterviewData] = useState();

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);

    setInterviewData(result[0]);
  };

  useEffect(() => {
    console.log(interviewData);
  }, [interviewData]);
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 gap-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description:</strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Job Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-purple-300 bg-purple-200">
            <h2 className="flex gap-2 items-center text-purple-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-purple-500">
              {process.env.NEXT_PUBLIC_INFO}
            </h2>
          </div>
        </div>

        <div>
          <WebcamIcon className="h-72 my-7 w-full p-10 bg-secondary rounded-lg border" />
          <div className="flex justify-end items-end">
            {" "}
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
              <Button>Start Interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
