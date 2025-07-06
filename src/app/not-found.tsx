import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-svh">
      <h2 className=" text-3xl font-semibold">
        <span className="text-primary">404</span> Not Found 🧐
      </h2>

      <Button variant={"link"} asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
