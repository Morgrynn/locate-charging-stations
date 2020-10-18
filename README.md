![banner](https://github.com/Morgrynn/locate-charging-stations/blob/master/assets/banner.png)


![npm](https://img.shields.io/npm/v/npm)

<!-- # LocaleCharge 
Visit Website [LocaleCharge] (http://localcharge2020-789789.s3-website-us-east-1.amazonaws.com) -->

# Locate Charging Stations
> This is a graded exercise to showcase Reactjs, Expressjs, Nodejs and MySql

# Table of contents

- [Project Title](#localecharge)
- [Table of contents](#table-of-contents)
- [Project information](#project-information)
    -[Project Goal](#project-goal)
    -[Basic Functionality](#basic-functionality)
    -[Functional requirements for web application](#functional-requirements-for-web-application)
- [Demo-Preview](#demo-preview)


# Project information
[(Back to top)](#table-of-contents)

### Project Goal
[(Back to top)](#table-of-contents)

    - Implement a web application for an imaginary car charger network provider.
    - The business of the company is to provide electric car chargers across the country
    - They need an application which their customers can use.

### Basic Functionality:
[(Back to top)](#table-of-contents)

    - provides information of the charger locations
    - provides the status and pricing to the customer.
    - customer can use the app to start and stop the charging of car
    - when plugged in they can be billed for the charge.

    Two types of charges:
        - "Slow" 22kW chargers with Type 2 connectors
        - "Fast" 50-150kW chargers with CCS connectors

    Price of charging can be different options:
        - some of the slow chargers are free, but still require application to be used to start the charging
        - some of the slow chargers are paid by the minute (0,20€/min)
        - fast chargers are paid by consumed electricity (18 c/kWh)

### Functional requirements for web application:
[(Back to top)](#table-of-contents)

    - User login system which authenticates and authorizes users to acces the system
        - User should be able browse the charger locations, status and general information without logging in
        - login is required to start the charging process
    - Start charging once the user has connected his car to a charger
        - The charger process is started by entering a four digit string to the system to indicate which charger the customer wants to use ("A4CV" for example). The application should display this four digit code and the code would be visible in the charge station as well. 
    - Monitoring the ongoing charge and its costs
    - Stop charging
    - Browse available chargers ideally on a map (alternatively as a list of some sort). Display at least 20 charging locations in Finland.
        - In both cases there should be a search functionality by the location / charger name
        - Information of the charger type and its status should be visible easily to the user
            - Status free / taken
    - View previous charges and their costs
        - Display date and time information, charger location, its information, charge time, energy used and cost
        - the actual payment of the charges is not covered by this application

# Demo-Preview
[(Back to top)](#table-of-contents)

## Screenshot

![home-screen](https://github.com/Morgrynn/locate-charging-stations/blob/master/assets/screenshot.png)

## Gif 

![locale-charge-gif](https://github.com/Morgrynn/locate-charging-stations/blob/master/assets/localecharge.gif)



