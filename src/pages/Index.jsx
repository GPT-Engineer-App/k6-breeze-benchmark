import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Moon, Sun } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentCatFact, setCurrentCatFact] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCatFact();
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-purple-100 to-pink-100'}`}>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-6xl font-bold mb-4">Feline Fascination</h1>
            <p className="text-xl mb-8">Discover the Wonderful World of Cats</p>
            <Button onClick={fetchCatFact} className="bg-purple-600 hover:bg-purple-700">
              <Paw className="mr-2 h-4 w-4" />
              Get a Cat Fact
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCatFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg italic text-gray-600 dark:text-gray-300"
            >
              "{currentCatFact}"
            </motion.div>
          </AnimatePresence>
          <Button onClick={toggleDarkMode} variant="outline" size="icon">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </div>
        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Cat Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Info className="mr-2" /> Characteristics of Cats</CardTitle>
                <CardDescription>What makes cats unique and lovable?</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.ul 
                  className="list-disc pl-6 space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {},
                  }}
                >
                  {[
                    "Independent nature with a touch of affection",
                    "Excellent hunters with sharp claws and keen senses",
                    "Flexible bodies capable of impressive acrobatics",
                    "Masters of communication through various means",
                    "Curious explorers with a love for cozy spaces"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        visible: { opacity: 1, x: 0 },
                        hidden: { opacity: 0, x: -50 },
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Cat className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription>Explore some well-known cat breeds from around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.ul 
                  className="grid grid-cols-2 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                    hidden: {},
                  }}
                >
                  {[
                    { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
                    { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
                    { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
                    { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
                    { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
                    { name: "Sphynx", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" }
                  ].map((breed, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      variants={{
                        visible: { opacity: 1, scale: 1 },
                        hidden: { opacity: 0, scale: 0.8 },
                      }}
                    >
                      <img src={breed.image} alt={breed.name} className="w-10 h-10 rounded-full mr-2 object-cover" />
                      {breed.name}
                    </motion.li>
                  ))}
                </motion.ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Interactive Element */}
        <div className="text-center">
          <Button 
            onClick={() => {
              setLikeCount(prev => prev + 1);
              toast({
                title: "Thanks for your love!",
                description: `You've liked cats ${likeCount + 1} times.`,
                duration: 3000,
              });
            }}
            className="group"
          >
            <Heart className="mr-2 h-4 w-4 group-hover:text-red-500 transition-colors" />
            Like Cats ({likeCount})
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
