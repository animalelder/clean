import Link from "next/link";

export default function CleanForChurches() {
  return (
    <div className="min-h-screen mt-12 bg-gray-50">
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
            CLEAN for Churches
          </h1>
          <p className="mb-12 text-xl text-center text-gray-600">
            Empower your congregation with CLEAN&apos;s comprehensive approach
            to addressing pornography
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
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
                  Break the silence around pornography and betrayal trauma
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
                  Equip leaders with tools to address this issue effectively
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
                  Restore families and strengthen communities
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">
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
                  <span>
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
                  <span>
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
                  <span>
                    <strong>Community Impact:</strong> Foster a culture of
                    openness, healing, and support within your congregation
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
              Churches with programs like CLEAN are{" "}
              <span className="font-bold text-primary-red">
                four times more likely
              </span>{" "}
              to help men overcome pornography.
            </p>
            <p className="text-gray-600">
              CLEAN integrates counseling, community engagement, and
              accountability to address the complex realities of sexual
              struggles.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/Pricing"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white rounded-md bg-primary-red hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-red"
            >
              Empower Your Church with CLEAN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
