import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info, Paw, Moon, Sun, ChevronDown, Gift, Camera, Music, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentCatFact, setCurrentCatFact] = useState("");
  const [catImages, setCatImages] = useState([]);
  const [adoptionProgress, setAdoptionProgress] = useState(0);
  const [catName, setCatName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    fetchCatFact();
    fetchCatImages();
    const interval = setInterval(() => {
      setAdoptionProgress(prev => (prev < 100 ? prev + 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newValue) => {
    setVolume(newValue[0]);
  };

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

  const handleAdopt = () => {
    if (catName.trim() === "") {
      toast({
        title: "Name required",
        description: "Please enter a name for your virtual cat.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Congratulations!",
        description: `You've virtually adopted ${catName}!`,
        duration: 5000,
      });
      setCatName("");
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-purple-100 to-pink-100'}`}>
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ opacity }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.h1 
              className="text-8xl font-bold mb-4"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              Feline Fascination
            </motion.h1>
            <p className="text-3xl mb-8">Discover the Wonderful World of Cats</p>
            <Button onClick={fetchCatFact} className="bg-purple-600 hover:bg-purple-700 text-lg py-6 px-8">
              <Paw className="mr-2 h-5 w-5" />
              Get a Cat Fact
            </Button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-white h-10 w-10" />
        </motion.div>
      </div>

      {/* Audio Player */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Button onClick={togglePlay} variant="outline" size="icon">
                {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <span className="text-sm font-medium">Calming Cat Purrs</span>
              <Music className="h-4 w-4" />
            </div>
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="w-full"
            />
          </CardContent>
        </Card>
        <audio ref={audioRef} loop>
          <source src="https://samplelib.com/lib/preview/mp3/sample-3s.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCatFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl italic text-gray-600 dark:text-gray-300 max-w-3xl mb-4 md:mb-0"
            >
              "{currentCatFact}"
            </motion.div>
          </AnimatePresence>
          <div className="flex space-x-4">
            <Button onClick={toggleDarkMode} variant="outline" size="lg" className="rounded-full">
              {isDarkMode ? <Sun className="h-6 w-6 mr-2" /> : <Moon className="h-6 w-6 mr-2" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-full">
                  <Camera className="h-6 w-6 mr-2" />
                  Cat Cam
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Live Cat Cam</DialogTitle>
                  <DialogDescription>
                    Watch adorable cats in real-time!
                  </DialogDescription>
                </DialogHeader>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Live stream would go here</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Gift className="mr-2" /> Virtual Cat Adoption
            </CardTitle>
            <CardDescription className="text-lg">
              Adopt a virtual cat and track your progress!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="catName">Name your virtual cat</Label>
                <Input
                  type="text"
                  id="catName"
                  placeholder="e.g. Whiskers"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                />
              </div>
              <Button onClick={handleAdopt}>Adopt Now</Button>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Adoption Progress</span>
                  <span>{adoptionProgress}%</span>
                </div>
                <Progress value={adoptionProgress} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cat Popularity Chart */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Chart className="mr-2" /> Cat Popularity Over Time
            </CardTitle>
            <CardDescription className="text-lg">
              Tracking the rise of cat popularity in recent years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { year: 2018, popularity: 65 },
                  { year: 2019, popularity: 68 },
                  { year: 2020, popularity: 75 },
                  { year: 2021, popularity: 82 },
                  { year: 2022, popularity: 88 },
                  { year: 2023, popularity: 92 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="popularity" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
