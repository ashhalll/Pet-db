import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";

export async function GET(request: NextRequest) {
  try {
    // Extract user ID from token
    const userId = await getDataFromToken(request);

    // Query database to fetch user details excluding password
    const query = `SELECT user_id, username, email FROM users WHERE id = $1`;
    const { rows } = await db.query(query, [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = rows[0];

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}