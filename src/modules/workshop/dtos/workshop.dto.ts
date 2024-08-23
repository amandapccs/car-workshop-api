import * as z from "zod";

export const WorkshopDto = z.object({
  name: z.string(),
  address: z.string(),
  location: z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
  }),
});

export const WorkshopDtoUpdate = WorkshopDto.partial();

export type WorkshopDtoType = z.infer<typeof WorkshopDto>;
export type WorkshopDtoUpdateType = z.infer<typeof WorkshopDtoUpdate>;