import { validate } from "../../../middlewares/vailidate";
import { WorkshopDto, WorkshopDtoUpdate } from "../dtos/workshop.dto";

export const validateWorkshopCreate = validate(WorkshopDto);
export const validateWorkshopUpdate = validate(WorkshopDtoUpdate);