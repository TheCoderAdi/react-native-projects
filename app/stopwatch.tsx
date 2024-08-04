import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, View, Pressable } from "react-native";

import { Container } from "@/components/Container";

export default function StopWatch() {
  const [laps, setLaps] = useState<string[]>([]);
  const [play, setPlay] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [clockData, setClockData] = useState({
    hour: "00",
    minute: "00",
    second: "00",
  });
  const intervalRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const onPlay = () => {
    if (play) {
      intervalRef.current = setInterval(() => {
        setClockData((prev) => {
          let second = +prev.second;
          let minute = +prev.minute;
          let hour = +prev.hour;

          if (second === 59) {
            second = 0;
            if (minute === 59) {
              minute = 0;
              hour++;
            } else {
              minute++;
            }
          } else {
            second++;
          }

          return {
            hour: hour < 10 ? `0${hour}` : hour.toString(),
            minute: minute < 10 ? `0${minute}` : minute.toString(),
            second: second < 10 ? `0${second}` : second.toString(),
          };
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  useEffect(() => {
    if (play) {
      setClockData((prev) => {
        let second = +prev.second;
        let minute = +prev.minute;
        let hour = +prev.hour;

        if (second === 59) {
          second = 0;
          if (minute === 59) {
            minute = 0;
            hour++;
          } else {
            minute++;
          }
        } else {
          second++;
        }
        return {
          hour: hour < 10 ? `0${hour}` : hour.toString(),
          minute: minute < 10 ? `0${minute}` : minute.toString(),
          second: second < 10 ? `0${second}` : second.toString(),
        };
      });
    }
    onPlay();
    return () => clearInterval(intervalRef.current);
  }, [play]);

  useEffect(() => {
    if (scrollViewRef.current)
      scrollViewRef.current.scrollToEnd({ animated: true });
  }, [laps]);

  return (
    <>
      <Container>
        <Text className="pt-9 text-center font-SpaceMono text-5xl text-white">
          StopWatch
        </Text>
        <View className="mt-7 flex h-[300] w-[300] items-center justify-center rounded-full border-8 border-[#424242]">
          <Text className="p-2 font-SpaceMono text-5xl text-white">
            {clockData.hour}:{clockData.minute}:{clockData.second}
          </Text>
        </View>
        {laps.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            contentContainerStyle={{ alignItems: "center" }}
            className="mt-7 max-h-56  rounded-md  p-2"
          >
            {laps.map((lap, index) => (
              <Text key={index} className="font-SpaceMono text-4xl text-white">
                {lap}
              </Text>
            ))}
          </ScrollView>
        ) : null}
        <View
          className={`flex w-[100%] flex-row items-center ${
            !play ? "justify-evenly" : "justify-around"
          } ${laps.length > 0 && "pt-5"}`}
        >
          <Pressable
            onPress={() => {
              setClockData({
                hour: "00",
                minute: "00",
                second: "00",
              });
              setLaps([]);
            }}
            className="border-1 mt-7 flex h-24 w-24 items-center justify-center rounded-full border-gray-50 bg-black"
          >
            <FontAwesome5 name="redo" size={30} color="white" />
          </Pressable>
          <Pressable
            onPress={() => {
              setPlay(!play);
            }}
            className="border-1 mt-7 flex h-24 w-24 items-center justify-center rounded-full border-gray-50 bg-black"
          >
            {!play ? (
              <Image
                source={require("@/assets/start.png")}
                className="h-11 w-11"
              />
            ) : (
              <View className="flex flex-row items-center justify-center gap-2">
                <View className="h-11 w-3 bg-white" />
                <View className="h-11 w-3 bg-white" />
              </View>
            )}
          </Pressable>
          {play ? (
            <Pressable
              onPress={() => {
                setLaps((prev) => [
                  ...prev,
                  `${clockData.hour}:${clockData.minute}:${clockData.second}`,
                ]);
              }}
              className="border-1 mt-7 flex h-24 w-24 items-center justify-center rounded-full border-gray-50 bg-black"
            >
              <FontAwesome5 name="plus" size={30} color="white" />
            </Pressable>
          ) : null}
        </View>
      </Container>
    </>
  );
}
