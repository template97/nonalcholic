import { Dispatch } from "redux";
import { handleActions } from "redux-actions";
import { IUserResponseDto } from "./interfaces/userInterface";

const USER_SET = "USER/SET";
const USER_RESET = "USER/RESET";
const USER_UPDATE = "USER/UPDATE";

export const setUser = (userData: IUserResponseDto) => (dispatch: Dispatch) => {
  dispatch({ type: USER_SET, payload: userData });
};

export const resetUser = (dispatch: Dispatch) => {
  dispatch({
    type: USER_RESET,
  });
};

export const updateUser = (userData: any) => (dispatch: Dispatch) => {
  dispatch({ type: USER_UPDATE, payload: userData });
};

const initialState: IUserResponseDto = {
  id: -1,
};

export default handleActions<IUserResponseDto, any>(
  {
    [USER_SET]: (state, action) => {
      return action.payload;
    },
    [USER_UPDATE]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [USER_RESET]: () => {
      return { ...initialState };
    },
  },
  initialState
);
