import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, tipo, mensagem, siteSlug } = body ?? {};

    if (!nome || !email || !tipo || !mensagem || !siteSlug) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 },
      );
    }

    const site = await prisma.site.findUnique({
      where: { slug: String(siteSlug) },
      select: { id: true },
    });
    if (!site) {
      return NextResponse.json(
        { ok: false, error: "Site não encontrado." },
        { status: 404 },
      );
    }

    await prisma.contactMessage.create({
      data: {
        siteId: site.id,
        name: String(nome),
        email: String(email),
        contactType: String(tipo),
        message: String(mensagem),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao processar a requisição." },
      { status: 500 },
    );
  }
}
