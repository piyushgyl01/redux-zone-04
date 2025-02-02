const initialState = { profiles: [], averageAge: 0 };

import {
  ADD_PROFILE,
  REMOVE_PROFILE,
  CALCULATE_AVERAGE_AGE,
} from "./actions.js";

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };

    case REMOVE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.id !== action.payload.id
        ),
      };

    case CALCULATE_AVERAGE_AGE:
      const totalAge = state.profiles.reduce(
        (sum, profile) => sum + profile.age,
        0
      );
      const averageAge = state.profiles.length
        ? totalAge / state.profiles.length
        : 0;

      return {
        ...state,
        averageAge,
      };
    default:
      return state;
  }
};

export default profileReducer;
