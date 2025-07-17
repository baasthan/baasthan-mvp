"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import AuthButtons from "./auth-buttons";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`shadow-sm fixed w-full top-0 z-50 transition-colors duration-300 bg-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8  rounded-lg flex items-center justify-center"> */}
              <Image
                src={"/logo.svg"}
                height={32}
                width={32}
                alt="Baasthan Logo"
              />
              {/* </div> */}
              <p className="text-primary font-bold text-3xl">Baasthan</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant={"link"} asChild>
              <Link
                href="/properties"
                // className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Properties
              </Link>
            </Button>
            <Suspense>
              <AuthButtons />
            </Suspense>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              size={"icon"}
              variant={"accent"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700 hover:text-primary font-medium"
              >
                Properties
              </a>
              <div className="pt-2">
                <button className="w-full border  border-primary text-primary bg-transparent px-4 py-2 rounded-md font-medium transition-colors">
                  List Property
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
