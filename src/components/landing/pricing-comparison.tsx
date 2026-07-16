import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

const columns = ["Free", "Starter", "Pro", "Business", "Enterprise"];
const rows = [
  ["Git Deploys", true, true, true, true, true],
  ["SSL Automation", false, true, true, true, true],
  ["Managed Databases", false, false, true, true, true],
  ["Backups", false, false, true, true, true],
  ["Team Access", false, false, false, true, true],
  ["RBAC", false, false, false, true, true],
  ["Audit Logs", false, false, false, true, true],
  ["SSO", false, false, false, false, true],
  ["SLA", false, false, false, false, true],
  ["Priority Support", false, false, false, true, true],
];

function CellValue({ included }: { included: string | boolean }) {
  if (included === true) {
    return <Check className="mx-auto size-4 text-emerald-400" />;
  }

  if (included === false) {
    return <span className="text-zinc-400">—</span>;
  }

  return <span className="text-zinc-700">{included}</span>;
}

function MobilePlanComparison({ column, columnIndex }: { column: string; columnIndex: number }) {
  return (
    <article className="landing-card">
      <h3 className="text-lg font-semibold text-zinc-950">{column}</h3>
      <div className="mt-5 grid gap-3">
        {rows.map(([feature, ...values]) => (
          <div key={`${column}-${feature}`} className="flex items-center justify-between gap-4 border-b border-black/10 pb-3 last:border-b-0 last:pb-0">
            <span className="text-sm font-medium text-zinc-700">{feature}</span>
            <CellValue included={values[columnIndex]} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function PricingComparison() {
  return (
    <section className="landing-section border-b border-black/10 bg-[#EFE9DE]">
      <Reveal className="landing-container landing-reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="landing-label">Compare</p>
          <h2 className="landing-heading mx-auto">Clear feature coverage across every plan.</h2>
          <p className="landing-description mx-auto mt-4">
            The beta starts simple and adds operational depth as teams move from one VPS to multiple
            apps, people, and compliance requirements.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:hidden">
          {columns.map((column, columnIndex) => (
            <MobilePlanComparison key={column} column={column} columnIndex={columnIndex} />
          ))}
        </div>

        <div className="landing-card mt-10 hidden overflow-x-auto p-0 md:block">
          <table className="w-full min-w-[820px] border-collapse text-center text-sm">
            <thead>
              <tr className="border-b border-black/10 text-zinc-500">
                <th className="px-6 py-5 text-left font-medium">Feature</th>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-5 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, ...values], index) => (
                <tr
                  key={feature as string}
                  className={[
                    "border-b border-black/10 last:border-b-0",
                    index % 2 === 1 ? "bg-black/[0.025]" : "",
                  ].join(" ")}
                >
                  <td className="px-6 py-4 text-left font-medium text-zinc-800">{feature}</td>
                  {values.map((value, valueIndex) => (
                    <td key={`${feature}-${valueIndex}`} className="px-4 py-4">
                      <CellValue included={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
