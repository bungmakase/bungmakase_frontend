import BackButton from '@/components/common/BackButton';
import SearchSection from '@/components/review/SearchSection';

export default function MapReviewPage() {
  return (
    <section className="h-screen px-5 py-8">
      <header className="flex flex-col mb-2">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-[#181818]">
            후기를 작성하고 싶은
            <br />
            붕어빵 가게는 어디인가요?
          </h1>
        </div>
      </header>
      <div className="space-y-4">
        <SearchSection />
      </div>
    </section>
  );
}
