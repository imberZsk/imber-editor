import * as Popover from "@radix-ui/react-popover";
import { Link } from "lucide-react";

import { LinkEditorPanel } from "@/tiptap/menus/LinkMenu/LinkEditorPanel";
import { Toolbar } from "@/tiptap/ui/Toolbar";

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Set Link">
          <Link className="size-4" strokeWidth={2.5} />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  );
};
