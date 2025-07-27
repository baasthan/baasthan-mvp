import { PGOccupancyTypeEnum } from "../../prisma/generated/prisma";

export const PGOccupancyTypeEnumMap = {
  [PGOccupancyTypeEnum.singleSharing]: "Single Sharing",
  [PGOccupancyTypeEnum.doubleSharing]: "Double Sharing",
  [PGOccupancyTypeEnum.tripleSharing]: "Triple Sharing",
};
