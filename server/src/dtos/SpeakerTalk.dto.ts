import { Proposal, Talk, User } from '@prisma/client'
import { SpeakerProposalDto } from './SpeakerProposal.dto'
import { SpeakerDto } from './Speaker.dto'

export class SpeakerTalkDto {
  id: number
  title: string
  abstract: string
  level?: string | null
  language?: string | null
  references?: string | null
  ownerId: number
  archived: boolean
  updatedAt: Date
  createdAt: Date
  speakers?: SpeakerDto[]
  proposals?: SpeakerProposalDto[]

  constructor(talk: Talk & { speakers?: User[]; proposals?: Proposal[] }) {
    this.id = talk.id
    this.title = talk.title
    this.abstract = talk.abstract
    this.level = talk.level
    this.language = talk.language
    this.references = talk.references
    this.ownerId = talk.ownerId
    this.archived = talk.archived
    this.updatedAt = talk.updatedAt
    this.createdAt = talk.createdAt
    if (talk.speakers) {
      this.speakers = talk.speakers.map((speaker) => new SpeakerDto(speaker))
    }
    if (talk.proposals) {
      this.proposals = talk.proposals.map((proposal) => new SpeakerProposalDto(proposal))
    }
  }
}