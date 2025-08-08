import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Close } from "@radix-ui/react-dialog";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  PopcornIcon,
  X,
} from "lucide-react";
import React, { useState } from "react";

export default function TampilanAlert({ onClose }) {
  useState(() => {
    document.title = "Alert";
  }, []);
  return (
    <div>
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
        Alert
      </h1>

      <div className="mt-5">
        <div className="grid w-full max-w-full items-start gap-4">
          <Alert>
            <CheckCircle2Icon />
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription>
              This is an alert with icon, title and description.
            </AlertDescription>
          </Alert>
          <Alert>
            <PopcornIcon />
            <AlertTitle>
              <div className="flex justify-between">
                This Alert has a title and an icon. No description.
                <X onClick={onClose} />
              </div>
            </AlertTitle>
          </Alert>
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to process your payment.</AlertTitle>
            <AlertDescription>
              <p>Please verify your billing information and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check your card details</li>
                <li>Ensure sufficient funds</li>
                <li>Verify billing address</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
