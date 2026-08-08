import { AiWellnessSection } from '@/components/home/ai-wellness';
import { BestsellersSection } from '@/components/home/bestsellers';
import { CategoriesSection } from '@/components/home/categories';
import { Hero } from '@/components/home/hero';
import { ScienceSection } from '@/components/home/science';
import { SubscriptionSection } from '@/components/home/subscription';
import { WhyForesthealsSection } from '@/components/home/why-forestheals';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';

export default function Home() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
      <OnboardingFlow />
      <Hero />
      <CategoriesSection />
      <BestsellersSection />
      <WhyForesthealsSection />
      <ScienceSection />
      <AiWellnessSection />
      <SubscriptionSection />
    </main>
  );
}
