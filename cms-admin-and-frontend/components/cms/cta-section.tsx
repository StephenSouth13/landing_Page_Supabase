"use client"

interface CtaSectionProps {
  content: Record<string, any>
  locale: string
}

export function CtaSection({ content, locale }: CtaSectionProps) {
  const data = content[locale] || content.en

  return (
    <section className="relative w-full py-24 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary/80" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-balance mb-6 leading-tight">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-lg md:text-xl text-white/90 text-balance mb-10 leading-relaxed max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        )}
        {data.cta_text && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              {data.cta_text}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            {data.secondary_text && (
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300">
                {data.secondary_text}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
