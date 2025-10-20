const axios = require('axios');

const footballApiUrlStandings = 'https://site.api.espn.com/apis/v2/sports/football/nfl/standings';
const footballApiUrlSchedule = 'https://cdn.espn.com/core/nfl/schedule?xhr=1&year={YEAR}&week={WEEK}';

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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
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
            "ties": 0,
            "teamMappings": {}
        }
    ];


    return fantasyTeams;
}

async function getStandingsData(){
    const data = await makeAPICall(footballApiUrlStandings);
    const scheduleData = await getScheduleData();

    var scheduleDataOutput = [];
    var fantasyTeams = getFantasyTeams();


    //add all teams into one array
    var teamsData = data.children[0].standings.entries;
    teamsData = teamsData.concat(data.children[1].standings.entries);

    //make variable for tracking currentWins, currentLosses, currentTies
    var currentWins = 0;
    var currentLosses = 0;
    var currentTies = 0;

    //make a hash map to store team mapping to owner
    var teamToOwnerMapping = {};

    //loop through each fantasy team and get the wins and loses for each of their teams
    for(var x=0; x<fantasyTeams.length; x++){
        for(var y=0; y<teamsData.length; y++){

            if(!teamToOwnerMapping.hasOwnProperty(teamsData[y].team.abbreviation)){
                teamToOwnerMapping[teamsData[y].team.abbreviation] = {
                    owner:"",
                    wins:0,
                    losses:0,
                    ties:0,
                    fullName:"",
                    logo:"",
                    games:[]
                }
            }

            if(fantasyTeams[x].teams.includes(teamsData[y].team.displayName)){

                teamToOwnerMapping[teamsData[y].team.abbreviation].owner = fantasyTeams[x].name;
                
                currentWins = 0;
                currentLosses = 0;
                currentTies = 0;    
                //loop through the "stats" and find the wins, losses, and ties and add them to the fantasy team
                for(var z=0; z<teamsData[y].stats.length; z++){
                    if(teamsData[y].stats[z].name === "wins"){
                        fantasyTeams[x].wins += teamsData[y].stats[z].value;
                        currentWins = teamsData[y].stats[z].value
                        teamToOwnerMapping[teamsData[y].team.abbreviation].wins = teamsData[y].stats[z].value;
                    }
                    if(teamsData[y].stats[z].name === "losses"){
                        fantasyTeams[x].losses += teamsData[y].stats[z].value;
                        currentLosses = teamsData[y].stats[z].value;
                        teamToOwnerMapping[teamsData[y].team.abbreviation].losses = teamsData[y].stats[z].value;
                    }  
                    if(teamsData[y].stats[z].name === "ties"){
                        fantasyTeams[x].ties += teamsData[y].stats[z].value;
                        fantasyTeams[x].wins += (teamsData[y].stats[z].value)/2;
                        fantasyTeams[x].losses += (teamsData[y].stats[z].value)/2;
                        currentTies = teamsData[y].stats[z].value;
                        teamToOwnerMapping[teamsData[y].team.abbreviation].ties = teamsData[y].stats[z].value
                    }    

                }

                //add to displayTeams array
                fantasyTeams[x].displayTeams.push({
                    displayName: teamsData[y].team.displayName,
                    wins: currentWins,
                    losses: currentLosses,
                    ties: currentTies,
                    displayNameAndRecord:`${teamsData[y].team.displayName} (${currentWins}-${currentLosses}-${currentTies})`,
                    logoUrl: teamsData[y].team.logos[0].href
                });

                //add values to team mapping
                teamToOwnerMapping[teamsData[y].team.abbreviation].fullName = teamsData[y].team.displayName;
                teamToOwnerMapping[teamsData[y].team.abbreviation].logo = teamsData[y].team.logos[0].href;
                
                //sort the displayTeams by wins to show teams in order of wins
                fantasyTeams[x].displayTeams.sort((a, b) => (b.wins + b.ties) - (a.wins + a.ties));
                    
            }
        }
    } 

    for(var v=0;v<fantasyTeams.length;v++){
        fantasyTeams[v].teamMappings = teamToOwnerMapping;
    }   

    //make a schedule object, games per day (scheduleDataOutput)
    for(var key in scheduleData.content.schedule){
        //grab the first game time and get the data for it
       
        for(var x=0;x<scheduleData.content.schedule[key].games.length;x++){
            var currentGame = {
                gameTime:scheduleData.content.schedule[key].games[x].date,
                awayTeamAbbrv:"",
                awayTeamLogo:"",
                awayTeamFullName:"",
                awayTeamOwner:"",
                awayTeamScore: 0,
                homeTeamAbbrv:"",
                homeTeamLogo:"",
                homeTeamFullName:"",
                homeTeamOwner:"",
                homeTeamScore: 0
            }  
            
            for(var y=0;y<scheduleData.content.schedule[key].games[x].competitions[0].competitors.length;y++){
                if(scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].homeAway == 'home'){
                    currentGame.homeTeamAbbrv =  scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].team.abbreviation;
                    currentGame.homeTeamLogo =  scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].team.logo;
                    currentGame.homeTeamFullName = scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].team.displayName;
                    currentGame.homeTeamScore = scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].score;
                    currentGame.homeTeamOwner = teamToOwnerMapping[currentGame.homeTeamAbbrv].owner;
                }else{
                    currentGame.awayTeamAbbrv =  scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].team.abbreviation;
                    currentGame.awayTeamLogo =  scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].team.logo;
                    currentGame.awayTeamFullName = scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].team.displayName;
                    currentGame.awayTeamScore = scheduleData.content.schedule[key].games[x].competitions[0].competitors[y].score;
                    currentGame.awayTeamOwner = teamToOwnerMapping[currentGame.awayTeamAbbrv].owner;
                }
            }

            scheduleDataOutput.push(currentGame);

            //add game to team mapping
            teamToOwnerMapping[currentGame.awayTeamAbbrv].games.push(currentGame);
            teamToOwnerMapping[currentGame.homeTeamAbbrv].games.push(currentGame);

        }

    }

    var outputData = {
        standings:fantasyTeams,
        schedule:scheduleDataOutput,
        teamMapping:teamToOwnerMapping
    }


    return outputData;
    
}

async function getStandings(){
    var allData = await getStandingsData();
    var fantasyTeams = allData.standings;

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
            [fantasyTeams[x].name, fantasyTeams[x].displayTeams[0].displayNameAndRecord ,"", fantasyTeams[x].displayTeams[1].displayNameAndRecord,"", fantasyTeams[x].displayTeams[2].displayNameAndRecord,""]);
    }

    //stringify output and return
    return JSON.stringify(outputJson);

}

async function GetStandingsStringifyed(){
    return JSON.stringify( await getStandingsData());

};

//get the current NFL week based on today's date
function getCurrentNFLWeek(today = new Date()) {
  const seasonStart = new Date('2025-09-04'); // NFL 2025 season start date
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;

  const diff = today - seasonStart;
  if (diff < 0) return 0; // Season hasn't started yet

  const week = Math.floor(diff / msPerWeek) + 1;
  return week;
} 


async function getScheduleData(){

    //construt URL
    var scheduleUrl = footballApiUrlSchedule.replace("{YEAR}", new Date().getFullYear());
    scheduleUrl = scheduleUrl.replace("{WEEK}", getCurrentNFLWeek()); //hardcoded for week 1 for now    

    const data = await makeAPICall(scheduleUrl);

    return data

}

async function getScheduleStringifyed(){
    return JSON.stringify( await getScheduleData());    
}

async function getAllData(){
    const standings = await getStandingsData();
    const schedule = await getScheduleData();
    var allData = {
        standings: standings,
        schedule: schedule
    };
    return allData;
}

async function getAllDataStringifyed(){
    return JSON.stringify(getAllData());
}







module.exports = {
    getStandings,
    getGoogleSheetStandings,
    getStandingsData,
    GetStandingsStringifyed,
    getAllData,
    getAllDataStringifyed
}