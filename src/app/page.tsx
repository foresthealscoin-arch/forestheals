import { Hero } from '@/components/home/hero';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';

export default function Home() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
      <OnboardingFlow />
      <Hero />
    </main>
  );
}
