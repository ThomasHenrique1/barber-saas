import { Mail, Phone, User2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PersonalInfoCardProps = {
  user: {
    name?: string;
    email: string;
  };
};

export function PersonalInfoCard({
  user,
}: PersonalInfoCardProps) {
  return (
    <Card className="border-border bg-card/70 backdrop-blur-xl">

      <CardHeader>

        <CardTitle className="flex items-center gap-3">

          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <User2 size={18} />
          </div>

          Informações pessoais

        </CardTitle>

        <CardDescription>
          Atualize seus dados de identificação.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Nome
            </label>

            <Input
              defaultValue={user.name}
              placeholder="Seu nome"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Sobrenome
            </label>

            <Input placeholder="Sobrenome" />

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-2">

            <label className="flex items-center gap-2 text-sm font-medium">

              <Mail size={15} />

              Email

            </label>

            <Input
              defaultValue={user.email}
              type="email"
            />

          </div>

          <div className="space-y-2">

            <label className="flex items-center gap-2 text-sm font-medium">

              <Phone size={15} />

              Telefone

            </label>

            <Input placeholder="(11) 99999-9999" />

          </div>

        </div>

        <div className="flex justify-end">

          <Button>
            Salvar alterações
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}