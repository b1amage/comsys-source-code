- This is a demo api for project of Intro to ComSys COSC2500 at RMIT
- Author: Nguyen Luu Quoc Bao
- APIs:

  - https://weather-api-comsys.herokuapp.com/ : Get command from command.json and send to pi

  - https://weather-api-comsys.herokuapp.com/${location} : Call api on a specific location with weatherstack

  - https://weather-api-comsys.herokuapp.com/pi/${command} : Request pi to measure one in [pressure, temperature, humidty]

  - https://weather-api-comsys.herokuapp.com/pi/data/measure : Get the data measured from the pi send to client

  - https://weather-api-comsys.herokuapp.com/pi/req/${temperature}/${humidity}/${pressure} : Pi write the data measured to the file on server

  - https://weather-api-comsys.herokuapp.com/write/chart/${temperature}/${humidity}/${pressure} : Write the data measured to the chart file on server

  - https://weather-api-comsys.herokuapp.com/pi/get/chart/${command} : Send chart data based on client require (one in [pressure, temperature, humidty])
