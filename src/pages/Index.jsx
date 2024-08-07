import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Heart, Info } from "lucide-react";

const Index = () => {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
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
            <p className="text-xl">Discover the Wonderful World of Cats</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
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
                <ul className="list-disc pl-6 space-y-2">
                  <li>Independent nature with a touch of affection</li>
                  <li>Excellent hunters with sharp claws and keen senses</li>
                  <li>Flexible bodies capable of impressive acrobatics</li>
                  <li>Masters of communication through various means</li>
                  <li>Curious explorers with a love for cozy spaces</li>
                </ul>
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
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Siamese" className="w-10 h-10 rounded-full mr-2" /> Siamese</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Persian" className="w-10 h-10 rounded-full mr-2" /> Persian</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Maine Coon" className="w-10 h-10 rounded-full mr-2" /> Maine Coon</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Bengal" className="w-10 h-10 rounded-full mr-2" /> Bengal</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Scottish Fold" className="w-10 h-10 rounded-full mr-2" /> Scottish Fold</li>
                  <li className="flex items-center"><img src="/placeholder.svg" alt="Sphynx" className="w-10 h-10 rounded-full mr-2" /> Sphynx</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Interactive Element */}
        <div className="text-center">
          <Button 
            onClick={() => setLikeCount(prev => prev + 1)}
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
