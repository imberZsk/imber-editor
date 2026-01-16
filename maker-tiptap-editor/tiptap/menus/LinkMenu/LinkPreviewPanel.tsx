import { Pen, Trash2 } from "lucide-react";
import { Surface } from "@/tiptap/ui/Surface";
import { Toolbar } from "@/tiptap/ui/Toolbar";
import { Tooltip } from "@/tiptap/ui/Tooltip";

export type LinkPreviewPanelProps = {
  url: string;
  onEdit: () => void;
  onClear: () => void;
};

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a href={url} target="_blank" rel="noopener noreferrer" className="break-all text-sm underline">
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <Pen className="size-4" strokeWidth={2.5} />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <Trash2 className="size-4" strokeWidth={2.5} />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
};
