# if pd.read_html does not work, we can use pd.read_html using requests.
import pandas as pd




teams = [

    {"name":'arsenal',"id":142},
    {"name":'fulham',"id":1055}
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
print(df.to_string())

df.to_csv('out.csv', index=False)  