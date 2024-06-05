import React, { useState } from 'react';
import StatRollModal from './StatRollModal';
// StatRoller component
const StatRoller = ({ character, setCharacter, modalVisible, setModalVisible }) => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [rollCounts, setRollCounts] = useState({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  });
  const statsOrder = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
// Roll a stat
  const rollStat = () => {
    let rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort();
    rolls.shift();
    return rolls.reduce((a, b) => a + b, 0);
  };
// Handle roll
  const handleRoll = () => {
    const newStatValue = rollStat();
    const updatedStats = { ...character.stats, [statsOrder[currentStatIndex]]: newStatValue };
    const updatedRollCounts = { ...rollCounts, [statsOrder[currentStatIndex]]: rollCounts[statsOrder[currentStatIndex]] + 1 };

    setCharacter({ ...character, stats: updatedStats });
    setRollCounts(updatedRollCounts);
  };
// Finalize stat
  const finalizeStat = () => {
    if (currentStatIndex < statsOrder.length - 1) {
      setCurrentStatIndex(currentStatIndex + 1);
    } else {
      setModalVisible(false);
      setCurrentStatIndex(0);
    }
  };

  return (
    <StatRollModal
      modalVisible={modalVisible}
      onClose={() => setModalVisible(false)}
      statName={statsOrder[currentStatIndex]}
      rollCount={rollCounts[statsOrder[currentStatIndex]]}
      currentRoll={character.stats[statsOrder[currentStatIndex]]}
      onRoll={handleRoll}
      onAccept={finalizeStat}
    />
  );
};

export default StatRoller;
