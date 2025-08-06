import { Globe, Mail, Phone } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen container mx-auto p-2 flex flex-col gap-4">
      <h1
        className="text-3xl font-semibold text-center
      "
      >
        Terms and Conditions - Baasthan
      </h1>
      <p className=" text-lg font-medium">Effective Date: 06/08/2025</p>
      <p className="font-semibold text-xl text-center pt-8 ">
        Welcome to Baasthan! These Terms and Conditions govern your access to
        and use of our platform (website and app). By using Baasthan, you agree
        to these Terms and our Privacy Policy. If you do not agree, please do
        not use the platform.
      </p>
      <hr />

      <ol className="list-decimal list-inside font-bold text-2xl flex flex-col gap-4">
        <li>
          User Registration and Account Security
          <ul className="list-disc list-inside font-normal text-lg ml-6">
            <li>
              You may be required to register and create an account to access
              certain features.
            </li>
            <li>
              You are solely responsible for maintaining the confidentiality of
              your login credentials and for all activities under your account.
            </li>
            <li>
              Baasthan reserves the right to refuse, suspend, or terminate
              accounts that violate these Terms or appear suspicious.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Property Listings and Content
          <ul className=" list-disc list-inside font-normal text-lg ml-6">
            <li>
              Users posting PGs or rental listings must ensure all information
              is accurate, updated, and truthful.
            </li>
            <li>
              Listings must not contain personal contact details unless
              explicitly requested by Baasthan.
            </li>
            <li>
              Content that is misleading, inappropriate, illegal, or violates
              guidelines will be removed without notice.
            </li>
            <li>
              Baasthan reserves the right to edit, block, or delete such
              content.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Rental Agreements and Legal Documents
          <ul className=" list-disc list-inside font-normal text-lg ml-6">
            <li>
              Baasthan offers digital rental agreements covering rent, deposit,
              duration, renewal, and termination.
            </li>
            <li>
              These are legally binding for both tenants and property owners.
            </li>
            <li>
              Users are expected to read and understand all clauses before
              signing.
            </li>
            <li>
              Baasthan is not responsible for enforcing any agreement between
              users.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Payments and Transactions
          <ul className=" list-disc list-inside font-normal text-lg ml-6">
            <li>
              Users may be required to make payments for PG bookings, services
              (laundry, food, etc.), or listing upgrades.
            </li>
            <li>
              Payments are securely processed via third-party gateways. Baasthan
              does not store your payment information.
            </li>
            <li>
              Any applicable service charges, taxes, or commissions will be
              clearly displayed before checkout.
            </li>
            <li>
              Refunds or cancellations will follow the specific policy of each
              service.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Dispute Resolution
          <ul className=" list-disc list-inside font-normal text-lg ml-6">
            <li>
              Baasthan may assist in resolving disputes between users related to
              listings, payments, or agreements.
            </li>
            <li>
              Users are encouraged to communicate directly and maintain proper
              records.
            </li>
            <li>
              To raise a concern, email us at{" "}
              <a
                href="mailto:support@baasthan.com"
                className="text-primary hover:underline"
              >
                support@baasthan.com
              </a>{" "}
              with full details.
            </li>
            <li>Baasthan will review and respond within 3 business days.</li>
            <li>
              While we may facilitate communication, we are not legally
              obligated to mediate or guarantee outcomes.
            </li>
            <li>
              Unresolved matters may be escalated to legal authorities as per
              jurisdiction.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          User Responsibilities and Conduct
          <ul className="list-disc list-inside font-normal text-lg ml-6">
            <li>
              Users must follow all applicable laws and must not engage in
              fraud, abuse, or unlawful activity.
            </li>
            <li>
              You are fully responsible for your listings, profile information,
              and services provided or used.
            </li>
            <li>
              Misuse of the platform can lead to warnings, suspension, or
              permanent bans.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Baasthan&apos;s Liability and Disclaimers
          <ul className="list-disc list-inside font-normal text-lg ml-6">
            <li>
              Baasthan is a digital facilitator and does not own or operate any
              listed PG properties or third-party services.
            </li>
            <li>
              We do not guarantee the accuracy, quality, or availability of
              listings or vendors.
            </li>
            <li>
              Baasthan is not liable for disputes, damages, or losses arising
              from user activity or listings.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Third-Party Services
          <ul className="list-disc list-inside text-lg font-normal ml-6">
            <li>
              Baasthan may feature services like food, laundry, and maintenance
              via third-party vendors.
            </li>
            <li>
              We do not guarantee the quality or delivery of these services.
            </li>
            <li>
              Users are advised to verify service terms directly with the
              provider.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Changes to Terms
          <ul className="font-normal text-lg list-disc list-inside ml-6">
            <li>
              Baasthan reserves the right to update or revise these Terms at any
              time.
            </li>
            <li>
              Any changes will be notified via the platform or email. Continued
              use after changes means you accept the new Terms.
            </li>
          </ul>
        </li>
        <hr />
        <li>
          Governing Law and Jurisdiction
          <p className="font-normal text-lg ml-6">
            These Terms and Conditions are governed by the laws of India.
            <br /> Any disputes arising out of or in connection with the use of
            the Baasthan platform—including agreements, transactions, services,
            or interactions—shall be subject to the exclusive jurisdiction of
            the courts located in Bangalore, Karnataka, notwithstanding that the
            company is registered in Madhepura, Bihar.
            <br /> By using Baasthan, you agree to submit to the jurisdiction of
            the courts in Bangalore.
          </p>
        </li>
        <hr />
        <li>
          Contact Us
          <div className=" font-normal text-lg ml-6">
            <p>For any questions, feedback, or support, please contact us:</p>
            <p className="flex items-center gap-1">
              <Mail />
              <a
                href="mailto:support@baasthan.com"
                className="text-primary hover:underline"
              >
                support@baasthan.com
              </a>
            </p>
            <p className="flex items-center gap-1">
              <Phone />
              <a
                href="tel:+916290654204"
                className="text-primary hover:underline"
              >
                +91 6290654204
              </a>
            </p>
            <p className="flex items-center gap-1">
              <Globe />
              <a
                href="https://baasthan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                baasthan.com
              </a>
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default page;
