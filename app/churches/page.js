import Link from "next/link";

export default function CleanForChurches() {
  return (
    <div className="min-h-screen mt-12 bg-gray-50">
      <section className="py-8 md:py-12">
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800 md:text-4xl md:mb-8">
            CLEAN for Churches
          </h1>
          <p className="mb-8 text-lg text-center text-gray-600 md:text-xl md:mb-12">
            Empower your congregation with CLEAN&apos;s comprehensive approach
            to addressing pornography
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
                Why CLEAN Matters for Your Church
              </h2>
              <p className="text-gray-600">
                CLEAN equips churches to effectively address the pervasive issue
                of pornography:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    Break the silence around pornography and betrayal trauma
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    Equip leaders with tools to address this issue effectively
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    Restore families and strengthen communities
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
                Benefits of CLEAN for Churches
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-primary-red shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    <strong>Comprehensive Resources:</strong> Access to
                    devotionals, training materials, and support systems
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-primary-red shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    <strong>Leadership Development:</strong> Equip your leaders
                    to address sensitive issues with grace and truth
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-primary-red shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm md:text-base">
                    <strong>Community Impact:</strong> Foster a culture of
                    openness, healing, and support within your congregation
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 mt-8 bg-white rounded-lg shadow-md md:p-6 md:mt-12">
            <h3 className="mb-3 text-lg font-semibold text-gray-800 md:text-xl md:mb-4">
              Impact of CLEAN
            </h3>
            <p className="mb-3 text-sm text-gray-600 md:text-base md:mb-4">
              Churches with programs like CLEAN are{" "}
              <span className="font-bold text-primary-red">
                four times more likely
              </span>{" "}
              to help men overcome pornography.
            </p>
            <p className="text-sm text-gray-600 md:text-base">
              CLEAN integrates counseling, community engagement, and
              accountability to address the complex realities of sexual
              struggles.
            </p>
          </div>

          <div className="mt-8 text-center md:mt-12">
            <Link
              href="/Pricing"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md bg-primary-red hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-red md:px-6 md:py-3"
            >
              Empower Your Church with CLEAN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
