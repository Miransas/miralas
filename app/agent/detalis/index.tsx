"use client";

import { BotCard } from "./bot-card";
import { BuildCard } from "./build-card";
import { ChatCard } from "./chat-card";
import { ImagineCard, MediaStackCard } from "./imagine-card";
import { SphereCard } from "./sphere-card";
import { VoiceCard } from "./voice-card";

export function BentoSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 pb-10 md:px-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ChatCard />
        <BuildCard />
        <BotCard />
      </div>
      <div className="mt-3 grid grid-cols-1 items-stretch gap-3 md:grid-cols-12 md:grid-rows-1">
        <div className="md:col-span-4">
          {/* <ImagineCard /> */}
        </div>
        <div className="md:col-span-3">
          {/* <MediaStackCard /> */}
        </div>
        <div className="md:col-span-2">
          <VoiceCard />
        </div>
        <div className="md:col-span-3">
          <SphereCard />
        </div>
      </div>
    </section>
  );
}
