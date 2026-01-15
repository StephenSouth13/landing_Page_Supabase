"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqSectionProps {
  content: Record<string, any>
  locale: string
}

export function FaqSection({ content, locale }: FaqSectionProps) {
  const data = content[locale] || content.en
  const items = data.items || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full py-24 px-6 md:px-12 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto">
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
        <div className="space-y-4">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-foreground/5 transition-colors duration-200 group"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors duration-200">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-foreground/70 border-t border-border/50 animate-fade-in leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
