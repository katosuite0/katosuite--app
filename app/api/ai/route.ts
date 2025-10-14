import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";
import { getPlanById } from "@/lib/plans";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: userData } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan_id")
      .eq("id", userData.user.id)
      .single();

    const plan = getPlanById(profile?.plan_id || "free");
    if (!plan?.features.aiGeneration) {
      return NextResponse.json(
        { error: "AI generation requires Starter+ or higher" },
        { status: 403 }
      );
    }

    const rateLimit = checkRateLimit(
      `ai:${userData.user.id}`,
      plan.limits.aiRequestsPerMinute,
      60000
    );

    const headers = {
      "X-RateLimit-Limit": String(plan.limits.aiRequestsPerMinute),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(rateLimit.resetTime),
    };

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Maximum 10 AI requests per minute." },
        { status: 429, headers }
      );
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided" }, { status: 400, headers });
    }

    const generatedContent = `Generated lesson content for: ${prompt}\n\nThis is a placeholder for AI-generated content.`;

    return NextResponse.json({ content: generatedContent }, { headers });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
