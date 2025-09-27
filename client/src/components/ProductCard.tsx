import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  status: "released" | "beta" | "coming_soon";
  tags: string[];
  href: string;
}

export default function ProductCard({
  name,
  description,
  image,
  status,
  tags,
  href,
}: ProductCardProps) {
  const [, setLocation] = useLocation();
  
  const statusColors = {
    released: "bg-green-500/10 text-green-600 dark:text-green-400",
    beta: "bg-primary/10 text-primary",
    coming_soon: "bg-muted text-muted-foreground",
  };

  const statusLabels = {
    released: "リリース済み",
    beta: "ベータ版",
    coming_soon: "近日公開",
  };

  const handleCardClick = () => {
    setLocation(href);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover-elevate border-border hover:border-primary/20 transition-colors duration-300 cursor-pointer" onClick={handleCardClick}>
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 right-4">
              <Badge
                variant="secondary"
                className={`${statusColors[status]} font-medium`}
                data-testid={`badge-status-${status}`}
              >
                {statusLabels[status]}
              </Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground" data-testid={`text-product-name`}>
            {name}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed" data-testid={`text-product-description`}>
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs"
                data-testid={`badge-tag-${tag}`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            variant="ghost"
            className="w-full group justify-between"
            data-testid={`button-view-details`}
            onClick={(e) => {
              e.stopPropagation();
              setLocation(href);
            }}
          >
            詳細を見る
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}