import { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { PreferenceForm } from "@/components/preference-form";
import { CoffeeCard } from "@/components/coffee-card";
import { RecommendationLoader } from "@/components/recommendation-loader";
import { SearchBar } from "@/components/search-bar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

interface CoffeeRecommendation {
  id: string;
  name: string;
  description: string;
  roastLevel: string;
  origin: string;
  matchScore: number;
  imageUrl?: string;
}

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CoffeeRecommendation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePreferenceSubmit = async (values: unknown) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecommendations([
        {
          id: "1",
          name: "Ethiopian Yirgacheffe",
          description: "A light roasted coffee with floral and citrus notes, perfect for those who enjoy bright and complex flavors.",
          roastLevel: "Light",
          origin: "Ethiopia",
          matchScore: 95,
        },
        {
          id: "2",
          name: "Colombian Supremo",
          description: "Medium roasted with a balanced profile featuring caramel sweetness and subtle nutty undertones.",
          roastLevel: "Medium",
          origin: "Colombia",
          matchScore: 88,
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  const filteredRecommendations = recommendations.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <Typography.H1 className="text-primary">AI Coffee Recommender</Typography.H1>
            <Typography.Lead>Discover your perfect brew with AI-powered recommendations</Typography.Lead>
          </div>
          <ModeToggle />
        </header>

        <div className="grid gap-8 md:grid-cols-[350px,1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg border bg-card p-6"
          >
            <Typography.H3 className="mb-4">Your Preferences</Typography.H3>
            <PreferenceForm onSubmit={handlePreferenceSubmit} />
          </motion.div>

          <div className="space-y-6">
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Typography.H3>Your Recommendations</Typography.H3>
                  <div className="w-64">
                    <SearchBar onSearch={setSearchQuery} />
                  </div>
                </div>
                <Separator className="mb-6" />
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredRecommendations.map((coffee) => (
                    <motion.div
                      key={coffee.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CoffeeCard {...coffee} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {isLoading && <RecommendationLoader />}

            {!isLoading && recommendations.length === 0 && (
              <div className="rounded-lg border bg-card p-8 text-center">
                <Typography.H3 className="mb-2">Welcome to AI Coffee Recommender!</Typography.H3>
                <Typography.Muted>
                  Fill out your preferences on the left to get personalized coffee recommendations.
                </Typography.Muted>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}