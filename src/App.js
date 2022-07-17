import './App.css';
import Dice from 'react-dice-roll';
import { useState, useEffect } from 'react';

const expectedRatios = {
  2: 1 / 36,
  3: 2 / 36,
  4: 3 / 36,
  5: 4 / 36,
  6: 5 / 36,
  7: 6 / 36,
  8: 5 / 36,
  9: 4 / 36,
  10: 3 / 36,
  11: 2 / 36,
  12: 1 / 36,
}

function App() {
  let [dice1, setDice1] = useState(1);
  let [dice2, setDice2] = useState(2);

  const [valueCounts, setValueCounts] = useState({
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 5,
    9: 4,
    10: 3,
    11: 2,
    12: 1
  });

  let dice1Target = 1;
  let dice2Target = 1;

  const total = Object.values(valueCounts).reduce((total, value) => total + value, 0);

  const ratios = {}

  let ratioTotal = 0;
  
  for (let [number, count] of Object.entries(valueCounts)) {
    ratioTotal += 10 * Math.pow(expectedRatios[number] / (count / total), 6);
    ratios[number] = ratioTotal;
  }

  const randomNumber = Math.random() * ratioTotal;

  let result = 12;

  for (let [number, ratio] of Object.entries(ratios)) {
    if (randomNumber < ratio) {
      result = parseInt(number);
      break;
    }
  }

  dice1Target = 5;
  dice2Target = 5;

  if (result <= 7) {
    dice1Target = 1;
  } else {
    dice1Target = 6;
  }

  dice2Target = result - dice1Target;

  useEffect(() => {
    if (dice1 !== 0 && dice2 !== 0) {
      valueCounts[(dice1 + dice2).toString()] = valueCounts[(dice1 + dice2).toString()] + 1;
      setValueCounts(valueCounts);
      console.log("saved result");
      setDice1(0);
      setDice2(0);
    }
  }, [ dice1, dice2, valueCounts ])

  return (
    <div className="App">
      <div style={{display: 'flex', flexDirection: 'row', padding: '12em'}}>
        <div style={{flex: 1}}>
          <Dice onRoll={(value) => setDice1(value)} defaultValue={dice1} cheatValue={dice1Target} triggers={['Enter']}/>
        </div>
        <div style={{flex: 1}}>
          <Dice onRoll={(value) => setDice2(value)} defaultValue={dice2} cheatValue={dice2Target} triggers={['Enter']}/>
        </div>
      </div>
    </div>
  );
}

export default App;
