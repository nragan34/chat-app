import { v4 as uuidv4 } from "uuid";
import { Users } from "../interfaces/users";

export const users: Users[] = [
    {
        id: '1',
        name: 'User 1',
        message: 'Some descriptive text about person 1',
        location: 'Elkhorn, NE ...',
        age: 2
      },
      {
        id: '2',
        name: 'User 2',
        message: 'Some descriptive text about person 2',
        location: 'Chicago, Illinois ...',
        age: 2
      },
      {
        id: '3',
        name: 'User 3',
        message: 'Some descriptive text about person 3',
        location: 'Cheyenne, Wyoming ...',
        age: 2
      },
      {
        id: '4',
        name: 'User 4 ',
        message: 'Some descriptive text about person 3',
        location: 'Cheyenne, Wyoming ...',
        age: 2
      }
]