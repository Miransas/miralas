import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center text-foreground">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                404
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Page not found
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                The page you are looking for does not exist or may have moved.
            </p>
            <div className="mt-8 flex items-center gap-3">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                    Back to home
                </Link>
                <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                    Visit docs
                </Link>
            </div>
        </main>
    );
}
