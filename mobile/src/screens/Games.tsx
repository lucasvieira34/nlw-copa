import { FlatList, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Game, GameProps } from "../components/Game";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

export function Games() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get("/games");
      setGames(response.data.games);
    } catch (err) {
      console.log(err);
      toast.show({
        title: "Não foi possível carregar os jogos.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Calendário dos Jogos" showBackButton />

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Game
            data={item}
            firstTeamPoints={
              item.firstTeamPoint || item.firstTeamPoint === 0 ? item.guess.firstTeamPoints.toString() : ""
            }
            secondTeamPoints={
              item.secondTeamPoint || item.secondTeamPoint === 0 ? item.guess.secondTeamPoints.toString() : ""
            }
            isAllMatch={true}
          />
        )}
        _contentContainerStyle={{ pb: 24 }}
      />
    </VStack>
  );
}
