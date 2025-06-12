import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateIRPF, calculateCorporateTax } from "@/utils/taxSimulator";

interface Row {
  year: number;
  ebitda: string;
  amortization: string;
  investments: string;
  taxable?: number;
  irpf?: number;
  is?: number;
}

const Expert = () => {
  const [rows, setRows] = useState<Row[]>([
    { year: new Date().getFullYear(), ebitda: "", amortization: "", investments: "" },
    { year: new Date().getFullYear() + 1, ebitda: "", amortization: "", investments: "" },
    { year: new Date().getFullYear() + 2, ebitda: "", amortization: "", investments: "" }
  ]);
  const [results, setResults] = useState<Row[]>([]);

  const handleChange = (index: number, field: keyof Row, value: string) => {
    const updated = [...rows];
    (updated[index] as any)[field] = value;
    setRows(updated);
  };

  const calculate = () => {
    const calc = rows.map(r => {
      const ebitda = parseFloat(r.ebitda) || 0;
      const amort = parseFloat(r.amortization) || 0;
      const inv = parseFloat(r.investments) || 0;
      const taxable = ebitda - amort - inv;
      const irpf = calculateIRPF(taxable);
      const is = calculateCorporateTax(taxable, false);
      return { ...r, taxable, irpf, is };
    });
    setResults(calc);
  };

  const exportCSV = () => {
    if (results.length === 0) return;
    const header = "Año,EBITDA,Amortización,Inversiones,Base,IRPF,IS\n";
    const body = results.map(r => `${r.year},${r.ebitda},${r.amortization},${r.investments},${r.taxable?.toFixed(2)},${r.irpf?.toFixed(2)},${r.is?.toFixed(2)}`).join("\n");
    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "comparativa_fiscal.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">Modo Experto - Análisis Fiscal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-4 items-end">
                <div>
                  <Label>Año</Label>
                  <Input type="number" value={row.year} onChange={e => handleChange(idx, "year", e.target.value)} />
                </div>
                <div>
                  <Label>EBITDA</Label>
                  <Input type="number" value={row.ebitda} onChange={e => handleChange(idx, "ebitda", e.target.value)} />
                </div>
                <div>
                  <Label>Amortización</Label>
                  <Input type="number" value={row.amortization} onChange={e => handleChange(idx, "amortization", e.target.value)} />
                </div>
                <div>
                  <Label>Inversiones</Label>
                  <Input type="number" value={row.investments} onChange={e => handleChange(idx, "investments", e.target.value)} />
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button onClick={calculate}>Calcular</Button>
            </div>
            {results.length > 0 && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="border px-2">Año</th>
                        <th className="border px-2">EBITDA</th>
                        <th className="border px-2">Amortización</th>
                        <th className="border px-2">Inversiones</th>
                        <th className="border px-2">Base</th>
                        <th className="border px-2">IRPF</th>
                        <th className="border px-2">IS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map(r => (
                        <tr key={r.year}>
                          <td className="border px-2">{r.year}</td>
                          <td className="border px-2">{r.ebitda}</td>
                          <td className="border px-2">{r.amortization}</td>
                          <td className="border px-2">{r.investments}</td>
                          <td className="border px-2">{r.taxable?.toFixed(2)}</td>
                          <td className="border px-2">{r.irpf?.toFixed(2)}</td>
                          <td className="border px-2">{r.is?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={exportCSV}>Exportar Excel</Button>
                  <Button variant="outline" onClick={exportPDF}>Exportar PDF</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expert;
