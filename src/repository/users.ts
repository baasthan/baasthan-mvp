import { PrismaClient } from "../../prisma/generated/prisma";

export const getSupportUsers = async () => {
  try {
    const client = new PrismaClient();
    const supportUsers = await client.user.findMany({
      where: {
        role: {
          contains: "supportUserRole",
          mode: "insensitive",
        },
      },
    });
    if (supportUsers && supportUsers.length !== 0) {
      return supportUsers;
    }
    return null;
  } catch (error) {
    console.error("Unable to fetch support users");
    console.debug(error);
    return null;
  }
};
