import Image from "next/image"
import {
  PlayIcon,
  UsersIcon,
  TargetIcon,
  AwardIcon,
  FlagIcon,
  EyeIcon,
  CheckCircleIcon,
  HeartHandshakeIcon,
} from "lucide-react"

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 py-24 md:py-36 lg:py-48 text-center overflow-hidden shadow-inner">
          {/* Enhanced Layered Background Elements */}
          <div className="absolute inset-0 bg-indigo-200 opacity-20 transform -skew-y-3 scale-110 hover:opacity-30 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-indigo-300 opacity-10 transform skew-y-6 scale-105 hover:opacity-15 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-indigo-400 opacity-5 transform -skew-y-1 scale-100 hover:opacity-8 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-indigo-500 opacity-[0.02] transform skew-y-12 scale-120 hover:opacity-[0.04] transition-opacity duration-700" />
          <div className="absolute inset-0 bg-indigo-600 opacity-[0.01] transform -skew-y-8 scale-130 hover:opacity-[0.02] transition-opacity duration-700" />
          <div className="absolute inset-0 bg-indigo-700 opacity-[0.005] transform skew-y-2 scale-140 hover:opacity-[0.01] transition-opacity duration-700" />

          {/* Enhanced Decorative Circles */}
          <div className="absolute top-8 left-8 w-6 h-6 bg-indigo-200 rounded-full animate-bounce-slow hover:bg-indigo-300 hover:scale-125 transition-all duration-300" />
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-indigo-300 rounded-full animate-pulse-slow hover:bg-indigo-400 hover:scale-150 transition-all duration-300" />
          <div className="absolute bottom-12 left-1/3 w-8 h-8 bg-indigo-200 rounded-full animate-bounce-slow delay-200 hover:bg-indigo-300 hover:scale-110 transition-all duration-300" />
          <div className="absolute bottom-1/4 right-12 w-4 h-4 bg-indigo-300 rounded-full animate-pulse-slow delay-400 hover:bg-indigo-400 hover:scale-125 transition-all duration-300" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-indigo-200 rounded-full animate-pulse-slow hover:bg-indigo-300 hover:scale-150 transition-all duration-300" />
          <div className="absolute top-1/5 right-1/5 w-7 h-7 bg-indigo-100 rounded-full animate-bounce-slow delay-300 hover:bg-indigo-200 hover:scale-110 transition-all duration-300" />
          <div className="absolute bottom-1/5 left-1/5 w-9 h-9 bg-indigo-400 rounded-full animate-pulse-slow delay-500 hover:bg-indigo-500 hover:scale-105 transition-all duration-300" />

          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-6xl font-extrabold tracking-tight text-indigo-900 sm:text-7xl md:text-8xl leading-tight drop-shadow-md animate-fade-in-up hover:text-indigo-800 transition-colors duration-300 cursor-default">
              About us
            </h1>
            <p className="mx-auto mt-8 max-w-4xl text-xl text-indigo-700 md:text-2xl leading-relaxed font-light animate-fade-in-up delay-200 hover:text-indigo-600 transition-colors duration-300 cursor-default">
              Baasthan is a smart digital housing platform designed to help students and working professionals find
              affordable and verified PGs and rental accommodations with ease.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-white py-24 hover:bg-indigo-50/30 transition-colors duration-700">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left hover:transform hover:translate-x-2 transition-transform duration-300">
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-8 relative flex items-center hover:text-indigo-900 transition-colors duration-300">
                <FlagIcon className="w-10 h-10 text-indigo-500 mr-4 hover:text-indigo-600 hover:scale-110 transition-all duration-300" />
                Our Mission
                <span className="absolute bottom-0 left-0 w-24 h-1 bg-indigo-500 rounded-full hover:w-32 hover:bg-indigo-600 transition-all duration-300" />
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 hover:text-gray-800 transition-colors duration-300">
                With zero brokerage and no hidden fees, Baasthan simplifies the process of finding a place you can call
                home. Through our user-friendly app, users can browse, compare and book accommodations in just a few
                clicks - all with complete transparency.
              </p>
            </div>
            <div className="grid gap-10 animate-slide-in-right hover:transform hover:-translate-x-2 transition-transform duration-300">
              <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 hover:pl-4 transition-all duration-300">
                At the same time, Baasthan empowers property owners by helping them efficiently manage, list and operate
                their properties through a dedicated dashboard ensuring better occupancy, visibility and operational
                control.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 hover:pl-4 transition-all duration-300">
                To build a tech enabled, brokerage free housing ecosystem that simplifies accommodation for students and
                working professionals, while empowering property owners to manage and monetize their spaces
                effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="bg-indigo-50 py-24 hover:bg-indigo-100/50 transition-colors duration-700">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl animate-slide-in-left hover:shadow-indigo-300 hover:scale-105 transition-all duration-500 group">
              <Image
                src="/images/working-laptop.jpg"
                alt="Illustration of a person working on a laptop with a plant"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl group-hover:brightness-110 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-xl transform hover:scale-125 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 cursor-pointer">
                  <PlayIcon className="h-10 w-10 hover:h-12 hover:w-12 transition-all duration-300" />
                </div>
              </div>
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-all duration-500 rounded-2xl" />
            </div>
            <div className="animate-slide-in-right hover:transform hover:-translate-x-2 transition-transform duration-300">
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-8 relative flex items-center hover:text-indigo-900 transition-colors duration-300">
                <EyeIcon className="w-10 h-10 text-indigo-500 mr-4 hover:text-indigo-600 hover:scale-110 transition-all duration-300" />
                Our Vision
                <span className="absolute bottom-0 left-0 w-24 h-1 bg-indigo-500 rounded-full hover:w-32 hover:bg-indigo-600 transition-all duration-300" />
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed hover:text-gray-800 hover:pl-4 transition-all duration-300">
                We aim to go beyond housing by integrating essential lifestyle services like cloud kitchen and laundry,
                making Baasthan a complete digital living solution all under one platform. To become India's most
                trusted digital living platform by redefining how people book and manage their accommodation with zero
                brokerage at its core. We envision a future where every student and professional can access verified,
                affordable housing and essential services like healthy tasty meals and laundry through one smart,
                verified platform.
              </p>
            </div>
          </div>
        </section>

        {/* Our Goals Section */}
        <section className="bg-white py-24 hover:bg-indigo-50/30 transition-colors duration-700">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight text-center mb-16 relative flex items-center justify-center animate-fade-in-up hover:text-indigo-900 transition-colors duration-300">
              <CheckCircleIcon className="w-10 h-10 text-indigo-500 mr-4 hover:text-indigo-600 hover:scale-110 transition-all duration-300" />
              Our Goals
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-500 rounded-full hover:w-32 hover:bg-indigo-600 transition-all duration-300" />
            </h2>
            <div className="border-l-4 border-indigo-500 pl-6 py-4 bg-indigo-100 rounded-r-xl shadow-lg mx-auto max-w-5xl animate-fade-in-up delay-200 hover:border-indigo-600 hover:bg-indigo-200/50 hover:shadow-indigo-200 hover:scale-105 transition-all duration-500 group">
              <ul className="list-disc list-inside text-indigo-800 space-y-3 text-lg group-hover:text-indigo-900 transition-colors duration-300">
                <li className="hover:text-indigo-700 hover:pl-2 transition-all duration-300 cursor-default">
                  Simplify the housing search for students and working professionals with verified, affordable listing.
                </li>
                <li className="hover:text-indigo-700 hover:pl-2 transition-all duration-300 cursor-default">
                  Eliminate hidden costs and brokerage fees making the rental process transparent and fair.
                </li>
                <li className="hover:text-indigo-700 hover:pl-2 transition-all duration-300 cursor-default">
                  Empower property owners with easy tools to manage and rent out their spaces hassle-free.
                </li>
                <li className="hover:text-indigo-700 hover:pl-2 transition-all duration-300 cursor-default">
                  Offer essential services like food (cloud kitchen) and laundry - all from a single app.
                </li>
                <li className="hover:text-indigo-700 hover:pl-2 transition-all duration-300 cursor-default">
                  Create a trusted digital ecosystem that supports stress-free, long term living solutions.
                </li>
                <li className="hover:text-indigo-700 hover:pl-2 transition-all duration-300 cursor-default">
                  Community built on safety, comfort and support where we uplift and offer shelter.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="relative bg-indigo-50 py-24 text-center overflow-hidden hover:bg-indigo-100/50 transition-colors duration-700">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-100 rounded-full animate-pulse-slow hover:bg-indigo-200 hover:scale-150 transition-all duration-300" />
          <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-indigo-200 rounded-full animate-pulse-slow hover:bg-indigo-300 hover:scale-125 transition-all duration-300" />
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-indigo-100 rounded-full animate-pulse-slow hover:bg-indigo-200 hover:scale-150 transition-all duration-300" />
          <div className="absolute top-1/3 right-1/4 w-7 h-7 bg-indigo-200 rounded-full animate-pulse-slow hover:bg-indigo-300 hover:scale-110 transition-all duration-300" />

          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-8 relative flex items-center justify-center animate-fade-in-up hover:text-indigo-900 transition-colors duration-300">
              <HeartHandshakeIcon className="w-10 h-10 text-indigo-500 mr-4 hover:text-indigo-600 hover:scale-110 transition-all duration-300" />
              Our Values
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-500 rounded-full hover:w-32 hover:bg-indigo-600 transition-all duration-300" />
            </h2>
            <p className="mx-auto mt-6 max-w-5xl text-xl text-gray-700 leading-relaxed animate-fade-in-up delay-200 hover:text-gray-800 hover:scale-105 transition-all duration-300 cursor-default">
              At Baasthan, we believe in keeping things simple, honest and impactful. We stand for transparency - no
              hidden fees, no middlemen. Our goal is to make housing affordable and accessible especially for students
              and working professionals. We operate on trust, with verified listings and real support. Every feature
              built is user friendly designed for ease and reliability. And as we grow we remain committed to innovation
              and inclusivity, reaching regions and people that others overlook.
            </p>

            {/* Enhanced Feature Icons */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-white hover:bg-opacity-80 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-indigo-200 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up delay-300 cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-125 group-hover:bg-indigo-600 group-hover:shadow-indigo-300 transition-all duration-500">
                  <UsersIcon className="h-12 w-12 text-white group-hover:h-14 group-hover:w-14 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-900 transition-colors duration-300">
                  Professional Team
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Our team is dedicated to providing expert support and guidance throughout your housing journey.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-white hover:bg-opacity-80 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-indigo-200 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up delay-400 cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-125 group-hover:bg-indigo-600 group-hover:shadow-indigo-300 transition-all duration-500">
                  <TargetIcon className="h-12 w-12 text-white group-hover:h-14 group-hover:w-14 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-900 transition-colors duration-300">
                  Target Oriented
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  We focus on delivering solutions that meet your specific needs, ensuring a seamless experience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-white hover:bg-opacity-80 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-indigo-200 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up delay-500 cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-125 group-hover:bg-indigo-600 group-hover:shadow-indigo-300 transition-all duration-500">
                  <AwardIcon className="h-12 w-12 text-white group-hover:h-14 group-hover:w-14 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-900 transition-colors duration-300">
                  Success Guarantee
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  We are committed to your satisfaction, ensuring you find the perfect accommodation with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
