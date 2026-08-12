"use client";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center text-foreground">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Error
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Something went wrong
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                We hit an unexpected issue while rendering this page.
            </p>
            <button
                type="button"
                onClick={() => reset()}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
            >
                Try again
            </button>
            {error.digest ? (
                <p className="mt-4 text-xs text-muted-foreground">Error ID: {error.digest}</p>
            ) : null}
        </main>
    );
}
