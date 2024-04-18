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

interface ImageConfig {
  w: string
  h: string
}

interface Attrs {
  level: number
  src: string
  y: ImageConfig
}

interface TargetProps {
  t: string
  c: {
    x: string | undefined
    b?: boolean
    l?: boolean
    th?: boolean
  }[]
  s?: string
  y?: {
    w: string
    h: string
  }
  cv?: string
}

export function transformFields(input: InputProps[]) {
  const getType = (type: string) => {
    switch (type) {
      case 'paragraph':
        return 'p'
      case 'image':
        return 'z'
      default:
        return type
    }
  }

  const transformed = input.map((item) => {
    const target: TargetProps = {
      t: getType(item.type),
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
    }

    if (item.type === 'image' && item.attrs) {
      target.s = item.attrs.src
      target.y = {
        w: '830px',
        h: '860px'
      }
      target.cv = '0'
    }

    return target
  })
  return transformed
}
