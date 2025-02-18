import { Coffee } from "lucide-react";
import { Typography } from "@/components/ui/typography";

export function RecommendationLoader() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-8 text-card-foreground">
      <div className="animate-pulse">
        <Coffee className="h-12 w-12 text-muted-foreground" />
      </div>
      <Typography.H3 className="text-center">
        Brewing your perfect recommendations...
      </Typography.H3>
      <Typography.Muted className="text-center">
        Our AI is analyzing your preferences to find the perfect coffee match
      </Typography.Muted>
    </div>
  );
}