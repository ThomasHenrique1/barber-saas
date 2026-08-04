import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crie sua conta."
      subtitle="Comece a organizar sua barbearia em poucos minutos."
    > 
    <RegisterForm />
    </AuthLayout>
  );
}