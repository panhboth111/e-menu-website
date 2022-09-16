export {};

declare global {
  //for handling response from api calls
  interface IResponse<IData> {
    statusCode: number;
    msg: string;
    data: IData;
  }

  //food type
  interface IFood {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    status: boolean;
    category: ICategory;
  }

  interface ICategory {
    id: number;
    name: string;
    description: string;
    status: boolean;
  }
}
