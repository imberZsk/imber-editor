export interface InputProps {
  type: string
  attrs?: Attrs
  content?: Content[]
}

interface Content {
  type: string
  marks?: Mark[]
  text?: string
}

interface Mark {
  type: string
}

interface Attrs {
  level: number
}

export function transformFields(input: InputProps[]) {
  const transformed = input.map((item) => ({
    t: item.type === 'paragraph' ? 'p' : item.type,
    c: item.content?.map((contentItem) => {
      const marks = contentItem.marks || []
      const isBold = marks.some((mark) => mark.type === 'bold')
      const isItalic = marks.some((mark) => mark.type === 'italic')
      const isThrough = marks.some((mark) => mark.type === 'strike')
      return {
        x: contentItem.text,
        ...(isBold ? { b: true } : {}),
        ...(isItalic ? { l: true } : {}),
        ...(isThrough ? { th: true } : {})
      }
    }) || [{ x: '' }]
  }))
  return transformed
}
