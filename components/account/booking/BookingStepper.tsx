type BookingStepperProps = {
  step: number;
  totalSteps: number;
};

const steps = [
  "Barbeiro",
  "Data",
  "Horário",
  "Resumo",
];

export function BookingStepper({
  step,
  totalSteps,
}: BookingStepperProps) {
  return (
    <div className="space-y-6">

      {/* Barra */}

      <div className="h-2 overflow-hidden rounded-full bg-muted">

        <div
          className="
            h-full
            rounded-full
            bg-primary
            transition-all
            duration-300
          "
          style={{
            width: `${(step / totalSteps) * 100}%`,
          }}
        />

      </div>

      {/* Etapas */}

      <div className="grid grid-cols-4 gap-2">

        {steps.map((label, index) => {
          const current = index + 1;

          const active =
            current === step;

          const completed =
            current < step;

          return (
            <div
              key={label}
              className="flex flex-col items-center gap-3"
            >

              <div
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    completed
                      ? "border-primary bg-primary text-primary-foreground"
                      : active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground"
                  }
                `}
              >
                {current}
              </div>

              <span
                className={`
                  text-xs
                  font-medium
                  transition-colors

                  ${
                    active || completed
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                `}
              >
                {label}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}