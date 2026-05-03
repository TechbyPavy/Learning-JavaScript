import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";


// This is the main component of the app, it will fetch pokemons from the pokeapi and display them in a scrollable list
export default function Details() {
    const params = useLocalSearchParams();

    console.log(params.name);

    useEffect(() => { }, []);

    async function fetchPokemonByName(name: string) {
        // try to fetch the details of the pokemon using the name passed as a parameter
        //fetch
        // } catch()
    }

    // Call the function to fetch pokemons when the component gets mounted
    return (
        <>
            <Stack.Screen options={{ title: params.name as string }} />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{params.name}</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyText}>Tipo principal: {params.type ?? "desconhecido"}</Text>
                        <Text style={styles.bodyText}>Descrição: aqui vão mais detalhes do Pokémon.</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        padding: 16,
        backgroundColor: "#f2f2f2",
    },
    card: {
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    header: {
        backgroundColor: "lightyellow",
        padding: 18,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    body: {
        backgroundColor: "white",
        padding: 18,
    },
    bodyText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 12,
    },
});