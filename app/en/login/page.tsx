import LoginForm from "@/components/LoginForm";

export default function SpanishLoginPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );
  return <LoginForm locale="es" googleEnabled={googleEnabled} />;
}
