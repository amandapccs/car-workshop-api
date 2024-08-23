import * as z from "zod";
import { err, success } from "../../../shared/api-patterns/return-patterns";
import { get } from "http";
import { getStackTrace } from "../../../shared/stack-trace/get-stack-trace";
import { errorNames } from "../../../shared/enums/error-names";

export const WorkshopDto = z.object({
  name: z.string(),
  address: z.string(),
  location: z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
  }),
});

export const WorkshopDtoUpdate = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  location: z
    .object({
      type: z.string().optional(),
      coordinates: z.array(z.number()).optional(),
    })
    .optional(),
});

export type WorkshopDtoType = z.infer<typeof WorkshopDto>;
export type WorkshopDtoUpdateType = z.infer<typeof WorkshopDtoUpdate>;

export function validateWorkshopDTO(data: unknown): WorkshopDtoType {
  const validate = WorkshopDto.parse(data);
  return validate;
}

export function validateWorkshopDTOUpdate(
  data: unknown
): WorkshopDtoUpdateType {
  const validate = WorkshopDtoUpdate.parse(data);
  return validate;
}