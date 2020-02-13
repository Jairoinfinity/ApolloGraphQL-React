import React from 'react';
import './App.css';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/'
});

const CharactersQuery = () => {
  const { loading, error, data } = useQuery(gql`{
    characters{
      results{
        id
        name
        image
      }
    }
  }`);

  if (loading) return(
  <div>
    <img className="App-logo" src="https://rickandmortyapi.com/api/character/avatar/103.jpeg" alt="Loading"/>
    <p>Loading...</p>
  </div>
  )
  if (error) return <p>Error!</p>

  return data.characters.results.map(character => {
    return (
      <div>
        <img className="App-logo-characters" src={character.image} alt="Loading"/>
        <p>{character.name}</p>
      </div>
      )
  })
}

function App() {
  return (
    <div className="App App-header">
      <ApolloProvider client={client}>
        <CharactersQuery></CharactersQuery>
      </ApolloProvider>
    </div>
  );
}

export default App;
