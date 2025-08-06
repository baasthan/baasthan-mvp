import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Ready to Find Your Perfect PG?
        </h2>
        <p className=" text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of students and professionals who found their ideal
          accommodation through our platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button>
            <Link href="/paying-guest" prefetch>
              Start Searching
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
