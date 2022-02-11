import { v4 as uuidv4 } from "uuid";
import { Husq, HusqWithName } from "../interfaces/husq";

export const initialHusqs: Husq[] = [
  {
    id: '1', // husq id
    userId: '1', // user id
    time: new Date(),
    message: 'about Nick Ragan timeline',

  },
  {
    id: '2',
    userId: '2',
    time: new Date(),
    message: 'about person 2 timeline',
  },
  {
    id: '3',
    userId: '3',
    time: new Date(),
    message: 'reply to user 1',
    repliesTo: '1' // reply to husq id
  },
  {
    id: '4',
    userId: '3',
    time: new Date(),
    message: 'reply to person 1 post',
    repliesTo: '1'
  },
  {
    id: '5',
    userId: '4',
    time: new Date(),
    message: 'reply to user 2 post',
    repliesTo: '2'
  },
  {
    id: '6',
    userId: '4',
    time: new Date(),
    message: 'reply to user 3 post',
    repliesTo: '3'
  },
  {
    id: '7',
    userId: '4',
    time: new Date(),
    message: 'reply to user 3 post',
    repliesTo: '3'
  }
]

