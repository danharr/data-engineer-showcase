import requests
from bs4 import BeautifulSoup

# Fetch the webpage
url = "https://www.transfermarkt.co.uk/arsenal-fc/kader/verein/11/saison_id/2023/plus/1"
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.content, "html.parser")


# Extract player data (modify this based on the actual HTML structure)
table = soup.find('table', {"class": "items"}) #isolate the table
table2 = table.find('tbody')
print(table2)
