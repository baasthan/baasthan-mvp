import AuthTabs from "@/components/auth-tabs";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthTabs />
      </Suspense>
    </div>
  );
};

export default Page;
