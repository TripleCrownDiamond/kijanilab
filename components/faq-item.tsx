type FaqItemProps = {
  question: string;
  answer: string;
};

export function FaqItem({ question, answer }: FaqItemProps) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none text-lg font-semibold text-[#e1f5e2]">
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#8eff91]/40 text-xs text-[#8eff91]">
            +
          </span>
          {question}
        </span>
      </summary>
      <p className="mt-4 text-sm leading-relaxed text-[#c4ddc8]">{answer}</p>
    </details>
  );
}
