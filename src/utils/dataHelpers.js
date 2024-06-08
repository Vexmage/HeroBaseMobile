// src/utils/dataHelpers.js

// What is dataHelpers.js?
// dataHelpers.js is a utility file that contains helper functions for working with data.
// This file contains functions that help extract and format data from objects.
// we're using these json files to store data about characters, classes, ancestries, and backgrounds.

export function getDescription(item) { // Get description from item
    if (item.system && item.system.description && item.system.description.value) { // Check if description exists
      return item.system.description.value.replace(/<[^>]+>/g, ''); // Strip HTML tags for clean text.
    }
    return "No description available.";
  }
  