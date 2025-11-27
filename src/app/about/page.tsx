export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">About</h1>
          <p className="text-muted-foreground leading-relaxed">
            RepairOrReplace helps you make smarter decisions about phone repairs.
            We use the industry-standard 50% rule and real depreciation data to
            give you an honest, unbiased recommendation.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">How it works</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-foreground font-medium">1.</span>
              <span>We calculate your phone&apos;s current market value based on its age and depreciation curve.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-medium">2.</span>
              <span>We compare repair costs against the 50% rule: if repair costs more than half the phone&apos;s value, replacement usually makes more sense.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-foreground font-medium">3.</span>
              <span>We show you all three options—shop repair, DIY, and replacement—so you can decide what&apos;s right for you.</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-medium">Why trust us?</h2>
          <p className="text-muted-foreground leading-relaxed">
            We don&apos;t sell repairs or phones. We have no incentive to push you
            either way. Our only goal is to help you make an informed decision
            and avoid wasting money on repairs that don&apos;t make economic sense.
          </p>
        </div>
      </div>
    </main>
  );
}
