import Link from "next/link";
import Image from "next/image";
import { appPath } from "@/lib/paths";

type Lang = "es" | "en";
const copy = {
  es: {
    features: "caracteristicas",
    how: "como-funciona",
    home: "inicio",
    signIn: "iniciar sesión",
    seeFeatures: "ver características",
    tagline: "Asistente de ciberseguridad con IA",
    hero: "Encuentra y entiende vulnerabilidades antes que los atacantes.",
    intro:
      "NullBreach combina chat con IA y análisis estático de código para razonar sobre OWASP, modelado de amenazas y endurecimiento, en lenguaje claro.",
    toolsTitle: "Seguridad ofensiva y defensiva, en un solo lugar",
    toolsBody: "Tres herramientas para desarrolladores y equipos de seguridad.",
    howTitle: "De la duda al hallazgo en tres pasos",
    ready: "¿Listo para fortalecer tu código?",
    readyBody: "Inicia sesión y empieza tu primer análisis en minutos.",
    product: "Producto",
    resources: "Recursos",
    repository: "Repositorio",
    author: "Autora",
    allRights: "Todos los derechos reservados.",
    language: "idioma",
    project: "proyecto",
    scanning: "escaneando…",
    history: "historial",
    tools: "herramientas",
  },
  en: {
    features: "features",
    how: "how-it-works",
    home: "top",
    signIn: "sign in",
    seeFeatures: "see features",
    tagline: "AI-powered cybersecurity assistant",
    hero: "Find and understand vulnerabilities before attackers do.",
    intro:
      "NullBreach pairs an AI chat with static code analysis to reason about OWASP, threat modeling, and hardening, in plain language.",
    toolsTitle: "Offensive and defensive security, in one place",
    toolsBody: "Three tools built for developers and security teams.",
    howTitle: "From question to finding in three steps",
    ready: "Ready to harden your code?",
    readyBody: "Sign in and run your first analysis in minutes.",
    product: "Product",
    resources: "Resources",
    repository: "Repository",
    author: "Author",
    allRights: "All rights reserved.",
    language: "language",
    project: "project",
    scanning: "scanning…",
    history: "history",
    tools: "tools",
  },
} as const;
const features = [
  [
    "chat",
    "message-square",
    "Chat de ciberseguridad",
    "Cybersecurity chat",
    "Conversa sobre vulnerabilidades, vectores de ataque y mitigaciones. Respuestas con contexto y referencias accionables.",
    "Talk through vulnerabilities, attack vectors, and mitigations. Context-rich answers with actionable references.",
  ],
  [
    "analyze",
    "scan-line",
    "Analizador de código",
    "Code analyzer",
    "Pega tu código fuente y recibe un análisis estático con hallazgos clasificados por severidad.",
    "Paste your source code and get static analysis with findings ranked by severity.",
  ],
  [
    "owasp",
    "bug",
    "OWASP y modelado de amenazas",
    "OWASP & threat modeling",
    "Mapea riesgos al Top 10 de OWASP y razona sobre superficies de ataque y trust boundaries.",
    "Map risks to the OWASP Top 10 and reason about attack surfaces and trust boundaries.",
  ],
] as const;
const steps = [
  [
    "auth login",
    "lock",
    "Crea tu cuenta",
    "Create your account",
    "Regístrate e inicia sesión con autenticación segura basada en JWT.",
    "Register and sign in with secure JWT-based authentication.",
  ],
  [
    "scan ./src",
    "terminal",
    "Pregunta o analiza",
    "Ask or analyze",
    "Abre un chat o envía código al analizador para obtener un diagnóstico.",
    "Open a chat or send code to the analyzer for a diagnosis.",
  ],
  [
    "patch --apply",
    "zap",
    "Actúa sobre los hallazgos",
    "Act on findings",
    "Prioriza por severidad y aplica las mitigaciones sugeridas.",
    "Prioritize by severity and apply the suggested mitigations.",
  ],
] as const;
const iconPaths: Record<string, string> = {
  "shield-half":
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 22V2"/>',
  "message-square":
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  "scan-line":
    '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
  bug: '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6 13H2"/><path d="M22 13h-4"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  github:
    '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  instagram:
    '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  menu: '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
  sparkles:
    '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z/>',
};
function Icon({
  name,
  className = "size-5",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  );
}
function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-xs border-b border-border bg-surface-alt/60 px-md py-sm">
      <i aria-hidden="true" className="dot bg-severity-critical/80" />
      <i aria-hidden="true" className="dot bg-severity-high/80" />
      <i aria-hidden="true" className="dot bg-severity-low/80" />
      <span className="ml-sm font-mono text-body-sm text-foreground-muted">
        {label}
      </span>
    </div>
  );
}
function LangToggle({ lang }: { lang: Lang }) {
  return (
    <div
      className="flex items-center rounded border border-border bg-surface-alt/60 p-[2px]"
      role="group"
      aria-label="Language / Idioma"
    >
      <Icon
        name="globe"
        className="mx-1 hidden size-3.5 text-foreground-muted sm:block"
      />
      <Link
        className={`lang-link ${lang === "es" ? "lang-active" : ""}`}
        href={appPath("/")}
        hrefLang="es"
      >
        es
      </Link>
      <Link
        className={`lang-link ${lang === "en" ? "lang-active" : ""}`}
        href={appPath("/en")}
        hrefLang="en"
      >
        en
      </Link>
    </div>
  );
}
export default function LandingPage() {
  return <Landing lang="es" />;
}
export function Landing({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const login = appPath("/login");
  return (
    <div lang={lang} className="landing">
      <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-border bg-surface/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-md px-md md:h-navbar md:px-lg">
          <Link
            href={`#${t.home}`}
            className="flex items-center gap-sm font-mono text-h4 text-foreground"
          >
            <Icon name="shield-half" className="size-5 text-primary" />
            <span>
              <b className="text-primary">[</b>nullbreach
              <b className="text-primary">]</b>
            </span>
          </Link>
          <nav
            aria-label={
              lang === "es" ? "Navegación principal" : "Main navigation"
            }
            className="hidden items-center gap-lg font-mono text-body text-foreground-muted md:flex"
          >
            <a href={`#${t.features}`}>~/{t.features}</a>
            <a href={`#${t.how}`}>~/{t.how}</a>
            <a
              href="https://github.com/wavival/nullbreach"
              target="_blank"
              rel="noreferrer"
            >
              ~/{t.project}
            </a>
          </nav>
          <div className="flex items-center gap-sm">
            <div className="hidden md:block">
              <LangToggle lang={lang} />
            </div>
            <Link
              className="primary-btn hidden h-9 px-lg text-body md:inline-flex"
              href={login}
              target="_blank"
              rel="noreferrer"
            >
              {t.signIn}
              <Icon name="arrow-right" className="size-4" />
            </Link>
            <details className="nav-menu relative md:hidden">
              <summary
                aria-label={lang === "es" ? "Abrir menú" : "Open menu"}
                className="flex size-9 cursor-pointer list-none items-center justify-center rounded border border-border text-foreground-muted"
              >
                <Icon name="menu" className="size-5" />
              </summary>
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 flex w-60 flex-col gap-xs rounded border border-border bg-surface p-sm font-mono text-body shadow-large">
                <a href={`#${t.features}`}>~/{t.features}</a>
                <a href={`#${t.how}`}>~/{t.how}</a>
                <a
                  href="https://github.com/wavival/nullbreach"
                  target="_blank"
                  rel="noreferrer"
                >
                  ~/{t.project}
                </a>
                <hr />
                <div className="flex items-center justify-between px-sm py-xs">
                  <span className="text-body-sm uppercase text-neutral">
                    {t.language}
                  </span>
                  <LangToggle lang={lang} />
                </div>
                <Link
                  href={login}
                  target="_blank"
                  rel="noreferrer"
                  className="primary-btn justify-center"
                >
                  {t.signIn}
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            </details>
          </div>
        </div>
      </header>
      <main id="main" className="pt-14 md:pt-navbar">
        <section
          id={t.home}
          className="scanlines relative overflow-hidden border-b border-border"
        >
          <div className="pointer-events-none absolute -right-40 -top-48 size-[560px] rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto max-w-[1100px] px-md py-3xl md:px-lg lg:py-4xl">
            <div className="window-interactive overflow-hidden rounded-lg border border-border bg-surface/70 shadow-large backdrop-blur-sm">
              <WindowBar label="nullbreach / scan" />
              <div className="grid gap-xl p-lg md:grid-cols-[1.15fr_1fr] md:gap-2xl md:p-xl lg:p-2xl">
                <div className="flex flex-col gap-lg">
                  <p className="font-mono text-body-sm text-foreground-muted">
                    <span className="text-primary">root@nullbreach</span>:
                    <span className="text-secondary">~</span>$ scan --target{" "}
                    <span className="text-foreground">./src</span>
                  </p>
                  <span className="inline-flex items-center gap-sm self-start rounded-full border border-primary/30 bg-primary/10 px-md py-xs font-mono text-body-sm text-primary">
                    <Icon name="sparkles" className="size-3.5" />
                    {t.tagline}
                  </span>
                  <h1 className="font-mono text-[30px] font-semibold leading-[1.15] tracking-[-0.5px] text-foreground sm:text-[38px] lg:text-[44px]">
                    <span className="text-primary">&gt;</span>{" "}
                    <span className="caret">{t.hero}</span>
                  </h1>
                  <p className="max-w-[560px] border-l-2 border-border pl-md font-mono text-body text-foreground-muted">
                    <span className="text-neutral"># </span>
                    {t.intro}
                  </p>
                  <div className="mt-xs flex flex-wrap items-center gap-md">
                    <Link
                      href={login}
                      target="_blank"
                      rel="noreferrer"
                      className="primary-btn h-12 px-xl text-body"
                    >
                      {t.signIn}
                      <Icon name="arrow-right" className="size-4" />
                    </Link>
                    <a
                      href={`#${t.features}`}
                      className="ghost-btn h-12 px-xl text-body"
                    >
                      {t.seeFeatures}
                      <Icon name="arrow-right" className="size-4" />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-md rounded border border-border bg-surface-alt/40 p-md font-mono text-body-sm">
                  <div className="flex items-center justify-between text-foreground-muted">
                    <span className="text-primary">findings.log</span>
                    <span>
                      <i
                        aria-hidden="true"
                        className="mr-xs inline-block size-1.5 animate-pulse rounded-full bg-primary"
                      />
                      live
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-md gap-y-xs">
                    <span className="text-severity-critical">● CRIT 3</span>
                    <span className="text-severity-high">● HIGH 7</span>
                    <span className="text-severity-medium">● MED 12</span>
                    <span className="text-severity-low">● LOW 21</span>
                  </div>
                  <ul className="flex flex-col gap-xs text-foreground-muted">
                    <li>
                      <span className="text-severity-critical">●</span>{" "}
                      <b className="text-foreground">SQL injection</b>
                      <small className="float-right text-neutral">
                        api/users.ts:42
                      </small>
                    </li>
                    <li>
                      <span className="text-severity-high">●</span>{" "}
                      <b className="text-foreground">XSS</b>
                      <small className="float-right text-neutral">
                        render.tsx:88
                      </small>
                    </li>
                    <li>
                      <span className="text-severity-medium">●</span>{" "}
                      <b className="text-foreground">weak JWT alg</b>
                      <small className="float-right text-neutral">
                        auth.ts:13
                      </small>
                    </li>
                  </ul>
                  <div className="mt-auto pt-sm">
                    <div className="scan-track h-1.5 overflow-hidden rounded-full bg-border">
                      <div className="scan-bar h-full w-[72%] rounded-full bg-primary" />
                    </div>
                    <span className="text-neutral">
                      ▒▒▒▒▒▒▒▒▒▒ {t.scanning} 72%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id={t.features}
          className="mx-auto max-w-[1100px] scroll-mt-navbar px-md py-3xl md:px-lg lg:py-4xl"
        >
          <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:auto-rows-min lg:grid-cols-6 lg:gap-lg">
            <div className="flex flex-col gap-sm rounded-lg border border-border bg-surface-alt/40 p-lg sm:col-span-2 lg:col-span-6">
              <span className="font-mono text-label uppercase text-primary">
                $ ls ./{t.tools}
              </span>
              <h2 className="font-mono text-h2 text-foreground">
                {t.toolsTitle}
              </h2>
              <p className="max-w-[680px] font-mono text-body-lg text-foreground-muted">
                <span className="text-neutral"># </span>
                {t.toolsBody}
              </p>
            </div>
            {features.map((f) => (
              <article
                key={f[0]}
                className="card-interactive flex flex-col gap-md rounded-lg border border-border bg-surface-alt/40 lg:col-span-2"
              >
                <WindowBar label={`nullbreach ${f[0]}`} />
                <div className="flex flex-col gap-md p-lg">
                  <span className="inline-flex size-10 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                    <Icon name={f[1]} />
                  </span>
                  <h3 className="font-mono text-h4 text-foreground">
                    <span className="text-primary">&gt;</span>{" "}
                    {lang === "es" ? f[2] : f[3]}
                  </h3>
                  <p className="text-body text-foreground-muted">
                    {lang === "es" ? f[4] : f[5]}
                  </p>
                </div>
              </article>
            ))}
            <div className="window-interactive overflow-hidden rounded-lg border border-border bg-surface/70 shadow-medium sm:col-span-2 lg:col-span-3">
              <WindowBar label="stack.json" />
              <pre className="overflow-x-auto p-lg font-mono text-code leading-relaxed text-foreground-muted">
                <span className="text-neutral">$ cat stack.json{`\n`}</span>
                {`{\n`}
                <span className="text-secondary">
                  {" "}
                  &quot;backend&quot;
                </span>:{" "}
                <span className="text-primary">
                  &quot;Prisma · PostgreSQL&quot;
                </span>
                ,{`\n`}
                <span className="text-secondary">
                  {" "}
                  &quot;frontend&quot;
                </span>:{" "}
                <span className="text-primary">
                  &quot;Next.js · TypeScript&quot;
                </span>
                ,{`\n`}
                <span className="text-secondary"> &quot;ai&quot;</span>:{" "}
                <span className="text-primary">&quot;OpenAI API&quot;</span>,
                {`\n`}
                <span className="text-secondary"> &quot;auth&quot;</span>:{" "}
                <span className="text-primary">&quot;JWT stateless&quot;</span>
                {`\n}`}
              </pre>
            </div>
            <div className="flex flex-col gap-md rounded-lg border border-border bg-surface-alt/40 p-lg sm:col-span-2 lg:col-span-3">
              <span className="font-mono text-label uppercase text-primary">
                $ info --technical
              </span>
              <h2 className="font-mono text-h2 text-foreground">
                {lang === "es"
                  ? "Bajo el capó: moderno y desacoplado"
                  : "Under the hood: modern and decoupled"}
              </h2>
              <ul className="flex flex-col gap-sm text-body text-foreground-muted">
                <li>
                  <span className="text-primary">&gt;</span>{" "}
                  {lang === "es"
                    ? "Análisis estático que combina detección determinista con razonamiento del LLM."
                    : "Static analysis combining deterministic detection with LLM reasoning."}
                </li>
                <li>
                  <span className="text-primary">&gt;</span>{" "}
                  {lang === "es"
                    ? "Historial de conversación persistente por usuario."
                    : "Per-user persistent conversation history."}
                </li>
                <li>
                  <span className="text-primary">&gt;</span>{" "}
                  {lang === "es"
                    ? "Cada hallazgo trae categoría OWASP, severidad y remediación."
                    : "Every finding includes OWASP category, severity, and remediation."}
                </li>
              </ul>
              <div className="flex flex-wrap gap-sm">
                <span className="tag">● SQL injection</span>
                <span className="tag">● XSS</span>
                <span className="tag">● hardcoded secrets</span>
                <span className="tag">● insecure error handling</span>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-md rounded-lg border border-border bg-surface-alt/40 px-lg py-md font-mono sm:col-span-2 lg:col-span-6">
              <div>
                <dt className="text-h4 text-primary">OWASP</dt>
                <dd className="text-body-sm text-foreground-muted">
                  {lang === "es" ? "Top 10 cubierto" : "Top 10 covered"}
                </dd>
              </div>
              <div>
                <dt className="text-h4 text-primary">IA</dt>
                <dd className="text-body-sm text-foreground-muted">
                  {lang === "es" ? "Chat especializado" : "Specialized chat"}
                </dd>
              </div>
              <div>
                <dt className="text-h4 text-primary">SAST</dt>
                <dd className="text-body-sm text-foreground-muted">
                  {lang === "es" ? "Análisis de código" : "Code analysis"}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section
          id={t.how}
          className="scanlines relative scroll-mt-navbar border-y border-border bg-surface-alt/20"
        >
          <div className="relative mx-auto max-w-[1100px] px-md py-3xl md:px-lg lg:py-4xl">
            <span className="font-mono text-label uppercase text-primary">
              $ {t.history} --steps
            </span>
            <h2 className="mt-sm font-mono text-h2 text-foreground">
              {t.howTitle}
            </h2>
            <ol className="mt-2xl grid gap-lg md:grid-cols-3">
              {steps.map((s, i) => (
                <li
                  key={s[0]}
                  className="card-interactive flex flex-col gap-md rounded-lg border border-border bg-surface/60 p-lg font-mono"
                >
                  <div className="flex items-center gap-md">
                    <span className="inline-flex size-8 items-center justify-center rounded border border-primary/40 bg-primary/10 text-body text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon name={s[1]} className="size-5 text-primary" />
                  </div>
                  <p className="text-body-sm text-foreground-muted">
                    <span className="text-primary">$</span> nullbreach {s[0]}
                  </p>
                  <h3 className="text-h4 text-foreground">
                    {lang === "es" ? s[2] : s[3]}
                  </h3>
                  <p className="font-sans text-body text-foreground-muted">
                    {lang === "es" ? s[4] : s[5]}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="mx-auto max-w-[1100px] px-md py-3xl md:px-lg lg:py-4xl">
          <div className="window-interactive overflow-hidden rounded-lg border border-primary/30 bg-surface/70 shadow-large">
            <WindowBar label="~/nullbreach" />
            <div className="relative flex flex-col items-start gap-md px-lg py-2xl md:px-2xl">
              <p className="font-mono text-body-sm text-foreground-muted">
                <span className="text-primary">root@nullbreach</span>:~$ init
              </p>
              <h2 className="font-mono text-h2 text-foreground">
                <span className="text-primary">&gt;</span> {t.ready}
              </h2>
              <p className="text-body-lg text-foreground-muted">
                {t.readyBody}
              </p>
              <Link
                href={login}
                target="_blank"
                rel="noreferrer"
                className="primary-btn relative mt-sm h-12 px-xl text-body"
              >
                {t.signIn}
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1100px] px-md pb-3xl md:px-lg lg:pb-4xl">
          <div className="mx-auto flex w-fit flex-col items-center gap-lg rounded-lg border border-border bg-surface-alt/40 p-lg sm:flex-row sm:gap-xl sm:p-xl">
            <div className="group relative size-32 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image
                src={appPath("/profile.webp")}
                width="128"
                height="128"
                sizes="128px"
                alt="Valentina Ramírez"
                className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end justify-center gap-sm bg-gradient-to-t from-primary/85 via-surface/40 to-transparent p-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-sm:opacity-100">
                <a
                  href="https://instagram.com/wavival"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram @wavival"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-surface/85 text-foreground hover:text-primary"
                >
                  <Icon name="instagram" className="size-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/wavival"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn wavival"
                  className="inline-flex size-8 items-center justify-center rounded-full bg-surface/85 text-foreground hover:text-primary"
                >
                  <Icon name="linkedin" className="size-4" />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-xs text-center sm:text-left">
              <span className="font-mono text-label uppercase text-primary">
                $ whoami
              </span>
              <span className="font-mono text-h3 text-foreground">
                Valentina Ramírez
              </span>
              <a
                href="https://wavival.dev"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-body text-secondary"
              >
                @wavival
              </a>
              <p className="mt-xs max-w-[460px] text-body text-foreground-muted">
                {lang === "es"
                  ? "Desarrolladora full-stack y autora de NullBreach: aplicación en Next.js, Prisma y OpenAI."
                  : "Full-stack developer and author of NullBreach: Next.js, Prisma, and OpenAI application."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-[1100px] px-md py-2xl md:px-lg">
          <div className="grid gap-2xl md:grid-cols-[1.5fr_1fr_1fr]">
            <div className="flex max-w-[320px] flex-col gap-sm">
              <span className="flex items-center gap-sm font-mono text-h4 text-foreground">
                <Icon name="shield-half" className="size-5 text-primary" />
                <span>
                  <b className="text-primary">[</b>nullbreach
                  <b className="text-primary">]</b>
                </span>
              </span>
              <p className="font-mono text-body-sm text-foreground-muted">
                <span className="text-neutral"># </span>
                {t.tagline}.
              </p>
            </div>
            <nav
              aria-label={
                lang === "es" ? "Enlaces del producto" : "Product links"
              }
              className="flex flex-col gap-sm font-mono"
            >
              <h4 className="text-label uppercase text-foreground-muted">
                {t.product}
              </h4>
              <a href={`#${t.features}`}>~/{t.features}</a>
              <a href={`#${t.how}`}>~/{t.how}</a>
              <Link href={login} target="_blank" rel="noreferrer">
                ~/login
              </Link>
            </nav>
            <nav
              aria-label={lang === "es" ? "Recursos" : "Resources"}
              className="flex flex-col gap-sm font-mono"
            >
              <h4 className="text-label uppercase text-foreground-muted">
                {t.resources}
              </h4>
              <a
                href="https://github.com/wavival/nullbreach"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-sm"
              >
                <Icon name="github" className="size-4" />
                {t.repository}
              </a>
              <a
                href="https://wavival.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-sm"
              >
                <Icon name="globe" className="size-4" />
                {t.author}
              </a>
            </nav>
          </div>
          <div className="mt-2xl flex flex-col items-center justify-between gap-sm border-t border-border pt-lg font-mono text-body-sm text-foreground-muted sm:flex-row">
            <span>
              <Icon
                name="check"
                className="mr-xs inline size-3.5 text-primary"
              />
              © {new Date().getFullYear()} NullBreach. {t.allRights}
            </span>
            <span className="inline-flex items-center gap-md">
              <a
                href="https://instagram.com/wavival"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="instagram" className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/wavival"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" className="size-4" />
              </a>
              <a
                href="https://wavival.dev"
                target="_blank"
                rel="noreferrer"
                className="text-secondary"
              >
                @wavival
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
