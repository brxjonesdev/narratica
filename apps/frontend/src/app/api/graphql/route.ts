import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://your-production-api-url.com'
      : 'http://localhost:4000';

  try {
    const body = await req.json();
    console.log('Request body:', body);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log('Response status:', response);
      return NextResponse.json(
        { error: 'Failed to fetch GraphQL data' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GraphQL Proxy Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 },
    );
  }
}
