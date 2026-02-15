import { Heart, UtensilsCrossed, Coffee, Globe } from "lucide-react";

export type Category = "Restaurante" | "Café" | "Outro";

const CATEGORY_ICONS: Record<Category, typeof UtensilsCrossed> = {
  Restaurante: UtensilsCrossed,
  Café: Coffee,
  Outro: Globe,
};

interface RestaurantCardProps {
  imageSrc: string;
  title: string;
  description: string;
  category: Category;
  rating?: number;
  visits: number;
}

export default function RestaurantCard({
  imageSrc,
  title,
  description,
  category,
  rating = 0,
  visits,
}: RestaurantCardProps) {
  const CategoryIcon = CATEGORY_ICONS[category] || Globe;

  return (
    <div className="bg-card text-card-foreground overflow-hidden rounded-lg border cursor-pointer hover:scale-101 transition-all duration-300">
      <img
        src={imageSrc}
        alt={title}
        className="h-52 w-full object-cover bg-muted-foreground"
        width={400}
        height={225}
        draggable="false"
      />
      <div className="grid gap-1 p-4">
        <h1 className="text-lg leading-tight font-semibold">{title}</h1>
        <h2 className="text-muted-foreground line-clamp-3 flex items-center">
          <CategoryIcon className="inline w-4 h-4 mr-1" />
          {category} • {visits} visitas
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((heart) => (
            <Heart
              key={heart}
              className={`w-4 h-4 ${
                heart <= rating ? "text-red-500 fill-red-500" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            {rating > 0 ? `${rating}/5` : "Sem avaliação"}
          </span>
        </div>
      </div>
    </div>
  );
}
