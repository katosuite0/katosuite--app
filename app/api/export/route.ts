import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const userId = authHeader ? authHeader.replace("Bearer ", "") : request.headers.get("x-forwarded-for") || "anonymous";

    const rateLimit = checkRateLimit(`export:${userId}`, 10, 60000);
    
    const headers = {
      "X-RateLimit-Limit": "10",
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(rateLimit.resetTime),
    };

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 10 exports per minute." },
        { status: 429, headers }
      );
    }

    const body = await request.json();
    const { lesson, planId } = body;

    if (!lesson) {
      return NextResponse.json({ error: "No lesson provided" }, { status: 400, headers });
    }

    const exportData = {
      content: lesson.content || "",
      planOverlay: planId !== "pro" && planId !== "starter-plus" ? "Upgrade for more features" : "",
      footer: "Exported from KatoSuite",
    };

    return NextResponse.json(exportData, { headers });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
