import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

// 定义 props 的类型
type DropdownProps = {
  items: string[];
  command: (args: { id: string }) => void;
};

// 定义用于 forwardRef 的类型
type DropdownRef = {
  // 定义 onKeyDown 的参数类型
  onKeyDown: (event: { key: string }) => boolean;
};

export default forwardRef<DropdownRef, DropdownProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ key }) => {
      if (key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="mention-dropdown-menu">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={index === selectedIndex ? "is-selected" : ""}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
