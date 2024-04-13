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
import os 
from dotenv import load_dotenv

# Get the MongoDb url from .env file
load_dotenv()
uri = os.getenv('MONGO_URL')
client = MongoClient(uri)

# print(client.list_database_names())

mydb = client['fantasy_swimming']
# print(mydb.list_collection_names())
mycol = mydb['users']

test_user = {'username': "testPython", 'password': 'IWatchValorant'}

mycol.insert_one(test_user)











# ROSTER GETTING 
meetlink = "https://www.swimcloud.com/results/296313/"
# meetlink = "https://www.swimcloud.com/results/293735/"

# Function to get the teams at the meetlink URL
def getMeetTeams(meetlink):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options = chrome_options)
    ignored_exceptions = (NoSuchElementException, StaleElementReferenceException,)

    driver.get(meetlink)
    html = driver.page_source

    soup = BeautifulSoup(html, 'html.parser')

    tag = soup.find_all('a', class_ = 'u-text-semi u-nowrap')
    team_ids = [a['href'].split('/')[-2] for a in tag]
    team_names = [a.get_text(strip=True) for a in tag]

    team_dict = {team_names[i]: team_ids[i] for i in range(len(team_names))}
    return team_dict

# Function to get all swimmers on the teams
def getMeetRosters(team_dict):
    for team in team_dict:
        TEAMID = team_dict[team]
        team_roster = ss.getRoster(team = team, gender= "M", team_ID= TEAMID, year = 2023)
        print(team)
        for i in team_roster:
            print(i)

# allTeams = getMeetTeams(meetlink)
# getMeetRosters(allTeams)