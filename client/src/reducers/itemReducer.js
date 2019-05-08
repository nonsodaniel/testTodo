import uuid from "uuid";
import { GET_ITEMS, ADD_ITEMS, DLETE_ITEMS } from "../actions/types";
const initialState = {
  items: [
    { uuid: uuid(), name: "Egg" },
    { uuid: uuid(), name: "Meat" },
    { uuid: uuid(), name: "Plantain" },
    { uuid: uuid(), name: "Moi Moi" },
    { uuid: uuid(), name: "Akara" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      };
    default:
      return state;
  }
}
