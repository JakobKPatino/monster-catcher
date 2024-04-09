import '../CSS/monsterlog.css';
import React, { useState } from 'react';
import Unknown from '../images/undiscovered.jpg';

interface logData {
  name: string,
  entry: string,
  sprite: string
}

type Props = {
  loggedMonsters: Array<boolean>,
  monsterData: Array<logData>,
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function MonsterLog({loggedMonsters, monsterData, setCurrentPage} : Props) {

  const monsters: Array<logData> = []
  const [visibleDetails, setVisibleDetails] = useState(false)
  const [currentMonster, setCurrentMonster] = useState({
    name: '',
    entry: '',
    sprite: ''
  })
  availableMonsters()
  console.log(monsters)

  function availableMonsters() {
    for(let i = 0; i < 151; i++) {
      if(loggedMonsters[i]) {
        monsters.push(monsterData[i])
      } else {
        monsters.push({
          name: 'Undiscovered',
          entry: 'No Log Data',
          sprite: Unknown
        })
      }
    }
  }

  function showDetails(monster: logData) {
    setVisibleDetails(true)
    setCurrentMonster(monster)
  }

  return (
    <div className="monster-log">
      <div className="log-container-red">
        <div className="log-container-white">
          <div className="log-display" id="log-display">
            {!visibleDetails && monsters.map((monster, index) => (
              <div className="log-items" key={`${monster.name}-${index}`} id={`${monster.name}-${index}`}>
                <img src={monster.sprite} alt={`${monster.name}-${index}`} />
                <p>{monster.name}</p>
                <button className="learn-button" onClick={() => showDetails(monster)}>
                  Learn More
                </button>
              </div>
            ))}
            {visibleDetails &&
              <div className="monster-log-info">
                <img src={currentMonster.sprite} alt={currentMonster.name} />
                <p>{currentMonster.name}</p>
                  <p>
                    {currentMonster.entry}
                  </p>
                <button  className='back-button' onClick={() => setVisibleDetails(false)}>
                  Back
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      <button className='back-button' onClick={() => setCurrentPage('monster-catch')}>
        Back
      </button>
    </div>
  );
}

export default MonsterLog;