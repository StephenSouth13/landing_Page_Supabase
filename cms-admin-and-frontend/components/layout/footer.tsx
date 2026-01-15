"use client"

import type React from "react"

import Link from "next/link"
import type { Menu } from "@/types/cms"
import type { SiteConfig } from "@/types/cms"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

interface FooterProps {
  menu: Menu | null
  siteConfig: SiteConfig | null
  locale: string
}

const socialIcons: Record<string, React.ComponentType<{ className: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
}

export function Footer({ menu, siteConfig, locale }: FooterProps) {
  return (
    <footer className="bg-gradient-to-t from-card/50 to-background border-t border-border/40 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">{locale === "vi" ? "📍 Menu" : "📍 Menu"}</h3>
            <nav className="flex flex-col gap-3">
              {menu?.items?.map((item) => (
                <Link
                  key={item.id}
                  href={item.is_external ? item.url : `/${locale}${item.url}`}
                  target={item.is_external ? "_blank" : undefined}
                  rel={item.is_external ? "noopener noreferrer" : undefined}
                  className="text-foreground/60 hover:text-primary transition-all duration-200 text-sm font-medium hover:translate-x-1"
                >
                  {typeof item.label === "object" ? (item.label[locale] || item.label.en) : item.label}
                </Link>
              ))}
            </nav>
          </div>

          {siteConfig?.social_links && Object.keys(siteConfig.social_links).length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-6 text-foreground">{locale === "vi" ? "🔗 Theo dõi" : "🔗 Follow"}</h3>
              <div className="flex gap-4 flex-wrap">
                {Object.entries(siteConfig.social_links).map(([key, url]) => {
                  const Icon = socialIcons[key.toLowerCase()]
                  return (
                    <a
                      key={key}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-foreground/10 hover:bg-primary/20 text-foreground/70 hover:text-primary flex items-center justify-center transition-all duration-200 hover:scale-110"
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : <span className="text-xs font-bold capitalize">{key[0]}</span>}
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg mb-6 text-foreground">{locale === "vi" ? "ℹ️ Về chúng tôi" : "ℹ️ About"}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              {locale === "vi"
                ? "Hệ thống CMS mạnh mẽ giúp bạn quản lý nội dung dễ dàng hơn bao giờ hết."
                : "A powerful CMS system to manage content easily and efficiently."}
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-foreground/50 text-xs gap-4">
            <p>&copy; 2026 {locale === "vi" ? "Tất cả các quyền được bảo lưu." : "All rights reserved."}</p>
            <div className="flex gap-6">
              <Link href={`/${locale}`} className="hover:text-foreground transition-colors duration-200 font-medium">
                {locale === "vi" ? "Chính sách bảo mật" : "Privacy"}
              </Link>
              <Link href={`/${locale}`} className="hover:text-foreground transition-colors duration-200 font-medium">
                {locale === "vi" ? "Điều khoản" : "Terms"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
