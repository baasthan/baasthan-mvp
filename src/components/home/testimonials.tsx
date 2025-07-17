import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "Found the perfect PG within my budget. The booking process was super smooth and the property exactly matched the photos!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Rohit Kumar",
      location: "Mumbai",
      rating: 5,
      text: "Great platform with verified properties. Saved me weeks of searching. Highly recommend for anyone looking for PG accommodation.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Priya Patel",
      location: "Delhi",
      rating: 4,
      text: "Excellent service and genuine listings. The support team was very helpful throughout the booking process.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg">
            Real experiences from our happy customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border-0 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 rounded-full object-cover mr-4">
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
