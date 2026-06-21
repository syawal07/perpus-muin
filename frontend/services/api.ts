export async function fetchAPI(endpoint: string, tags?: string[]) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const res = await fetch(`${baseUrl}${endpoint}`, {
    next: { tags },
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }

  const json = await res.json();
  
  if (!json || !json.data) {
    throw new Error("Invalid data format received");
  }

  return json.data;
}