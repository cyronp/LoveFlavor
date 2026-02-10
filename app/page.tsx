import RestaurantCard, { type Category } from "@/components/rest-card";

const restaurants: {
  name: string;
  category: Category;
  rating: number;
  description: string;
}[] = [
  {
    name: "Bella Tavola",
    category: "Restaurante",
    rating: 5,
    description:
      "Autêntica culinária italiana com massas frescas e ambiente acolhedor.",
  },
  {
    name: "Café Central",
    category: "Café",
    rating: 4,
    description:
      "Café artesanal e doces caseiros em um espaço charmoso e histórico.",
  },
  {
    name: "Sabor Brasileiro",
    category: "Restaurante",
    rating: 5,
    description:
      "Comida brasileira tradicional feita com ingredientes frescos e muito sabor.",
  },
  {
    name: "Doce Momento",
    category: "Café",
    rating: 3,
    description:
      "Cafeteria moderna com opções de cafés especiais e sobremesas variadas.",
  },
  {
    name: "La Pizzeria",
    category: "Restaurante",
    rating: 4,
    description:
      "Pizzas artesanais assadas em forno à lenha com receitas tradicionais italianas.",
  },
  {
    name: "Bar do João",
    category: "Outro",
    rating: 5,
    description:
      "Bar tradicional com petiscos deliciosos e ambiente descontraído.",
  },
  {
    name: "Sushi House",
    category: "Restaurante",
    rating: 4,
    description:
      "Culinária japonesa autêntica com peixes frescos e pratos tradicionais.",
  },
  {
    name: "Coffee Break",
    category: "Café",
    rating: 3,
    description: "Ponto de encontro perfeito para um café rápido e saboroso.",
  },
  {
    name: "Churrascaria Gaúcha",
    category: "Restaurante",
    rating: 5,
    description:
      "Carnes nobres preparadas no estilo gaúcho tradicional, rodízio completo.",
  },
  {
    name: "Padaria Nova",
    category: "Outro",
    rating: 4,
    description:
      "Pães frescos diariamente e uma variedade de produtos de confeitaria.",
  },
  {
    name: "Bistro Francês",
    category: "Restaurante",
    rating: 5,
    description:
      "Experiência gastronômica francesa sofisticada com vinhos selecionados.",
  },
  {
    name: "Confeitaria Doce Vida",
    category: "Café",
    rating: 4,
    description:
      "Bolos artesanais, tortas e doces finos preparados com carinho.",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            imageSrc={`https://picsum.photos/seed/${restaurant.name}/400/225`}
            title={restaurant.name}
            description={restaurant.description}
            category={restaurant.category}
            rating={restaurant.rating}
          />
        ))}
      </div>
    </div>
  );
}
