"use client";

import { SubjectFormValues, SubjectSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash, RefreshCw } from "lucide-react";
import { useState } from "react";
// import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
// import { SelectValue } from "@radix-ui/react-select";

export default function SubjectForm() {
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      subjects: [{ name: "", units: 0, grade: 0 }],
    },
  });

  const [gpa, setGpa] = useState<number | null>(null);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects",
  });

  function onSubmit(data: SubjectFormValues) {
    const totalUnits = data.subjects.reduce((sum, subj) => sum + subj.units, 0);
    const weightedGrades = data.subjects.reduce(
      (sum, subj) => sum + subj.units * subj.grade,
      0
    );
    const calculatedGpa = totalUnits > 0 ? weightedGrades / totalUnits : 0;
    setGpa(parseFloat(calculatedGpa.toFixed(2)));
    console.log("GPA:", calculatedGpa.toFixed(2));
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
                  form.reset();
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
                className="px-6 w-full grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-start" // <-- changed items-end to items-start
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
                          className="w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key))
                              e.preventDefault();
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`subjects.${index}.units`}
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          className="w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onKeyDown={(e) => {
                            if (["e", "E", "+", "-"].includes(e.key))
                              e.preventDefault();
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-sm mt-1 w-full whitespace-nowrap overflow-hidden hidden sm:block" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`subjects.${index}.grade`}
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-sm mt-1 w-full whitespace-nowrap overflow-hidden hidden sm:block" />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name={`subjects.${index}.grade`}
                  render={({ field }) => (
                    <FormItem className="min-w-0 flex flex-col">
                      <FormControl>
                        <Select
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                          onValueChange={(val) =>
                            field.onChange(parseFloat(val))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4.0">4.0</SelectItem>
                            <SelectItem value="3.5">3.5</SelectItem>
                            <SelectItem value="3.0">3.0</SelectItem>
                            <SelectItem value="2.5">2.5</SelectItem>
                            <SelectItem value="2.0">2.0</SelectItem>
                            <SelectItem value="1.0">1.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-sm mt-1 w-full whitespace-nowrap overflow-hidden text-ellipsis" />
                    </FormItem>
                  )}
                /> */}

                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => remove(index)}
                    className="hover:text-red-500"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))
          )}

          <div className="px-6">
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
          </div>
        </Card>

        <Button type="submit" className="w-full">
          Calculate GPA
        </Button>

        {gpa !== null && (
          <Card className="text-center text-lg font-semibold">
            Grade Point Average (GPA): <span className="moving-gradient text-4xl text-bold">{gpa}</span>
          </Card>
        )}
      </form>
    </Form>
  );
}
