import { redirect } from "next/navigation";
import z from "zod";

type Props = {
  params: Promise<{ id: string }>;
};

const PayingGuestDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const isValidId = z.string().uuid().safeParse(id).success;
  if (!isValidId) {
    redirect("/");
  }

  return <div className=" container mx-auto p-2"></div>;
};

export default PayingGuestDetailsPage;
