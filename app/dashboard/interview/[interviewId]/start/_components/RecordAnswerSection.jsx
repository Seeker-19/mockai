"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import dynamic from "next/dynamic";
// import Webcam from "react-webcam";
import { useEffect } from "react";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");

  const { user } = useUser();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [loading, setLoading] = useState(false);

  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    //console.log(results);

    results.map((result) => setUserAnswer((prev) => prev + result?.transcript));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      console.log("dfsdf");
      updateUserAnswer();
    }
  }, [userAnswer]);

  const saveUserAnswer = async () => {
    try {
      if (isRecording) {
        setWebcamEnabled(false);
        stopSpeechToText();
      } else {
        setWebcamEnabled(true);
        startSpeechToText();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for giving interview question" +
      "pls give us rating for answer and feedback as area of improvement" +
      "in just 3 to 5 lines in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log("mock", mockJsonResp);

    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp?.feedback,
      rating: JsonFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }

    setResults([]);

    setLoading(false);
    setUserAnswer("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col my-10 justify-center items-center p-5 rounded-lg bg-black">
        {webcamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 300, width: "100%", zIndex: 10 }}
            onUserMediaError={() => console.log("error")}
          />
        ) : (
          <Image width={300} height={300} src={"/webcam.png"} alt="image" />
        )}
      </div>
      <Button
        variant="outline"
        className="bg-purple-500 text-white"
        onClick={saveUserAnswer}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="text-red-400 flex gap-2">
            <Mic />
            Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
