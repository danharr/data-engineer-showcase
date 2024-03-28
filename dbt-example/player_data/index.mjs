import axios from 'axios';
import * as cheerio from 'cheerio';
import AWS from 'aws-sdk';
const s3 = new AWS.S3();
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';





const bucketName = 'football-data-raw-files';


export const handler = async (event) => {
  
  var teams = [
    {"name":"Arsenal", "url":"https://www.transfermarkt.co.uk/arsenal-fc/kader/verein/11/saison_id/2023/plus/1"},
    {"name":"Fulham", "url":"https://www.transfermarkt.co.uk/fulham-fc/kader/verein/931/saison_id/2023/plus/1"},
    {"name":"Chelsea","url":"https://www.transfermarkt.co.uk/chelsea-fc/kader/verein/631/saison_id/2023/plus/1"}
];
 

  
 for(const val of teams) {
  var data= [];

  const csvFilePath = '/tmp/'+val.name+'.csv';

  const createCsvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: ['player', 'joined','club']
  });



     
     
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
  
  

  dates.forEach(
      function(d,i) {data.push(
          
          
          {"player":players[i],"joined":d,"club":val.name}
      
      
      
      
      )});
      
      

    
      // Append JSON data to the CSV file
      createCsvWriter.writeRecords(data)
    .then(() => console.log('CSV file updated with new data'))
    .catch(error => console.error('Error writing CSV:', error));
    
    // Upload CSV file to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: csvFilePath,
      Body: fs.createReadStream(csvFilePath)
  };

  try {
      await s3.upload(uploadParams).promise();
      console.log('CSV file uploaded successfully');

  } catch (err) {
      console.error('Error uploading CSV file to S3:', err);

  }
   
      
 }
  
  
  
  
  
  const response = {
    statusCode: 200,
    body: JSON.stringify('Player data complete!'),
  };
  return response;
};
