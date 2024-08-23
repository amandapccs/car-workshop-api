export type Workshop = {
  id: string;
  name: string;
  address: string;
  location: {
    type: string;
    coordinates: number[];
  };
  createdAt: Date;
  updatedAt?: Date;
};