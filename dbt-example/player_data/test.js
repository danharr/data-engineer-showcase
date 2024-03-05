const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Your JSON data (an array of objects)
const jsonData = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  // Add more objects as needed
];

// Path to the CSV file
const csvFilePath = 'file.csv';

// Define CSV header based on the keys of the first object in the array
const header = Object.keys(jsonData[0]).map(key => ({ id: key, title: key }));

// Create CSV Writer instance
const csvWriter = createCsvWriter({
  path: csvFilePath,
  header,
  append: true, // Set to true to append data to the existing file
});

// Append JSON data to the CSV file
csvWriter.writeRecords(jsonData)
  .then(() => console.log('CSV file updated with new data'))
  .catch(error => console.error('Error writing CSV:', error));
