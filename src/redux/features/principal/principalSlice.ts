import { EnumRole } from "@/enums/EnumRole";
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
  id: undefined,
  email: undefined,
  displayName: undefined,
  role: undefined,
  dob: undefined,
  gender: undefined,
  isAuthenticated: false,
  avatarUrl: undefined,
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
