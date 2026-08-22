import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
    return (
        <main
            aria-labelledby="not-found-title"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center text-foreground"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%)]" />
            <div className="relative z-10 flex max-w-xl flex-col items-center">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Error 404
                </p>
                <h1 id="not-found-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                    The page you are looking for does not exist or may have moved.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
                    >
                        <ArrowLeft className="size-4" aria-hidden="true" />
                        Back to home
                    </Link>
                    <Link
                        href="/resources/docs"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium text-foreground transition hover:bg-muted"
                    >
                        <BookOpen className="size-4" aria-hidden="true" />
                        Visit docs
                    </Link>
                </div>
            </div>
        </main>
    );
}
