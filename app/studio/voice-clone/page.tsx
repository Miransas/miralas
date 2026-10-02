 

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  RefreshCw,
  Code,
  Plus,
  ChevronDown,
  X,
  Copy,
  Activity,
  Mic,
  Zap,
  Headphones,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Header } from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import VoiceCloningSection from "../../../components/studio/VoiceCloningSection";

export default function VoiceInterface() {
  const [activeTab, setActiveTab] = useState("Text-to-speech");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="min-h-screen bg-background text-foreground  font-sans ">   
     <VoiceCloningSection/>
    </div>
  );
}

// Reusable Badge Component for Examples
function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-transparent hover:bg-accent transition-colors">
      {icon}
      <span className="text-sm text-foreground">{text}</span>
    </button>
  );
}