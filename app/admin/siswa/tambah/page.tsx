export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import TambahSiswaForm from "./TambahSiswaForm";

export default async function Page() {
  const programs = await prisma.program.findMany({
    select: { id: true, nama_program: true },
  });

  return <TambahSiswaForm programs={programs} />;
}
