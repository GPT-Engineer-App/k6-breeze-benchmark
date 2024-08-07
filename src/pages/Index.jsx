import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Moon, Sun, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentCatFact, setCurrentCatFact] = useState("");
  const [catImages, setCatImages] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCatFact();
    fetchCatImages();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setCurrentCatFact(data.fact);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  };

  const fetchCatImages = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
      const data = await response.json();
      setCatImages(data.map(img => img.url));
    } catch (error) {
      console.error('Error fetching cat images:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-purple-100 to-pink-100'}`}>
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.h1 
              className="text-7xl font-bold mb-4"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              Feline Fascination
            </motion.h1>
            <p className="text-2xl mb-8">Discover the Wonderful World of Cats</p>
            <Button onClick={fetchCatFact} className="bg-purple-600 hover:bg-purple-700 text-lg py-6 px-8">
              <Paw className="mr-2 h-5 w-5" />
              Get a Cat Fact
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white h-10 w-10" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCatFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl italic text-gray-600 dark:text-gray-300 max-w-3xl"
            >
              "{currentCatFact}"
            </motion.div>
          </AnimatePresence>
          <Button onClick={toggleDarkMode} variant="outline" size="lg" className="rounded-full">
            {isDarkMode ? <Sun className="h-6 w-6 mr-2" /> : <Moon className="h-6 w-6 mr-2" />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Carousel className="mb-12">
            <CarouselContent>
              {catImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img src={image} alt={`Cat ${index + 1}`} className="max-w-full max-h-full object-cover rounded-lg" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 text-lg">
            <TabsTrigger value="characteristics">Cat Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Info className="mr-2" /> Characteristics of Cats</CardTitle>
                <CardDescription className="text-lg">What makes cats unique and lovable?</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.ul 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {},
                  }}
                >
                  {[
                    { trait: "Independent nature", description: "Cats are known for their self-reliance and ability to entertain themselves." },
                    { trait: "Excellent hunters", description: "Sharp claws, keen senses, and agile bodies make cats formidable predators." },
                    { trait: "Flexible bodies", description: "Cats can perform impressive acrobatics and fit into small spaces." },
                    { trait: "Masters of communication", description: "From meows to purrs, cats have various ways to express themselves." },
                    { trait: "Curious explorers", description: "Cats love to investigate their surroundings and find cozy spots." },
                    { trait: "Affectionate companions", description: "Despite their independence, cats can form strong bonds with their humans." }
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 50 },
                      }}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                      <h3 className="font-bold text-lg mb-2">{item.trait}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Cat className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription className="text-lg">Explore some well-known cat breeds from around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.ul 
                  className="grid grid-cols-2 md:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {},
                  }}
                >
                  {[
                    { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", origin: "Thailand" },
                    { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", origin: "Iran" },
                    { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", origin: "United States" },
                    { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", origin: "United States" },
                    { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", origin: "Scotland" },
                    { name: "Sphynx", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg", origin: "Canada" }
                  ].map((breed, index) => (
                    <motion.li 
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                      variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.8 },
                      }}
                    >
                      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-1">{breed.name}</h3>
                        <Badge variant="secondary">{breed.origin}</Badge>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Interactive Element */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              onClick={() => {
                setLikeCount(prev => prev + 1);
                toast({
                  title: "Thanks for your love!",
                  description: `You've liked cats ${likeCount + 1} times.`,
                  duration: 3000,
                });
              }}
              className="group text-lg py-6 px-8"
              variant="outline"
            >
              <Heart className="mr-2 h-6 w-6 group-hover:text-red-500 transition-colors" />
              Like Cats ({likeCount})
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
