export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "CLEAN has transformed our men’s ministry. Men are opening up, seeking help, and finding freedom like never before.",
      name: "Pastor John Doe, Zion Church",
    },
    {
      quote:
        "The CLEAN program gave me the tools and support I needed to break free from pornography and rebuild trust with my wife.",
      name: "Clean Participant",
    },
    {
      quote:
        "I was dating with no purpose...it broke unholy convenants with women",
      name: "Clean Participant",
    },
  ];

  return (
    <section className="bg-primary-red py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          What People Are Saying
        </h2>
        <p className="mb-12 text-center text-xl md:text-xl">
          These testimonials are kept anonymous for the privacy and safety of
          our community.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 text-gray-800 shadow-md"
            >
              <blockquote className="mb-4 text-lg">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <blockquote className="text-md mb-4">
                {testimonial.name}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
