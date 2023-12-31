import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { useState } from "react";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
	genre: Genre | null;
	platform: Platform | null;
	sortOrder: String;
	searchText: string;
}
function App() {
	// const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
	// const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
	// 	null
	// );
	const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
	return (
		<Grid
			templateAreas={{
				base: `"nav" "main"`, // md 768px
				lg: `"nav nav" "aside main"`, // 992px
				// base: `"main"`, // md 768px
				// lg: `"aside main"`, // 992px
			}}
			templateColumns={{
				base: "1fr",
				lg: "250px, 1fr",
			}}
		>
			<GridItem area="nav">
				<NavBar
					onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
				/>
			</GridItem>
			<Show above="lg">
				<GridItem area="aside" paddingX="20px">
					<GenreList
						selectedGenre={gameQuery.genre}
						onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
					/>
				</GridItem>
			</Show>
			<GridItem area="main">
				<Box>
					<GameHeading gameQuery={gameQuery} />
					<Flex marginBottom={5}>
						<Box marginRight={5}>
							<PlatformSelector
								selectedPlatform={gameQuery.platform}
								onSelectPlatform={(platform) =>
									setGameQuery({ ...gameQuery, platform })
								}
							/>
						</Box>
						<SortSelector
							sortOrder={gameQuery.sortOrder}
							onSelectSortOrder={(sortOrder) =>
								setGameQuery({ ...gameQuery, sortOrder })
							}
						/>
					</Flex>
				</Box>

				<GameGrid
					gameQuery={gameQuery}
					// selectedPlatform={gameQuery.platform}
					// selectedGenre={gameQuery.genre}
				/>
			</GridItem>
		</Grid>
	);
}

export default App;
