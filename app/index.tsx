// app/(tabs)/index.tsx
import React from 'react';
import { ScrollView, View, Text, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate
} from 'react-native-reanimated';

const ParallaxSection = ({ 
  imageUrl, 
  title, 
  description, 
  index, 
  scrollY 
}: {
  imageUrl: string;
  title: string;
  description: string;
  index: number;
  scrollY: Animated.SharedValue<number>;
}) => {
  const { height: windowHeight } = useWindowDimensions();
  const inputRange = [
    (index - 1) * windowHeight,
    index * windowHeight,
    (index + 1) * windowHeight
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      inputRange,
      [100, 0, -100],
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View className="h-screen relative">
      <Animated.Image
        source={{ uri: imageUrl }}
        className="absolute h-full w-full"
        style={[animatedStyle]}
      />
      <View className="absolute inset-0 bg-black/40" />
      <View className="flex-1 justify-center px-6 z-10">
        <Text className="text-white text-4xl font-bold mb-4">{title}</Text>
        <Text className="text-white text-lg">{description}</Text>
      </View>
    </View>
  );
};

export default function Index() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const sections = [
    {
      imageUrl: 'https://drive.google.com/drive/folders/1uUPvRrEHbSijfSoZwUi7c8-Bn1moxPE8', // Replace with your image URL
      title: "Welcome to Our World",
      description: "Discover amazing experiences and unforgettable moments with us.",
    },
    {
      imageUrl: '/api/placeholder/800/600', // Replace with your image URL
      title: "Explore Nature",
      description: "Immerse yourself in the beauty of natural wonders and scenic landscapes.",
    },
    {
      imageUrl: '/api/placeholder/800/600', // Replace with your image URL
      title: "Adventure Awaits",
      description: "Embark on thrilling journeys and create lasting memories.",
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, index) => (
          <ParallaxSection
            key={index}
            {...section}
            index={index}
            scrollY={scrollY}
          />
        ))}
        
        {/* Content Section */}
        <View className="bg-white py-16 px-6">
          <Text className="text-3xl font-bold mb-8 text-center">About Us</Text>
          <Text className="text-lg mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text className="text-lg mb-6 leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
          
          {/* Features Grid */}
          <View className="flex-row flex-wrap justify-between mt-8">
            {[1, 2, 3].map((item) => (
              <View key={item} className="w-[30%] aspect-square bg-gray-100 rounded-lg mb-4 items-center justify-center">
                <Text className="text-xl font-semibold">Feature {item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View className="bg-gray-100 py-16 px-6">
          <Text className="text-3xl font-bold mb-8 text-center">Contact Us</Text>
          <View className="bg-white p-6 rounded-lg shadow-md">
            <Text className="text-lg mb-4 text-center">
              Get in touch with us for more information
            </Text>
            <View className="items-center">
              <Text className="text-blue-500 text-lg">contact@example.com</Text>
              <Text className="text-gray-700 mt-2">+1 (123) 456-7890</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}