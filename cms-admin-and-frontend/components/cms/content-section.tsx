"use client"

interface ContentSectionProps {
  content: Record<string, any>
  locale: string
}

export function ContentSection({ content, locale }: ContentSectionProps) {
  const data = content[locale] || content.en

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-background">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {data.title && (
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance leading-tight">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-lg text-foreground/60 text-balance">
                {data.subtitle}
              </p>
            )}
          </div>
        )}
        <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
          <style>{`
            .prose {
              --tw-prose-body: rgb(var(--foreground) / 0.8);
              --tw-prose-headings: rgb(var(--foreground));
              --tw-prose-links: rgb(var(--primary));
              --tw-prose-bold: rgb(var(--foreground));
              --tw-prose-counters: rgb(var(--primary));
            }
            .prose a {
              text-decoration: underline;
              text-decoration-color: rgba(var(--primary), 0.3);
              transition: all 0.2s;
            }
            .prose a:hover {
              text-decoration-color: rgba(var(--primary), 1);
            }
            .prose code {
              background-color: rgba(var(--primary), 0.1);
              padding: 0.2em 0.4em;
              border-radius: 0.25rem;
            }
            .prose pre {
              background-color: rgba(0, 0, 0, 0.05);
              border: 1px solid rgba(var(--border));
              border-radius: 0.5rem;
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </div>
      </div>
    </section>
  )
}
