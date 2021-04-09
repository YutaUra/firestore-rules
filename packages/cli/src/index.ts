#!/usr/bin/env node
export { base, condition, func, literal, op, stmt } from '@firestore-rules/core'
export {
  FirestoreRulesModel,
  IFirestoreRulesModel,
  IFirestoreRulesModelConstructor,
} from '@firestore-rules/model'
import { cosmiconfigSync } from 'cosmiconfig'

const explorerSync = cosmiconfigSync('firestore-rules')
const searchedFor = explorerSync.search()

console.log(searchedFor)
