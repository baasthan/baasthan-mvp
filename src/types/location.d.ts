import { Prisma } from "../../prisma/generated/prisma";

export type LocationInfo = Prisma.LocationGetPayload<{
  include: {
    RelatedLocality: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;
