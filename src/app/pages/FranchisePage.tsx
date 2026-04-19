import { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Handshake,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SplitText } from "../components/SplitText";
import { MagneticButton } from "../components/MagneticButton";
import { SeoHead } from "../components/SeoHead";
import { siteConfig } from "../config/siteConfig";
import { useFormspree } from "../hooks/useFormspree";
import { easeOutExpo } from "../lib/motionPresets";

/** Chiffres officiels extraits de https://monboum.fr/mon-boum-cest-quoi/ */
const franchiseFacts = [
  { label: "Droit d'entrée", value: "25 000 € HT", note: "Hors pas de porte" },
  { label: "Formation initiale", value: "15 000 € HT", note: "Équipe + manager" },
  { label: "Redevance franchise", value: "5 %", note: "Du CA HT" },
  { label: "Redevance communication", value: "2 %", note: "Du CA HT" },
  { label: "Durée du contrat", value: "5 ans", note: "Renouvelable" },
  { label: "Restaurants actifs", value: "8", note: "Toulouse & métropole" },
];

const processSteps = [
  {
    n: "01",
    title: "Candidature",
    desc: "Remplissez le formulaire ci-dessous ou envoyez votre dossier par email. Réponse sous 15 jours ouvrés.",
  },
  {
    n: "02",
    title: "Validation & rencontre",
    desc: "Nous vous rappelons pour valider votre profil, vos moyens et votre zone. Rencontre à Toulouse.",
  },
  {
    n: "03",
    title: "Lancement projet",
    desc: "Accompagnement complet : suivi de chantier, matériel, lancement, formation personnel, centrale d'achat.",
  },
];

const pitchPillars = [
  {
    icon: TrendingUp,
    title: "Un concept qui marche",
    desc: "Chiffre d'affaires de 500 000 € à 1 500 000 € en N+2 selon l'emplacement. Modèle éprouvé depuis 2004.",
  },
  {
    icon: ShieldCheck,
    title: "Force de marque",
    desc: "1er drive fast-food halal de France (Boum Burger). Visibilité confirmée par Ninho, Dadju, Vegedream, Marwa Loud…",
  },
  {
    icon: Handshake,
    title: "Accompagnement complet",
    desc: "Architecte, matériel, lancement, formation personnel, centrale d'achat, communication locale — on s'occupe de tout.",
  },
];

function FranchiseForm() {
  const endpoint = import.meta.env.VITE_FORMSPREE_FRANCHISE;
  const { submit, status, errorMessage, isConfigured } = useFormspree(endpoint);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    budget: "",
    message: "",
  });

  const loading = status === "submitting";
  const success = status === "success";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    await submit({ ...form, _subject: "Candidature Franchise Mon Boum" });
  }

  if (success) {
    return (
      <div
        className="rounded-2xl border p-8 flex items-start gap-4"
        style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card)" }}
      >
        <CheckCircle2 size={28} style={{ color: "#22c55e" }} className="shrink-0 mt-1" />
        <div>
          <h3 className="font-display text-2xl mb-2" style={{ color: "var(--b-white)" }}>Dossier reçu.</h3>
          <p className="text-sm" style={{ color: "var(--b-muted)" }}>
            Merci {form.name || "!"} — on vous recontacte sous 15 jours ouvrés à{" "}
            <span style={{ color: "var(--b-white)" }}>{form.email}</span>. Pour les urgences, écrivez à{" "}
            <a className="link-inline" href={`mailto:${siteConfig.contact.franchiseEmail}`}>
              {siteConfig.contact.franchiseEmail}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--b-red)] text-[var(--b-white)] placeholder:text-[var(--b-muted)]";
  const fieldStyle = { borderColor: "var(--b-border)", backgroundColor: "var(--b-card)" };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isConfigured && (
        <div
          className="rounded-xl border px-4 py-3 text-xs flex items-start gap-2"
          style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card)", color: "var(--b-muted)" }}
        >
          <AlertCircle size={14} className="shrink-0 mt-0.5" style={{ color: "var(--b-yellow)" }} />
          <span>
            Formulaire en mode <b>mailto</b> (Formspree non branché). Définis{" "}
            <code style={{ color: "var(--b-white)" }}>VITE_FORMSPREE_FRANCHISE</code> dans <code>.env</code> pour activer
            l'envoi direct.
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          name="name"
          autoComplete="name"
          placeholder="Nom et prénom *"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          className={field}
          style={fieldStyle}
        />
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          className={field}
          style={fieldStyle}
        />
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          className={field}
          style={fieldStyle}
        />
        <input
          name="city"
          placeholder="Ville ciblée (Toulouse, Bordeaux…)"
          value={form.city}
          onChange={(e) => setForm((s) => ({ ...s, city: e.target.value }))}
          className={field}
          style={fieldStyle}
        />
      </div>
      <select
        name="budget"
        value={form.budget}
        onChange={(e) => setForm((s) => ({ ...s, budget: e.target.value }))}
        className={field}
        style={fieldStyle}
      >
        <option value="">Budget d'investissement (optionnel)</option>
        <option value="<250k">Moins de 250 000 €</option>
        <option value="250k-500k">250 000 – 500 000 €</option>
        <option value="500k-1M">500 000 € – 1 M€</option>
        <option value=">1M">Plus de 1 M€</option>
      </select>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Parlez-nous de votre projet : local en vue, expérience, zone, timing…"
        value={form.message}
        onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
        className={field}
        style={fieldStyle}
      />
      {errorMessage && (
        <p className="text-sm flex items-center gap-2" style={{ color: "#f87171" }}>
          <AlertCircle size={14} /> {errorMessage}
        </p>
      )}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <MagneticButton>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm uppercase tracking-widest btn-shine transition-all disabled:opacity-60"
            style={{ backgroundColor: "var(--b-red)", color: "white", fontWeight: 700 }}
          >
            <Send size={15} />
            {loading ? "Envoi…" : "Envoyer ma candidature"}
          </button>
        </MagneticButton>
        <a
          href={`mailto:${siteConfig.contact.franchiseEmail}?subject=${encodeURIComponent("Candidature Franchise Mon Boum")}&body=${encodeURIComponent(
            `Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone}\nVille : ${form.city}\nBudget : ${form.budget}\n\n${form.message}`
          )}`}
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm uppercase tracking-widest border transition-colors hover:border-[var(--b-red)]"
          style={{ borderColor: "var(--b-border)", color: "var(--b-white)" }}
        >
          Ou envoyer par mail
        </a>
      </div>
    </form>
  );
}

export function FranchisePage() {
  return (
    <>
      <SeoHead
        title="Devenir franchisé Mon Boum — Street-food halal depuis 2004"
        description="Rejoignez le 1er réseau street-food halal de la métropole toulousaine. 8 restaurants, CA 500 K€–1,5 M€. Droit d'entrée 25 K€ HT."
        keywords={`franchise, devenir franchisé Mon Boum, ${siteConfig.seo.defaultKeywords}`}
      />

      <main className="top-safe pb-20" style={{ backgroundColor: "var(--b-black)" }}>
        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-10 pb-20">
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 15% 35%, var(--b-red), transparent 50%), radial-gradient(circle at 85% 65%, var(--b-yellow), transparent 55%)",
            }}
            aria-hidden
          />

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-12 h-px" style={{ backgroundColor: "var(--b-yellow)" }} />
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: "var(--b-yellow)", fontWeight: 700 }}>
                Réseau & Développement
              </span>
              <div className="w-12 h-px" style={{ backgroundColor: "var(--b-yellow)" }} />
            </motion.div>

            <SplitText
              text="DEVENIR FRANCHISÉ"
              as="h1"
              className="font-display mb-6"
              style={{
                fontSize: "clamp(3rem, 10vw, 7rem)",
                color: "var(--b-white)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
                justifyContent: "center",
              }}
              mode="words"
            />

            <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10" style={{ color: "var(--text-soft-75)" }}>
              Rejoignez le <b style={{ color: "var(--b-white)" }}>1er réseau street-food halal</b> de la métropole toulousaine.
              Boum Burger est le 1er drive fast-food halal de France —{" "}
              <span style={{ color: "var(--b-white)" }}>depuis 2004</span>.
            </p>

            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border"
              style={{ borderColor: "var(--b-border)", backgroundColor: "var(--b-card)", color: "var(--b-muted)" }}
            >
              <Award size={16} style={{ color: "var(--b-yellow)" }} />
              <span className="text-xs uppercase tracking-widest">
                CA N+2 : <b style={{ color: "var(--b-white)" }}>500 K€ – 1,5 M€</b>
              </span>
            </div>
          </div>
        </section>

        {/* ── 3 PIGS ─────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pitchPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: easeOutExpo }}
                  className="rounded-2xl p-7 border card-lift flex flex-col"
                  style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "rgba(245,197,24,0.15)", color: "var(--b-yellow)" }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-2xl mb-3" style={{ color: "var(--b-white)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--b-muted)" }}>{p.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ── CHIFFRES CLÉS ──────────────────────────────── */}
        <section
          className="py-16 border-y"
          style={{ backgroundColor: "var(--b-dark)", borderColor: "var(--b-border)" }}
          aria-label="Chiffres clés franchise Mon Boum"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "var(--b-red)", fontWeight: 700 }}>
                En quelques chiffres
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--b-white)" }}>
                Les conditions
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {franchiseFacts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: easeOutExpo }}
                  className="rounded-2xl p-5 sm:p-6 border"
                  style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] mb-2" style={{ color: "var(--b-yellow)", fontWeight: 700 }}>
                    {f.label}
                  </p>
                  <p className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)", lineHeight: 1, color: "var(--b-white)" }}>
                    {f.value}
                  </p>
                  <p className="text-xs mt-2" style={{ color: "var(--b-muted)" }}>{f.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESSUS 3 ÉTAPES ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "var(--b-yellow)", fontWeight: 700 }}>
              Comment devenir franchisé
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--b-white)" }}>
              Trois étapes, un projet.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processSteps.map((s, i) => (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: easeOutExpo }}
                className="rounded-2xl p-7 border relative overflow-hidden"
                style={{ backgroundColor: "var(--b-card)", borderColor: "var(--b-border)" }}
              >
                <span
                  className="absolute -top-4 -right-3 font-display opacity-[0.08] pointer-events-none"
                  style={{ fontSize: "9rem", color: "var(--b-white)", lineHeight: 1 }}
                  aria-hidden
                >
                  {s.n}
                </span>
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.2em] mb-3" style={{ color: "var(--b-red)", fontWeight: 700 }}>
                    Étape {s.n}
                  </p>
                  <h3 className="font-display text-2xl mb-3" style={{ color: "var(--b-white)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--b-muted)" }}>{s.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── FORMULAIRE CANDIDATURE ─────────────────────── */}
        <section id="formulaire-candidature" className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 pb-20 pt-10 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            className="rounded-3xl p-7 sm:p-10 border"
            style={{
              borderColor: "var(--b-border)",
              background:
                "linear-gradient(135deg, rgba(229,37,10,0.10) 0%, rgba(6,6,6,0) 70%)",
            }}
          >
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: "var(--b-red)", fontWeight: 700 }}>
                Formulaire de candidature
              </p>
              <h2 className="font-display mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "var(--b-white)" }}>
                Parlez-nous de votre projet
              </h2>
              <p className="text-sm max-w-xl" style={{ color: "var(--b-muted)" }}>
                Dossier confidentiel. Réponse sous 15 jours ouvrés. Aussi par email à{" "}
                <a
                  className="link-inline"
                  href={`mailto:${siteConfig.contact.franchiseEmail}`}
                >
                  {siteConfig.contact.franchiseEmail}
                </a>
                .
              </p>
            </div>

            <FranchiseForm />
          </motion.div>
        </section>
      </main>
    </>
  );
}
