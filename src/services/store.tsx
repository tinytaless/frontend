import { ethers, Contract } from "ethers";
import React from "react";

import USER_ABI from "../configs/abis/User.json";

//Contract address of TTUser.sol(tt-core) deployed at Hyperspace Testnet
const CONTRACT_ADDRESS = "0x41810ea34aA8208cF0D8B6CD779582e6e70fBb89";

export enum UserType {
  SPONSOR = 1,
  LEARNER = 2,
  UNENROLLED = 3,
}

export enum StoreAction {
  LOGIN,
  LOGOUT,
}
export interface IStoreAction {
  type: StoreAction;
  payload?: Partial<IStoreState>;
}
interface IStoreState {
  loggedIn: boolean;
  wallet?: string;
  provider?: ethers.providers.Web3Provider;
  userType?: UserType;
  contract?: Contract;
  logout?: () => void;
}
type IStoreDispatch = (action: IStoreAction) => void;

const StoreContext = React.createContext<
  { state: IStoreState; dispatch?: IStoreDispatch } | undefined
>(undefined);

function storeReducer(state: IStoreState, action: IStoreAction): IStoreState {
  switch (action.type) {
    case StoreAction.LOGIN: {
      return {
        ...state,
        loggedIn: true,
        ...action.payload,
      };
    }
    case StoreAction.LOGOUT: {
      return { loggedIn: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(storeReducer, { loggedIn: false });

  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

function useStore() {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
}

async function loginUser(
  provider: ethers.providers.Web3Provider,
  logout: () => void,
  dispatch: IStoreDispatch
) {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const wallet = String(address);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, USER_ABI.abi, signer);
  const result = await contract.getUserType(wallet);
  const userType = parseInt(result._hex, 16);

  dispatch({
    type: StoreAction.LOGIN,
    payload: { wallet, provider, userType, contract, logout },
  });
}

export { StoreProvider, useStore, loginUser };
