const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Simple steps to find your perfect PG
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/90 transition-colors">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Search & Filter
            </h3>
            <p className="text-gray-600">
              Search for PG accommodations by location, budget, and amenities.
              Use our smart filters to find exactly what you need.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/90 transition-colors">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Compare & Choose
            </h3>
            <p className="text-gray-600">
              Compare verified properties with genuine photos, reviews, and
              transparent pricing. No hidden charges.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/90 transition-colors">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Book & Move In
            </h3>
            <p className="text-gray-600">
              Book instantly with zero brokerage. Schedule a visit or move in
              directly. We handle all the paperwork.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
