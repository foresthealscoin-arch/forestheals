import { AiWellnessSection } from '@/components/home/ai-wellness';
import { BestsellersSection } from '@/components/home/bestsellers';
import { CategoriesSection } from '@/components/home/categories';
import { Hero } from '@/components/home/hero';
import { ScienceSection } from '@/components/home/science';
import { SubscriptionSection } from '@/components/home/subscription';
import { WhyForesthealsSection } from '@/components/home/why-forestheals';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';
import { Reveal } from '@/components/ui/motion';

export default function Home() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
      <OnboardingFlow />
      <Reveal>
        <Hero />
      </Reveal>
      <Reveal delay={0.08}>
        <CategoriesSection />
      </Reveal>
      <Reveal delay={0.12}>
        <BestsellersSection />
      </Reveal>
      <Reveal delay={0.1}>
        <WhyForesthealsSection />
      </Reveal>
      <Reveal delay={0.12}>
        <ScienceSection />
      </Reveal>
      <Reveal delay={0.08}>
        <AiWellnessSection />
      </Reveal>
      <Reveal delay={0.1}>
        <SubscriptionSection />
      </Reveal>
    </main>
  );
}
