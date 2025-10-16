const axios = require('axios');

const footballApiUrlStandings = 'https://site.api.espn.com/apis/v2/sports/football/nfl/standings';

//Get today's date in YYYY-MM-DD format
function getTodaysDate() {
    // produce YYYY-MM-DD in US Central time
    const now = new Date();
    return now.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' });
}

function getTodaysDateAndTime() {
    // produce YYYY-MM-DD HH:MM in US Central time
    const now = new Date();
    return now.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' }) + ' ' + now.toLocaleTimeString('en-CA', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: false });
}

//Fetch data from the API
async function makeAPICall(apiURL) {
    try {
        const fullRequestUrl = apiURL;; 
        const response = await axios.get(fullRequestUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from the API:', error.stack || error);
        throw error; // rethrow so server can send 500 and log details
    }
}

function getFantasyTeams(){
    var fantasyTeams = [
        {
            "name": "Beau",
            "teams": [
            "Philadelphia Eagles",
            "Atlanta Falcons",
            "Jacksonville Jaguars"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Beth",
            "teams": [
            "Minnesota Vikings",
            "Pittsburgh Steelers",
            "Houston Texans"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Brandon",
            "teams": [
            "Los Angeles Rams",
            "Tampa Bay Buccaneers",
            "New England Patriots"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Jonas",
            "teams": [
            "New York Jets",
            "New Orleans Saints",
            "Indianapolis Colts"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Lauren",
            "teams": [
            "Cleveland Browns",
            "New York Giants",
            "Dallas Cowboys"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Maria",
            "teams": [
            "Baltimore Ravens",
            "San Francisco 49ers",
            "Cincinnati Bengals"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Mitch",
            "teams": [
            "Buffalo Bills",
            "Green Bay Packers",
            "Washington Commanders"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Stephen",
            "teams": [
            "Las Vegas Raiders",
            "Carolina Panthers",
            "Tennessee Titans"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Taylor",
            "teams": [
            "Detroit Lions",
            "Miami Dolphins",
            "Los Angeles Chargers"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        },
        {
            "name": "Theresa",
            "teams": [
            "Denver Broncos",
            "Chicago Bears",
            "Kansas City Chiefs"
            ],
            "displayTeams":[],
            "wins": 0,
            "losses": 0,
            "ties": 0
        }
    ];


    return fantasyTeams;
}

async function getStandingsData(){
    const data = await makeAPICall(footballApiUrlStandings);
    var fantasyTeams = getFantasyTeams();


    //add all teams into one array
    var teamsData = data.children[0].standings.entries;
    teamsData = teamsData.concat(data.children[1].standings.entries);

    //make variable for tracking currentWins, currentLosses, currentTies
    var currentWins = 0;
    var currentLosses = 0;
    var currentTies = 0;


    //loop through each fantasy team and get the wins and loses for each of their teams
    for(var x=0; x<fantasyTeams.length; x++){
        for(var y=0; y<teamsData.length; y++){
            if(fantasyTeams[x].teams.includes(teamsData[y].team.displayName)){
                
                currentWins = 0;
                currentLosses = 0;
                currentTies = 0;    
                //loop through the "stats" and find the wins, losses, and ties and add them to the fantasy team
                for(var z=0; z<teamsData[y].stats.length; z++){
                    if(teamsData[y].stats[z].name === "wins"){
                        fantasyTeams[x].wins += teamsData[y].stats[z].value;
                        currentWins = teamsData[y].stats[z].value
                    }
                    if(teamsData[y].stats[z].name === "losses"){
                        fantasyTeams[x].losses += teamsData[y].stats[z].value;
                        currentLosses = teamsData[y].stats[z].value
                    }  
                    if(teamsData[y].stats[z].name === "ties"){
                        fantasyTeams[x].ties += teamsData[y].stats[z].value;
                        fantasyTeams[x].wins += (teamsData[y].stats[z].value)/2;
                        fantasyTeams[x].losses += (teamsData[y].stats[z].value)/2;
                        currentTies = teamsData[y].stats[z].value;
                    }    

                }
                fantasyTeams[x].displayName.push(`${teamsData[y].team.displayName} (${currentWins}-${currentLosses}-${currentTies})`);
            }
        }
    } 
    
    return fantasyTeams;
    
}

async function getStandings(){
    var fantasyTeams = await getStandingsData();

     //create winners scorboard
    var outputWinners = "=== Winners Leaderboard ===\n";

    //sort fantasy teams by wins
    fantasyTeams.sort((a, b) => b.wins - a.wins);

    for(var x=0; x<fantasyTeams.length; x++){
        outputWinners += `${fantasyTeams[x].name}: ${fantasyTeams[x].wins}\n`;
    }

    outputWinners+="===========================\n \n"

    //create losers scoreboard
    var outputLosers = "=== Losers Leaderboard ===\n";

    //sort fantasy teams by losses
    fantasyTeams.sort((a, b) => b.losses - a.losses);

    for(var x=0; x<fantasyTeams.length; x++){
        outputLosers += `${fantasyTeams[x].name}: ${fantasyTeams[x].losses}\n`;
    }   
    outputLosers+="===========================\n"

    return (outputWinners + outputLosers);

}

async function getGoogleSheetStandings(){
    var fantasyTeams = await getStandingsData();
    var fantasyTeamsWinners = JSON.parse(JSON.stringify(fantasyTeams));;
    var fantasyTeamsLosers = JSON.parse(JSON.stringify(fantasyTeamsWinners));
    
    //sort the winners
    fantasyTeamsWinners.sort((a, b) => b.wins - a.wins);

    //sort the losers
    fantasyTeamsLosers.sort((a, b) => b.losses - a.losses);

    //construct the json object to return
    var outputJson = [
        ["Winners Leaderboard","","","Losers Leaderboard",""]
    ]

    //add winners an losers
    for(var x=0; x<fantasyTeamsWinners.length; x++){
        outputJson.push(
            [fantasyTeamsWinners[x].name, fantasyTeamsWinners[x].wins, "", fantasyTeamsLosers[x].name, fantasyTeamsLosers[x].losses]
        );
    }

    
    //add spacer + timestamp
    outputJson.push(["","","","",""]);
    outputJson.push([`Last updated: ${getTodaysDateAndTime()} CST`]);

    //add spacer + team rosters
    outputJson.push(["","","","",""]);
    outputJson.push(["Player","Team 1",""," Team 2","","Team 3",""]);
    for(var x=0; x<fantasyTeams.length; x++){
        outputJson.push(
            [fantasyTeams[x].name, fantasyTeams[x].displayName[0] ,"", fantasyTeams[x].displayName[1],"", fantasyTeams[x].displayName[2],""]);
    }

    //stringify output and return
    return JSON.stringify(outputJson);

}





module.exports = {
    getStandings,
    getGoogleSheetStandings
}