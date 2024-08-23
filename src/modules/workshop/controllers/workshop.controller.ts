import { Request, Response } from "express";
import workshopService from "../services/workshop.service";
import { errorHandler } from "../../../shared/error-handler/error-handler";
import { mongooseIdDTO } from "../../../shared/dtos/mongoose-id.dto";
import {
  validateWorkshopDTO,
  validateWorkshopDTOUpdate,
} from "../dtos/workshop.dto";
import { ZodError } from "zod";
import { statusCode } from "../../../shared/status-code/status-code";

const getAll = async (_req: Request, res: Response) => {
  const [err, workshops] = await workshopService.getAll();

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res
      .status(errStatusCode)
      .json({ status: errStatusCode, errMessage });
  }

  return res.json(workshops);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validId = mongooseIdDTO(id);
  // if (!validId)

  const [err, workshop] = await workshopService.getById(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res
      .status(errStatusCode)
      .json({ status: errStatusCode, errMessage });
  }

  return res.json(workshop);
};

const create = async (req: Request, res: Response) => {
  const { body } = req;

  const validatedBody = validateWorkshopDTO(body);

  // if !validatedBody

  const [err, newWorkshop] = await workshopService.create(validatedBody);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res
      .status(errStatusCode)
      .json({ status: errStatusCode, errMessage });
  }

  return res.status(201).json(newWorkshop);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  const validId = mongooseIdDTO(id);
  const validatedBody = validateWorkshopDTOUpdate(body);
  // if !validId

  // if !validatedBody

  const [err, updatedWorkshop] = await workshopService.update(
    validId,
    validatedBody
  );

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res
      .status(errStatusCode)
      .json({ status: errStatusCode, errMessage });
  }

  return res.json(updatedWorkshop);
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const validId = mongooseIdDTO(id);
  // if !validId

  const [err, deletedWorkshop] = await workshopService.remove(id);

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res
      .status(errStatusCode)
      .json({ status: errStatusCode, errMessage });
  }

  return res.json(deletedWorkshop);
};

export const getNearbyWorkshops = async (req: Request, res: Response) => {
  const { lat, lon, radius } = req.query;

  if (!lat || !lon || !radius) {
    return res
      .status(400)
      .send("Latitude, longitude, and radius are required.");
  }

  const coordinates = [Number(lon), Number(lat)];
  const maxDistance = Number(radius);

  const [err, nearbyWorkshops] = await workshopService.getNearbyWorkshops(
    coordinates,
    maxDistance
  );

  if (err) {
    const { errMessage, errStatusCode } = errorHandler(err);

    return res
      .status(errStatusCode)
      .json({ status: errStatusCode, errMessage });
  }

  return res.json(nearbyWorkshops);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getNearbyWorkshops,
};
