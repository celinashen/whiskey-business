from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import re
import requests, bs4
import random
import time
import copy

sampleInput = ["Sherry", "Vodka", "Test"]
options = Options()
options.headless = True
browser = webdriver.Firefox(options=options)

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3',
    'Referer': 'http://www.google.com/',
    'Upgrade-Insecure-Requests': '1',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
}


class Drink:
    def __init__(self, URL, pictureURL):
        self.URL = URL
        self.name = ''
        self.ingredients = []
        self.pictureURL = pictureURL
        self.missingIngredients = []
    def setName(self, name):
        self.name = name
    def setIngredients(self, ingredients):
        self.ingredients = ingredients



def Find(string):
    # findall() has been used
    # with valid conditions for urls in string
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
    url = re.findall(regex, string)
    return [x[0] for x in url]


def replaceWhiskey(string):
    if string == "Whiskey":
        return "Whisk(e)y"
    else:
        return string


def getRecipeLinks(ingredientsArray):
    url = 'https://punchdrink.com/recipe-archives/'
    browser.get(url)

    browser.find_element_by_class_name("recipe-filter__show-toggle").click()
    for ingredient in list(map(replaceWhiskey, ingredientsArray)):
        try:
            browser.find_element_by_id(ingredient).click()
        except:
            print("Ingredient called '"+ingredient+"' not found")

    links = browser.find_elements_by_class_name("recipe-tease__figure")
    tempArray = []
    for link in links:
        #print(link.get_attribute('innerHTML'))
        #tempArray.append(re.search("(?P<url>https?:// [^\s]+)", link.get_attribute('innerHTML')).group("url")) # Return the URL within the get_attribute string
        drink = Drink(Find(link.get_attribute('innerHTML'))[0], Find(link.get_attribute('innerHTML'))[1])
        tempArray.append(drink)
    return tempArray


def getDrinks(ingredientsInput):
    allDrinks = getRecipeLinks(ingredientsInput)
    drinks = []
    for drink in allDrinks:
        time.sleep(random.random() * 4) # Wait random amount of time to prevent scraper from being detected

        res = requests.get(drink.URL, headers=headers)
        res.raise_for_status()
        recipeSoup = bs4.BeautifulSoup(res.text, "html.parser")

        # Getting Ingredients
        ingredientsParent = recipeSoup.find("ul", {"class": "ingredients-list"})
        children = ingredientsParent.findChildren("li", recursive=False)
        ingredients = []
        for child in children:
            ingredients.append(child.text.strip())
        drink.setIngredients(ingredients)

        # Getting Name
        name = recipeSoup.find("h1", {"class": "entry-title text-center"}).text
        drink.setName(name)

    return allDrinks


def fillMissingIngredients(sampleInput):
    tempArray = []
    for drink in getDrinks(sampleInput):
        drink.missingIngredients = copy.deepcopy(drink.ingredients)
        for longIngredient in drink.ingredients:
            for ingredient in sampleInput:
                if ingredient.lower() in longIngredient.lower():
                    drink.missingIngredients.remove(longIngredient)
        tempArray.append(drink)
    return tempArray


for drink in fillMissingIngredients(sampleInput):
    print("Name: " + drink.name + ", " + drink.URL + ", " + drink.pictureURL)
    print(drink.ingredients)
    print(drink.missingIngredients)
    print("-------------------")

