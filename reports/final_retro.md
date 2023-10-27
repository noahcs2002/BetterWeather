# CSC425 Final Project Retrospective

- Noah Sternberg
- CSC425 - Dr. Owen

## Project Overview
For this class, the task I was charged with was to create a web-app that utilises a web service and a cloud service, and
is well polished visually. I started with several ideas: a baseball team manager app based off of my CSC325 final project,
a tool to help people learn the Dutch standard language (similar to DuoLingo but  only for the dutch language), and several others,
but finally settled on creating a Weather App. 

## Retrospective
I spent a week planning out what I wanted to include in the app, as well as 
laying out what issue I'm looking to fix by creating this app, and I settled on BetterWeather.
BetterWeather was designed to be an initially free to use, ad-free web app to give relevant weather information to the users
without overloading them with unneeded weather information. Just the basics: hourly and weekly forecast, precipitation chances,
and some information about how windy it is, the humidity etc. 

### What Went Well
Here are some things I think went particularly well with the application development cycle:

- Version control practices
- JIRA issue reporting
- CI/CD use

#### Version Control Practices
I have had two internships, both of which used wildly different version control principles, and I chose to use the IBM method 
of version control. Each APAR and RFE gets documented in JIRA, and assigned a code (BET-xx). From there, you create a branch
in your repo, both remotely and locally called 'pr/BET-xx-some-description', and check all changes into that. Then you make a PR for 
that branch against `main` and merge it in, and delete the branch. Each major feature that is included gets a release, which gets a snapshot branch.

For example, when I added a major bug sweep, I decided it was time to make a release, so I made V1.3.0 and then made a 1.3.0.snapshot
branch of the code that serves as a backup of the latest release, so that if things go horribly wrong (which they did, twice),
I had an easy back up.

#### JIRA
For a project like this, I created an Issues style project in JIRA. I knew that I had a lot of time on my hands and could
easily work through an entire "sprint"'s worth of work in 2 hours, so I decided to forego the Agile methodology and just use
an Issue style methodology. I had Bugs, Tasks, and Improvements that were tracked, and that worked really nicely in the end.

The methodology works for you, not the other way around. Choosing to abandon agile for this project is what helped it go 
over smoothly. Locking myself to agile wasn't going to help me in the end.

#### CI/CD
For this project I used [GitHub Actions](https://github.com/features/actions) to incorporate a free CI/CD pipeline. In this
instance I used only the CI part, but that is because I wasn't live-deploying this site in real time. If I had been, then the CD
would have been handy.

Being able to immediately know if my code that I checked in was going to break a build was a MUST for this project, and 
will be for all projects in the future. Pairing this with a [good version control system](#version-control-practices) meant that my changes
were isolated from the production build, and only integrated into the build when I knew for good and certain that the build was safe from being 
demolished by the changes.

### What Went Not-So-Well
The biggest issue was with the library I used to handle all my visualisations for the weather. I used the [Plotly.JS](https://plotly.com/javascript/)
library to handle all my plotting and visualisations, and, to its credit, it wasn't the issue. The issue comes with the apparently 
potent combination of Plotly.JS, the Create-React-App skeleton and Jest, the testing framework I used.

From what I have researched, Jest uses a DOM-less approach to testing, that is, it renders the app in its own runtime and not on a screen. Remember this, it will be important in a minute. Plotly.JS is a graphing library: you give it a few configuration objects and arrays of data and say go, and it gives you a plot to throw on the screen. However, it does this by overloading the `window.URL.createObjectUrl()` function from the global DOM. No big deal. Well, recall that Jest is a DOM-less testing framework. How does the Plotly.JS library override a function from a DOM that doesn't exist? It kicks and screams about not being able to until you find a workaround. There are 3 ways to work around this: 1) mock the function out, 2) use a DOM mocker like jsdom or some other mocker, or 3) configure the `package.json` file to change the environment to be a test-dom environment.

Mocking the function out requires a top-level override from the `Create-React-App` framework, and thus something like `window.URL.createObjectUrl = jest.fn()` or `window.URL.createObjectUrl = function() {}` won't get applied in the right places, just in the tests, so that's out. `Create-React-App` only allows modifications to certain components of the `package.json` file, intending to prevent 
users from shooting themselves in the foot (or perhaps the face), and modifying the document's environment isn't one of them, so that's out. All that's left is to use a DOM-mocker, which also can't be configured because of `Create-React-App`, so we are out of options.

What this translates into is that a good portion of my application cannot be unit tested, which is not ideal.

### Some Things I learned
I had never used React, and had only minimally used HTML and CSS before this project, and so I learned it fully for this project.
I also learned how to unit test, as well as how to properly format API calls.
### What Will I Never Do Again
One thing that I will make sure that I never do again is using a graphing library that cannot be unit tested using the framework I chose. I also am unlikely to do anything other than mobile-first development again, since accommodating to mobile is really difficult after the fact.

### What Will I Do On My Next Project

