export interface SIICompany {
  vatNumber: string;
  name: string;
  address: string;
  status: string;
}

export async function fetchSIICompanyData(vatNumber: string): Promise<SIICompany> {
  const response = await fetch(
    `https://api.aeat.es/sii/v1/company/${vatNumber}`,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!response.ok) {
    throw new Error('Error fetching SII data');
  }
  return response.json();
}
