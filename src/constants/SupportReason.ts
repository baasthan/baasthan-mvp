import { SupportReasonEnum } from "../../prisma/generated/prisma";

export const SupportReasonEnumMap = {
  [SupportReasonEnum.hosting]: "Hosting Property",
  [SupportReasonEnum.tenancy]: "Finding Property",
  [SupportReasonEnum.other]: "Other Reason",
};
