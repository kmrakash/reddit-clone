import { atom } from "recoil"

export interface Community {
  communityId: string
  isModerator?: boolean
  imageURL?: string
}
