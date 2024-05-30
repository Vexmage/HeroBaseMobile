// src/utils/dataHelpers.js

// What is dataHelpers.js?
// dataHelpers.js is a utility file that contains helper functions for working with data.

export function getDescription(item) {
    if (item.system && item.system.description && item.system.description.value) {
      return item.system.description.value.replace(/<[^>]+>/g, ''); // Strip HTML tags for clean text.
    }
    return "No description available.";
  }
  