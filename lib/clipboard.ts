export async function copyText(text: string, clipboard: Pick<Clipboard, "writeText"> | undefined) {
  if (!clipboard?.writeText) throw new Error("Clipboard access is unavailable.");
  await clipboard.writeText(text);
}
