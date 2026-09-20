import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type GuideNavigationProps = {
  currentStep: number;
  totalSteps: number;
};

export function GuideNavigation({
  currentStep,
  totalSteps,
}: GuideNavigationProps) {
  const isLastStep = currentStep === totalSteps;
  const previousHref = `/guide?step=${currentStep - 1}`;
  const nextHref = isLastStep
    ? `/guide?step=${totalSteps}&completed=1`
    : `/guide?step=${currentStep + 1}`;

  return (
    <nav aria-label="Переход между шагами" className="mt-6 flex gap-3">
      {currentStep === 1 ? (
        <button
          type="button"
          className="button-secondary min-w-28 px-4 disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-36"
          disabled
          aria-label="Вернуться к предыдущему шагу"
        >
          <Icon name="arrow-left" />
          Назад
        </button>
      ) : (
        <Link
          href={previousHref}
          prefetch={false}
          className="button-secondary min-w-28 px-4 sm:min-w-36"
          aria-label={`Вернуться к шагу ${currentStep - 1}`}
        >
          <Icon name="arrow-left" />
          Назад
        </Link>
      )}
      <Link
        href={nextHref}
        prefetch={false}
        className="button-primary flex-1 px-5"
        aria-label={isLastStep ? "Завершить инструкцию" : `Перейти к шагу ${currentStep + 1}`}
      >
        {isLastStep ? "Завершить" : "Далее"}
        <Icon name={isLastStep ? "check" : "arrow-right"} />
      </Link>
    </nav>
  );
}
