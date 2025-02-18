import { Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

interface CoffeeCardProps {
  name: string;
  description: string;
  roastLevel: string;
  origin: string;
  matchScore: number;
  imageUrl?: string;
}

export function CoffeeCard({
  name,
  description,
  roastLevel,
  origin,
  matchScore,
  imageUrl,
}: CoffeeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge
            variant="secondary"
            className="ml-2 font-semibold"
          >
            {matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-muted">
              <Coffee className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="space-y-2">
            <Typography.P>{description}</Typography.P>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-foreground">
                {roastLevel} Roast
              </Badge>
              <Badge variant="outline" className="text-foreground">
                {origin}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}