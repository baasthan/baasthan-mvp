import { Prisma } from "../../prisma/generated/prisma";

export type SupportRequestType = Prisma.SupportRequestGetPayload<{
  select: {
    id: true;
    email: true;
    mobileNumber: true;
    reason: true;
    createdAt: true;
  };
}>;
