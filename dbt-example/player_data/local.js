const axios = require('axios');
const cheerio = require("cheerio");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const csvFilePath = 'players.csv';

// Check if the file exists before attempting to delete it
if (fs.existsSync(csvFilePath)) {
    // Delete the file
    fs.unlinkSync(csvFilePath);
    console.log(`File ${csvFilePath} deleted successfully.`);
  } else {
    console.log(`File ${csvFilePath} does not exist.`);
  };

var teams = [
{"name":"Arsenal", "url":"https://www.transfermarkt.co.uk/arsenal-fc/kader/verein/11/saison_id/2023/plus/1"},
{"name":"Fulham", "url":"https://www.transfermarkt.co.uk/fulham-fc/kader/verein/931/saison_id/2023/plus/1"},
{"name":"Man City","url":"https://www.transfermarkt.co.uk/manchester-city/kader/verein/281/saison_id/2023/plus/1"},
{"name":"Chelsea","url":"https://www.transfermarkt.co.uk/chelsea-fc/kader/verein/631/saison_id/2023/plus/1"},
{"name":"Liverpool","url":"https://www.transfermarkt.co.uk/liverpool-fc/kader/verein/31/saison_id/2023/plus/1"},
{"name":"Tottenham Hotspur","url":"https://www.transfermarkt.co.uk/tottenham-hotspur/kader/verein/148/saison_id/2023/plus/1"},
{"name":"Man Utd","url":"https://www.transfermarkt.co.uk/manchester-united/kader/verein/985/saison_id/2023/plus/1"},
{"name":"Newcastle","url":"https://www.transfermarkt.co.uk/newcastle-united/kader/verein/762/saison_id/2023/plus/1"},
{"name":"Aston Villa","url":"https://www.transfermarkt.co.uk/aston-villa/kader/verein/405/saison_id/2023/plus/1"},
{"name":"West Ham","url":"https://www.transfermarkt.co.uk/west-ham-united/kader/verein/379/saison_id/2023/plus/1"},
{"name":"Brighton","url":"https://www.transfermarkt.co.uk/brighton-amp-hove-albion/kader/verein/1237/saison_id/2023/plus/1"},
{"name":"Brentford","url":"https://www.transfermarkt.co.uk/brentford-fc/kader/verein/1148/saison_id/2023/plus/1"},
{"name":"Crystal Palace","url":"https://www.transfermarkt.co.uk/crystal-palace/kader/verein/873/saison_id/2023/plus/1"},
{"name":"Nottingham Forest","url":"https://www.transfermarkt.co.uk/nottingham-forest/kader/verein/703/saison_id/2023/plus/1"},
{"name":"Bournemouth","url":"https://www.transfermarkt.co.uk/afc-bournemouth/kader/verein/989/saison_id/2023/plus/1"},
{"name":"Everton","url":"https://www.transfermarkt.co.uk/everton-fc/kader/verein/29/saison_id/2023/plus/1"},
{"name":"Wolves","url":"https://www.transfermarkt.co.uk/wolverhampton-wanderers/kader/verein/543/saison_id/2023/plus/1"},
{"name":"Burnley","url":"https://www.transfermarkt.co.uk/burnley-fc/kader/verein/1132/saison_id/2023/plus/1"},
{"name":"Sheffield United","url":"https://www.transfermarkt.co.uk/sheffield-united/kader/verein/350/saison_id/2023/plus/1"},
{"name":"Luton","url":"https://www.transfermarkt.co.uk/luton-town/kader/verein/1031/saison_id/2023/plus/1"}

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
          
          
          {"player":players[i],"joined":d,"club":val.name}
      
      
      
      
      )});

   




  


      // Create CSV Writer instance
const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: ['player', 'joined','club'],
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