import { v4 as uuidv4 } from "uuid";
import { Husq } from "../interfaces/husq";

export const initialHusqs: Husq[] =  [
    {
        id: '1',
        name: 'Nick Ragan',
        time: new Date(),
        message: 'about Nick Ragan timeline'
      },
      {
        id: '2',
        name: 'Person 2',
        time: new Date(),
        message: 'about person 2 timeline'
      },
      {
        id: '3',
        name: 'Person 3',
        time: new Date(),
        message: 'about person 3 timeline'
      }
]