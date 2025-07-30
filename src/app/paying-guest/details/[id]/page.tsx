import { getPayingGuestInfoById } from "@/repository/paying-guest";
import { PayingGuestInfoWithPublicUser } from "@/types/paying-guest";
import { redirect } from "next/navigation";
import z from "zod";

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

  const payingGuestInfo: PayingGuestInfoWithPublicUser | null =
    await getPayingGuestInfoById(id);

  if (!payingGuestInfo) {
    return <div>Unable to find Property</div>;
  }
  return (
    <div className="container">
      <div className="">
        {payingGuestInfo.PayingGuestImages.map((image) => (
          <img src={image.url} key={image.id} />
        ))}
      </div>
    </div>
  );
};

export default PayingGuestDetailsPage;
