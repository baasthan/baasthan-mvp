import { APP_CONFIG } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import AuthButtons from "./auth-buttons";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between p-2 sticky top-0 bg-white z-10">
      <Link
        href="/"
        className="flex flex-row items-center gap-2 px-2 py-1 rounded-full"
      >
        <Image
          src="/logo.svg"
          width={24}
          height={24}
          alt={`${APP_CONFIG.NAME} Logo`}
        />

        <h3 className="text-primary text-xl font-semibold decoration-0">
          {APP_CONFIG.APP_NAME}
        </h3>
      </Link>

      <div className="flex flex-row">
        <Button variant={"link"} asChild>
          <Link href="/blogs">Blogs</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href={"/about-us"}>About Us</Link>
        </Button>
        <Suspense>
          <AuthButtons />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
