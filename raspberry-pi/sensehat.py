from sense_hat import *
import time
from datetime import datetime
import json
import requests

# Initialise SenseHat
sense = SenseHat()

# Collect data from sensors
def get_sense_data():
    """
    Collect inputs from sensors
    """
    collector = [] # create an empty array
    collector.append(datetime.now().strftime("%b %d %Y %H:%M:%S"))
    collector.append(format(sense.temp, ".2f"))
    collector.append(format(sense.humidity, ".2f"))
    collector.append(format(sense.pressure, ".2f"))
    return collector

# Write SenseHat data to .json file
def read_file():
    """
    Reading .json file
    """
    with open('data.json', 'r') as f:
        return json.load(f)

def write_file(time, temp, humid, pres):
    
    """
    Write data to .json file
    """
    # Get the readings from sense hat
    data = {
    "Date & Time": time,
    "Temperature": temp,
    "Humidity": humid,
    "Pressure": pres,
    }

    arr = read_file()
    # print(arr)
    arr.append(data)

    with open('data.json', 'w') as f:
        json.dump(arr, f)


def fetch_api(location, command, measurement):
    api_url = f'https://weather-api-comsys.herokuapp.com/'

    api_link = requests.get(api_url)

    if api_link.json() == "":
        return "No command"

    return api_link.json() if api_link.json()['isSuccess'] else False


def write_data(temperature, humidity, pressure):
    url = f'https://weather-api-comsys.herokuapp.com/pi/req/{temperature}/{humidity}/{pressure}'
    requests.get(url)
    
def write_chart(temperature, humidity, pressure):
    url = f'https://weather-api-comsys.herokuapp.com/write/chart/{temperature}/{humidity}/{pressure}'
    requests.get(url)

# --- Main Program ---
if __name__ == '__main__':
    string_data = ["Date&Time:", "Temperature:", "Humidity:", "Pressure:"] #show_string array
    time_zone = ["09:00:00", "09:00:01", "09:00:02"] #standard time for measurement
    while True:
        # Collect data to draw chart
        if datetime.now().strftime("%H:%M:%S") in time_zone:
            sense.show_message("Collecting data...")
            write_chart(format(sense.temp, ".2f"), format(sense.humidity, ".2f"), format(sense.pressure, ".2f"))
            
            # display on SenseHat
            sense_data = get_sense_data()
            write_file(sense_data[0],sense_data[1],sense_data[2],sense_data[3]) #write to json file on Raspberry Pi
            for i in range(4): 
                sense.show_message(string_data[i])
                sense.show_message(sense_data[1])
            sense.show_message("Finished!")
        
        # Send data to user if there is a request
        write_data(format(sense.temp, ".2f"), format(sense.humidity, ".2f"), format(sense.pressure, ".2f"))
    
