import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { numbers } from "@/constant/data";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value: string) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      try {
        const evalResult = eval(input);
        setInput(evalResult.toString());
        setResult("");
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "()") {
      setInput((prevInput) => {
        const lastChar = prevInput.slice(-1);
        const openBrackets = (prevInput.match(/\(/g) || []).length;
        const closeBrackets = (prevInput.match(/\)/g) || []).length;

        if (
          openBrackets > closeBrackets &&
          (lastChar === ")" || !isNaN(Number(lastChar)))
        ) {
          return prevInput + ")";
        } else if (
          lastChar === "(" ||
          lastChar === "" ||
          isNaN(Number(lastChar))
        ) {
          return prevInput + "(";
        } else {
          return prevInput + "*(";
        }
      });
    } else if (value === "+/-") {
      setInput((prevInput) => {
        if (prevInput.startsWith("-")) {
          return prevInput.substring(1);
        } else {
          return "-" + prevInput;
        }
      });
    } else {
      setInput(input + value);
      try {
        const evalResult = eval(input + value);
        setResult(evalResult.toString());
      } catch (error) {
        setResult("");
      }
    }
  };

  const operations = (number: string) => {
    if (
      number === "+" ||
      number === "-" ||
      number === "*" ||
      number === "/" ||
      number === "%" ||
      number === "()"
    ) {
      return true;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#151515]">
      <View className="flex-1 items-end justify-center gap-14 border-b-4 border-gray-500 p-5">
        <Text className="text-5xl text-white">{input}</Text>
        <Text className="text-3xl text-gray-400">{result}</Text>
      </View>
      <View className="flex-2 mt-3">
        <View className="flex flex-row flex-wrap justify-around gap-2">
          {numbers.map((number, index) => (
            <Pressable
              key={index}
              className={`h-24 w-1/5 items-center justify-center rounded-lg border-2 border-gray-600 ${
                number === "=" ? "bg-[#66FF7F]" : ""
              } ${number === "C" ? "bg-[#FF5959]" : ""}`}
              onPress={() => handlePress(number)}
            >
              <Text
                className={`p-1 font-SpaceMono text-3xl text-white ${
                  number === "=" ? "text-black" : ""
                } ${number === "C" ? "text-black" : ""} ${
                  operations(number) && "text-[#66FF7F]"
                }`}
              >
                {number}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
