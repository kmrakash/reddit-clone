import { Timestamp } from "firebase/firestore"
import { atom } from "recoil"

export interface Community {
  id: string
  creatorId: string
  numberOfMembers: number
  privacyType: "public" | "restricted" | "private"
  createdAt?: Timestamp
  imageURL?: string
}

// Community Snippets Type
export interface CommunitySnippet {
  communityId: string
  isModerator?: boolean
  imageURL?: string
}

// Snippets state
interface CommunityState {
  mySnippets: CommunitySnippet[]
  // visitedCommunities
  currentCommunity?: Community
}

// Default State of Community State
const defaultCommunityState: CommunityState = {
  mySnippets: [],
}

// Recoil Atomo for Community State
export const communityState = atom<CommunityState>({
  key: "communities",
  default: defaultCommunityState,
})
