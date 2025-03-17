import VideoCarousel from "@/components/testimonials/video-carousel";

export default function Page() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <div className="flex w-full flex-col items-stretch">
        <div className="w-full px-4 py-6 md:py-12">
          <h1 className="mb-4 text-center text-2xl font-bold text-primary-red md:mb-8 md:text-3xl">
            Transformed Lives: Real Men, Real Stories, Real Freedom
          </h1>
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="mb-4 text-lg font-bold md:mb-8 md:text-xl">
              The journey to godly manhood isn&apos;t meant to be walked alone.
              These men found victory through{" "}
              <span className="text-primary-red underline">
                faith, brotherhood, and the power of Christ
              </span>
              .
            </h2>
            <p className="mb-4 text-sm md:mb-8 md:text-base">
              Watch these authentic testimonies from men who have experienced
              breakthrough in their lives. Their stories of struggle,
              redemption, and transformation reveal how God&apos;s truth and
              supportive community can restore marriages, protect families, and
              renew purpose.
            </p>
            <p className="mb-6 text-sm font-light italic md:mb-8 md:text-base">
              &quot;Therefore, if anyone is in Christ, he is a new creation. The
              old has passed away; behold, the new has come.&quot; - 2
              Corinthians 5:17
            </p>
          </div>
        </div>
        <div className="w-screen">
          <VideoCarousel />
        </div>
      </div>
    </main>
  );
}
