export type Location = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  location: Location;
};
