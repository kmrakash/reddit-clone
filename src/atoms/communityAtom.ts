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
  // mySnippets
  // visitedCommunities
}

// Default State of Community State

// Recoil Atomo for Community State
