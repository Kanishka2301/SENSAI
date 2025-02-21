import { industries } from "@/data/industries";
import { getUserOnboardingStatus } from "@/actions/user";

const OnboardingPage = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;
