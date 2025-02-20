"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { MarketOutlook } from "@prisma/client";
export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      ClerkUserId: userId,
    },
  });
  if (!user) throw new Error("User not found");
  try {
    const result = await db.$transaction(
      async (tx) => {
        let industryInsights = await tx.industryInsights.findUnique({
          where: {
            industry: data.industry,
          },
        });
        if (!industryInsights) {
          industryInsights = await tx.industryInsights.create({
            data: {
              industry: data.industry,
              salaryRanges: [],
              growthRate: 0,
              demandLevel: "Medium",
              topSkills: [],
              MarketOutlook: "Neutral",
              keyTrends: [],
              recommendedSkills: [],
              nextUpdate: new DataTransfer(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ),
            },
          });
        }
      },
      {
        timeout: 10000,
      }
    );
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}
