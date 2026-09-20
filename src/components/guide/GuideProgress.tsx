type GuideProgressProps = {
  currentStep: number;
  totalSteps: number;
  completed?: boolean;
};

export function GuideProgress({ currentStep, totalSteps, completed = false }: GuideProgressProps) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between gap-3 text-base">
        <p className="font-semibold text-slate-800">
          {completed ? "Все шаги пройдены" : <>Шаг {currentStep} <span className="font-normal text-slate-500">из {totalSteps}</span></>}
        </p>
        <span className="text-slate-500">{completed ? "Готово" : `${Math.round((currentStep / totalSteps) * 100)}%`}</span>
      </div>
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-label="Прогресс инструкции"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={completed ? totalSteps : currentStep}
        aria-valuetext={completed ? "Все шаги пройдены" : `Шаг ${currentStep} из ${totalSteps}`}
      >
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-200 motion-reduce:transition-none ${index < currentStep ? "bg-blue-600" : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
