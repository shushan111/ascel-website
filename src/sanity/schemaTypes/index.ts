import {type SchemaTypeDefinition} from 'sanity'
import {blockContent} from './blockContent'
import {localizedString, localizedText} from './localizedString'
import {news} from './news'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [localizedString, localizedText, blockContent, news],
}
