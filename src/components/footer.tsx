"use client";

import Link from "next/link";
import Brand from "./brand";
import { Button } from "./ui/button";

import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Brand />
              </div>
              <div className=" font-semibold text-2xl">
                Baasthan Estate Pvt. Ltd.
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted platform for finding verified PG accommodations
              across India.
            </p>
            <div className="flex space-x-4">
              {/* <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div> */}
              <Button
                size={"icon"}
                className="w-8 h-8"
                variant={"ghost"}
                asChild
              >
                <a
                  href={
                    "https://www.facebook.com/people/Baasthan/61577294258728/"
                  }
                  target="_blank"
                >
                  <Facebook className=" text-primary" />
                </a>
              </Button>
              <Button size={"icon"} className="w-8 h-8" variant={"ghost"}>
                <a
                  href={"https://www.instagram.com/baasthanindia/"}
                  target="_blank"
                >
                  <Instagram className=" text-primary" />
                </a>
              </Button>
              <Button size={"icon"} className="w-8 h-8" variant={"ghost"}>
                <a
                  href="https://www.linkedin.com/company/baasthan"
                  target="_blank"
                >
                  <Linkedin className=" text-primary" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/paying-guest?baasthanVerified=true"
                  className="hover:text-white transition-colors"
                >
                  Paying Guest
                </Link>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  List Property
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Baasthan Estate Pvt. Ltd.</p>
          <p> All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
