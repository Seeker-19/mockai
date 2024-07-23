import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { MdDelete } from "react-icons/md";

function InterviewCard({ interview, onDelete }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };
  return (
    <div className="border rounded-lg shadow-sm p-3 hover:scale-105 cursor-pointer transition transform hover:shadow-md relative">
      <div className="fixed top-2 right-2">
        <MdDelete
          onClick={() => onDelete(interview?.id)}
          size={20}
          className="text-purple-700"
        />
      </div>
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-500">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>
      <div
        className="flex justify-between mt-4 gap-5
      "
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={onFeedback}
        >
          Feedback
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewCard;
