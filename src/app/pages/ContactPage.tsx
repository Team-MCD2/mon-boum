import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube, Clock, ChevronDown } from "lucide-react";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";

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
    a: "Oui ! Tous nos restaurants proposent la livraison via Uber Eats, Deliveroo et Just Eat. Vous pouvez également commander directement sur notre site pour le Click & Collect.",
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
    a: "Nous sommes en pleine expansion ! Remplissez le formulaire ci-dessous en sélectionnant 'Franchise & Partenariat'. Notre équipe développement vous contactera sous 48h.",
  },
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Mon Boum — Feedback, Franchise, Recrutement";
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16" style={{ backgroundColor: "var(--b-black)" }} aria-label="Contactez Mon Boum">
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
                    { href: "mailto:contact@monboum.fr", icon: Mail, label: "Email", value: "contact@monboum.fr", sub: null },
                    { href: "tel:+33123456789", icon: Phone, label: "Téléphone", value: "+33 1 23 45 67 89", sub: "Lun–Sam : 9h00–19h00" },
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
                      <address className="text-sm not-italic" style={{ color: "var(--b-white)" }}>12 Rue de la Paix<br />75003 Paris, France</address>
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
                      { icon: Instagram, href: "https://instagram.com/monboum", label: "Instagram", color: "#E1306C" },
                      { icon: Facebook, href: "https://facebook.com/monboum", label: "Facebook", color: "#1877F2" },
                      { icon: Youtube, href: "https://youtube.com/monboum", label: "YouTube", color: "#FF0000" },
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
                <h2 className="font-display mb-8" style={{ fontSize: "1.8rem", color: "var(--b-white)", letterSpacing: "0.04em" }}>ENVOYER UN MESSAGE</h2>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 font-display text-3xl text-white" style={{ backgroundColor: "var(--b-red)" }}>✓</div>
                    <h3 className="font-display text-white mb-2" style={{ fontSize: "2rem" }}>MESSAGE ENVOYÉ !</h3>
                    <p className="text-sm" style={{ color: "var(--b-muted)" }}>Notre équipe vous répondra sous 24h.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" aria-label="Formulaire de contact Mon Boum" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { id: "name", type: "text", label: "Nom complet *", placeholder: "Jean Dupont", key: "name" as const },
                        { id: "email", type: "email", label: "Email *", placeholder: "jean@email.fr", key: "email" as const },
                      ].map(({ id, type, label, placeholder, key }) => (
                        <div key={id}>
                          <label htmlFor={id} className="block text-xs uppercase tracking-widest mb-2" style={{ color: "var(--b-muted)", fontWeight: 600 }}>{label}</label>
                          <input id={id} type={type} required value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                            style={{ backgroundColor: "var(--b-card2)", color: "var(--b-white)", border: "1px solid var(--b-border)" }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--b-red)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--b-border)")}
                            aria-required="true"
                          />
                        </div>
                      ))}
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
                      <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 rounded-full text-sm uppercase tracking-widest btn-shine" style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }} aria-label="Envoyer le message">
                        <Send size={16} />Envoyer le message
                      </button>
                    </MagneticButton>
                    <p className="text-xs text-center" style={{ color: "var(--b-muted)" }}>En soumettant ce formulaire, vous acceptez notre <a href="/contact" style={{ color: "var(--b-yellow)", textDecoration: "underline" }}>politique de confidentialité</a>.</p>
                  </form>
                )}
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
              <a href="mailto:contact@monboum.fr" style={{ color: "var(--b-yellow)", fontWeight: 600 }} aria-label="Email Mon Boum">Contactez-nous directement</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}