import Image from "next/image";

export function TwoFacesSection() {
  return (
    <section
      className="py-24 bg-gradient-to-b from-gray-50 to-gray-100"
      id="TwoFaces"
    >
      <div className="container max-w-5xl px-4 mx-auto">
        {/* Header with visual emphasis - using decorative underline to reinforce importance */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            The Two Faces of CLEAN
          </h2>
          <div className="w-24 h-1 mx-auto rounded bg-primary-red"></div>
        </div>

        {/* Content layout with cards and connecting statement */}
        <div className="space-y-8">
          {/* External Focus Card */}
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <div className="flex-1">
                <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                  The External Face
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  From the outside looking in, CLEAN is a program focused on
                  sexual integrity. It equips men with the tools to achieve
                  sexual obedience and overcome challenges like pornography,
                  masturbation, fornication, adultery, and any form of sexual
                  perversion. No matter how deep your hole—whether it&apos;s
                  shallow or seemingly bottomless—
                  <span className="font-bold text-primary-red">
                    CLEAN provides you with a shovel and teaches you how to use
                    it.
                  </span>{" "}
                  With the right tools and perseverance, you can climb out of
                  any hole over time.
                </p>
              </div>
              <div className="relative md:w-1/3 aspect-square h-[300] w-[300]">
                <Image
                  src="/images-2/IMG_8371.png"
                  alt="External Face of CLEAN"
                  style={{ objectFit: "cover" }}
                  priority
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>

          {/* Connecting statement positioned between cards */}
          <div className="py-6 text-center">
            <p className="text-xl font-medium text-gray-900">
              But that&apos;s just the beginning.
            </p>
          </div>

          {/* Internal Purpose Card */}
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center gap-8 md:flex-row-reverse md:items-start">
              <div className="flex-1">
                <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                  The Internal Face
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  Internally, CLEAN is about helping men discover and step into
                  their God-given purpose. When men gain self-control in this
                  vital area of their lives, they create the space for God to
                  reveal their true purpose. If purpose is like a white suit,{" "}
                  <span className="font-bold text-primary-red">
                    God will not hand your purpose to you while you&apos;re
                    living in the mud of sin.{" "}
                  </span>{" "}
                  He is too loving for that. CLEAN helps men get out of the mud
                  so they can walk in the fullness of the life God has prepared
                  for them.
                </p>
              </div>
              <div className="relative md:w-1/3 aspect-square h-[300] w-[300]">
                <Image
                  src="/images-2/IMG_8365.png"
                  alt="Internal Face of CLEAN"
                  style={{ objectFit: "cover" }}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
