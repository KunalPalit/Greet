"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useGetCallById } from "@/hooks/useGetCallById";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import Loader from "@/components/Loader";

export default function Meeting({ params }: { params: { id: string } }) {
  const { user, isLoaded } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
