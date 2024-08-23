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
import { isValidObjectId } from "mongoose";

const getAll = async (): Promise<SuccessResponse<Workshop[]>> => {
  const workshops = await workshopRepository.getAll();
  return success(workshops);
};

const getById = async (
  id: string
): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
  const isValidMongoId = isValidObjectId(id);

  if (!isValidMongoId) {
    return err(
      errorMessages.BAD_REQUEST("invalid workshop id"),
      getStackTrace(),
      errorNames.BAD_REQUEST
    );
  }

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

const create = async (
  workshop: WorkshopDtoType
): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
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
  const isValidMongoId = isValidObjectId(id);

  if (!isValidMongoId) {
    return err(
      errorMessages.BAD_REQUEST("invalid workshop id"),
      getStackTrace(),
      errorNames.BAD_REQUEST
    );
  }

  const updatedWorkshop = await workshopRepository.update(id, workshop);

  if (!updatedWorkshop) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.CANNOT_UPDATE
    );
  }

  return success(updatedWorkshop);
};

const remove = async (
  id: string
): Promise<SuccessResponse<Workshop> | ErrorResponse> => {
  const isValidMongoId = isValidObjectId(id);

  if (!isValidMongoId) {
    return err(
      errorMessages.BAD_REQUEST("invalid workshop id"),
      getStackTrace(),
      errorNames.BAD_REQUEST
    );
  }

  const deletedWorkshop = await workshopRepository.remove(id);

  if (!deletedWorkshop || !deletedWorkshop.id) {
    return err(
      errorMessages.INTERNAL_SERVER_ERROR,
      getStackTrace(),
      errorNames.INTERNAL_SERVER_ERROR
    );
  }

  return success(deletedWorkshop);
};

const getNearbyWorkshops = async (
  coordinates: number[],
  maxDistance: number
): Promise<SuccessResponse<Workshop[]> | ErrorResponse> => {
  const maxDistanceInMeters = maxDistance * 1000;
  const nearbyWorkshops = await workshopRepository.getNearbyWorkshops(
    coordinates,
    maxDistanceInMeters
  );

  if (nearbyWorkshops.length === 0) {
    return err(
      errorMessages.NOT_FOUND("workshops"),
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
