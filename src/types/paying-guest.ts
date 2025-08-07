import { Prisma } from "../../prisma/generated/prisma";

export type PayingGuestInfoWithPublicUser = Prisma.PayingGuestInfoGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        image: true;
        name: true;
      };
    };
    PayingGuestImages: {
      select: {
        id: true;
        url: true;
      };
    };
  };
}>;

export type SeriliazedPayingGuestInfoWithPublicUser = Omit<
  PayingGuestInfoWithPublicUser,
  "startingPrice"
> & {
  startingPrice: number;
};
