"use client";

import { SubjectFormValues, SubjectSchema, validGrades } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useIsSmallScreen } from "../lib/use-is-small-screen";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function SubjectForm() {
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      subjects: [{ name: "", units: 0, grade: 0 }],
    },
  });

  const isSmallScreen = useIsSmallScreen();
  const [gpa, setGpa] = useState<number | null>(null);
  const [autoCalc, setAutoCalc] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  const subjects = useWatch({
    control: form.control,
    name: "subjects",
  });

  useEffect(() => {
    if (autoCalc && subjects) {
      form.trigger("subjects").then((isValid) => {
        if (isValid) {
          setGpa(calculateGpa(subjects));
        } else {
          setGpa(null);
        }
      });
    }
  }, [autoCalc, form, subjects]);

  function calculateGpa(subjects: SubjectFormValues["subjects"]) {
    const validSubjects = subjects.filter(
      (subj) =>
        typeof subj.grade === "number" &&
        !isNaN(subj.units) &&
        !isNaN(subj.grade) &&
        subj.units > 0
    );

    const totalUnits = validSubjects.reduce((sum, subj) => sum + subj.units, 0);
    const weightedGrades = validSubjects.reduce(
      (sum, subj) => sum + subj.units * subj.grade,
      0
    );
    const calculatedGpa = totalUnits > 0 ? weightedGrades / totalUnits : NaN;
    return isNaN(calculatedGpa) ? null : parseFloat(calculatedGpa.toFixed(2));
  }

  function onSubmit(data: SubjectFormValues) {
    setGpa(calculateGpa(data.subjects));
  }

  function getHonor(gpa: number | null): string {
    if (gpa === null) return "";
    else if (gpa > 3.5) return "Summa Cum Laude";
    else if (gpa > 3.26) return "Magna Cum Laude";
    else if (gpa > 3) return "Cum Laude";
    return "";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="mx-auto">
          <div className="px-6 w-full grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-center">
            <span className="min-w-0">Subject</span>
            <span className="min-w-0">Units</span>
            <span className="min-w-0">Grade</span>
            <span className="min-w-0">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  form.reset({ subjects: [{ name: "", units: 0, grade: 0 }] });
                  setGpa(null);
                }}
                className="group"
              >
                <RefreshCw className="transition-transform duration-300 group-hover:rotate-90" />
              </Button>
            </span>
          </div>

          {fields.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500 italic">
              No subjects yet. Add subjects to calculate your GPA.
            </div>
          ) : (
            fields.map((field, index) => (
              <div
                key={field.id}
                className="px-6 w-full grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-start"
              >
                <FormField
                  control={form.control}
                  name={`subjects.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex flex-col">
                      <FormControl>
                        <Input
                          placeholder="Optional"
                          {...field}
                          className="w-full text-sm"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`subjects.${index}.units`}
                  render={({ field }) => {
                    const placeholderText = isSmallScreen
                      ? "--"
                      : "Enter units";

                    return (
                      <FormItem className="min-w-0 flex flex-col">
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder={placeholderText}
                            className="w-full text-sm [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={field.value === 0 ? "" : field.value}
                            onFocus={(e) => {
                              if (e.target.value === "0") {
                                e.target.value = "";
                              }
                            }}
                            onBlur={(e) => {
                              const val = parseFloat(e.target.value);
                              field.onChange(isNaN(val) || val < 0 ? 0 : val);
                            }}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value);
                              field.onChange(isNaN(val) || val < 0 ? 0 : val);
                            }}
                            onKeyDown={(e) => {
                              const invalidKeys = [
                                "e",
                                "E",
                                "+",
                                "-",
                                ".",
                                " ",
                              ];
                              const isAlpha =
                                e.key.length === 1 && /[a-zA-Z]/.test(e.key);

                              if (invalidKeys.includes(e.key) || isAlpha) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-sm mt-1 w-full text-left whitespace-nowrap hidden sm:block" />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name={`subjects.${index}.grade`}
                  render={({ field }) => {
                    const placeholderText = isSmallScreen
                      ? "--"
                      : "Select a grade";

                    const isPlaceholder = field.value === 0;

                    return (
                      <FormItem className="min-w-0 flex flex-col">
                        <FormControl>
                          <Select
                            value={field.value.toFixed(1)}
                            onValueChange={(val) => {
                              const numericVal = Number(val);
                              field.onChange(
                                isNaN(numericVal) ? 0 : numericVal
                              );
                            }}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full hide-select-icon",
                                isPlaceholder && "text-muted-foreground",
                                form.formState.errors.subjects?.[index]
                                  ?.grade &&
                                  "border-destructive ring-destructive"
                              )}
                            >
                              <SelectValue>
                                {isPlaceholder
                                  ? placeholderText
                                  : field.value.toFixed(1)}
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem
                                value={"0.0"}
                                className="hidden"
                                aria-hidden="true"
                              >
                                {placeholderText}
                              </SelectItem>

                              {validGrades.map((grade) => (
                                <SelectItem
                                  key={grade}
                                  value={grade.toFixed(1)}
                                >
                                  {grade.toFixed(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage className="text-sm mt-1 w-full text-left whitespace-nowrap hidden sm:block" />
                      </FormItem>
                    );
                  }}
                />

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => {
                      remove(index);
                      if (autoCalc) {
                        const currentSubjects = form.getValues("subjects");
                        setGpa(calculateGpa(currentSubjects));
                      }
                    }}
                    className="hover:text-red-500"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))
          )}

          <div className="px-6 flex items-center space-x-4">
            <Button
              type="button"
              onClick={() => {
                append({ name: "", units: 0, grade: 0 });
                form.clearErrors();
                setGpa(null);
              }}
            >
              + Add Subject
            </Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="auto-calc"
                checked={autoCalc}
                onCheckedChange={(checked) => setAutoCalc(checked === true)}
              />
              <Label htmlFor="auto-calc">Auto-Calculation</Label>
            </div>
          </div>
        </Card>

        {!autoCalc && (
          <Button type="submit" className="w-full">
            Calculate GPA
          </Button>
        )}

        {(autoCalc || gpa !== null) && (
          <Card className="text-center">
            <span className="text-lg font-semibold">
              Grade Point Average (GPA):{" "}
            </span>
            <span className="moving-gradient text-4xl font-bold">
              {gpa !== null ? gpa : "--"}
            </span>

            {getHonor(gpa) !== "" && (
              <span className="max-w-md mx-auto bg-muted rounded px-[0.3rem] py-[0.2rem] text-sm font-medium">
                Meets Requirements for {getHonor(gpa)}
              </span>
            )}
          </Card>
        )}
      </form>
    </Form>
  );
}
