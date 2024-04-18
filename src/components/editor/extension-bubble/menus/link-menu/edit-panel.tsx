import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export type LinkEditPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const LinkEditPanel = (props: LinkEditPanelProps) => {
  const { initialUrl = '', initialOpenInNewTab = false, onSetLink } = props

  const [url, setUrl] = useState(initialUrl)
  const changeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url])

  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab)
  const toggleOpenInNewTab = () => {
    setOpenInNewTab((prev) => !prev)
  }

  return (
    <div className="block p-2">
      <div className="flex items-center gap-2">
        <Input
          type="url"
          placeholder="https://"
          className="w-[200px] focus-visible:ring-transparent"
          value={url}
          onChange={changeUrl}
        />
        <Button size="sm" onClick={() => onSetLink(url, openInNewTab)} disabled={!isValidUrl}>
          确定
        </Button>
      </div>
      <div className="mt-3">
        <label className="flex cursor-pointer select-none items-center justify-start gap-2 text-sm">
          Open in new tab
          <Switch checked={openInNewTab} onCheckedChange={toggleOpenInNewTab} />
        </label>
      </div>
    </div>
  )
}
