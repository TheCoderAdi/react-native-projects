import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";

import { Container } from "@/components/Container";
interface Link {
  name: string;
  link: string;
}
const Home = () => {
  const navigation = useNavigation();
  const links: Link[] = [
    {
      name: "Stopwatch",
      link: "stopwatch",
    },
    {
      name: "Todo",
      link: "todo",
    },
    {
      name: "QR Code Scanner",
      link: "qr-code-scanner",
    },
    {
      name: "Calculator",
      link: "calculator",
    },
    {
      name: "Tic Tac Toe",
      link: "tic-tac-toe",
    },
  ];
  return (
    <Container>
      <View className="flex flex-1 items-center justify-center gap-3">
        <Text className="pt-12 text-center font-SpaceMono text-5xl text-cyan-300">
          Project Lists
        </Text>
        {links.map((link, index) => (
          <Pressable
            onPress={() => navigation.navigate(link.link as never)}
            key={index}
            className="
          mt-5 w-[300] items-center justify-center rounded-md bg-cyan-300 p-2
          "
          >
            <Text className="font-SpaceMono text-3xl">{link.name}</Text>
          </Pressable>
        ))}
      </View>
    </Container>
  );
};

export default Home;
