import AnimeProvider from './src/context/animeContext';
import RootStack from './src/routes';

const App = () => {
  return (
    <AnimeProvider>
      <RootStack />
    </AnimeProvider>
  );
};

export default App;
