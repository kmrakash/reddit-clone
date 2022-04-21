// Imports
import { atom } from "recoil"

// Type of AuthModal
export interface AuthModalState {
  open: boolean
  view: "login" | "signup" | "resetPassword"
}

//DefaultState
const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
}

// AuthModal Atom
export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
})
