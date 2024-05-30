import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>About the App</Text>
        <Text style={styles.text}>
          This app serves as a digital companion for Pathfinder 2, a tabletop role-playing game (TTRPG) that brings characters to life through strategic play and storytelling. It streamlines the process of creating and managing characters, enabling quick access during physical gaming sessions. Designed to enhance the Pathfinder 2 experience, it provides tools for players to maintain and update their characters on the go.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>About the Developer</Text>
        <Text style={styles.text}>
          Joel Southall is a software developer and game designer with a rich background in creative and interactive media. Outside his professional pursuits, Joel enjoys the roles of a dungeon master, artist, and philosopher, reflecting his multifaceted interests. His passion for merging technology with traditional gaming enriches his projects, making them both innovative and engaging.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3C2F2F', // Dark Reddish-Brown background
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    color: '#FFD700', // Golden text
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#FFD700', // Golden text
    lineHeight: 24,
  },
});

export default AboutScreen;
