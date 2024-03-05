# if pd.read_html does not work, we can use pd.read_html using requests.
import pandas as pd




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
 {"name":'West Ham',"id":2802}
    
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


df = pd.DataFrame(data)

df.to_csv('managers-dates.csv', index=False)  