export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      // Serialized by lib/seo from static content, never from user input.
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
