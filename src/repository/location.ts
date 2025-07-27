import { LocationInfo } from "@/types/location";
import { Prisma, PrismaClient } from "../../prisma/generated/prisma";

export const getLocations = async (
  text?: string,
  limit: number = 10,
  offset: number = 0
): Promise<LocationInfo[] | null> => {
  try {
    const prisma = new PrismaClient();

    let whereClause: Prisma.LocationWhereInput = {};

    if (text) {
      whereClause = {
        OR: [
          {
            locality: {
              contains: text?.toLowerCase(),
              mode: "insensitive",
            },
          },
          {
            RelatedLocality: {
              some: {
                name: {
                  contains: text?.toLowerCase(),
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      };
    }

    const locations = await prisma.location.findMany({
      where: whereClause,
      include: {
        RelatedLocality: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        locality: "desc",
      },
      take: limit,
      skip: offset,
    });

    return locations;
  } catch (error) {
    console.error("Unable to fetch location details");
    console.debug(error);
    return null;
  }
};
