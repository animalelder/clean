import VideoCarousel from "@/components/testimonials/video-carousel";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-3xl font-bold text-primary-red">
          Transformed Lives: Real Men, Real Stories, Real Freedom
        </h1>
        <h2 className="mx-auto mb-8 max-w-3xl text-xl font-bold">
          The journey to godly manhood isn&apos;t meant to be walked alone.
          These men found victory through{" "}
          <span className="text-primary-red underline">
            faith, brotherhood, and the power of Christ
          </span>
          .
        </h2>
        <p className="mx-auto mb-8 max-w-2xl">
          Watch these authentic testimonies from men who have experienced
          breakthrough in their lives. Their stories of struggle, redemption,
          and transformation reveal how God&apos;s truth and supportive
          community can restore marriages, protect families, and renew purpose.
        </p>
        <p className="mx-auto mb-8 max-w-3xl font-light italic">
          &quot;Therefore, if anyone is in Christ, he is a new creation. The old
          has passed away; behold, the new has come.&quot; - 2 Corinthians 5:17
        </p>
        <VideoCarousel />
      </div>
    </main>
  );
}
