import Link from "next/link";
import YouTubeVideo from "../common/YouTubeVideoEmbedding";

export function AboutSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column: Video and Brief Intro */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold md:text-4xl">
              About Thirty Mighty Men Ministries
            </h2>
            <p className="text-xl italic md:text-2xl text-primary">
              30MMM: A Ministry for Men, by Men
            </p>
            <YouTubeVideo videoId="tXCZLYmgmVc" />
            <div className="flex items-center text-sm">
              For more videos, visit our{" "}
              <Link
                href="//linktr.ee/30mmm"
                className="ml-2 underline transition-colors duration-200 text-primary hover:text-primary/80"
              >
                Linktree
              </Link>
            </div>
          </div>

          {/* Right Column: Founder's Bio */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Dr. Donovan Anderson</h3>
            <p className="text-muted-foreground">
              Founder of 30MMM, Dr. Anderson combines academic excellence with a
              passion for ministry:
            </p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <strong>Education:</strong> BA & MA in History (Howard
                University), PhD in City and Regional Planning (UNC Chapel
                Hill), MA from Wesley Theological Seminary
              </li>
              <li>
                <strong>Awards:</strong> Harry Hoosier Spirit Award, Margaret
                Pittman Award in Urban Ministry
              </li>
              <li>
                <strong>Ministry Experience:</strong> Small group leader at Zion
                Church, Brothers-in-Discipleship program participant,
                Deacon-in-Training
              </li>
              <li>
                <strong>Community Engagement:</strong> Fellow at Wesley
                Theological Seminary, Ministry Incubators Coaching Program
                participant
              </li>
            </ul>
            <p className="text-muted-foreground">
              Dr. Anderson founded Thirty Mighty Men Ministries to equip men to
              grow into the leaders, husbands, and fathers God intended them to
              be, inspiring and empowering them to live lives of integrity,
              purpose, and faith.
            </p>
            <div className="pt-4">
              <Link
                href="/full-bio"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Read Full Bio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
