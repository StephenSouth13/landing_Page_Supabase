import type { Metadata } from "next"
// SỬ DỤNG SERVER ACTIONS CHO TRANG CHỦ ĐỂ TỐI ƯU SEO
import { getPages, getSiteConfig, getMenuByLocation } from "@/lib/cms.server" 
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Link from "next/link"
import { ArrowRight, Layout, Zap, Globe } from "lucide-react"

interface PageProps {
  params: Promise<{ locale: string }>
}

// Tự động tạo Metadata dựa trên ngôn ngữ
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const { data: config } = await getSiteConfig()
  
  return {
    title: locale === "vi" ? `${config?.logo_alt || 'CMS'} - Trang chủ` : `${config?.logo_alt || 'CMS'} - Home`,
    description: locale === "vi" 
      ? "Hệ thống Landing Page tự động hóa mạnh mẽ." 
      : "Powerful automated Landing Page system.",
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  
  // Lấy dữ liệu trực tiếp từ Supabase tại Server
  const { data: pages } = await getPages()
  const { data: siteConfig } = await getSiteConfig()
  const { data: headerMenu } = await getMenuByLocation("header")
  const { data: footerMenu } = await getMenuByLocation("footer")

  return (
    <div suppressHydrationWarning className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header nhận dữ liệu động từ CMS */}
      <Header menu={headerMenu} siteConfig={siteConfig} locale={locale} />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {locale === "vi" ? "Kiến tạo Website" : "Build Your Website"}
              <span className="text-primary block">{locale === "vi" ? "Tự động & Thông minh" : "Automated & Smart"}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 duration-1000 delay-200">
              {locale === "vi" 
                ? "Giải pháp CMS mạnh mẽ giúp bạn quản lý nội dung đa ngôn ngữ chỉ trong một nốt nhạc." 
                : "A powerful CMS solution to manage multilingual content in a heartbeat."}
            </p>
            <div className="flex justify-center gap-4">
              <Link href={`/${locale}#pages`} className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                {locale === "vi" ? "Bắt đầu ngay" : "Get Started"}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES GRID - Minh họa tính năng Automation */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-background rounded-2xl border border-border shadow-sm">
              <Zap className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{locale === "vi" ? "Tốc độ cực nhanh" : "Lightning Fast"}</h3>
              <p className="text-muted-foreground">{locale === "vi" ? "Tối ưu Server-side Rendering." : "Optimized Server-side Rendering."}</p>
            </div>
            <div className="p-8 bg-background rounded-2xl border border-border shadow-sm">
              <Layout className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{locale === "vi" ? "Kéo thả linh hoạt" : "Flexible Layout"}</h3>
              <p className="text-muted-foreground">{locale === "vi" ? "Tùy biến Section dễ dàng." : "Easy Section customization."}</p>
            </div>
            <div className="p-8 bg-background rounded-2xl border border-border shadow-sm">
              <Globe className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{locale === "vi" ? "Đa ngôn ngữ" : "Multilingual"}</h3>
              <p className="text-muted-foreground">{locale === "vi" ? "Hỗ trợ chuẩn VN/EN." : "Native VN/EN support."}</p>
            </div>
          </div>
        </section>

        {/* DYNAMIC PAGES LIST - Danh sách các trang từ DB */}
        <section id="pages" className="py-20 container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">{locale === "vi" ? "Khám phá các trang" : "Explore Pages"}</h2>
              <p className="text-muted-foreground">{locale === "vi" ? "Danh sách được cập nhật từ CMS Admin" : "Live updates from CMS Admin"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages?.map((page) => (
              <Link key={page.id} href={`/${locale}/${page.slug}`} className="group block p-6 bg-card rounded-xl border border-border hover:border-primary transition-all hover:shadow-md">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {page.title[locale] || page.title.en}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Slug: /{page.slug}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  {locale === "vi" ? "Xem chi tiết" : "View Details"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer động */}
      <Footer menu={footerMenu} siteConfig={siteConfig} locale={locale} />
    </div>
  )
}