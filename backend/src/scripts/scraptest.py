from SwimScraper import SwimScraper as ss
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import sys


# ROSTER GETTING 
meetlink = sys.argv[1] # meet link will be the first command line argument
#meetlink = ""

# Function to get the teams at the meetlink URL
def getMeetTeams(meetlink):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options = chrome_options)

    try:
        ignored_exceptions = (NoSuchElementException, StaleElementReferenceException,)

        driver.get(meetlink)
        html = driver.page_source

        soup = BeautifulSoup(html, 'html.parser')

        tag = soup.find_all('a', class_ = 'u-text-semi u-nowrap')
        team_ids = [a['href'].split('/')[-2] for a in tag]
        team_names = [a.get_text(strip=True) for a in tag]

        team_dict = {team_names[i]: team_ids[i] for i in range(len(team_names))}
        return team_dict

    except Exception as e:
        return None
    
    finally:
        driver.quit()

# Function to get all swimmers on the teams
def getMeetRosters(team_dict):

    #error handle for running script on server
    if team_dict == None or len(team_dict) == 0:
        print('Invalid meet link', flush=True)
        return

    for team in team_dict:
        TEAMID = team_dict[team]
        team_roster = ss.getRoster(team = team, gender= "M", team_ID= TEAMID, year=2024)
            
        for swimmer in team_roster:
            swimmer['team_name'] = team
            print(swimmer, flush=True)

allTeams = getMeetTeams(meetlink)
getMeetRosters(allTeams)