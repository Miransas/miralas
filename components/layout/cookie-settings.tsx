"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}