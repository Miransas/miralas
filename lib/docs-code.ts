import { isValidElement, type ReactNode } from "react";

export function codeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(codeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return codeText(node.props.children);
  return "";
}

export function codeLanguage(className?: string): string | undefined {
  return className?.match(/(?:^|\s)language-([^\s]+)/)?.[1];
}
