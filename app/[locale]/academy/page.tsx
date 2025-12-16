import type { Metadata } from 'next';
import { getBlogPosts, BlogList } from '@/features/Blog';
import { routing, type Locale } from '@/core/i18n/routing';
import Sidebar from '@/shared/components/Menu/Sidebar';
import Banner from '@/shared/components/Menu/Banner';

/**
 * Generate static params for all supported locales
 * Enables static generation at build time for optimal SEO
 *
 * _Requirements: 2.4_
 */
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

/**
 * Generate SEO metadata for the academy listing page
 */
export const metadata: Metadata = {
  title: 'Academy - Japanese Learning Articles | KanaDojo',
  description:
    'Explore our collection of Japanese learning articles covering Hiragana, Katakana, Kanji, vocabulary, grammar, and Japanese culture. Free educational content for all levels.',
  openGraph: {
    title: 'Academy - Japanese Learning Articles | KanaDojo',
    description:
      'Explore our collection of Japanese learning articles covering Hiragana, Katakana, Kanji, vocabulary, grammar, and Japanese culture.',
    url: 'https://kanadojo.com/academy',
    type: 'website'
  },
  alternates: {
    canonical: 'https://kanadojo.com/academy'
  }
};

interface AcademyPageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Academy Listing Page
 * Displays all published blog posts sorted by date with category filtering.
 * Uses static generation for optimal SEO performance.
 *
 * _Requirements: 2.1, 2.4_
 */
export default async function AcademyPage({ params }: AcademyPageProps) {
  const { locale } = await params;

  // Fetch all posts for the current locale
  const posts = getBlogPosts(locale as Locale);

  return (
    <div className='min-h-[100dvh] max-w-[100dvw] lg:pr-20 flex gap-0'>
      <Sidebar />
      <div className='flex flex-col gap-4 w-full lg:w-4/5 px-4 md:px-8 pb-20'>
        <Banner />
        {/* Page Header */}
        <header className='mb-8'>
          <h1 className='mb-4 text-3xl font-bold text-[var(--main-color)] md:text-4xl'>
            Academy
          </h1>
          <p className='text-lg text-[var(--secondary-color)]'>
            Explore our collection of Japanese learning articles covering
            Hiragana, Katakana, Kanji, vocabulary, grammar, and Japanese
            culture.
          </p>
        </header>

        {/* Blog List with Category Filter */}
        <BlogList posts={posts} showFilter={true} />
      </div>
    </div>
  );
}
