const axios = require('axios');
const cheerio = require("cheerio");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const csvFilePath = 'players.csv';

var teams = [
{"name":"Arsenal", "url":"https://www.transfermarkt.co.uk/arsenal-fc/kader/verein/11/saison_id/2023/plus/1"},
{"name":"Fulham", "url":"https://www.transfermarkt.co.uk/fulham-fc/kader/verein/931/saison_id/2023/plus/1"}



];


for(const val of teams) {



async function main() {
 const result = await axios.get(val.url,{
    headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
    }});

 const $ = cheerio.load(result.data);
 
 const listItems = $('.items').find('tbody tr');

 console.log(`List item count: ${listItems.length}`);

 var players = [];
var dates = [];

 listItems.each((index, element) => {
    if ((index+2) % 3 === 0)
    {players.push($(element).text().trim().toUpperCase())}
    ;
  });


 
const td = $('.items').find('td');

td.each((index, element) => {
    if ((index+4) % 13 === 0)
    {dates.push( $(element).text())}
    ;
  });


  var data= [];
  dates.forEach(
      function(d,i) {data.push(
          
          
          {"data":players[i],"joined":d,"club":val.name}
      
      
      
      
      )});

   



      const header = Object.keys(data[0]).map(key => ({ id: key, title: key }));
  


      // Create CSV Writer instance
const csvWriter = createCsvWriter({
    path: csvFilePath,
    header,
    append: true, // Set to true to append data to the existing file
  });

  // Append JSON data to the CSV file
csvWriter.writeRecords(data)
.then(() => console.log('CSV file updated with new data'))
.catch(error => console.error('Error writing CSV:', error));
}








 
main()

}

;