![banner](https://github.com/Morgrynn/locate-charging-stations/blob/master/banner.png)

# LocaleCharge 
Visit Website [LocaleCharge] (http://localcharge2020-789789.s3-website-us-east-1.amazonaws.com)

# Locate Charging Stations
> This is a graded exercise to showcase Reactjs, Expressjs, Nodejs and MySql

# Table of contents

- [Project Title](#localecharge)
- [Demo-Preview](#demo-preview)
- [Table of contents](#table-of-contents)
- [Project information](#project-information)
    -[Project Goal](#project-goal)
    -[Basic Functionality](#basic-functionality)
    -[Functional requirements for web application](#functional-requirements-for-web-application)
- [Usage](#usage)
- [Development](#development)
- [Contribute](#contribute)
    - [Sponsor](#sponsor)
    - [Adding new features or fixing bugs](#adding-new-features-or-fixing-bugs)
- [License](#license)
- [Footer](#footer)

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


<!-- The project title should be self explanotory and try not to make it a mouthful. (Although exceptions exist- **awesome-readme-writing-guide-for-open-source-projects** - would have been a cool name)

Add a cover/banner image for your README. **Why?** Because it easily **grabs people's attention** and it **looks cool**(*duh!obviously!*).

The best dimensions for the banner is **1280x650px**. You could also use this for social preview of your repo.

I personally use [**Canva**](https://www.canva.com/) for creating the banner images. All the basic stuff is **free**(*you won't need the pro version in most cases*).

There are endless badges that you could use in your projects. And they do depend on the project. Some of the ones that I commonly use in every projects are given below. 

I use [**Shields IO**](https://shields.io/) for making badges. It is a simple and easy to use tool that you can use for almost all your badge cravings. -->

<!-- Some badges that you could use -->

<!-- ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases)
: This badge shows the version of the current release.

![GitHub last commit](https://img.shields.io/github/last-commit/navendu-pottekkat/awesome-readme)
: I think it is self-explanatory. This gives people an idea about how the project is being maintained.

![GitHub issues](https://img.shields.io/github/issues-raw/navendu-pottekkat/awesome-readme)
: This is a dynamic badge from [**Shields IO**](https://shields.io/) that tracks issues in your project and gets updated automatically. It gives the user an idea about the issues and they can just click the badge to view the issues.

![GitHub pull requests](https://img.shields.io/github/issues-pr/navendu-pottekkat/awesome-readme)
: This is also a dynamic badge that tracks pull requests. This notifies the maintainers of the project when a new pull request comes.

![GitHub All Releases](https://img.shields.io/github/downloads/navendu-pottekkat/awesome-readme/total): If you are not like me and your project gets a lot of downloads(*I envy you*) then you should have a badge that shows the number of downloads! This lets others know how **Awesome** your project is and is worth contributing to.

![GitHub](https://img.shields.io/github/license/navendu-pottekkat/awesome-readme)
: This shows what kind of open-source license your project uses. This is good idea as it lets people know how they can use your project for themselves.

![Tweet](https://img.shields.io/twitter/url?style=flat-square&logo=twitter&url=https%3A%2F%2Fnavendu.me%2Fnsfw-filter%2Findex.html): This is not essential but it is a cool way to let others know about your project! Clicking this button automatically opens twitter and writes a tweet about your project and link to it. All the user has to do is to click tweet. Isn't that neat? -->

# Demo-Preview

<!-- Add a demo for your project -->

<!-- After you have written about your project, it is a good idea to have a demo/preview(**video/gif/screenshots** are good options) of your project so that people can know what to expect in your project. You could also add the demo in the previous section with the product description.

Here is a random GIF as a placeholder.

![Random GIF](https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif) -->

