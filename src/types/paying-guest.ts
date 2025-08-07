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

export type CreatePayingGuestPayload = Prisma.PayingGuestInfoCreateInput;

export type SeriliazedPayingGuestInfoWithPublicUser = Omit<
  PayingGuestInfoWithPublicUser,
  | "startingPrice"
  | "maintaince"
  | "securityDeposite"
  | "singleSharingPrice"
  | "doubleSharingPrice"
  | "trippleShareingPrice"
> & {
  startingPrice: number;
  maintaince: number;
  securityDeposite: number;
  singleSharingPrice: number;
  doubleSharingPrice: number;
  trippleShareingPrice: number;
};
