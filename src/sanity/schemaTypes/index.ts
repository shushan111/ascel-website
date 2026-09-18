import {type SchemaTypeDefinition} from 'sanity'
import {blockContent} from './blockContent'
import {course} from './course'
import {event} from './event'
import {localizedString, localizedText} from './localizedString'
import {news} from './news'
import {program} from './program'
import {
  programFact,
  programMilestone,
  programNarrative,
  programProfile,
  programTopic,
} from './programProfile'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    localizedString,
    localizedText,
    blockContent,
    news,
    course,
    event,
    programFact,
    programTopic,
    programMilestone,
    programNarrative,
    programProfile,
    program,
  ],
}
