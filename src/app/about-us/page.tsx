import Footer from "@/components/footer";
import {
  AwardIcon,
  CheckCircleIcon,
  EyeIcon,
  FlagIcon,
  HeartHandshakeIcon,
  PlayIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-24 md:py-36 lg:py-48 text-center overflow-hidden shadow-inner">
          {/* More Layered Background Elements */}
          <div className="absolute inset-0 bg-blue-200 opacity-20 transform -skew-y-3 scale-110" />
          <div className="absolute inset-0 bg-blue-300 opacity-10 transform skew-y-6 scale-105" />
          <div className="absolute inset-0 bg-blue-400 opacity-5 transform -skew-y-1 scale-100" />
          <div className="absolute inset-0 bg-blue-500 opacity-[0.02] transform skew-y-12 scale-120" />{" "}
          {/* New layer */}
          <div className="absolute inset-0 bg-blue-600 opacity-[0.01] transform -skew-y-8 scale-130" />{" "}
          {/* New layer */}
          {/* Existing Decorative Circles with enhanced animations */}
          <div className="absolute top-8 left-8 w-6 h-6 bg-blue-200 rounded-full animate-bounce-slow" />
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-12 left-1/3 w-8 h-8 bg-blue-200 rounded-full animate-bounce-slow delay-200" />
          <div className="absolute bottom-1/4 right-12 w-4 h-4 bg-blue-300 rounded-full animate-pulse-slow delay-400" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-200 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/5 right-1/5 w-7 h-7 bg-blue-100 rounded-full animate-bounce-slow delay-300" />{" "}
          {/* New circle */}
          <div className="absolute bottom-1/5 left-1/5 w-9 h-9 bg-blue-400 rounded-full animate-pulse-slow delay-500" />{" "}
          {/* New circle */}
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-6xl font-extrabold tracking-tight text-blue-900 sm:text-7xl md:text-8xl leading-tight drop-shadow-md animate-fade-in-up">
              About us
            </h1>
            <p className="mx-auto mt-8 max-w-4xl text-xl text-blue-700 md:text-2xl leading-relaxed font-light animate-fade-in-up delay-200">
              Baasthan is a smart digital housing platform designed to help
              students and working professionals find affordable and verified
              PGs and rental accommodations with ease.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="bg-white py-20 -mt-24 relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 -mt-20">
              <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-102 transition-all duration-500 ease-in-out group animate-fade-in-up">
                <Image
                  src="/images/working-laptop.jpg"
                  alt="Illustration of a person working on a laptop with a plant"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl group-hover:brightness-90 transition-brightness duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
              </div>
              <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-102 transition-all duration-500 ease-in-out group animate-fade-in-up delay-200">
                <Image
                  src="/images/desk-setup.jpg"
                  alt="Illustration of a person sitting at a desk with a computer and a plant"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl group-hover:brightness-90 transition-brightness duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
              </div>
              <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-102 transition-all duration-500 ease-in-out group animate-fade-in-up delay-400">
                <Image
                  src="/images/mobile-interaction.jpg"
                  alt="Illustration of a person standing next to a large smartphone"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl group-hover:brightness-90 transition-brightness duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-8 relative flex items-center">
                <FlagIcon className="w-10 h-10 text-blue-500 mr-4" />
                Our Mission
                <span className="absolute bottom-0 left-0 w-24 h-1 bg-blue-500 rounded-full" />
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With zero brokerage and no hidden fees, Baasthan simplifies the
                process of finding a place you can call home. Through our
                user-friendly app, users can browse, compare and book
                accommodations in just a few clicks - all with complete
                transparency.
              </p>
            </div>
            <div className="grid gap-10 animate-slide-in-right">
              <p className="text-lg text-gray-700 leading-relaxed">
                At the same time, Baasthan empowers property owners by helping
                them efficiently manage, list and operate their properties
                through a dedicated dashboard ensuring better occupancy,
                visibility and operational control.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To build a tech enabled, brokerage free housing ecosystem that
                simplifies accommodation for students and working professionals,
                while empowering property owners to manage and monetize their
                spaces effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="bg-blue-50 py-24">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl animate-slide-in-left">
              <Image
                src="/images/working-laptop.jpg"
                alt="Illustration of a person working on a laptop with a plant"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="h-10 w-10" />
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-8 relative flex items-center">
                <EyeIcon className="w-10 h-10 text-blue-500 mr-4" />
                Our Vision
                <span className="absolute bottom-0 left-0 w-24 h-1 bg-blue-500 rounded-full" />
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We aim to go beyond housing by integrating essential lifestyle
                services like cloud kitchen and laundry, making Baasthan a
                complete digital living solution all under one platform. To
                become India's most trusted digital living platform by
                redefining how people book and manage their accommodation with
                zero brokerage at its core. We envision a future where every
                student and professional can access verified, affordable housing
                and essential services like healthy tasty meals and laundry
                through one smart, verified platform.
              </p>
            </div>
          </div>
        </section>

        {/* Our Goals Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight text-center mb-16 relative flex items-center justify-center animate-fade-in-up">
              <CheckCircleIcon className="w-10 h-10 text-blue-500 mr-4" />
              Our Goals
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full" />
            </h2>
            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-100 rounded-r-xl shadow-lg mx-auto max-w-5xl animate-fade-in-up delay-200">
              <ul className="list-disc list-inside text-blue-800 space-y-3 text-lg">
                <li>
                  Simplify the housing search for students and working
                  professionals with verified, affordable listing.
                </li>
                <li>
                  Eliminate hidden costs and brokerage fees making the rental
                  process transparent and fair.
                </li>
                <li>
                  Empower property owners with easy tools to manage and rent out
                  their spaces hassle-free.
                </li>
                <li>
                  Offer essential services like food (cloud kitchen) and laundry
                  - all from a single app.
                </li>
                <li>
                  Create a trusted digital ecosystem that supports stress-free,
                  long term living solutions.
                </li>
                <li>
                  Community built on safety, comfort and support where we uplift
                  and offer shelter.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="relative bg-blue-50 py-24 text-center overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-100 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-blue-200 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-100 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-7 h-7 bg-blue-200 rounded-full animate-pulse-slow" />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-8 relative flex items-center justify-center animate-fade-in-up">
              <HeartHandshakeIcon className="w-10 h-10 text-blue-500 mr-4" />
              Our Values
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full" />
            </h2>
            <p className="mx-auto mt-6 max-w-5xl text-xl text-gray-700 leading-relaxed animate-fade-in-up delay-200">
              At Baasthan, we believe in keeping things simple, honest and
              impactful. We stand for transparency - no hidden fees, no
              middlemen. Our goal is to make housing affordable and accessible
              especially for students and working professionals. We operate on
              trust, with verified listings and real support. Every feature
              built is user friendly designed for ease and reliability. And as
              we grow we remain committed to innovation and inclusivity,
              reaching regions and people that others overlook.
            </p>

            {/* Feature Icons with staggered animations */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 animate-fade-in-up delay-300">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <UsersIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Professional Team
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our team is dedicated to providing expert support and guidance
                  throughout your housing journey.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 animate-fade-in-up delay-400">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <TargetIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Target Oriented
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We focus on delivering solutions that meet your specific
                  needs, ensuring a seamless experience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group p-6 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 animate-fade-in-up delay-500">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <AwardIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Success Guarantee
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are committed to your satisfaction, ensuring you find the
                  perfect accommodation with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
