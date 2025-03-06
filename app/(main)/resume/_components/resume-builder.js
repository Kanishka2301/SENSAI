"use client";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Download } from "lucide-react";

const ResumeBuilder = ({ initialContent }) => {
  return (
    <div>
      <div className="flec fex-col md:flex-row justify-between items-center gap-2">
        <h1 className="font-bold gradient-title text-5xl md:text-6xl">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button variant="destructive">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
