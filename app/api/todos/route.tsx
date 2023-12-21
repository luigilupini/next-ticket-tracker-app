import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const todos = await prisma.todos.findMany();
  return NextResponse.json({
    status: 200,
    success: true,
    body: todos,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  if (!body.title || !body.content) {
    return NextResponse.json({
      status: 400,
      success: false,
      body: { message: 'Please provide a title and content' },
    });
  }

  await prisma.todos.create({
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return NextResponse.json({
    status: 200,
    success: true,
    body: { message: 'Todo created successfully' },
  });
}
