"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { appPath } from "@/lib/paths";
import GoogleMark from "@/components/GoogleMark";
import PasswordInput from "@/components/PasswordInput";

type LoginFormProps = { locale: "en" | "es" };

const copy = {
  en: {
    title: "Welcome back",
    email: "Email",
    password: "Password",
    forgot: "Forgot your password?",
    invalidCredentials: "Invalid email or password.",
    signingIn: "Signing in…",
    signIn: "Sign in",
    google: "Continue with Google",
    newHere: "New here?",
    createAccount: "Create an account",
    backHome: "Back to home",
    landing: "Landing",
    api: "API docs",
    language: "ES",
    languageLabel: "Cambiar a español",
  },
  es: {
    title: "Bienvenida de nuevo",
    email: "Correo electrónico",
    password: "Contraseña",
    forgot: "¿Olvidaste tu contraseña?",
    invalidCredentials: "Correo electrónico o contraseña inválidos.",
    signingIn: "Iniciando sesión…",
    signIn: "Iniciar sesión",
    google: "Continuar con Google",
    newHere: "¿Aún no tienes cuenta?",
    createAccount: "Crear una cuenta",
    backHome: "Volver al inicio",
    landing: "Inicio",
    api: "Documentación API",
    language: "EN",
    languageLabel: "Switch to English",
  },
} as const;

export default function LoginForm({ locale }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const text = copy[locale];
  const localizedPath = (path: string) => appPath(path);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) setError(text.invalidCredentials);
    else router.push(appPath("/dashboard"));
  }

  async function googleLogin() {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: appPath("/dashboard") });
  }

  return (
    <main className="landing min-h-screen p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[28rem] flex-col">
        <header className="flex items-center justify-between border-b border-border py-4 font-mono text-body-sm">
          <a className="text-primary" href={appPath("/")}>
            [nullbreach]
          </a>
          <nav
            aria-label={
              locale === "es" ? "Navegación del login" : "Login navigation"
            }
          >
            <a
              className="rounded border border-border px-2 py-1 text-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              href={locale === "es" ? appPath("/login") : appPath("/en/login")}
              aria-label={text.languageLabel}
            >
              {text.language}
            </a>
          </nav>
        </header>
        <div className="flex flex-1 flex-col justify-center py-8">
          <form
            onSubmit={submit}
            className="w-full space-y-4 rounded-lg border border-border bg-surface/90 p-6 shadow-large"
          >
            <p className="font-mono text-body-sm text-primary">
              root@nullbreach:~$ auth login
            </p>
            <h1 className="font-mono text-h2">{text.title}</h1>
            <label className="block text-sm" htmlFor="login-email">
              {text.email}
              <input
                id="login-email"
                required
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1 w-full rounded border border-border bg-surface-alt p-2 text-foreground outline-none focus:border-primary"
              />
            </label>
            <PasswordInput
              required
              name="password"
              label={text.password}
              minLength={8}
              autoComplete="current-password"
            />
            <a
              className="block text-right text-body-sm text-primary"
              href={localizedPath("/forgot-password")}
            >
              {text.forgot}
            </a>
            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <button
              disabled={loading}
              className="primary-btn w-full justify-center p-2 disabled:opacity-50"
            >
              {loading ? text.signingIn : text.signIn}
            </button>
            <button
              type="button"
              disabled={loading || googleLoading}
              onClick={googleLogin}
              className="flex w-full items-center justify-center gap-sm rounded border border-border p-2 font-mono text-body-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <GoogleMark /> {text.google}
            </button>
            <p className="text-body-sm text-foreground-muted">
              {text.newHere}{" "}
              <a className="text-primary" href={localizedPath("/register")}>
                {text.createAccount}
              </a>
            </p>
          </form>
          <a
            className="mt-4 inline-flex w-full items-center justify-center rounded border border-border px-3 py-2 font-mono text-body-sm text-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
            href={appPath("/")}
          >
            {text.backHome}
          </a>
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border py-4 text-body-sm text-foreground-muted">
          <span>© 2026 NullBreach</span>
          <nav
            aria-label={
              locale === "es" ? "Enlaces secundarios" : "Secondary links"
            }
            className="flex gap-4"
          >
            <a
              className="hover:text-primary"
              href="https://github.com/wavival/nullbreach"
            >
              GitHub
            </a>
            <a className="hover:text-primary" href={appPath("/swagger")}>
              {text.api}
            </a>
            <a className="hover:text-primary" href={appPath("/")}>
              {text.landing}
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
