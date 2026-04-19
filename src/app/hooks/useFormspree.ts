import { useState } from "react";

export type FormspreeStatus = "idle" | "submitting" | "success" | "error";

export type UseFormspreeResult = {
  status: FormspreeStatus;
  errorMessage: string | null;
  /** Soumet le formulaire à Formspree. Si `endpoint` est vide → lève une erreur côté UI. */
  submit: (data: Record<string, unknown>) => Promise<boolean>;
  /** Indique si l'endpoint Formspree est configuré (env var définie). */
  isConfigured: boolean;
  reset: () => void;
};

/**
 * Petit hook pour envoyer un `FormData`/objet JSON à Formspree (https://formspree.io).
 *
 * Utilisation :
 *   const { submit, status, isConfigured, errorMessage } = useFormspree(import.meta.env.VITE_FORMSPREE_FRANCHISE);
 *
 * L'UI doit prévoir un fallback (ex. `mailto:`) quand `isConfigured` est `false`.
 */
export function useFormspree(endpoint: string | undefined): UseFormspreeResult {
  const [status, setStatus] = useState<FormspreeStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isConfigured = Boolean(endpoint && endpoint.startsWith("https://formspree.io/"));

  async function submit(data: Record<string, unknown>): Promise<boolean> {
    if (!isConfigured) {
      setErrorMessage("Le formulaire n'est pas encore branché — utilise le lien mail en attendant.");
      setStatus("error");
      return false;
    }
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const res = await fetch(endpoint as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        return true;
      }
      const json = await res.json().catch(() => ({}));
      const msg =
        (Array.isArray(json?.errors) && json.errors[0]?.message) ||
        json?.error ||
        `Formspree a répondu ${res.status}`;
      setErrorMessage(msg);
      setStatus("error");
      return false;
    } catch (err) {
      setErrorMessage((err as Error).message || "Erreur réseau");
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setErrorMessage(null);
  }

  return { status, errorMessage, submit, isConfigured, reset };
}
