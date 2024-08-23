import {
  err,
  success,
  SuccessResponse,
  ErrorResponse,
} from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/enums/error-messages";
import { errorNames } from "../../../shared/enums/error-names";
import { getStackTrace } from "../../../shared/stack-trace/get-stack-trace";
import { WorkshopDtoType, WorkshopDtoUpdateType } from "../dtos/workshop.dto";
import { Workshop } from "../models/domain.workshop.type";
import workshopRepository from "../repositories/workshop.repository";

const getAll = async (): Promise<SuccessResponse<Workshop[]>> => {
  const workshops = await workshopRepository.getAll();
  return success(workshops);
};

const getById = async (
  id: string
): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
  const workshop = await workshopRepository.getById(id);

  if (!workshop) {
    return err(
      errorMessages.NOT_FOUND("workshop"),
      getStackTrace(),
      errorNames.NOT_FOUND
    );
  }

  return success(workshop);
};

const create = async (workshop: WorkshopDtoType): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
  const newWorkshop = await workshopRepository.create(workshop);

  if (!newWorkshop) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.CANNOT_CREATE
    );
  }

  return success(newWorkshop);
};

const update = async (
  id: string,
  workshop: WorkshopDtoUpdateType
): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
  const updatedWorkshop = await workshopRepository.update(id, workshop);

  if (!updatedWorkshop) {
    return err(
      errorMessages.NOT_FOUND("workshop"),
      getStackTrace(),
      errorNames.NOT_FOUND
    );
  }

  return success(updatedWorkshop);
};

const remove = async (
  id: string
): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
  const deletedWorkshop = await workshopRepository.remove(id);

  if (!deletedWorkshop || !deletedWorkshop.id) {
    return err(
      errorMessages.NOT_FOUND("workshop"),
      getStackTrace(),
      errorNames.NOT_FOUND
    );
  }

  return success(deletedWorkshop);
};

const getNearbyWorkshops = async (
  coordinates: number[],
  maxDistance: number
): Promise<SuccessResponse<Workshop[]> | ErrorResponse> => {
  const nearbyWorkshops = await workshopRepository.getNearbyWorkshops(
    coordinates,
    maxDistance
  );

  if (!nearbyWorkshops) {
    return err(
      errorMessages.NOT_FOUND("workshop"),
      getStackTrace(),
      errorNames.NOT_FOUND
    );
  }

  return success(nearbyWorkshops);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getNearbyWorkshops,
};
