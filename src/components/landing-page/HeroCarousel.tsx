import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReviewScoreContainer from "@/components/ReviewScoreContainer";
import Autoplay from "embla-carousel-autoplay";

const shows = [
  {
    id: 1,
    title: "Dune: Prophecy",
    image: "/api/placeholder/1920/1080",
    description: "Denis Villeneuve returns with the stunning conclusion to his epic adaptation of Frank Herbert's sci-fi masterpiece.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 48,
    type: "Trending",
  },
  {
    id: 2,
    title: "The Eternal Night",
    image: "/api/placeholder/1920/1080",
    description: "A psychological horror that redefines the genre with its innovative storytelling and atmospheric tension.",
    genre: ["Horror", "Mystery", "Thriller"],
    rating: 68,
    type: "New Release",
  },
  {
    id: 3,
    title: "Echoes of Tomorrow",
    image: "/api/placeholder/1920/1080",
    description: "A breathtaking journey through time and emotion that challenges our understanding of love and memory.",
    genre: ["Drama", "Romance", "Sci-Fi"],
    rating: 88,
    type: "Editor's Choice",
  },
];

const HeroCarousel = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {shows.map((show, index) => (
          <CarouselItem key={show.id}>
            <Card className="relative border-none shadow-none w-full h-[600px]">
              <CardContent className="relative h-full">
                <Image src="/api/placeholder/1920/1080" alt={`Slide ${index + 1}`} fill className="object-cover" priority={index === 0} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-3xl">
                      <Badge className="bg-primary text-primary-foreground mb-4">{show.type}</Badge>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{show.title}</h2>
                      <div className="flex items-center mb-4 gap-4">
                        <ReviewScoreContainer score={show.rating} />
                        <span className="text-gray-300 text-sm">{show.genre.join(", ")}</span>
                      </div>
                      <p className="text-gray-200 max-w-2xl mb-6">{show.description}</p>
                      <button className="bg-primary hover:bg-primary/80 text-white font-medium py-3 px-8 rounded-md shadow-md transition duration-150 ease-in-out">Read Review</button>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <CarouselPrevious className="static translate-x-4 bg-white/10 hover:bg-white/20 text-white border-none" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <CarouselNext className="static -translate-x-4 bg-white/10 hover:bg-white/20 text-white border-none" />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroCarousel;
