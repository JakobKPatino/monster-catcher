import '../CSS/monstercatch.css';
import BackgroundPhoto from '../images/field.jpg';

interface logData {
  name: string,
  entry: string,
  sprite: string
}

type Props = {
  loggedMonsters: Array<boolean>,
  monsterData: Array<logData>,
  setLoggedMonsters: React.Dispatch<React.SetStateAction<Array<boolean>>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function MonsterCatch({loggedMonsters, monsterData, setLoggedMonsters, setCurrentPage} : Props) {

  let logged = Array(151).fill(false)
  const randomMonsterArray = Array<Array<string>>(12).fill(['', '']);
  fillRandomMonsterArray();
  generateRandomNumbers();

  function fillRandomMonsterArray() {
    const randomMonsters = getRandomMonsters()
    for(const index in randomMonsterArray) {
      randomMonsterArray[index] = randomMonsters[index]
    }
  }  
  
  function getRandomMonsters() {
    const randomNums = generateRandomNumbers()
    const randomMonsters: Array<Array<string>> = []
    for(const randomNum of randomNums) {
      const randomMonster = monsterData[randomNum]
      const data = [randomMonster.sprite, randomMonster.name, randomNum.toString()]
      randomMonsters.push(data)
    }
    return randomMonsters
  }

  function generateRandomNumbers() {
    const numberList: Array<number> = []
    for(let i = 0; i < 151; i++) {
      numberList.push(i)
    }
    return shuffle(numberList).slice(0, 12)
  }

  function shuffle(array: Array<number>) {
    for(const index in array) {
      const randomNum = Math.floor(Math.random() * 151)
      let temp = array[index]
      array[index] = array[randomNum]
      array[randomNum] = temp
    }
    return array
  }

  function catchMonster(dexNumber: string) {
    logged[Number(dexNumber)] = true;
    for(const monster of randomMonsterArray) {
      if(dexNumber === monster[2]) {
        document.getElementById(monster[1])!.setAttribute('hidden', 'true')
        console.log(`caught ${monster[1]}`)
      }
    }
  }

  function getMoreMonsters() {

    updateLoggedMonsters()

    const spritesArray = Array.from(document.getElementsByClassName('catch-sprite'))
    for(const sprite of spritesArray) {
      sprite.removeAttribute('hidden')
    }
  }

  function updateLoggedMonsters() {
    const updatedLog = [...loggedMonsters]
    
    for(const index in logged) {
      if(logged[index]) {
        updatedLog[index] = logged[index]
      }
    }
    setLoggedMonsters(updatedLog)
  }

  function switchPage() {
    updateLoggedMonsters()
    setCurrentPage('monster-log')
  }

  return (
    <div className="monster-catch">
      <img className='background-photo' src={BackgroundPhoto} alt='grass field'/>
      <div className='monster-catch-container'>
        <div className='monster-catch-button-container'>
          <button onClick={() => getMoreMonsters()}>Find More Monsters</button>
          <button onClick={() => switchPage()}>Monster Log</button>
        </div>
        <div className='monster-array-container'>
          {randomMonsterArray.map((value: Array<string>, index: number) => (
            <div className='monster-slots' key={`slot-${index}`} >
              <img className='catch-sprite' src={value[0]} id={value[1]}
                  alt={value[1]} onClick={() => catchMonster(value[2])}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MonsterCatch;