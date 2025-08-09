import {
  Prisma,
  PrismaClient,
  SupportReasonEnum,
} from "../../prisma/generated/prisma";

interface RequestExistsProps {
  email: string;
  mobileNumber: string;
  reason: SupportReasonEnum;
}
export const supportRequestExists = async ({
  email,
  mobileNumber,
  reason,
}: RequestExistsProps) => {
  try {
    const client = new PrismaClient();
    const supportRequest = await client.supportRequest.findFirst({
      where: {
        email,
        mobileNumber,
        reason,
      },
    });
    return supportRequest ? true : false;
  } catch (error) {
    console.error("Unable to find supportRequest");
    console.debug(error);
    return false;
  }
};

export const createSupportRequest = async (
  data: Prisma.SupportRequestCreateInput
) => {
  try {
    const client = new PrismaClient();
    const newSupportRequest = await client.supportRequest.create({
      data,
    });
    if (newSupportRequest) {
      return newSupportRequest;
    }
    return null;
  } catch (error) {
    console.error("Unable to create support request");
    console.debug(error);
    return null;
  }
};

export const getSupportRequestsByEmail = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const client = new PrismaClient();
    const supportRequests = await client.supportRequest.findMany({
      where: {
        email: { equals: email },
      },
    });
    if (supportRequests && supportRequests.length !== 0) {
      return supportRequests;
    }
    return null;
  } catch (error) {
    console.error("Unable to fetch support requests");
    console.debug(error);
    return null;
  }
};

export const getSupportTickets = async () => {
  try {
    const client = new PrismaClient();
    const supportTickets = await client.supportRequest.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (supportTickets && supportTickets.length !== 0) {
      return supportTickets;
    }
    return null;
  } catch (error) {
    console.error("Unable to fetch support tickets");
    console.debug(error);
    return null;
  }
};
