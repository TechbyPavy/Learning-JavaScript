import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

// Define the type for a Pokemon, it will have a name, an image and a back image
interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

// This is the main component of the app, it will fetch pokemons from the pokeapi and display them in a scrollable list
export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(pokemons[0],  null, 2));
  useEffect(() => {
    // fetch pokemons;
    fetchPokemons();
  }, []);
  
  // Use this function to fetch pokemons from the pokeapi
  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
      const data = await response.json();

      // The pokeapi returns a list of pokemons with their name and url, we need to fetch the details of each pokemon to get their image
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return { 
            name: pokemon.name,
            image: details.sprites.front_default, // main sprite of the pokemon
            imageBack: details.sprites.back_default, // back sprite of the pokemon
            types: details.types,
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }
  
  // Call the function to fetch pokemons when the component gets mounted
  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}> 
          <Text>{pokemon.name}</Text>
          <Text>{pokemon.types[0].type.name}</Text>


          <View 
            style={{ 
              flexDirection: "row",
              }}
            >
              <Image source={{ uri: pokemon.image }} 
                style={{ width: 150, height: 150 }} 
            />
              <Image source={{ uri: pokemon.imageBack }} 
                style={{ width: 150, height: 150 }} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
