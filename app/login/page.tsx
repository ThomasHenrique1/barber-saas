import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bem-vindo de volta."
      subtitle="Acesse sua conta e continue gerenciando sua barbearia com rapidez, organização e segurança."
    >
      <LoginForm />
    </AuthLayout>
  );
}