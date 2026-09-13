"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

function inlineMarkdown(value: string) {
    return escapeHtml(value)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
}

export function MarkdownContent({ source }: { source: string }): ReactNode {
    const contentRef = useRef<HTMLDivElement>(null);
    const blocks: string[] = [];
    const paragraph: string[] = [];
    const list: string[] = [];
    const code: string[] = [];
    let inCode = false;
    const flushParagraph = () => { if (paragraph.length) blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`); paragraph.length = 0; };
    const flushList = () => { if (list.length) blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`); list.length = 0; };

    for (const line of source.split("\n")) {
        if (line.startsWith("```")) {
            if (inCode) { blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`); code.length = 0; } else { flushParagraph(); flushList(); }
            inCode = !inCode;
        } else if (inCode) code.push(line);
        else if (/^#{1,3} /.test(line)) {
            flushParagraph(); flushList();
            const match = line.match(/^(#{1,3}) (.*)$/);
            if (match) { const level = match[1].length; const id = match[2].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); blocks.push(`<h${level} id="${id}">${inlineMarkdown(match[2])}</h${level}>`); }
        } else if (/^[-*] /.test(line)) { flushParagraph(); list.push(line.slice(2)); }
        else if (line.startsWith("> ")) { flushParagraph(); flushList(); blocks.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`); }
        else if (line.trim() === "") { flushParagraph(); flushList(); }
        else paragraph.push(line.trim());
    }
    flushParagraph(); flushList();
    useEffect(() => {
        const codeBlocks = contentRef.current?.querySelectorAll("pre");
        if (!codeBlocks) return;

        const buttons = Array.from(codeBlocks).map((pre) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "docs-code-copy";
            button.textContent = "Copy";
            button.setAttribute("aria-label", "Copy code block");
            button.onclick = async () => {
                await navigator.clipboard.writeText(pre.querySelector("code")?.textContent ?? "");
                button.textContent = "Copied";
                window.setTimeout(() => { button.textContent = "Copy"; }, 1800);
            };
            pre.append(button);
            return button;
        });

        return () => buttons.forEach((button) => button.remove());
    }, []);

    return <div ref={contentRef} className="docs-prose" dangerouslySetInnerHTML={{ __html: blocks.join("\n") }} />;
}