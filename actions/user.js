"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Function to update a user’s profile
export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Look up the user by Clerk user ID
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        // Look up the industryInsight record by the industry string
        const industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        console.log("🔍 Existing Industry Insight:", industryInsight);

        if (!industryInsight) {
          console.log("⚡ Creating new Industry Insight...");

          const newIndustryInsightData = {
            industry: data.industry,
            salaryRanges: [],
            growthRate: 0,
            demandLevel: "MEDIUM",
            topSkills: [],
            marketOutlook: "NEUTRAL", // ✅ Correct spelling
            keyTrends: [],
            recommendedSkills: [],
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          };

          console.log("New Industry Insight Data:", newIndustryInsightData); // 🛠 Debugging output

          await tx.industryInsight.create({
            data: newIndustryInsightData,
          });
        } else {
          console.log("✅ Industry Insight already exists, skipping creation.");
        }

        // Update the user with profile details
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      { timeout: 10000 }
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile" + error.message);
  }
}

// Function to get the user's onboarding status
export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}
