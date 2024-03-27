# if pd.read_html does not work, we can use pd.read_html using requests.
import pandas as pd
import boto3
import csv

def handler(event, context):

    teams = [
        {"name":'Arsenal',"id":142},
        {"name":'Fulham',"id":1055},
        {"name":'Man City',"id":1718},
        {"name":'Chelsea',"id":536},
        {"name":'Liverpool',"id":1563},
        {"name":'Man Utd',"id":1724},
        {"name":'Newcastle',"id":1823},
        {"name":'Tottenham Hotspur',"id":2590},
        {"name":'Aston Villa',"id":154},
        {"name":'West Ham',"id":2802},
        {"name":'Bournemouth',"id":359},
        {"name":'Brentford',"id":378},
        {"name":'Brighton',"id":381},
        {"name":'Burnley',"id":435},
        {"name":'Crystal Palace',"id":646},
        {"name":'Everton',"id":942},
        {"name":'Luton',"id":1628},
        {"name":'Nottingham Forest',"id":1845},
        {"name":'Sheffield United',"id":2328},
        {"name":'Wolves',"id":2848}
    
        
    ]


    data = []


    for x in teams:


        dfs = pd.read_html('https://www.soccerbase.com/teams/team.sd?team_id='+str(x["id"])+'&comp_id=1&teamTabs=managers')

        
        managers = dfs[1]
        string_to_append = x["name"]
        list = managers.values.tolist()
        modified_list = []
        for sublist in list:
            modified_list.append(sublist + [string_to_append])
        
        for row in modified_list:
            data.append(row)


    #df = pd.DataFrame(data)

    # S3 bucket and file details
    bucket_name = 'football-data-raw-files'
    file_key = 'managers.csv'
  

    s3 = boto3.client('s3')
    with open('/tmp/example.csv', 'w') as csvfile:
        writer = csv.writer(csvfile)
        # writer.writerow(csv_columns)
        writer.writerows(data)
    
    # Upload CSV file to S3
    s3.upload_file('/tmp/example.csv', bucket_name, file_key)
    
    return {
        'statusCode': 200,
        'body': 'CSV file written to S3 successfully'
    }