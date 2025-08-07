import React from "react";

interface AccessDeniedProps {
  listYouPg?: React.ReactNode;
}
const AccessDenied = ({ listYouPg }: AccessDeniedProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">
          Please do not wander in restricetd areas.
        </p>
      </div>
      {listYouPg}
    </div>
  );
};

export default AccessDenied;
