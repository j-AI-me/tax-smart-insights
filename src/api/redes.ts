export interface Incentive {
  id: string;
  name: string;
  description: string;
  url?: string;
}

export async function fetchActiveIncentives(): Promise<Incentive[]> {
  const response = await fetch('https://api.red.es/incentives/active');
  if (!response.ok) {
    throw new Error('Error fetching incentives');
  }
  return response.json();
}
