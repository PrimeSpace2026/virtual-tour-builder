import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/i18n";

const ForgotPassword = () => {
  const { lang, t } = useI18n();
  const T = (obj: { fr: string; en: string }) => obj[lang];
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.resetCode) {
        setResetToken(data.resetCode);
        toast({ title: lang === "fr" ? "Code généré" : "Code generated", description: lang === "fr" ? `Votre code de réinitialisation : ${data.resetCode}` : `Your reset code: ${data.resetCode}` });
        setStep("reset");
      } else {
        toast({ title: lang === "fr" ? "Erreur" : "Error", description: data.error || (lang === "fr" ? "Aucun compte trouvé" : "No account found"), variant: "destructive" });
      }
    } catch {
      toast({ title: lang === "fr" ? "Erreur" : "Error", description: lang === "fr" ? "Impossible de se connecter au serveur" : "Unable to connect to the server", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({ title: lang === "fr" ? "Erreur" : "Error", description: lang === "fr" ? "Les mots de passe ne correspondent pas" : "Passwords do not match", variant: "destructive" });
      return;
    }

    if (newPassword.length < 6) {
      toast({ title: lang === "fr" ? "Erreur" : "Error", description: lang === "fr" ? "Le mot de passe doit contenir au moins 6 caractères" : "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, password: newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        toast({ title: lang === "fr" ? "Succès" : "Success", description: lang === "fr" ? "Mot de passe réinitialisé avec succès !" : "Password reset successfully!" });
      } else {
        toast({ title: lang === "fr" ? "Erreur" : "Error", description: data.error || (lang === "fr" ? "Token invalide ou expiré" : "Invalid or expired token"), variant: "destructive" });
      }
    } catch {
      toast({ title: lang === "fr" ? "Erreur" : "Error", description: lang === "fr" ? "Impossible de se connecter au serveur" : "Unable to connect to the server", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-hero min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card rounded-2xl shadow-elevated p-5 md:p-8"
          >
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground mb-2">{T(t.auth.passwordResetSuccess)}</h1>
                <p className="text-muted-foreground mb-6">{T(t.auth.canNowLogin)}</p>
                <Link to="/login">
                  <Button className="w-full">{T(t.auth.signIn)}</Button>
                </Link>
              </div>
            ) : step === "email" ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-secondary" />
                  </div>
                  <h1 className="text-2xl font-display font-bold text-foreground">{T(t.auth.forgotPassword)}</h1>
                  <p className="text-muted-foreground mt-2">{T(t.auth.forgotSubtitle)}</p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">{T(t.auth.email)}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? T(t.auth.sending) : T(t.auth.sendCode)}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="text-sm text-secondary hover:underline">
                    {T(t.auth.backToLogin)}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-8 h-8 text-secondary" />
                  </div>
                  <h1 className="text-2xl font-display font-bold text-foreground">{T(t.auth.resetPassword)}</h1>
                  <p className="text-muted-foreground mt-2">{T(t.auth.resetSubtitle)}</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">{T(t.auth.resetCode)}</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                        placeholder={lang === "fr" ? "Collez le code ici" : "Paste the code here"}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{T(t.auth.newPassword)}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder={lang === "fr" ? "Minimum 6 caractères" : "Minimum 6 characters"}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">{T(t.auth.confirmPassword)}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? T(t.auth.resetting) : T(t.auth.reset)}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button onClick={() => setStep("email")} className="text-sm text-secondary hover:underline">
                    {T(t.auth.resendCode)}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
