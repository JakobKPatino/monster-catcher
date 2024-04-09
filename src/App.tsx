import React, { useEffect, useState } from 'react';
import './CSS/App.css';
import Home from './components/Home'
import MonsterCatch from './components/MonsterCatch';
import MonsterLog from './components/MonsterLog';
import Header from './components/Header';

function App() {

  interface logData {
    name: string,
    entry: string,
    sprite: string
  }

  const falseArray = Array(151).fill(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [monsterData, setMonsterData] = useState<Array<logData>>([])
  const [loggedMonsters, setLoggedMonsters] = useState<Array<boolean>>(falseArray)

  useEffect(() => {
    async function getData() {
      try {
  
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  
        if(!response.ok) {
          throw new Error('Could not fetch data')
        }
  
        const data = await response.json();
  
        let updatedArray = Array(151).fill({
                                            name: '',
                                            entry: '',
                                            sprite: ''
                                          })
        for (const [i, entries] of data.results.entries()) {
          const capitalName = entries.name[0].toUpperCase() + entries.name.slice(1)
          let updatedData = {
                              name: '',
                              entry: '',
                              sprite: ''
                            }
          
          updatedData.name = capitalName;
          updatedData.sprite = await getSprite(entries.url)
          updatedData.entry = await getEntry(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`)
          updatedArray[i] = updatedData;
        }
        console.log(updatedArray)
        setMonsterData(updatedArray)
        setIsLoading(false)
        setCurrentPage('monster-catch')
  
      } catch (err: any) {
        console.log(err.error)
      }
    }
  
    async function getSprite(url: string) {
      try {
  
        const response = await fetch(url)
        
        if(!response.ok) {
          throw new Error('Could not fetch data')
        }
  
        const data = await response.json();
        return data.sprites.front_default
  
      } catch (err: any) {
        console.log(err.error)
        return ''
      }
    }
  
    async function getEntry(url: string) {
      try {
  
        const response = await fetch(url)
        
        if(!response.ok) {
          throw new Error('Could not fetch data')
        }
  
        const data = await response.json();
        for (const entries of data.flavor_text_entries) {
          if (entries.language.name === 'en') {
            return entries.flavor_text
            
          }
        }
  
      } catch (err: any) {
        console.log(err.error)
        return ''
      }
    }
    getData();
  }, []);

  

  return (
    <div className="App">
      <Header />
      {currentPage === 'home' && isLoading && <Home />}
      {currentPage === 'monster-catch' && 
       !isLoading && <MonsterCatch loggedMonsters={loggedMonsters}  
                        monsterData={monsterData} setLoggedMonsters={setLoggedMonsters}
                        setCurrentPage={setCurrentPage}/>}
      {currentPage === 'monster-log' &&
       !isLoading && <MonsterLog loggedMonsters={loggedMonsters} 
                        monsterData={monsterData} setCurrentPage={setCurrentPage}/>}
    </div>
  );
}

export default App;
