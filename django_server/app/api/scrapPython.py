import requests
import re
import json
from bs4 import BeautifulSoup
from requests.models import Response


def getYaImg(adress,page):
    url = adress + page
    response = requests.get(url)
    resImg = ""
    soup = BeautifulSoup(response.text, 'lxml')
    try:
        quotes = soup.find('div', class_="program-controller__gallery")
        imgs = quotes.findAll('meta')
        if(imgs.__len__() == 1):
            return(imgs[0].attrs['content'] )
        else:
            return(imgs[2].attrs['content'] )
    except:
        return("https://oldestatehotel.com/files/oldestate/image/no_product.jpg")

def deleteText(text):
    temp = text.replace('"','')
    res = temp.replace('Показать еще','')
    return(res)

def yaScrap(adress, page):
    url = adress + page
    response = requests.get(url)
    res = " {\"programs\":["
    soup = BeautifulSoup(response.text, 'lxml')
    quotes = soup.find('ul', class_="channel-schedule__list")
    programs = quotes.find_all('li', class_="channel-schedule__event")
    i = 1
    for program in programs:
        if (i != 1):
            res += ",\"timeEnd\": \""+ program.contents[1].next + "\"},"
        elif(i>1):
            res += "},"
        res += "{"
        res += "\"image\": "+ "\""+getYaImg(adress, program.contents[0].attrs['href'])+ "\","  
        
        res += "\"timeStart\": \""+program.contents[1].next + "\", \"name\": \"" + program.contents[2].text.replace('"','') +"\""
        i+=1
    
    res+="}]}"
    res= json.loads(res)
    return res
    

def getMailImg(soup):
    quotes = soup.find('div', class_="block padding_bottom_70 js-module")


def mailScrap(adress):
    url = adress
    res = "{\"programs\":["
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    quotes = soup.find('div', class_="block padding_bottom_70 js-module")
    programs = quotes.find_all('div', class_="p-programms__item")
    i = 1
    for program in programs:
        if (i != 1):
            res += ",\"timeEnd\": \""+ program.attrs['data-start'] + "\"},"
        elif(i>1):
            res += "},"
        res += "{"
        res += "\"timeStart\": \""+program.attrs['data-start'] + "\", \"name\": \"" + deleteText(program.text[5:]) +"\""
        i+=1
    res+="}]}"
    res= json.loads(res)
    return(res)

def getDays(adress, page):
    url = adress + page
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    days = soup.find_all('div',class_="calendar__item-wrapper")
    res = "{\"date\":[{"
    i = 0
    for day in days:        
        if i <=14:
            if 'href' in day.contents[0].attrs:
                if i != 0:
                    res += "},{"
                i+=1
                res +="\"day\": \"" + day.contents[0].attrs["href"].split("=")[1] + "\""
    res+= "}]}"
    res= json.loads(res) 
    return res

def uploadDB(adress, page, day):
    url = adress + page+ "?date=" + day
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    res = " {\"programs\":["                               
    quotes = soup.find('ul', class_="channel-schedule__list")
    if quotes != None:
        programs = quotes.find_all('li', class_="channel-schedule__event")
        i = 1        
        for program in programs:
            if (i != 1):
                res += ",\"timeEnd\": \""+ program.contents[1].next + "\"},"
            elif(i>1):
                res += "},"
            res += "{"
            res += "\"date\": \""+  day.contents[0].attrs['href'].split("=")[1] + "\","
            res += "\"image\": "+ "\""+getYaImg(adress, program.contents[0].attrs['href'])+ "\","  
            
            res += "\"timeStart\": \""+program.contents[1].next + "\", \"name\": \"" + program.contents[2].text.replace('"','') +"\""
            i+=1
        res+="} }]}"    
    res= json.loads(res) 
    return res

mailScrap("https://tv.mail.ru/moskva/channel/850/")


