"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const ResumeBuilder = ({ initialContent }) => {
  return (
    <div>
      <div>
        <h1 className="font-bold gradient-title text-5x md:text-6xl">
          Resume Builder
        </h1>

        <div>
          <Button variant="destructive">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="destructive">
            <Save className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
