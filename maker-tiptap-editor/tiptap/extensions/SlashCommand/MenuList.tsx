import React, { useCallback, useEffect, useRef, useState, useImperativeHandle } from "react";

import { Command, MenuListProps } from "./types";
import { DropdownButton } from "@/components/ui/Dropdown";
import { Icon } from "@/tiptap/ui/Icon";

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLButtonElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  // 当组发生变化时，也就是用户类型发生变化时，我们想要重置当前选择到第一个菜单
  useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.items]);

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex];
      props.command(command);
    },
    [props],
  );

  // 键盘操作
  // useImperativeHandle 是一个 React Hook，主要用于配合 ref 在父组件中对子组件暴露一组自定义的方法或属性，从而可以通过 ref 控制子组件的某些行为。这在封装一些不符合典型数据流的复杂组件（如触发动画、访问子组件方法）时很有用。
  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowDown") {
        if (!props.items.length) {
          return false;
        }

        const commands = props.items[selectedGroupIndex].commands;

        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "ArrowUp") {
        if (!props.items.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1;
          newCommandIndex = props.items[newGroupIndex].commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === "Enter") {
        if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  // 使用鼠标操作时滚动到当前选项的位置
  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;
      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex);
      };
    },
    [selectItem],
  );

  if (!props.items.length) {
    return null;
  }

  return (
    <div ref={scrollContainer} className="mb-8 max-h-[min(80vh,24rem)] flex-wrap overflow-auto bg-[var(--gray-3)] p-2">
      <div className="grid grid-cols-1 gap-0.5">
        {props.items.map((group, groupIndex: number) => (
          <React.Fragment key={`${group.title}-wrapper`}>
            <div
              className="col-[1/-1] mx-2 mt-4 select-none text-[0.65rem] font-semibold uppercase tracking-wider first:mt-0.5"
              key={`${group.title}`}
            >
              {group.title}
            </div>
            {group.commands.map((command: Command, commandIndex: number) => (
              <DropdownButton
                key={`${command.label}`}
                ref={selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex ? activeItem : null}
                isActive={selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex}
                onClick={createCommandClickHandler(groupIndex, commandIndex)}
              >
                <Icon name={command.iconName} className="mr-1" />
                {command.label}
              </DropdownButton>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

MenuList.displayName = "MenuList";

export default MenuList;

/*
给组件设置 displayName 属性（例如 CommandButton.displayName = 'CommandButton'）的主要作用是为了帮助调试和开发：
1.	调试信息：在开发者工具中，如果组件的 displayName 没有设置，React 默认会显示组件的变量名（如果它是匿名函数，则显示 Anonymous 或 Unknown）。通过手动设置 displayName，可以确保组件在调试工具（如 React DevTools）中清晰显示指定的名称，方便识别。
2.	日志和错误提示：在一些日志、错误提示和栈信息中也会使用 displayName。设定 displayName 后，错误信息或日志里会准确地显示组件名称，这对排查问题非常有帮助。
3.	高阶组件（HOC）场景：在使用高阶组件时，原始组件的名字可能被包装组件覆盖。设置 displayName 可以帮助保留或指定特定名称，使开发者在调试时更容易区分。
因此，CommandButton.displayName = 'CommandButton' 是为了保证该组件在开发工具和日志中更容易识别。
*/
