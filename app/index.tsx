import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Pressable, Text, View, StyleSheet } from "react-native";

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

const colorByType = {
  // @ts-ignore
  grass: "#C6E0C3",
  fire: "#FFDBBB",
  water: "lightblue",
  bug: "#F3CEFF",
  normal:"lightyellow",
};


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
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
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
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link 
          key={pokemon.name} 
          href={{ pathname: "/details", params: { name: pokemon.name } }}
          style={{
            //@ts-ignore
            backgroundColor: colorByType[pokemon.types[0].type.name as keyof typeof colorByType] || "pink",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <View>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Text style={styles.type}>{pokemon.types[0].type.name}</Text>

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
        </Link>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
  },
});
