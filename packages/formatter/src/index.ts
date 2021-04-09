export type FormatOption = {
  indent: 'tab' | 'space'
  indentSize: number
  lineLength: number
}

export const defaultFormatOption: FormatOption = {
  indent: 'space',
  indentSize: 2,
  lineLength: 80,
}

const validateOption = (options: FormatOption) => {
  if (!['tab', 'space'].includes(options.indent)) {
    throw Error(`indent should be 'tab' or 'space'`)
  }
  if (typeof options.indentSize !== 'number') {
    throw Error(`indentSize should be number`)
  }
  if (typeof options.lineLength !== 'number') {
    throw Error(`lineLenght should be number`)
  }
}

export const format = (value: string, options?: Partial<FormatOption>) => {
  const options_ = { ...defaultFormatOption, ...options }
  validateOption(options_)
  const { indent, indentSize, lineLength } = options_
  let level = 0
  const newLines = value.split('\n').map((_line) => {
    const line = _line.trim()
    const diff = Array.from(line).reduce((prev, char) => {
      if (char === '}') return prev - 1
      if (char === '{') return prev + 1
      return prev
    }, 0)
    if (!line.startsWith('//') && diff < 0) {
      level += diff
    }
    const l = `${(indent === 'space' ? ' ' : '\t').repeat(
      indentSize * level
    )}${line}`
    if (!line.startsWith('//') && diff > 0) {
      level += diff
    }
    return l
  })
  return newLines.join('\n')
}
