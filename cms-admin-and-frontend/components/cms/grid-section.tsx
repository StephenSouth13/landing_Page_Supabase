"use client"

import type { GridLayoutConfig } from "@/types/cms"

interface GridSectionProps {
  content: Record<string, any>
  layoutConfig: GridLayoutConfig
  locale: string
}

export function GridSection({ content, layoutConfig, locale }: GridSectionProps) {
  const data = content[locale] || content.en
  const { columns } = layoutConfig
  const items = data.items || []

  const gridColsClass =
    {
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
    }[columns] || "grid-cols-1 md:grid-cols-3"

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {data.title && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-4 leading-tight">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`grid ${gridColsClass} gap-8`}>
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="group animate-fade-in-up overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {item.image && (
                <div className="relative overflow-hidden h-48 bg-foreground/5">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {item.description}
                </p>
                {item.link && (
                  <div className="flex items-center gap-2 text-primary mt-6 font-semibold group-hover:translate-x-2 transition-transform duration-200">
                    {item.link_text || "Learn more"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
