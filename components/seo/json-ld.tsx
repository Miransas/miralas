type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue | undefined };

export interface JsonLdProps<T extends { "@context": string; "@type": string } & Record<string, JsonLdValue | undefined>> {
  data: T;
  id?: string;
}

/**
 * Type-safe JSON-LD script injector.
 * Escapes `<` to `\u003c` so serialized structured data can never break out of `<script>`.
 */
export function JsonLd<
  T extends { "@context": string; "@type": string } & Record<string, JsonLdValue | undefined>,
>({ data, id }: JsonLdProps<T>) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
