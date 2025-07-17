const PopularCities = () => {
  const cities = [
    {
      name: "Bangalore",
      properties: 150,
      image: "/bangalore.png?height=120&width=120",
    },
    {
      name: "Mumbai",
      properties: 200,
      image: "/mumbai.png?height=120&width=120",
    },
    {
      name: "Delhi NCR",
      properties: 180,
      image: "/delhi.png?height=120&width=120",
    },
    {
      name: "Pune",
      properties: 120,
      image: "/pune.png?height=120&width=120",
    },
    {
      name: "Chennai",
      properties: 90,
      image: "/chennai.png?height=120&width=120",
    },
    {
      name: "Hyderabad",
      properties: 110,
      image: "/hyderabad.png?height=120&width=120",
    },
  ];
  return (
    <section id="#popular-cities" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Cities
          </h2>
          <p className="text-gray-600 text-lg">
            Explore PG accommodations in top cities across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4   transition-colors overflow-hidden">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={city.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {/* <Bangalore height={32} width={32} scale={1.5} /> */}
                  <a
                    href="https://www.flaticon.com/free-icons/bangalore"
                    title="bangalore icons"
                    className="hidden"
                  >
                    Bangalore icons created by Daniel ceha - Flaticon
                  </a>
                  <a
                    href="https://www.flaticon.com/free-icons/india-gate"
                    title="india gate icons"
                    hidden
                  >
                    India gate icons created by Icon home - Flaticon
                  </a>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {city.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {city.properties} Properties
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
