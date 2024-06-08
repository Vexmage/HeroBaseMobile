import React, { useState } from 'react';
import StatRollModal from './StatRollModal';
// StatRoller component
const StatRoller = ({ character, setCharacter, modalVisible, setModalVisible }) => { 
  const [currentStatIndex, setCurrentStatIndex] = useState(0); // Current stat index
  const [rollCounts, setRollCounts] = useState({ // Roll counts
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
    let rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1); // Roll 4d6 drop lowest
    rolls.sort(); // Sort rolls
    rolls.shift(); // Drop lowest roll
    return rolls.reduce((a, b) => a + b, 0);
  };
// Handle roll
  const handleRoll = () => { // Roll stat
    const newStatValue = rollStat(); // Roll stat
    const updatedStats = { ...character.stats, [statsOrder[currentStatIndex]]: newStatValue }; // Update stats
    const updatedRollCounts = { ...rollCounts, [statsOrder[currentStatIndex]]: rollCounts[statsOrder[currentStatIndex]] + 1 };
    // Update state
    setCharacter({ ...character, stats: updatedStats }); // Update character stats
    setRollCounts(updatedRollCounts); // Update roll counts
  };
// Finalize stat
  const finalizeStat = () => { // Finalize stat
    if (currentStatIndex < statsOrder.length - 1) { // If not last stat
      setCurrentStatIndex(currentStatIndex + 1); // Move to next stat
    } else {
      setModalVisible(false); // Close modal
      setCurrentStatIndex(0); // Reset stat index
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
