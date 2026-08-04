import { redirect } from 'next/navigation';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = url.searchParams.toString();

  redirect(`/result?${params}`);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const params = new URLSearchParams();

  formData.forEach((value, key) => {
    params.append(key, String(value));
  });

  redirect(`/result?${params.toString()}`);
}
