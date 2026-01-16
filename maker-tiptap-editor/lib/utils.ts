import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* 
这个 cn 函数的作用是结合 clsx 和 tailwind-merge 两个库的功能，用于处理和合并 CSS 类名，特别是在使用 Tailwind CSS 时，帮助你避免类名冲突或重复的 Tailwind 实用工具类，同时确保生成的类名字符串有效、简洁。

clsx(inputs):
	•	clsx 是一个流行的小型实用库，用于将一组不同的类名（字符串、对象、数组等）组合成一个有效的类名字符串。
	•	它的功能包括：
	•	过滤掉无效的类名（如 false、null、undefined）。
	•	支持对象条件的类名设置。例如：{ "bg-red-500": condition } 当 condition 为 true 时，bg-red-500 被包含在类名中。
	•	支持数组、字符串的合并。

  clsx("btn", { "btn-primary": isPrimary }, ["extra-class", "mt-4"])
  // 如果 isPrimary 为 true，将返回 "btn btn-primary extra-class mt-4"

twMerge():
  •	tailwind-merge 是一个用于优化和合并 Tailwind CSS 类名的库。Tailwind CSS 的实用工具类名是互斥的，例如 p-4 和 p-2 分别表示不同的 padding，当它们同时存在时，会发生冲突。twMerge 会根据 Tailwind 的规则自动合并这些类，删除无效或重复的类名。
	•	作用：twMerge 会确保在合并时去除重复的 Tailwind 类名，并按照优先级保留最后一个冲突的类。例如：如果你传入了 p-4 和 p-2，最终的结果会是 p-2，因为它覆盖了 p-4。

  twMerge("p-4", "p-2") 
  // 输出 "p-2" 因为 p-2 覆盖了 p-4

cn(...inputs):
	•	这个函数结合了两者的功能，首先使用 clsx 将输入的类名进行组合，然后再通过 twMerge 优化和处理 Tailwind 类名的冲突。
	•	作用：简化类名处理，特别是在需要处理大量动态类名和条件渲染时，可以确保生成的类名字符串干净且没有冲突。

  cn("p-4", isPrimary && "bg-blue-500", "p-2", "text-lg")
  // 如果 isPrimary 为 true，则输出: "bg-blue-500 p-2 text-lg"

总结：
这个 cn 函数的作用是帮助你更简便地处理 CSS 类名，尤其是：
	•	动态、条件渲染的类名。
	•	Tailwind CSS 中可能发生的类名冲突。
	•	确保最终生成的类名字符串是干净、有效的。
它结合了 clsx 处理条件、对象和数组类名的能力，并利用 tailwind-merge 解决 Tailwind 类名的冲突和重复。
*/
