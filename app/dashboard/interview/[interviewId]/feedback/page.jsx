"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function page({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const router = useRouter();
  const getFeedback = async () => {
    console.log("ids", UserAnswer.mockIdRef, params.interviewId);
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId));

    console.log(result);

    const highestRatedFeedback = result.reduce((acc, item) => {
      if (!acc[item.question] || item.rating > acc[item.question].rating) {
        acc[item.question] = item;
      }
      return acc;
    }, {});

    console.log(highestRatedFeedback);

    const uniqueFeedbackList = Object.values(highestRatedFeedback);

    console.log(uniqueFeedbackList);

    setFeedbackList(uniqueFeedbackList);

    if (uniqueFeedbackList.length > 0) {
      const totalRating = uniqueFeedbackList.reduce(
        (sum, item) => sum + item.rating,
        0
      );
      const avgRating = totalRating / uniqueFeedbackList.length;
      console.log("Total Rating:", totalRating);
      console.log("Average Rating Calculated:", avgRating);
      setAverageRating(avgRating);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  useEffect(() => {
    console.log(averageRating);
  }, [averageRating]);
  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-2xl my-5">No interview Feedback </h2>
      ) : (
        <>
          {" "}
          <h2 className="text-3xl font-bold text-blue-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview Feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall rating : {averageRating}
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary flex justify-between rounded-lg my-2 text-left gap-6 items-center w-full">
                  {item?.question} <ChevronsUpDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-blue-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item?.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-200 text-sm text-blue-800">
                      <strong>Your Answer: </strong>
                      {item?.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-purple-200 text-sm text-purple-800">
                      <strong>Correct Answer: </strong>
                      {item?.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-200 text-sm text-green-600">
                      <strong>Feedback: </strong>
                      {item?.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
}

export default page;
