#!/usr/bin/env node
import { stmt } from '@firestore-rules/core'
import { FirestoreRulesModel } from '@firestore-rules/model'
import { cosmiconfigSync } from 'cosmiconfig'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { register } from 'ts-node'

const explorerSync = cosmiconfigSync('firestore-rules')
const searchedFor = explorerSync.search()

if (!searchedFor) {
  console.error('config file for firestore-rules was not found!')
  process.exit(1)
}

const {
  rulesPath,
  typescript = true,
  outputPath = 'firestore.rules',
  backupFile = true,
} = searchedFor.config

if (!rulesPath) {
  console.error('configuration for rules path was not provided!')
  process.exit(1)
}

if (typescript) {
  register()
}

const cls = require(resolve(rulesPath)).default as unknown

if (typeof cls !== 'function') {
  console.error('default exported value is not class.')
  process.exit(1)
}

let obj: FirestoreRulesModel
try {
  // @ts-ignore
  obj = new cls()
} catch (e) {
  console.log(e)
  console.error('default exported value is not class.')
  process.exit(1)
}

if (!(obj instanceof FirestoreRulesModel)) {
  console.error(
    'default exported value is not extend class FirestoreRulesModel'
  )
  process.exit(1)
}

const rules = new stmt.FirestoreRulesStatements([
  new stmt.FirestoreRulesStatementsComment(
    '!!! DO NOT EDIT !!!\nThis file is generated by @firestore-rules/cli'
  ),
  new stmt.FirestoreRulesVersionStatements(2),
  new stmt.FirestoreRulesServiceStatement(obj),
])

const writePath = resolve(outputPath)

if (backupFile && existsSync(writePath)) {
  const oldRules = readFileSync(writePath)
  writeFileSync(`${writePath}.backup`, oldRules)
}

writeFileSync(writePath, rules.render())
