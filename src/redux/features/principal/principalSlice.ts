import { CustomJwtPayload } from "@/interfaces/auth";
import { IBaseUser } from "@/interfaces/base";
import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPrincipalState extends IBaseUser {
  isAuthenticated: boolean;
}

const setPrincipal: CaseReducer<IPrincipalState, PayloadAction<IBaseUser>> = (state, action) => {
  return {
    ...action.payload,
    isAuthenticated: true,
  };
};

const resetPrincipal: CaseReducer<IPrincipalState, PayloadAction<void>> = (state, action) => {
  return initialState;
};

const initialState: IPrincipalState = {
  id: "1",
  username: "",
  firstName: "",
  lastName: "",
  active: false,
  roles: [],
  isAuthenticated: false,
  avatarUrl: "",
};

const principalSlice = createSlice({
  name: "principal",
  initialState,
  reducers: {
    setPrincipal,
    resetPrincipal,
  },
});

export const { setPrincipal: setPrincipalAction, resetPrincipal: resetPrincipalAction } = principalSlice.actions;
export default principalSlice.reducer;
