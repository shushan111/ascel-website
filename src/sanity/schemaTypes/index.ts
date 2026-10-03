import {type SchemaTypeDefinition} from 'sanity'
import {blockContent, contentTable, contentTableRow} from './blockContent'
import {course} from './course'
import {event} from './event'
import {founder} from './founder'
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
    contentTableRow,
    contentTable,
    blockContent,
    news,
    course,
    event,
    founder,
    programFact,
    programTopic,
    programMilestone,
    programNarrative,
    programProfile,
    program,
  ],
}
