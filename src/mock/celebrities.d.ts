declare module "celebrities*.json" {
  const celebrity: {
    id: number;
    first: string;
    last: string;
    dob: string;
    gender: string;
    email: string;
    picture: string;
    country: string;
    description: string;
  }[];

  export default celebrity;
}
