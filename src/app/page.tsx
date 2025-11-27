"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PHONE_MODELS,
  REPAIR_TYPES,
  type PhoneModel,
  type RepairType,
} from "@/lib/repair-data";

export default function Home() {
  const router = useRouter();
  const [phoneModel, setPhoneModel] = useState<PhoneModel>("iPhone 13");
  const [customPrice, setCustomPrice] = useState<string>("");
  const [ageInYears, setAgeInYears] = useState<number>(2);
  const [repairType, setRepairType] = useState<RepairType>("screen");
  const [hasTools, setHasTools] = useState<boolean>(false);

  const isCustomModel = phoneModel === "Other (enter manually)";
  const modelData = PHONE_MODELS[phoneModel];

  // Calculate default age based on release year + 0.5 years
  const calculateDefaultAge = (year: number) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const yearsSinceRelease = currentYear - year + (currentMonth / 12) - 0.5;
    // Round to nearest option: 0.5, 1, 2, 3, 4, 5
    if (yearsSinceRelease < 0.75) return 0.5;
    if (yearsSinceRelease < 1.5) return 1;
    if (yearsSinceRelease < 2.5) return 2;
    if (yearsSinceRelease < 3.5) return 3;
    if (yearsSinceRelease < 4.5) return 4;
    return 5;
  };

  // Update age when phone model changes
  const handlePhoneChange = (model: PhoneModel) => {
    setPhoneModel(model);
    if (model !== "Other (enter manually)") {
      const releaseYear = PHONE_MODELS[model].year;
      setAgeInYears(calculateDefaultAge(releaseYear));
    }
  };

  const phoneModelGroups = useMemo(() => {
    const groups: Record<string, PhoneModel[]> = {
      Apple: [],
      Samsung: [],
      Google: [],
      Other: [],
    };

    (Object.keys(PHONE_MODELS) as PhoneModel[]).forEach((model) => {
      if (model.startsWith("iPhone")) {
        groups["Apple"].push(model);
      } else if (model.startsWith("Samsung")) {
        groups["Samsung"].push(model);
      } else if (model.startsWith("Google")) {
        groups["Google"].push(model);
      } else {
        groups["Other"].push(model);
      }
    });

    return groups;
  }, []);

  const handleAnalyze = () => {
    const params = new URLSearchParams({
      model: phoneModel,
      age: ageInYears.toString(),
      repair: repairType,
      tools: hasTools.toString(),
      ...(isCustomModel && customPrice ? { price: customPrice } : {}),
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <main className="min-h-[calc(100vh-7.5rem)] px-4 py-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Should I repair or replace?
          </h1>
          <p className="text-muted-foreground text-sm">
            Get an honest economic analysis
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Phone Model */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">Phone</Label>
            <Select
              value={phoneModel}
              onValueChange={(v) => handlePhoneChange(v as PhoneModel)}
            >
              <SelectTrigger className="h-12 bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(phoneModelGroups).map(([group, models]) =>
                  models.length > 0 ? (
                    <div key={group}>
                      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                        {group}
                      </div>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </div>
                  ) : null
                )}
              </SelectContent>
            </Select>
            {!isCustomModel && (
              <p className="text-xs text-muted-foreground">
                Released {modelData.year}
              </p>
            )}
          </div>

          {/* Custom Price */}
          {isCustomModel && (
            <div className="space-y-2">
              <Label className="text-muted-foreground text-sm">
                Original price
              </Label>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="500"
                className="flex h-12 w-full rounded-md bg-secondary px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          )}

          {/* Phone Age */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">How long have you had it?</Label>
            <Select
              value={ageInYears.toString()}
              onValueChange={(v) => setAgeInYears(parseFloat(v))}
            >
              <SelectTrigger className="h-12 bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">Less than a year</SelectItem>
                <SelectItem value="1">About 1 year</SelectItem>
                <SelectItem value="2">About 2 years</SelectItem>
                <SelectItem value="3">About 3 years</SelectItem>
                <SelectItem value="4">About 4 years</SelectItem>
                <SelectItem value="5">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Repair Type */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">
              What needs fixing?
            </Label>
            <Select
              value={repairType}
              onValueChange={(v) => setRepairType(v as RepairType)}
            >
              <SelectTrigger className="h-12 bg-secondary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(REPAIR_TYPES) as RepairType[]).map((type) => (
                  <SelectItem key={type} value={type}>
                    {REPAIR_TYPES[type].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Has Tools */}
          <div className="space-y-2">
            <Label className="text-muted-foreground text-sm">
              Do you have repair tools?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setHasTools(true)}
                className={`h-12 rounded-md text-sm transition-colors ${
                  hasTools
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setHasTools(false)}
                className={`h-12 rounded-md text-sm transition-colors ${
                  !hasTools
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleAnalyze}
            className="w-full h-12 text-sm font-medium"
          >
            Analyze options
          </Button>
        </div>
      </div>
    </main>
  );
}
