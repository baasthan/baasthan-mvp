"use client";

import ShareDetails from "../share-details";

const ListYourPG = () => {
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-primary mb-4">
          List Your PG with Us
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Share your contact email and our executive will reach out to you
          shortly.
        </p>
        <ShareDetails />
      </div>
    </section>
  );
};

export default ListYourPG;
