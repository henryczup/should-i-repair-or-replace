"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import {
  PHONE_MODELS,
  REPAIR_TYPES,
  DIY_TOOLKIT_COST,
  analyzeRepairOptions,
  type PhoneModel,
  type RepairType,
} from "@/lib/repair-data";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const phoneModel = (searchParams.get("model") || "iPhone 13") as PhoneModel;
  const ageInYears = parseFloat(searchParams.get("age") || "2");
  const repairType = (searchParams.get("repair") || "screen") as RepairType;
  const hasTools = searchParams.get("tools") === "true";
  const customPrice = searchParams.get("price");

  const modelData = PHONE_MODELS[phoneModel];
  const repairInfo = REPAIR_TYPES[repairType];
  const isCustomModel = phoneModel === "Other (enter manually)";
  const effectivePrice = isCustomModel
    ? parseInt(customPrice || "500")
    : modelData.msrp;

  const analysis = useMemo(() => {
    return analyzeRepairOptions(
      phoneModel,
      isCustomModel ? parseInt(customPrice || "500") : null,
      ageInYears,
      repairType,
      hasTools
    );
  }, [phoneModel, customPrice, ageInYears, repairType, hasTools, isCustomModel]);

  return (
    <main className="min-h-[calc(100vh-7.5rem)] px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {phoneModel} · {ageInYears} {ageInYears === 1 ? "year" : "years"} old · {repairInfo.name}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Your phone is worth about ${analysis.currentValue}
          </h1>
          <p className="text-sm text-muted-foreground">
            Original price: ${effectivePrice}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {/* Shop Repair */}
          <button
            onClick={() => setSelectedOption("shop")}
            className="w-full text-left p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">Shop repair</p>
              <p className="text-2xl font-semibold">${analysis.shopRepair.cost}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost ratio</span>
                <span>{Math.round(analysis.shopRepair.costRatio * 100)}% of phone value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk</span>
                <span>Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warranty</span>
                <span>Usually included</span>
              </div>
            </div>
          </button>

          {/* DIY Repair */}
          <button
            onClick={() => setSelectedOption("diy")}
            className="w-full text-left p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">DIY repair</p>
              <p className="text-2xl font-semibold">
                ${analysis.diyRepair.cost}
                {!hasTools && (
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}+ ${DIY_TOOLKIT_COST} tools
                  </span>
                )}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost ratio</span>
                <span>{Math.round(analysis.diyRepair.costRatio * 100)}% of phone value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Difficulty</span>
                <span>{repairInfo.diyDifficulty.charAt(0).toUpperCase() + repairInfo.diyDifficulty.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span>{repairInfo.diyTime}</span>
              </div>
            </div>
          </button>

          {/* Replace */}
          <button
            onClick={() => setSelectedOption("replace")}
            className="w-full text-left p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors"
          >
            <div className="space-y-1">
              <p className="font-medium">Buy new phone</p>
              <p className="text-2xl font-semibold">${analysis.replace.cost}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">What you get</span>
                <span>Similar new phone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warranty</span>
                <span>Full manufacturer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected lifespan</span>
                <span>3-5 years</span>
              </div>
            </div>
          </button>
        </div>

        {/* Start Over */}
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="w-full h-12"
        >
          Start over
        </Button>
      </div>

      {/* Why Modal */}
      {selectedOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-background border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {selectedOption === "shop" && "Why shop repair?"}
                {selectedOption === "diy" && "Why DIY repair?"}
                {selectedOption === "replace" && "Why replace?"}
              </h2>
              <button
                onClick={() => setSelectedOption(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-muted-foreground">
              Analysis coming soon. We&apos;re still determining the best metrics to evaluate this option for your situation.
            </p>
            <Button
              onClick={() => setSelectedOption(null)}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-[calc(100vh-7.5rem)] px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-6">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    }>
      <ResultsContent />
    </Suspense>
  );
}
