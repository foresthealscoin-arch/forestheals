import { AiWellnessSection } from '@/components/home/ai-wellness';
import { BestsellersSection } from '@/components/home/bestsellers';
import { CategoriesSection } from '@/components/home/categories';
import { Hero } from '@/components/home/hero';
import { ScienceSection } from '@/components/home/science';
import { SubscriptionSection } from '@/components/home/subscription';
import { WhyForesthealsSection } from '@/components/home/why-forestheals';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';
import { Reveal } from '@/components/ui/motion';
import { products } from '@/data/products';
import { getProductImageMap } from '@/lib/images/resolver';

const featuredProductSlugs = new Set([
  'collagen-coffee',
  'hydration-electrolytes',
  'sleep-restore',
]);

export default async function Home() {
  const featuredProducts = products.filter((product) => featuredProductSlugs.has(product.slug));
  const imageMap = await getProductImageMap(featuredProducts.map((product) => product.slug));
  const productsWithImages = featuredProducts.map((product) => {
    const image = imageMap.get(product.slug);

    return {
      ...product,
      image: image?.src ?? product.image,
      imageFallback: image?.fallbackSrc ?? product.image,
    };
  });

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
        <BestsellersSection products={productsWithImages} />
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
