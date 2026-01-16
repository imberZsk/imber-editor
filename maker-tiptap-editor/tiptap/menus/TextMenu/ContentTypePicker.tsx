import react, { useMemo } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Toolbar } from "@/tiptap/ui/Toolbar";
import { Surface } from "@/tiptap/ui/Surface";
import { Icon } from "@/tiptap/ui/Icon";
import { DropdownButton, DropdownCategoryTitle } from "@/tiptap/ui/Dropdown";
import { LucideProps, ChevronDown, Pilcrow } from "lucide-react";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: react.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === "option";
const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
  option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(() => options.find((option) => option.type === "option" && option.isActive()), [options]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Toolbar.Button active={activeItem?.id !== "paragraph" && !!activeItem?.type}>
          {activeItem?.type === "option" ? (
            <activeItem.icon className="mr-1 h-4 w-4" />
          ) : (
            <Pilcrow className="mr-1 h-4 w-4" />
          )}
          <ChevronDown className="h-2 w-2" strokeWidth={2.5} />
        </Toolbar.Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <DropdownButton key={option.id} onClick={option.onClick} isActive={option.isActive()}>
                  <option.icon className="mr-1 h-4 w-4" />
                  {option.label}
                </DropdownButton>
              );
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
                </div>
              );
            }
          })}
        </Surface>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
