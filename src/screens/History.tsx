import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, VStack, SectionList, Text } from "native-base";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.22",
      data: ["Puxada Frontal", "Remada unilateral"],
    },

    {
      title: "27.08.22",
      data: ["Puxada Frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title={"Exercises History"} />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={(item) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color={"gray.200"} fontSize={"md"} mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        ListEmptyComponent={() => (
          <Text color={"gray.100"} textAlign={"center"}>
            There are no registered exercises yet.{"\n"} Shall we exercise
            today?
          </Text>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        px={8}
        showsHorizontalScrollIndicator={false}
      />
    </VStack>
  );
}
