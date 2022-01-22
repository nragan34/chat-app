import { v4 as uuidv4 } from "uuid";
import { Friends } from "../interfaces/friends";

export const friends: Friends[] = [
    {
        id: '1',
        name: 'Friend 1',
        message: 'Some descriptive text about person 1',
        location: 'Elkhorn, NE ...'
      },
      {
        id: '2',
        name: 'Friend 2',
        message: 'Some descriptive text about person 2',
        location: 'Chicago, Illinois ...'
      },
      {
        id: '3',
        name: 'Friend 3',
        message: 'Some descriptive text about person 3',
        location: 'Cheyenne, Wyoming ...'
      },
      {
        id: '4',
        name: 'Friend 4 ',
        message: 'Some descriptive text about person 3',
        location: 'Cheyenne, Wyoming ...'
      }
]