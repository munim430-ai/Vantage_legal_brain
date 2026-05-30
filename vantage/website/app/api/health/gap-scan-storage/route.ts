import { NextResponse } from "next/server";
import { isGoogleSheetsConfigured } from "@/lib/server/google-sheets";

export async function GET() {
  return NextResponse.json({
    googleSheetsConfigured: isGoogleSheetsConfigured(),
    requiredEnvPresent: {
      GOOGLE_SHEETS_SPREADSHEET_ID: Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID),
      GOOGLE_SHEETS_CLIENT_EMAIL: Boolean(process.env.GOOGLE_SHEETS_CLIENT_EMAIL),
      GOOGLE_SHEETS_PRIVATE_KEY: Boolean(process.env.GOOGLE_SHEETS_PRIVATE_KEY),
    },
  });
}
