import React from 'react'
import { Card } from 'primereact/card'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { ScrollTop } from 'primereact/scrolltop';
import { Fieldset } from 'primereact/fieldset';



export default function App() {
  return (
    <div className="p-m-4">
      <ScrollTop />

      <Card title="Family Fantasy Football" className="p-mb-4">
        <DataTable value={stats}  header="Winners Leaderboard" sortField="wins" sortOrder={-1}>
            <Column field="name" header="Name"></Column>
            <Column field="wins" header="Wins"></Column>
        </DataTable>
        <br/>
        <DataTable value={stats} header="Losers Leaderboard" sortField="losses" sortOrder={-1}>
            <Column field="name" header="Name"></Column>
            <Column field="losses" header="Losses"></Column>
        </DataTable>
      </Card>
      <br/>

      {stats.map((player, index) => (
        <div key={index}>
            {/* <Card
                title={player.name}
                className="md:w-25rem">
                <p className="m-0">
                Hello world
                </p>
            </Card> */}
            <Fieldset legend={player.name}>
                {stats[index].displayTeams.map((team, displayTeamIndex) => (
                    <div key={displayTeamIndex}>
                        <p className="m-0"> {team.displayNameAndRecord} </p>
                    </div>
                ))}
            </Fieldset>
            <br/>
        </div>
        ))}




    </div>
  )
}

const stats = [
  {
    "name": "Beau",
    "teams": [
      "Philadelphia Eagles",
      "Atlanta Falcons",
      "Jacksonville Jaguars"
    ],
    "displayTeams": [
      {
        "displayName": "Jacksonville Jaguars",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Jacksonville Jaguars (4-2-0)"
      },
      {
        "displayName": "Philadelphia Eagles",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Philadelphia Eagles (4-2-0)"
      },
      {
        "displayName": "Atlanta Falcons",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Atlanta Falcons (3-2-0)"
      }
    ],
    "wins": 11,
    "losses": 6,
    "ties": 0
  },
  {
    "name": "Beth",
    "teams": [
      "Minnesota Vikings",
      "Pittsburgh Steelers",
      "Houston Texans"
    ],
    "displayTeams": [
      {
        "displayName": "Pittsburgh Steelers",
        "wins": 4,
        "losses": 1,
        "ties": 0,
        "displayNameAndRecord": "Pittsburgh Steelers (4-1-0)"
      },
      {
        "displayName": "Minnesota Vikings",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Minnesota Vikings (3-2-0)"
      },
      {
        "displayName": "Houston Texans",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Houston Texans (2-3-0)"
      }
    ],
    "wins": 9,
    "losses": 6,
    "ties": 0
  },
  {
    "name": "Brandon",
    "teams": [
      "Los Angeles Rams",
      "Tampa Bay Buccaneers",
      "New England Patriots"
    ],
    "displayTeams": [
      {
        "displayName": "Tampa Bay Buccaneers",
        "wins": 5,
        "losses": 1,
        "ties": 0,
        "displayNameAndRecord": "Tampa Bay Buccaneers (5-1-0)"
      },
      {
        "displayName": "New England Patriots",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "New England Patriots (4-2-0)"
      },
      {
        "displayName": "Los Angeles Rams",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Los Angeles Rams (4-2-0)"
      }
    ],
    "wins": 13,
    "losses": 5,
    "ties": 0
  },
  {
    "name": "Jonas",
    "teams": [
      "New York Jets",
      "New Orleans Saints",
      "Indianapolis Colts"
    ],
    "displayTeams": [
      {
        "displayName": "Indianapolis Colts",
        "wins": 5,
        "losses": 1,
        "ties": 0,
        "displayNameAndRecord": "Indianapolis Colts (5-1-0)"
      },
      {
        "displayName": "New Orleans Saints",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "New Orleans Saints (1-5-0)"
      },
      {
        "displayName": "New York Jets",
        "wins": 0,
        "losses": 6,
        "ties": 0,
        "displayNameAndRecord": "New York Jets (0-6-0)"
      }
    ],
    "wins": 6,
    "losses": 12,
    "ties": 0
  },
  {
    "name": "Lauren",
    "teams": [
      "Cleveland Browns",
      "New York Giants",
      "Dallas Cowboys"
    ],
    "displayTeams": [
      {
        "displayName": "Dallas Cowboys",
        "wins": 2,
        "losses": 3,
        "ties": 1,
        "displayNameAndRecord": "Dallas Cowboys (2-3-1)"
      },
      {
        "displayName": "New York Giants",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "displayNameAndRecord": "New York Giants (2-4-0)"
      },
      {
        "displayName": "Cleveland Browns",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Cleveland Browns (1-5-0)"
      }
    ],
    "wins": 5.5,
    "losses": 12.5,
    "ties": 1
  },
  {
    "name": "Maria",
    "teams": [
      "Baltimore Ravens",
      "San Francisco 49ers",
      "Cincinnati Bengals"
    ],
    "displayTeams": [
      {
        "displayName": "San Francisco 49ers",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "San Francisco 49ers (4-2-0)"
      },
      {
        "displayName": "Cincinnati Bengals",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "displayNameAndRecord": "Cincinnati Bengals (2-4-0)"
      },
      {
        "displayName": "Baltimore Ravens",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Baltimore Ravens (1-5-0)"
      }
    ],
    "wins": 7,
    "losses": 11,
    "ties": 0
  },
  {
    "name": "Mitch",
    "teams": [
      "Buffalo Bills",
      "Green Bay Packers",
      "Washington Commanders"
    ],
    "displayTeams": [
      {
        "displayName": "Buffalo Bills",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Buffalo Bills (4-2-0)"
      },
      {
        "displayName": "Green Bay Packers",
        "wins": 3,
        "losses": 1,
        "ties": 1,
        "displayNameAndRecord": "Green Bay Packers (3-1-1)"
      },
      {
        "displayName": "Washington Commanders",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Washington Commanders (3-3-0)"
      }
    ],
    "wins": 10.5,
    "losses": 6.5,
    "ties": 1
  },
  {
    "name": "Stephen",
    "teams": [
      "Las Vegas Raiders",
      "Carolina Panthers",
      "Tennessee Titans"
    ],
    "displayTeams": [
      {
        "displayName": "Carolina Panthers",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Carolina Panthers (3-3-0)"
      },
      {
        "displayName": "Las Vegas Raiders",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "displayNameAndRecord": "Las Vegas Raiders (2-4-0)"
      },
      {
        "displayName": "Tennessee Titans",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Tennessee Titans (1-5-0)"
      }
    ],
    "wins": 6,
    "losses": 12,
    "ties": 0
  },
  {
    "name": "Taylor",
    "teams": [
      "Detroit Lions",
      "Miami Dolphins",
      "Los Angeles Chargers"
    ],
    "displayTeams": [
      {
        "displayName": "Los Angeles Chargers",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Los Angeles Chargers (4-2-0)"
      },
      {
        "displayName": "Detroit Lions",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Detroit Lions (4-2-0)"
      },
      {
        "displayName": "Miami Dolphins",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Miami Dolphins (1-5-0)"
      }
    ],
    "wins": 9,
    "losses": 9,
    "ties": 0
  },
  {
    "name": "Theresa",
    "teams": [
      "Denver Broncos",
      "Chicago Bears",
      "Kansas City Chiefs"
    ],
    "displayTeams": [
      {
        "displayName": "Denver Broncos",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Denver Broncos (4-2-0)"
      },
      {
        "displayName": "Kansas City Chiefs",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Kansas City Chiefs (3-3-0)"
      },
      {
        "displayName": "Chicago Bears",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Chicago Bears (3-2-0)"
      }
    ],
    "wins": 10,
    "losses": 7,
    "ties": 0
  }
]