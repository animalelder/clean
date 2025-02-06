import Link from "next/link";

export default function CleanForIndividuals() {
  return (
    <div className="min-h-screen mt-12 bg-gray-50">
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
            CLEAN for Individuals
          </h1>
          <p className="mb-12 text-xl text-center text-gray-600">
            Embark on a journey of personal growth and healing with CLEAN
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Why CLEAN Matters for You
              </h2>
              <p className="text-gray-600">
                CLEAN provides a comprehensive approach to addressing
                pornography addiction and its effects on individuals. Our
                program offers:
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
                  Personalized support and guidance
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
                  Evidence-based strategies for overcoming addiction
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
                  A supportive community of like-minded individuals
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Benefits of CLEAN for Individuals
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
                  <span>
                    <strong>Personal Growth:</strong> Develop healthier habits
                    and relationships
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
                  <span>
                    <strong>Accountability:</strong> Stay on track with support
                    from peers and mentors
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
                  <span>
                    <strong>Spiritual Growth:</strong> Strengthen your faith and
                    values
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-6 mt-12 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Impact of CLEAN
            </h3>
            <p className="mb-4 text-gray-600">
              Individuals who participate in programs like CLEAN are{" "}
              <span className="font-bold text-primary-red">
                significantly more likely
              </span>{" "}
              to overcome pornography addiction and experience lasting change.
            </p>
            <p className="text-gray-600">
              CLEAN&apos;s comprehensive approach integrates personal
              devotionals, community support, and accountability to address the
              complex realities of sexual struggles.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
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
                <span>
                  Access to a supportive community of like-minded individuals
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
                <span>Personalized coaching options for enhanced guidance</span>
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
                <span>
                  Proven resources and tools for lasting transformation
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/Pricing"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-md bg-primary-red hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-red"
            >
              Start Your CLEAN Journey Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
