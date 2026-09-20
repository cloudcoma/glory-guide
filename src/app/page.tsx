import { GuideHero } from "@/components/guide/GuideHero";
import { GuideVideo } from "@/components/guide/GuideVideo";
import { GuideBenefits } from "@/components/home/GuideBenefits";
import { QuickActions } from "@/components/home/QuickActions";
import { guideVideoSource } from "@/data/video";

export default function HomePage() {
  return (
    <div className="page-shell">
      <GuideHero />
      <QuickActions />
      <GuideBenefits />
      <GuideVideo source={guideVideoSource} />
    </div>
  );
}
