export interface TocBranch<T> { item: T; index: number; children: TocBranch<T>[] }

export function tocTree<T extends { depth?: number }>(items: T[]): TocBranch<T>[] {
  const roots: TocBranch<T>[] = [];
  const stack: TocBranch<T>[] = [];
  items.forEach((item, index) => {
    const node: TocBranch<T> = { item, index, children: [] };
    while (stack.length && (stack[stack.length - 1].item.depth ?? 0) >= (item.depth ?? 0)) stack.pop();
    if (stack.length) stack[stack.length - 1].children.push(node);
    else roots.push(node);
    stack.push(node);
  });
  return roots;
}

export function headingIndex(tops: number[], anchor: number): number {
  return Math.max(0, tops.findLastIndex(top => top <= anchor));
}

export function decodeHeadingHash(hash: string): string {
  try { return decodeURIComponent(hash.replace(/^#/, "")); } catch { return ""; }
}
