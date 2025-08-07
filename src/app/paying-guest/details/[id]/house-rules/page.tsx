import { getHouseRulesById } from "@/repository/houseRules";
import { notFound, redirect } from "next/navigation";
import z from "zod";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const isValidId = z.string().uuid().safeParse(id).success;
  if (!isValidId) {
    redirect("/");
  }

  const houseRuleData = await getHouseRulesById(id);

  if (!houseRuleData) {
    return notFound();
  }
  return (
    <div className="  ">
      <div className="bg-primary border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">
              House Rules
            </h1>
          </div>
        </div>
      </div>

      <div
        className="prose container mx-auto p-2 shadow-2xl rounded-2xl"
        dangerouslySetInnerHTML={{ __html: houseRuleData.houseRuleHtml }}
      ></div>
    </div>
  );
};

export default page;
