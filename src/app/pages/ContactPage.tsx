import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube, Clock, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";
import { siteConfig } from "../config/siteConfig";
import { SeoHead } from "../components/SeoHead";
import { useFormspree } from "../hooks/useFormspree";

const subjects = [
  "Commande en ligne",
  "Réclamation",
  "Franchise & Partenariat",
  "Recrutement",
  "Presse & Médias",
  "Allergies & Régimes spéciaux",
  "Autre",
];

const faqs = [
  {
    q: "Livrez-vous à domicile ?",
    a: "Oui — en région toulousaine, la livraison passe surtout par Deliveroo (recherche Mon Boum / votre enseigne). Les commandes en ligne peuvent aussi transiter par rest-o-buro.fr selon les modalités des CGV officielles.",
  },
  {
    q: "Proposez-vous des options végétariennes ?",
    a: "Absolument. Notre BOUM Veggie avec galette de légumes maison est un régal. Retrouvez toutes nos options dans la section Menu.",
  },
  {
    q: "Comment gérez-vous les allergies alimentaires ?",
    a: "Nous prenons les allergies très au sérieux. Consultez nos fiches allergènes en restaurant ou contactez-nous avant votre commande. Notre équipe sera ravie de vous accompagner.",
  },
  {
    q: "Peut-on réserver une table ?",
    a: "Les places sont servies à la première arrivée. Pour les groupes de +10 personnes, contactez directement le restaurant concerné pour organiser votre venue.",
  },
  {
    q: "Comment ouvrir une franchise Mon Boum ?",
    a: "Consultez la page « Devenir franchisé » (/franchise) et écrivez à franchise@monboum.fr — ou utilisez le formulaire ci-dessous avec le sujet « Franchise & Partenariat » (ouverture du mail via votre messagerie).",
  },
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });

  const { submit, status, errorMessage, isConfigured } = useFormspree(
    import.meta.env.VITE_FORMSPREE_CONTACT
  );
  const loading = status === "submitting";
  const success = status === "success";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (isConfigured) {
      await submit({ ...formData, _subject: formData.subject || "Contact Mon Boum" });
      return;
    }
    // Fallback mailto
    const { generalEmail } = siteConfig.contact;
    const subject = formData.subject || "Contact Mon Boum";
    const body = `Nom : ${formData.name}\nEmail : ${formData.email}\nTéléphone : ${formData.phone}\n\n${formData.message}`;
    window.location.href = `mailto:${generalEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <SeoHead
        title="Contact — Mon Boum | Toulouse"
        description="Contactez Mon Boum : commande, réclamation, franchise, recrutement. Équipe basée à Toulouse — réponse par e-mail."
        keywords={`contact, Mon Boum, Toulouse, franchise, ${siteConfig.seo.defaultKeywords}`}
        ogImagePath="/favicon.png"
      />

      {/* Hero */}
      <section className="relative top-safe pb-16" style={{ backgroundColor: "var(--b-black)" }} aria-label="Contactez Mon Boum">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 80% 30%, var(--b-red), transparent 50%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>On est là pour vous</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display"
              style={{ fontSize: "clamp(4rem, 14vw, 11rem)", lineHeight: 0.85, color: "var(--b-white)", letterSpacing: "0.02em" }}
            >
              PARLONS<br /><span style={{ color: "var(--b-red)" }}>ENSEMBLE</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16" style={{ backgroundColor: "var(--b-black)" }} aria-label="Formulaire de contact Mon Boum">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="font-display mb-8" style={{ fontSize: "2rem", color: "var(--b-white)", letterSpacing: "0.04em" }}>NOS COORDONNÉES</h2>
                <div className="space-y-6 mb-10">
                  {[
                    { href: `mailto:${siteConfig.contact.generalEmail}`, icon: Mail, label: "Email", value: siteConfig.contact.generalEmail, sub: null },
                    { href: siteConfig.legal.phoneTel, icon: Phone, label: "Téléphone", value: siteConfig.legal.phoneDisplay, sub: "Siège — voir horaires par restaurant" },
                  ].map(({ href, icon: Icon, label, value, sub }) => (
                    <a key={label} href={href} className="flex items-start gap-4 group" aria-label={label}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110" style={{ backgroundColor: "rgba(229,37,10,0.12)", border: "1px solid rgba(229,37,10,0.25)" }}>
                        <Icon size={16} style={{ color: "var(--b-red)" }} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--b-muted)", fontWeight: 600 }}>{label}</div>
                        <div className="text-sm" style={{ color: "var(--b-white)" }}>{value}</div>
                        {sub && <div className="text-xs mt-0.5" style={{ color: "var(--b-muted)" }}>{sub}</div>}
                      </div>
                    </a>
                  ))}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(229,37,10,0.12)", border: "1px solid rgba(229,37,10,0.25)" }}>
                      <MapPin size={16} style={{ color: "var(--b-red)" }} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--b-muted)", fontWeight: 600 }}>Siège social</div>
                      <address className="text-sm not-italic" style={{ color: "var(--b-white)" }}>
                        {siteConfig.legal.street}
                        <br />
                        {siteConfig.legal.postalCode} {siteConfig.legal.city}, {siteConfig.legal.country}
                      </address>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(229,37,10,0.12)", border: "1px solid rgba(229,37,10,0.25)" }}>
                      <Clock size={16} style={{ color: "var(--b-red)" }} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--b-muted)", fontWeight: 600 }}>Service client</div>
                      <div className="text-sm" style={{ color: "var(--b-white)" }}>Lun – Ven : 9h – 18h<br />Sam : 10h – 15h</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "var(--b-muted)", fontWeight: 600 }}>Réseaux sociaux</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram", color: "#E1306C" },
                      { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook", color: "#1877F2" },
                      { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube", color: "#FF0000" },
                    ].map(({ icon: Icon, href, label, color }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Mon Boum sur ${label}`}
                        className="w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
                        style={{ borderColor: "var(--b-border)", color: "var(--b-muted)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = color; (e.currentTarget as HTMLAnchorElement).style.borderColor = color; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--b-border)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--b-muted)"; }}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right form */}
            <div className="lg:col-span-3">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="p-8 rounded-3xl" style={{ backgroundColor: "var(--b-card)" }}>
                <h2 className="font-display mb-4" style={{ fontSize: "1.8rem", color: "var(--b-white)", letterSpacing: "0.04em" }}>ENVOYER UN MESSAGE</h2>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: "var(--b-muted)" }}>
                  {isConfigured
                    ? "Message envoyé directement à l'équipe Mon Boum — réponse par email sous 48h."
                    : "Le formulaire ouvre votre client mail avec le message prérempli. Aucune donnée n'est stockée ici."}
                </p>
                {success && (
                  <div className="rounded-xl border px-4 py-3 mb-4 flex items-start gap-2 text-sm" style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card2)", color: "var(--b-white)" }}>
                    <CheckCircle2 size={16} style={{ color: "#22c55e" }} className="shrink-0 mt-0.5" />
                    <span>Message reçu — merci {formData.name || "!"}. On revient vers vous à <b>{formData.email}</b>.</span>
                  </div>
                )}
                {status === "error" && errorMessage && (
                  <div className="rounded-xl border px-4 py-3 mb-4 flex items-start gap-2 text-sm" style={{ borderColor: "#f87171", backgroundColor: "rgba(248,113,113,0.08)", color: "#f87171" }}>
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulaire de contact Mon Boum" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: "name", type: "text", label: "Nom complet *", placeholder: "Jean Dupont", key: "name" as const, req: true },
                      { id: "email", type: "email", label: "Email *", placeholder: "jean@email.fr", key: "email" as const, req: true },
                    ].map(({ id, type, label, placeholder, key, req }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--b-muted)", fontWeight: 600 }}>{label}</label>
                        <input id={id} type={type} required={req} value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} placeholder={placeholder}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)", border: "1px solid var(--b-border)" }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--b-red)")}
                          onBlur={(e) => (e.target.style.borderColor = "var(--b-border)")}
                          aria-required={req}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--b-muted)", fontWeight: 600 }}>Téléphone</label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="06 …"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)", border: "1px solid var(--b-border)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--b-red)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--b-border)")}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--b-muted)", fontWeight: 600 }}>Sujet *</label>
                    <select id="subject" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none"
                      style={{ backgroundColor: "var(--b-card2)", color: formData.subject ? "var(--b-white)" : "var(--b-muted)", border: "1px solid var(--b-border)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--b-red)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--b-border)")}
                      aria-required="true"
                    >
                      <option value="" disabled>Choisir un sujet...</option>
                      {subjects.map((s) => <option key={s} value={s} style={{ backgroundColor: "var(--b-card)", color: "white" }}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--b-muted)", fontWeight: 600 }}>Message *</label>
                    <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Décrivez votre demande..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                      style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)", border: "1px solid var(--b-border)" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--b-red)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--b-border)")}
                      aria-required="true"
                    />
                  </div>
                  <MagneticButton>
                    <button type="submit" disabled={loading || success} className="w-full flex items-center justify-center gap-3 py-4 rounded-full text-sm uppercase tracking-widest btn-shine disabled:opacity-60" style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }} aria-label="Envoyer le message">
                      <Send size={16} />{loading ? "Envoi…" : success ? "Envoyé" : "Envoyer le message"}
                    </button>
                  </MagneticButton>
                  <p className="text-xs text-center" style={{ color: "var(--b-muted)" }}>
                    Données traitées via votre messagerie — voir aussi la{" "}
                    <a href="https://monboum.fr/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--b-yellow)", textDecoration: "underline" }}>
                      politique de confidentialité
                    </a>{" "}
                    (site officiel).
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: "var(--b-dark)" }} aria-label="Questions fréquentes Mon Boum" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-red)", fontWeight: 700 }}>Questions fréquentes</span>
              <div className="w-8 h-px" style={{ backgroundColor: "var(--b-red)" }} />
            </div>
            <SplitText text="ON RÉPOND À TOUT" as="h2" className="font-display" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--b-white)", letterSpacing: "0.02em", justifyContent: "center" }} mode="words" />
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--b-card)" }} itemScope itemType="https://schema.org/Question">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors" style={{ color: "var(--b-white)" }} aria-expanded={openFaq === i} aria-controls={`faq-answer-${i}`}>
                  <span className="text-sm font-semibold pr-4" itemProp="name">{faq.q}</span>
                  <ChevronDown size={18} className="flex-shrink-0 transition-transform duration-300" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", color: "var(--b-red)" }} />
                </button>
                {openFaq === i && (
                  <motion.div id={`faq-answer-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-6 pb-5" itemScope itemType="https://schema.org/Answer">
                    <p className="text-sm leading-relaxed" style={{ color: "var(--b-muted)" }} itemProp="text">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm" style={{ color: "var(--b-muted)" }}>
              Pas trouvé votre réponse ?{" "}
              <a href={`mailto:${siteConfig.contact.generalEmail}`} style={{ color: "var(--b-yellow)", fontWeight: 600 }} aria-label="Email Mon Boum">
                Contactez-nous directement
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}