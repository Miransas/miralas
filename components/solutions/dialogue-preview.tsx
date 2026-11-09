"use client";
import { useState } from "react";
import { ArrowUpRight,AudioLines } from "lucide-react";

const scenarios = [
  { id: "quest", label: "Game character", message: "Which way leads to the observatory?", response: "Follow the lights beyond the ridge. I'll meet you there." },
  { id: "stream", label: "Stream interaction", message: "A viewer has joined the adventure.", response: "Welcome in! Let's see where the story takes us." },
];
export function DialoguePreview() {
  const [selected, setSelected] = useState(0); const scenario = scenarios[selected];
  return <div className="rounded-[24px] bg-[#171717] p-6 text-white sm:p-9"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">INTERACTION / ILLUSTRATIVE CONCEPT</p><AudioLines size={18} className="text-neutral-400" aria-hidden="true" /></div><div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose an example">{scenarios.map((item, i) => <button key={item.id} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)} className={`cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${selected === i ? "border-white bg-white text-black" : "border-white/20 text-neutral-300 hover:border-white/50"}`}>{item.label}</button>)}</div><div aria-live="polite" className="mt-9 space-y-7"><div><p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Input</p><p className="mt-2 text-sm leading-6 text-neutral-300">{scenario.message}</p></div><div className="border-l border-white/30 pl-5"><p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Possible response</p><p className="mt-2 max-w-md text-xl leading-relaxed tracking-tight">“{scenario.response}”</p></div></div><p className="mt-10 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-neutral-500">Concept only · No audio is generated <ArrowUpRight size={13} aria-hidden="true" /></p></div>;
}
