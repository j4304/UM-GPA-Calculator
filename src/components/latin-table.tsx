import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const latinHonors = [
  {
    honor: "Summa Cum Laude",
    average: "3.51 - 4.00",
  },
  {
    honor: "Magna Cum Laude",
    average: "3.27 - 3.50",
  },
  {
    honor: "Cum Laude",
    average: "3.01 - 3.26",
  },
];

export function LatinTable() {
  return (
    <div className="flex flex-col items-center w-full py-12 space-y-6">
      {/* Header text centered */}
      <p className="max-w-2xl text-center text-sm text-muted-foreground px-4">
        Starting Academic Year 2023–2024 for 4-year programs and Academic Year
        2024–2025 for 5-year programs, the following cumulative GWA criteria
        will be used to determine Latin honors for graduating students:
      </p>

      {/* Table wrapper: center horizontally */}
      <div className="w-full flex mx-auto items-center justify-center px-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-left pl-12 font-bold"
                style={{ width: "60%" }}
              >
                Latin Honor
              </TableHead>
              <TableHead
                className="text-left font-bold"
                style={{ width: "40%" }}
              >
                GPA Range
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latinHonors.map((honor) => (
              <TableRow key={honor.honor}>
                <TableCell className="text-left font-medium pl-12" style={{ width: "60%" }}>
                  {honor.honor}
                </TableCell>
                <TableCell className="text-left font-medium" style={{ width: "40%" }}>
                  {honor.average}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer text centered */}
      <p className="text-center text-sm text-muted-foreground max-w-2xl px-4 italic">
        Based on the University of Mindanao Student Handbook 2024
      </p>
    </div>
  );
}
