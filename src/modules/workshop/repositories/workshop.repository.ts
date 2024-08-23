import { Workshop } from "../models/domain.workshop.type";
import { mongooseWorkshop } from "../models/mongoose.workshop.model";

const getAll = async (): Promise<Workshop[]> => {
  return mongooseWorkshop.find().lean();
};

const getById = async (id: string): Promise<Workshop | null> => {
  const workshop = await mongooseWorkshop.findById(id).lean();

  if (!workshop) {
    return null;
  }

  return { id: workshop._id, ...workshop };
};

const create = async (workshop: {
  name: string;
  address: string;
  location: { type: string; coordinates: number[] };
}): Promise<Workshop | null> => {
  const newWorkshop = await mongooseWorkshop.create(workshop);
  return {
    id: String(newWorkshop._id),
    address: newWorkshop.address,
    name: newWorkshop.name,
    location: newWorkshop.location,
    createdAt: newWorkshop.createdAt,
  };
};

const update = async (
  id: string,
  workshop: {
    name?: string;
    address?: string;
    location?: { type?: string; coordinates?: number[] };
  }
): Promise<Workshop | null> => {
  const updatedWorkshop = await mongooseWorkshop
    .findByIdAndUpdate(id, workshop, { new: true })
    .exec();

  if (!updatedWorkshop) {
    return null;
  }

  return {
    id: String(updatedWorkshop._id),
    address: updatedWorkshop.address,
    name: updatedWorkshop.name,
    location: updatedWorkshop.location,
    createdAt: updatedWorkshop.createdAt,
    updatedAt: updatedWorkshop.updatedAt,
  };
};

const remove = async (id: string): Promise<Workshop | null> => {
  const deleteWorkshop = await mongooseWorkshop.findByIdAndDelete(id).exec();

  if (!deleteWorkshop) {
    return null;
  }

  return {
    id: String(deleteWorkshop._id),
    address: deleteWorkshop.address,
    name: deleteWorkshop.name,
    location: deleteWorkshop.location,
    createdAt: deleteWorkshop.createdAt,
  };
};

const getNearbyWorkshops = async (
  coordinates: number[],
  maxDistance: number
): Promise<Workshop[]> => {
  return mongooseWorkshop
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates,
          },
          $maxDistance: maxDistance,
        },
      },
    })
    .lean();
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
  getNearbyWorkshops,
};
