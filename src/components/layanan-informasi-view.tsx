"use client";

import { Mail, MapPin, Phone, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nl2Br } from "@/components/nl2br";
import type { FaqRow, SiteSettingsRow } from "@/lib/types";

interface LayananInformasiViewProps {
  settings: SiteSettingsRow | null;
  faqs: FaqRow[];
}

export function LayananInformasiView({ settings, faqs }: LayananInformasiViewProps) {
  return (
    <div className="py-12 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-muted/30 via-background/50 to-muted/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Layanan Informasi
            </h1>
            <p className="text-lg text-muted-foreground">
              Ada pertanyaan atau ingin tahu lebih lanjut tentang produk kami? Kami siap membantu Anda!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-muted-foreground">
                  Jangan ragu untuk menghubungi kami melalui berbagai channel yang tersedia. Tim kami siap melayani Anda.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
                    <p className="text-muted-foreground">
                      <Nl2Br text={settings?.contact_address} />
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telepon</h3>
                    <p className="text-muted-foreground">
                      <Nl2Br text={settings?.contact_phone} />
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      <Nl2Br text={settings?.contact_email} />
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-4 bg-white/50 dark:bg-card/50 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Jam Operasional</h3>
                    <p className="text-muted-foreground">
                      <Nl2Br text={settings?.contact_hours} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Kirim Pesan
              </h2>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  // Form ini belum terhubung ke backend (di luar cakupan
                  // permintaan awal). preventDefault mencegah reload halaman;
                  // sambungkan ke Route Handler / Server Action sendiri kalau
                  // dibutuhkan.
                  e.preventDefault();
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+62 812 3456 7890"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Pertanyaan tentang produk"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Lokasi Kami
            </h2>
            <p className="text-muted-foreground">
              Kunjungi toko fisik kami untuk melihat dan merasakan produk secara langsung
            </p>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-background border border-border">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 mx-auto text-primary" />
                <p className="text-sm">Peta interaktif akan ditampilkan di sini</p>
                <p className="text-xs">
                  <Nl2Br text={settings?.contact_address} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Pertanyaan Umum
              </h2>
              <p className="text-muted-foreground">
                Berikut adalah jawaban untuk pertanyaan yang sering diajukan
              </p>
            </div>
            {faqs.length === 0 ? (
              <div className="text-center py-10">
                <HelpCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Belum ada FAQ. Tambahkan lewat panel admin.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.id} className="bg-muted rounded-xl p-6 group">
                    <summary className="font-semibold text-foreground cursor-pointer list-none flex justify-between items-center gap-4">
                      <span>{faq.question}</span>
                      <span className="text-primary flex-shrink-0">+</span>
                    </summary>
                    <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
