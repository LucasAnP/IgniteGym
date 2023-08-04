import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";
import { useCallback, useState } from "react";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Unable to load the exercises";
      toast.show({
        title,
        placement: "bottom",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title={"Exercises History"} />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color={"gray.200"}
              fontSize={"md"}
              mt={10}
              mb={3}
              fontFamily={"heading"}
            >
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
      )}
    </VStack>
  );
}
