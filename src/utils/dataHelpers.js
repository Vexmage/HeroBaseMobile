// src/utils/dataHelpers.js
export function getDescription(item) {
    if (item.system && item.system.description && item.system.description.value) {
      return item.system.description.value.replace(/<[^>]+>/g, ''); // Strip HTML tags for clean text.
    }
    return "No description available.";
  }
  