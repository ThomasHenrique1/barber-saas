import {
  KeyRound,
  Laptop,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SecurityCard() {
  return (
    <Card className="border-border bg-card/70 backdrop-blur-xl">

      <CardHeader>

        <CardTitle className="flex items-center gap-3">

          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <ShieldCheck size={18} />
          </div>

          Segurança

        </CardTitle>

        <CardDescription>
          Proteja sua conta e gerencie seus acessos.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-5">

        {/* Alterar senha */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-border
            bg-background/70
            p-5
          "
        >
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <KeyRound size={20} />
            </div>

            <div>

              <h3 className="font-semibold">
                Senha
              </h3>

              <p className="text-sm text-muted-foreground">
                Atualize sua senha regularmente para manter sua conta segura.
              </p>

            </div>

          </div>

          <Button variant="outline">
            Alterar
          </Button>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

        </div>

        {/* Sessões */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-border
            bg-background/70
            p-5
          "
        >
          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Laptop size={20} />
            </div>

            <div>

              <h3 className="font-semibold">
                Sessões ativas
              </h3>

              <p className="text-sm text-muted-foreground">
                Veja em quais dispositivos sua conta está conectada.
              </p>

            </div>

          </div>

          <Button variant="outline">
            Visualizar
          </Button>

        </div>

      </CardContent>

    </Card>
  );
}