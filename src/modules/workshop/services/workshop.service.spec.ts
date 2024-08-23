import { getStackTrace } from "../../../shared/stack-trace/get-stack-trace";
import { err, success } from "../../../shared/api-patterns/return-patterns";
import { errorMessages } from "../../../shared/enums/error-messages";
import { errorNames } from "../../../shared/enums/error-names";
import workshopService from "./workshop.service";
import workshopRepository from "../repositories/workshop.repository";

jest.mock("../repositories/workshop.repository");

const mockedRepository = workshopRepository as jest.Mocked<
  typeof workshopRepository
>;

const mockedWorkshop = {
  id: "66c77d602dc4cc5ffd48b8ef",
  name: "Workshop 1",
  address: "Address 1",
  location: {
    type: "Point",
    coordinates: [-46.633309, -23.46055],
  },
  createdAt: new Date(),
};
const radiusInKilometers = 10;

describe("Workshop Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return success with all workshops", async () => {
      const mockedWorkshops = [mockedWorkshop];
      mockedRepository.getAll.mockResolvedValue(mockedWorkshops);

      const result = await workshopService.getAll();
      expect(result).toEqual(success(mockedWorkshops));
    });

    it("should return success with empty array if no workshops found", async () => {
      mockedRepository.getAll.mockResolvedValue([]);

      const result = await workshopService.getAll();
      expect(result).toEqual(success([]));
    });
  });

  describe("getById", () => {
    it("should return success with the workshop if found", async () => {
      mockedRepository.getById.mockResolvedValue(mockedWorkshop);

      const result = await workshopService.getById(mockedWorkshop.id);
      expect(result).toEqual(success(mockedWorkshop));
    });

    it("should not return an workshop if not found", async () => {
      mockedRepository.getById.mockResolvedValue(null);

      const [err, _] = await workshopService.getById(mockedWorkshop.id);
      expect(err?.message).toEqual(errorMessages.NOT_FOUND("workshop"));
      expect(err?.name).toEqual(errorNames.NOT_FOUND);
    });

    it("should return an error if given an invalid id", async () => {
      const [err, _] = await workshopService.getById("invalid_id");

      expect(err?.message).toEqual(
        errorMessages.BAD_REQUEST("invalid workshop id")
      );
      expect(err?.name).toEqual(errorNames.BAD_REQUEST);
    });
  });

  describe("create", () => {
    it("should return success with the created workshop", async () => {
      const { id, createdAt, ...createWorkshopDTO } = mockedWorkshop;
      mockedRepository.create.mockResolvedValue(mockedWorkshop);

      const result = await workshopService.create(createWorkshopDTO);
      expect(result).toEqual(success(mockedWorkshop));
    });

    it("should return an error if the workshop cannot be created", async () => {
      mockedRepository.create.mockResolvedValue(null);

      const [err, _] = await workshopService.create(mockedWorkshop);
      expect(err?.message).toEqual(errorMessages.INTERNAL_SERVER_ERROR);
      expect(err?.name).toEqual(errorNames.CANNOT_CREATE);
    });
  });

  describe("update", () => {
    it("should return success with the updated workshop", async () => {
      const { id, createdAt, ...updateWorkshopDTO } = mockedWorkshop;
      mockedRepository.update.mockResolvedValue(mockedWorkshop);

      const result = await workshopService.update(
        mockedWorkshop.id,
        updateWorkshopDTO
      );
      expect(result).toEqual(success(mockedWorkshop));
    });

    it("should return an error if the workshop cannot be updated", async () => {
      mockedRepository.update.mockResolvedValue(null);

      const [err, _] = await workshopService.update(
        mockedWorkshop.id,
        mockedWorkshop
      );
      expect(err?.message).toEqual(errorMessages.INTERNAL_SERVER_ERROR);
      expect(err?.name).toEqual(errorNames.CANNOT_UPDATE);
    });

    it("should return an error if given an invalid id", async () => {
      const [err, _] = await workshopService.update(
        "invalid_id",
        mockedWorkshop
      );

      expect(err?.message).toEqual(
        errorMessages.BAD_REQUEST("invalid workshop id")
      );
      expect(err?.name).toEqual(errorNames.BAD_REQUEST);
    });
  });

  describe("remove", () => {
    it("should return success with the removed workshop", async () => {
      mockedRepository.remove.mockResolvedValue(mockedWorkshop);

      const result = await workshopService.remove(mockedWorkshop.id);
      expect(result).toEqual(success(mockedWorkshop));
    });

    it("should return an error if the workshop cannot be removed", async () => {
      mockedRepository.remove.mockResolvedValue(null);

      const [err, _] = await workshopService.remove(mockedWorkshop.id);
      expect(err?.message).toEqual(errorMessages.INTERNAL_SERVER_ERROR);
      expect(err?.name).toEqual(errorNames.INTERNAL_SERVER_ERROR);
    });

    it("should return an error if given an invalid id", async () => {
      const [err, _] = await workshopService.remove("invalid_id");

      expect(err?.message).toEqual(
        errorMessages.BAD_REQUEST("invalid workshop id")
      );
      expect(err?.name).toEqual(errorNames.BAD_REQUEST);
    });
  });

  describe("getNearbyWorkshops", () => {
    it("should return success with the workshops found by location", async () => {
      const mockedWorkshops = [mockedWorkshop];
      mockedRepository.getNearbyWorkshops.mockResolvedValue(mockedWorkshops);

      const result = await workshopService.getNearbyWorkshops(
        [
          mockedWorkshop.location.coordinates[0],
          mockedWorkshop.location.coordinates[1],
        ],
        radiusInKilometers
      );
      expect(result).toEqual(success(mockedWorkshops));
    });

    it("should return success with empty array if no workshops found", async () => {
      mockedRepository.getNearbyWorkshops.mockResolvedValue([]);

      const [err, _] = await workshopService.getNearbyWorkshops(
        [
          mockedWorkshop.location.coordinates[0],
          mockedWorkshop.location.coordinates[1],
        ],
        radiusInKilometers
      );
      expect(err?.message).toEqual(errorMessages.NOT_FOUND("workshops"));
      expect(err?.name).toEqual(errorNames.NOT_FOUND);
    });
  });
});
