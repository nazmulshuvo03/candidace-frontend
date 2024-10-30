import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { myStructure } from './deskStructure'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Candidace.fyi',

  projectId: '50ir7jzf',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: myStructure
    }),  
    visionTool(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
