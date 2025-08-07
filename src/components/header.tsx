"use client";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import getInitials from "@/utils/getInitials";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import AuthButtons from "./auth-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: session } = useSession();
  const hasHostDashboardAccess = authClient.admin.checkRolePermission({
    permissions: {
      property: ["insert", "update"],
    },
    role: "hostUserRole",
  });

  // useEffect(() => {
  //   if (session && session.user && session.user.role) {
  //     const user = session.user as typeof session.user & { role?: string };
  //     const role = user.role;
  //     if (role === "hostUserRole") {
  //       setIsHostUser(true);
  //     }
  //   }
  // }, [session]);

  return (
    <header
      className={`shadow-sm fixed w-full top-0 z-50 transition-colors duration-300 bg-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" prefetch>
            <div className="flex items-center space-x-2">
              {/* <div className="w-8 h-8  rounded-lg flex items-center justify-center"> */}
              <Image
                src={"/logo.svg"}
                height={32}
                width={32}
                alt="Baasthan Logo"
              />
              {/* </div> */}
              <p className="text-primary font-bold text-3xl">
                {APP_CONFIG.APP_NAME}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant={"link"} asChild>
              <Link
                href="/paying-guest"
                prefetch
                // className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Paying Guests
              </Link>
            </Button>
            {hasHostDashboardAccess && (
              <Button variant={"link"} asChild>
                <Link href="/host/dashboard" prefetch>
                  Dashboard
                </Link>
              </Button>
            )}

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
            <div className="flex flex-col space-y-0.5 px-2">
              {/* Common Links for all users */}
              <Link
                href="/"
                prefetch
                className="flex items-center text-sm text-muted-foreground hover:text-primary font-medium rounded-md px-3 py-2.5 hover:bg-accent/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/paying-guest"
                prefetch
                className="flex items-center text-sm text-muted-foreground hover:text-primary font-medium rounded-md px-3 py-2.5 hover:bg-accent/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Paying Guest
              </Link>
              <Link
                href="/about-us"
                prefetch
                className="flex items-center text-sm text-muted-foreground hover:text-primary font-medium rounded-md px-3 py-2.5 hover:bg-accent/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                prefetch
                className="flex items-center text-sm text-muted-foreground hover:text-primary font-medium rounded-md px-3 py-2.5 hover:bg-accent/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Authentication Section */}
              <div className="pt-2 pb-2 border-t border-border/50">
                {session?.user ? (
                  <>
                    {/* User Profile Section */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50">
                      <div className="flex-shrink-0">
                        <Avatar className="h-11 w-11 border-2 border-border">
                          {session.user.image ? (
                            <AvatarImage
                              src={session.user.image}
                              className="object-cover"
                            />
                          ) : (
                            <AvatarFallback className="bg-primary text-primary-foreground text-base font-medium">
                              {getInitials(session.user.name || "")}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground/80 truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>

                    {/* User Navigation */}
                    {hasHostDashboardAccess && (
                      <Link
                        href="/host/dashboard"
                        prefetch
                        className="flex items-center text-sm text-muted-foreground hover:text-primary font-medium rounded-md px-3 py-2.5 hover:bg-accent/50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="7" height="9" x="3" y="3" rx="1" />
                            <rect width="7" height="5" x="14" y="3" rx="1" />
                            <rect width="7" height="9" x="14" y="12" rx="1" />
                            <rect width="7" height="5" x="3" y="16" rx="1" />
                          </svg>
                        </span>
                        Dashboard
                      </Link>
                    )}

                    {/* <Link
                      href="/profile"
                      prefetch
                      className="flex items-center text-sm text-muted-foreground hover:text-primary font-medium rounded-md px-3 py-2.5 hover:bg-accent/50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      Profile
                    </Link> */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-2.5 px-3 font-medium text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut();
                      }}
                    >
                      <span className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                      </span>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="pt-2 px-2">
                    <Suspense>
                      <div className="flex md:hidden">
                        <AuthButtons
                          isMobile={true}
                          onActionComplete={() => setMobileMenuOpen(false)}
                        />
                      </div>
                    </Suspense>
                  </div>
                )}
              </div>

              {/* Action button - List Property - Only shown when logged in */}
              {session?.user && (
                <div className="pb-2">
                  <Link
                    href="/host/property/new"
                    className="flex items-center justify-center w-full text-sm text-primary border border-primary/75 hover:border-primary bg-transparent rounded-md font-medium px-3 py-2.5 transition-colors hover:bg-primary/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    </span>
                    List Property
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
