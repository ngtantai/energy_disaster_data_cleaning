# Python version
# on terminal, to run this file, type in: "python clean_energy_discruption_v3.py"
# Project name: Energy Discruption Text Mining
# Description: Cleaning data
# author: TAI NGUYEN
# Company: Verisk Analytics


import urllib
from bs4 import BeautifulSoup
import re
import pandas as pd
import numpy as np
# from textblob import TextBlob
from collections import Counter
import pycountry

import warnings
warnings.filterwarnings('ignore')


def main():
    '''
    Clean all mandatory columns
    '''
    # get data and set up initial preparation
    data = pd.read_excel('Database_construction_result/all_discrupted_energy_events_v4.xlsx')

    df = pd.DataFrame(data=data)

    df = df.reset_index()
    df = df.drop('index', axis=1)

    # CLEANING PROCESS
    # clean cause of loss
    df = clean_cause_of_loss(df)

    # clean loss estimated
    df = clean_loss_estimate(df)

    # clean state
    df = clean_state(df)

    # clean death
    df = clean_death(df, feature_name='Death')

    # clean injury
    df = clean_injury(df, 'Injury')

    # clean Date
    df = clean_date(df)

    return df

# Normalizing Cause of Loss

def extract_cause_from_column(df, column=''):
    '''
    1. Skim through all string in each row of this column,
    2. Find all possible causes of loss and put them in the new column (up to 24 possible cases)
    3. Replace with corresponding number in Loss Definition file
    4. Concatenate all found numbers to a list
    5. Take the most common number from list
    6. Return update dataframe
    Sample process:
         "This event was reported as a fire and toxic event. On September 18, 2000, fire was occurred during "
      -> "This event was reported as a   3   and   4   event"
      -> [3,4]
      -> 3
    '''
    new_column = 'Cause from ' + column
    df[new_column] = df[column].apply(lambda x: str(x).lower())
    ###
    ### Start matching corresponded number in the given terms for each cause of loss definition
    ###
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'fire\w*', '  3  ', str(x)))
    #Explosion:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'explo\w+|blast|vapor cloud|jet fire', '  4  ', str(x)))
    #Toxic Release:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'toxic|health', '  5  ', str(x)))
    #Lightning:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'lightning|lightning strike', '  6  ', str(x)))
    #Blackout:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'power|outage|blackout', '  7  ', str(x)))
    #Technical Failure:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'machine|breakdown|pump|compressor|turbine|blade|heater|boiler|technical failure', '  8  ', str(x)))
    #Pipeline Ruptures:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'pipe\w+|rupt\w+|breakage', '  9  ', str(x)))
    #Leaks and Spills:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'lea\w+|spil\w+|overflow|release', '  10  ', str(x)))
    #Derailment:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'train|derail|rail', '  11  ', str(x)))
    #Armed Attacks:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'terror|attack|weapon', '  12  ', str(x)))
    #Bombing:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'bomb', '  13  ', str(x)))
    #Kidnapping:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'kidnap|official|director|officer', '  14  ', str(x)))
    #Sabotage:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'sabotage', '  15  ', str(x)))

    #Cyber Attack:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'breach|security|internet|online', '  16  ', str(x)))
    #Protests and Blockades:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'protest|vandalism|riot', '  17  ', str(x)))

    #Strikes:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'strike', '  18  ', str(x)))

    #Allegations:

    #Work Place Injuries:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'worker compensation|[Ii]nju\w+|human|death\w+|fatali\w+', '  20  ', str(x)))

    #maintenance:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'maintenance|machine|breakdown|pump|compressor|turbine|blade|heater|boiler', '  21  ', str(x)))

    #Regulatory Changes:

    #Natural Disasters:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'weather|hurricane|storm|wind|flood|tornado|storm surge', '  23  ', str(x)))

    #Hazardous Contamination:
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'contamination|hazard|soil|pollution|emission\w+', '  24  ', str(x)))

    # Extract all numbers that were just tagged
    df[new_column] = df[new_column].apply(lambda x: re.findall(r'(?<=\s\s)\d+?(?=\s\s)', str(x)))


    # Count the most number in the list of numbers found
    df[new_column] = df[new_column].apply(lambda x: Counter(re.findall(r'[0-9]+',str(x))).most_common(1)[0][0]
                                                                                if str(x)!='[]'
                                                                                else str(x))
#     df[new_column] = df[new_column].apply(lambda x: Counter([int(i) for i in re.findall(r'[0-9]+', str(x))]).most_common(1) )
#     # Get the final number
#     df[new_column] = df[new_column].apply(lambda x: re.findall(r'[0-9]+(?=,)', str(x)))
    # Clean redundant objects
    df[new_column] = df[new_column].apply(lambda x: 'Other' if str(x) == '[]' else x)
    df[new_column] = df[new_column].apply(lambda x: str(x).replace("[","").replace("]","").replace("'","").replace(" ",""))

    return df


def create_cause_of_loss_dict(filename):
    '''
    1. Read in file of loss definition
    2. Vectoring loss term from loss definition file
    3. Setting a reverse dictionary for loss term
    Output example:
    {3: 'Fire/Blaze ',
     4: 'Explosion ',
     5: 'Toxic Release',
     6: 'Lightning',
     7: 'Blackout ',
     8: 'Technical Failure ',
     9: 'Pipeline Ruptures',
     10: 'Leaks and Spills ',
     ...
     }
    '''
    data2 = pd.read_excel(filename)
    df2 = pd.DataFrame(data=data2)
    #Vectorizing
    cause_definition = df2['Cause of Loss'].apply(lambda x: str(x).replace(':', ""))

    dict_cause_of_loss = dict()
    indices = np.arange(3,25)
    for index,name in enumerate(cause_definition):
        dict_cause_of_loss.update({indices[index] : name}) # reverse dictionary
    return dict_cause_of_loss


# In[4]:


def replace_key_by_value(df, column, dictionary):
    '''
    1. Search for key
    2. Replace by its corresponding value
    3. Return new dataframe with new replaced values
    Output example:
    '3' -> 'Fire/Blaze', '4' -> "Explosion"
    '''
    for key, value in dictionary.items():
        df[column] = df[column].apply(lambda x: value if x == str(key) else x)
        df[column] = df[column].apply(lambda x: str(x).replace('[]',"unknown"))
    return df


# In[5]:


def restructure_new_columns(df, main_column='Cause of Loss', num_col_to_move = 2):
    '''
    Index new columns next to main column
    '''
    cols = df.columns.tolist()
    index = [i for i,v in enumerate(cols) if v == main_column][0]
    cols = cols[:index+1] + cols[-num_col_to_move:] + cols[index+num_col_to_move-1:-num_col_to_move]
    return df[cols]


# In[6]:


def clean_cause_of_loss(df):
    '''
    Extract cause of loss from 2 columns
    The results will have 2 different cases in 2 new columns
    '''
    #normalizing cause of loss
    df = extract_cause_from_column(df, column='Cause of Loss')
    df = extract_cause_from_column(df, column='Text')

    filename = 'Cause of Loss Definitions and Keywords.xlsx'
    cause_dict = create_cause_of_loss_dict(filename)

    df = replace_key_by_value(df, column='Cause from Text', dictionary = cause_dict)
    df = replace_key_by_value(df, column='Cause from Cause of Loss', dictionary = cause_dict)

    df = restructure_new_columns(df, main_column = 'Cause of Loss', num_col_to_move = 2)
    return df



# ## Clean Loss Estimated (Gallons|Barrels|Pounds)

# In[75]:


def extract_unit_value(df, new_column, unit):
    '''
    Extract value with specific unit from a potential units: gallons, barrels, pounds
    and columnize each unit
    E.g.:                      |  Gallons  |  Barrels  |  Pounds
          -----------------------------------------------------
                [ 8 gallons ]->|    8      |    0      |    0
               [ 10 barrels ]->|    0      |    10     |    0
              [ 2000 pounds ]->|    0      |    0      |    2000
     [7 barrels, 1000 pounds]->|    0      |    7      |    1000
    '''
    df[new_column] = df['Loss Estimated (Gallons|Barrels|Pounds)'].fillna('0')
    #collect the right value with right unit
    df[new_column] = df[new_column].apply(lambda x: re.findall(r'[0-9,]+(?=\s' + unit + ')', str(x)))
    #replace empty list by 0
    df[new_column] = df[new_column].apply(lambda x: re.sub(r'\[\]', '0', str(x)))
    #choose first element in list of possible values
    df[new_column] = df[new_column].apply(lambda x: re.findall(r'[0-9,]+', str(x))[0])
    #remove comma
    df[new_column] = df[new_column].apply(lambda x: re.sub(r',', "", str(x)))
    #convert number to integer
#     df[new_column] = df[new_column].apply(lambda x: int(x) if str(x) != 'unknown' else x)
    return df


# In[76]:


def clean_loss_estimate(df):
    #  this process will create new clean column with corresponding unit
    df['Loss Estimated (Gallons|Barrels|Pounds)'] = df['Loss Estimated (Gallons|Barrels|Pounds)'].fillna(0)
    df = extract_unit_value(df, 'Gallons', 'gallons')
    df = extract_unit_value(df, 'Barrels', 'barrels')
    df = extract_unit_value(df, 'Pounds', 'pounds')

    # calculate each unit respect to dollars
    df['BarrelsToDollars'] = df['Barrels'].astype(float) * 43
    df['GallonsToDollars'] = df['Gallons'].astype(float) / 42 * 43
    df['PoundsToDollars'] = df['Pounds'].astype(float) / 8.3 / 42 * 43

    # normalize dollar calculation from 3 new columns
    df['$'] = 0
    df['$'] += df['BarrelsToDollars']
    df['$'] = df['$'][df['$'] == 0] + df['GallonsToDollars'][df['$'] == 0]
    df['$'] = df['$'][df['$'] == 0] + df['PoundsToDollars'][df['$'] == 0]

    # clean and format Loss Estimated to have float type
    df['Loss Estimated ($)'] = df['Loss Estimated ($)'].fillna(0).apply(lambda x: re.sub(r',', "", str(x)))
    df['Loss Estimated ($)'] = df['Loss Estimated ($)'].astype(float)

    # clean and format Loss Estimated to have float type
    df['Loss Estimated ($ millions)'] = df['Loss Estimated ($ millions)'].fillna(0).apply(lambda x: re.sub(r',|\[.*\]', "", str(x)))
    df['Loss Estimated ($ millions)'] = df['Loss Estimated ($ millions)'].astype(float)

    # convert value in million unit
    df['Loss Estimated ($ millions)'] = df['Loss Estimated ($ millions)'] + df['Loss Estimated ($)'] / 1000000
    return df


# ## Clean States

# In[79]:


states = {
        'AK': 'Alaska',
        'AL': 'Alabama',
        'AR': 'Arkansas',
        'AS': 'American Samoa',
        'AZ': 'Arizona',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DC': 'District of Columbia',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'GU': 'Guam',
        'HI': 'Hawaii',
        'IA': 'Iowa',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'MA': 'Massachusetts',
        'MD': 'Maryland',
        'ME': 'Maine',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MO': 'Missouri',
        'MP': 'Northern Mariana Islands',
        'MS': 'Mississippi',
        'MT': 'Montana',
        'NA': 'National',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'NE': 'Nebraska',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NV': 'Nevada',
        'NY': 'New York',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'PR': 'Puerto Rico',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VA': 'Virginia',
        'VI': 'Virgin Islands',
        'VT': 'Vermont',
        'WA': 'Washington',
        'WI': 'Wisconsin',
        'WV': 'West Virginia',
        'WY': 'Wyoming'
}


# In[87]:


def clean_state(df):
    df = preprocess_death_data(df)

    #Create an inverse dictionary from state definitions
    inv_state = create_inverse_dict(states)

    #replace field with State abbreviation if State's full name found
    for key, value in inv_state.items():
        df['State_Clean'] = df['State_Clean'].apply(lambda x: re.sub(r'.*', str(value), str(x)) if len(re.findall(str(key), str(x))) > 0 else x)

    # any string length greater than 10 wouldn't be a State or a Country
    # replace those string with 'Unknown'
    df['State_Clean'] = df['State_Clean'].apply(lambda x: str(x).replace(" ",''))
    df['State_Clean'] = df['State_Clean'].apply(lambda x: 'Unknown' if len(str(x)) >= 10 or str(x) == '' else x )

    countries = extract_countries()

    for i in countries:
        df['State_Clean'] = df['State_Clean'].apply(lambda x: 'Unknown' if str(x) == i else x )

    # also clean the Country
    # for Country, any string length >=3 and < 10 is considered as a potential country
    indices = df['State_Clean'][df.State_Clean != 'Unknown']                                [df.State_Clean.str.len() >= 3]                                [df.Country == 'USA'].index
    df['Country_Clean'] = df['Country']
    df['Country_Clean'].iloc[indices] = df['State_Clean'][df.State_Clean != 'Unknown']                                                        [df.State_Clean.str.len() >= 3]                                                        [df.Country == 'USA']

    # at this point any string length > 3 will be considered 'Unknown'
    replace_indices = df['State_Clean'][df.State_Clean != 'Unknown']                                        [df.State_Clean.str.len() >= 3].index
    df['State_Clean'].iloc[replace_indices] = 'Unknown'

    # Some States are not US State -> set those to unknown
    df['State_Clean'] = df['State_Clean'].apply(lambda x: str(x) if len([i for i in states.keys() if i == str(x)]) > 0 else 'Unknown')

    return df


# In[81]:


def extract_countries():
    countries = []
    for i in pycountry.countries:
        countries.append(i.name)
    return countries


# In[82]:


def preprocess_death_data(df):
    #remove utf-8 encoded
    df['State_Clean'] = df['State'].apply(lambda x: re.sub(r'\\xa0', ' ', str(x)))

    # remove words in lowercase/unrelated
    df['State_Clean'] = df['State_Clean'].apply(lambda x: re.sub(r'\b[a-z]+\b', '', str(x)))
    return df


# In[83]:


def create_inverse_dict(items):
    #Create an inverse dictionary from item definitions
    inv_dict = {}
    for key, value in items.items():
        inv_dict[value] = key
    return inv_dict


# ## Clean DEATH

# In[91]:


def text2int(textnum, numwords={}):
    if not numwords:
        units = [
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
        "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
        "sixteen", "seventeen", "eighteen", "nineteen",
        ]

        tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

        scales = ["hundred", "thousand", "million", "billion", "trillion"]

        numwords["and"] = (1, 0)
        for idx, word in enumerate(units):    numwords[word] = (1, idx)
        for idx, word in enumerate(tens):     numwords[word] = (1, idx * 10)
        for idx, word in enumerate(scales):   numwords[word] = (10 ** (idx * 3 or 2), 0)

    current = result = 0
    for word in textnum.split():
        if word == 'no':
            return '0'
        if word not in numwords:
            return word
            continue
        scale, increment = numwords[word]
        current = current * scale + increment
        if scale > 100:
            result += current
            current = 0
    return result + current


# * Define cleaning process for death column

# In[92]:


def clean_death(df, feature_name):

    df['Death'] = df['Death'].fillna(0) # set to 0 help to keep data type consistent in cleaning process

    #create new column that is cleaned
    clean_feature_name = feature_name + '_clean'
    #convert 'word number' into integer
    df[clean_feature_name] = df[feature_name].apply(lambda x: text2int(str(x)) if bool(re.compile(r'[0-9]+', re.I).match(str(x))) == False else x)
    #remove ','
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(x).replace(',',""))
    #sometime range between 2 numbers appears, this line replaces with the mean of them
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: np.ceil(np.mean([int(i) for i in re.findall(r'[0-9]+', str(x))]))
                                              if len(re.findall(r'[0-9]+', str(x))) == 2 else x)
    #remove '+'
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(x).replace('+',""))
    #take the first integer as death number in case there are so many integers found
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(x).split()[0] if len(str(x).split()) >= 2 else x)
    #clean unneccessary symbol or number
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: re.sub(r'\[|\]|[a-z]+|\s+|\.0|\'',"",str(x)))

    df[clean_feature_name] = df[clean_feature_name].fillna('UNKNOWN')
    # IF '' found then set unknown
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: re.sub("\'\'","UNKNOWN",str(x)))
#     df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(x).replace("''",''))
    return df


# ## Clean INJURY

# * Same process as death

# In[93]:


def clean_injury(df, feature_name):
    # 'injury' data replace NaN with 0
    df['Injury'] = df['Injury'].fillna(0)

    clean_feature_name = feature_name + '_clean'
    # convert number in text to integer for all field
    df[clean_feature_name] = df[feature_name].apply(lambda x: " ".join([str(text2int(i.lower())) for i in str(x).split() if text2int(i) != 0])
                                        if bool(re.compile(r'[0-9]+', re.I).match(str(x))) == False
                                        else x)
    # extract only number associate with injured person
    get_injure_code = r'[0-9]+[^\d]+?(?:injured|injur)'
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: re.findall(get_injure_code, str(x))
                                            if len(re.findall(get_injure_code, str(x))) >= 1
                                            else x)
    # sum up total injuries
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(np.sum([int(i) for i in re.findall(r'[0-9]+', str(x))]))
                                        if len(re.findall(r'injur', str(x))) >= 1
                                        else x)
    # take last item in the list as final injured number
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(x).split(',')[-1]
                                        if len(re.findall(r'[0-9]+', str(x))) >= 2
                                        else x)
    # clean up decimal point
    df[clean_feature_name] = df[clean_feature_name].apply(lambda x: str(x).replace('0.0', '0') if str(x) == '0.0' else x)
    return df


# ## DATE CLEAN

# ### Define cleaning process for date
#
# Examples:
#
# Context 0: Find and replace 'January 4, 1993, U.S. Coast Guard USCG) Statio' ---> 'January 4, 1993'
#
# Context 1: Find and replace '1940 August 29' --> 1940 Aug 29 --> 1940 08 29 --> 1940-08-29
#
# Context 2: Find and replace '1940-8-29' --> '1940-08-29'
#
# Context 3: Find and replace '1940-08-29 00:02:07' --> 1940-08-29
#

# In[94]:


import calendar

def create_month_dict():
    '''Create 2 type of dictionaries for all months in a year
    E.g. for each type:
    ---> 'January': '01'
    ---> 'Jan': '01'
    '''
    d = dict()
    d1 = dict()
    count=0
    for i in calendar.month_name:
        if count < 10:
            d.update({i: '0'+str(count)})
            d1.update({i[:3]: '0'+str(count)})
        else:
            d.update({i: str(count)})
            d1.update({i[:3]: str(count)})
        count+=1
    d.pop('')
    d1.pop('')
    return d, d1


# In[95]:


def clean_date(df):
    d,d1 = create_month_dict()

    date_finder = re.compile('[A-Z]\w+\s+\d+,\s+\d+')
    # set new column as Date_clean and start finding the context such as'August 07, 1990'
    df['Date_clean'] = df.Date.apply(lambda x: date_finder.findall(str(x)) if len(date_finder.findall(str(x))) > 0 else x)

    # convert 07-March-2017 to 07-03-2017
    for key, value in d.items():
        df.Date_clean = df.Date_clean.apply(lambda x: re.sub(key, value, str(x)) if len(re.findall(key, str(x))) > 0 else x)

    # convert 07-Mar-2017 to 07-03-2017
    for key, value in d1.items():
        df.Date_clean = df.Date_clean.apply(lambda x: re.sub(key, value, str(x)) if len(re.findall(key, str(x))) > 0 else x)

    df.Date_clean = df.Date_clean.apply(lambda x: re.sub(r',', '', str(x)))
    date_finder_v2 = re.compile(r'\d+\s+\d+\s+\d+')
    # find cell having 2 or more repeat dates and take the first item
    df.Date_clean = df.Date_clean.apply(lambda x: date_finder_v2.findall(str(x))[0]
                                        if len(date_finder_v2.findall(str(x))) > 1 else x)
    # find cell having only 1 date
    df.Date_clean = df.Date_clean.apply(lambda x: date_finder_v2.findall(str(x))[0]
                                        if len(date_finder_v2.findall(str(x))) > 0 else x)

    # format month ending in 1 digit to 2 digits
    # e.g. 07-1-1990 07-01-1990
    df.Date_clean = df.Date_clean.apply(lambda x: re.sub(r'\s(?=\d\s)',' 0',str(x))
                                        if len(re.findall(r'\s\d{1}\s',str(x))) > 0 else x)

    # replace space by '-'
    # e.g. '2005 03 23 00:00:00' to '2005-03-23 00:00:00'
    df.Date_clean = df.Date_clean.apply(lambda x: re.sub(r'\s','-',str(x))
                                        if len(re.findall(r'\s\d{2}\s',str(x))) > 0 else x)
    # remove time keep date
    # e.g. '2005-03-23 00:00:00' to '2005-03-23'
    df.Date_clean = df.Date_clean.apply(lambda x: re.sub(r'\s\d{2}\:\d{2}:\d{2}','',str(x))
                                        if len(re.findall(r'\s\d{2}\:\d{2}:\d{2}',str(x))) > 0 else x)
    # '--' to '-'
    df.Date_clean = df.Date_clean.apply(lambda x: re.sub(r'--','-',str(x))
                                        if len(re.findall(r'--',str(x))) > 0 else x)
    # '1898' to '1898-01-01'
#     df.Date_clean = df.Date_clean.apply(lambda x: str(x) + '-01-01'
#                                         if len(str(x)) == 4 else x)
    # set unknown for cell having no date
    df.Date_clean = df.Date_clean.apply(lambda x: 'UNKNOWN' if len(str(x)) > 10 else x)

    # convert date in string to datetime
    df.Date_clean = pd.to_datetime(df.Date_clean[df.Date_clean != 'UNKNOWN'])

    # remove date before 1900 which is undefined after exporting
    df.Date_clean = df.Date_clean.apply(lambda x: 'UNKNOWN' if x < pd.to_datetime('1900-01-01') else x)

    #convert all field again to datetime
    df.Date_clean = pd.to_datetime(df.Date_clean[df.Date_clean != 'UNKNOWN'])

    return df


if __name__ == '__name__':
    df = main()
    writer = pd.ExcelWriter("energy_discruption_clean_v5.xlsx")
    df.to_excel(writer,'energy_discruption_clean_v5')
    writer.save()
