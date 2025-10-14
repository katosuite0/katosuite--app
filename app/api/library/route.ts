import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hasLibraryAccess } from "@/lib/plans";

export async function GET(request: NextRequest) {
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

    if (!profile || !hasLibraryAccess(profile.plan_id)) {
      return NextResponse.json({ error: "Library access requires Starter+ or higher" }, { status: 403 });
    }

    const { data: lessons, error } = await supabase
      .from("library")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ lessons });
  } catch (error) {
    console.error("Library GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

const lastPostTime = new Map<string, number>();

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

    if (!profile || !hasLibraryAccess(profile.plan_id)) {
      return NextResponse.json({ error: "Library access requires Starter+ or higher" }, { status: 403 });
    }

    const body = await request.json();
    const { lesson } = body;

    if (!lesson || !lesson.title || !lesson.content) {
      return NextResponse.json({ error: "Invalid lesson data" }, { status: 400 });
    }

    const idempotencyKey = request.headers.get("idempotency-key") || `${userData.user.id}-${Date.now()}`;
    const lastTime = lastPostTime.get(idempotencyKey);
    if (lastTime && Date.now() - lastTime < 1000) {
      return NextResponse.json({ message: "Request already processed" }, { status: 200 });
    }

    const { data, error } = await supabase
      .from("library")
      .insert({
        user_id: userData.user.id,
        title: lesson.title,
        content: lesson.content,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    lastPostTime.set(idempotencyKey, Date.now());
    setTimeout(() => lastPostTime.delete(idempotencyKey), 5000);

    return NextResponse.json({ lesson: data }, { status: 201 });
  } catch (error) {
    console.error("Library POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
