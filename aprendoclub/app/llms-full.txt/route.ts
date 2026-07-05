import { getPayloadClient } from "@/lib/payload";

// Se regenera en cada request: refleja lo editado en /admin sin redeploy.
export const dynamic = "force-dynamic";

/** /llms-full.txt — contenido completo para agentes de IA. */
export async function GET() {
  const payload = await getPayloadClient();
  const llms = await payload.findGlobal({ slug: "llms" });
  return new Response(llms.llmsFull ?? "", {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
