import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { ScrollTop } from 'primereact/scrolltop';
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import { Card } from 'primereact/card';
import logo from './img/logo-family-fantasy-football.png';

export default function App() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const onRowSelect = (event) => {
    setCurrentPlayer(event.data);
    setDialogVisible(true);    
  };


  return (
    <div className="p-4 bg-gray-100 fff-body-tag">
      <ScrollTop />

      {/* <Card className="shadow-md"> */}
        <div className='flex justify-center '>
          <div className="flex items-center gap-2 p-3 shadow-md bg-white">
            <Image src={logo} alt="Image" width="125" />
            <h1 className='text-2xl p-4 text-shadow-md'>Family Fantasy Football 2025-2026</h1>
          </div>
        </div>
      {/* </Card>       */}

<br></br>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 ">
          <div >
            <DataTable value={stats}  header="Winners Leaderboard" sortField="wins" sortOrder={-1} onRowSelect={onRowSelect} selectionMode="single" className="shadow-md fff-winners-table"> 
              <Column field="name" header="Name"></Column>
              <Column field="wins" header="Wins"></Column>
            </DataTable>
          </div>
          <div>
            <DataTable value={stats} header="Losers Leaderboard" sortField="losses" sortOrder={-1} onRowSelect={onRowSelect} selectionMode="single" className="shadow-md fff-losers-table">
              <Column field="name" header="Name"></Column>
              <Column field="losses" header="Losses"></Column>
            </DataTable>  
          </div>
        </div>

        <br/>
        
      <br/>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-4">
         {stats.map((player, index) => (
        <div key={index} >
            <Fieldset legend={player.name} className='shadow-md p-2' >
              <div className="grid grid-cols-3">
                <div className="flex items-center gap-2 p-3">
                  <Avatar label="W" size="normal" className='shadow-sm fff-winner-stat'/>
                  <span>{player.wins}</span>
                </div>
                <div className="flex items-center gap-2 p-3">
                  <Avatar label="L" size="normal" className='shadow-sm fff-losers-stat'/>
                  <span>{player.losses}</span>
                </div> 
                <div className="flex items-center gap-2 p-3">
                  <Avatar label="T" size="normal" className='shadow-sm'/>
                  <span>{player.ties}</span>
                </div>   
              </div>
              <Divider />
              <div> 
                {stats[index].displayTeams.map((team, displayTeamIndex) => (
                    <div key={displayTeamIndex} className='p-1'>
                        <div className="flex items-center gap-2">
                            <Avatar  image={team.logoUrl}  size="large"/>
                            <span>{team.displayNameAndRecord}</span>
                        </div>                          
                    </div>
                ))}
              </div>                
            </Fieldset>
            <br/>
        </div>
        ))}
      </div>
     

      <Dialog header={currentPlayer?.name || ''} visible={dialogVisible}  onHide={() => {if (!dialogVisible) return; setDialogVisible(false); }} className='min-w-md fff-dialog'>
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-2 p-3">
            <Avatar label="W" size="normal" className='shadow-sm fff-winner-stat'/>
            <span>{currentPlayer?.wins}</span>
          </div>
          <div className="flex items-center gap-2 p-3">
            <Avatar label="L" size="normal" className='shadow-sm fff-losers-stat'/>
            <span>{currentPlayer?.losses}</span>
          </div> 
          <div className="flex items-center gap-2 p-3">
            <Avatar label="T" size="normal" className='shadow-sm'/>
            <span>{currentPlayer?.ties}</span>
          </div>   
        </div>
        <Divider />
        {currentPlayer?.displayTeams.map((team, displayTeamIndex) => (
                    <div key={displayTeamIndex} className='p-1'>
                        <div className="flex items-center gap-2">
                            <Avatar  image={team.logoUrl} size="large"/>
                            <span>{team.displayNameAndRecord}</span>
                        </div>                          
                    </div>
        ))}
      </Dialog>


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
        "displayNameAndRecord": "Jacksonville Jaguars (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png"
      },
      {
        "displayName": "Philadelphia Eagles",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Philadelphia Eagles (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png"
      },
      {
        "displayName": "Atlanta Falcons",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Atlanta Falcons (3-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png"
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
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Pittsburgh Steelers (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png"
      },
      {
        "displayName": "Minnesota Vikings",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Minnesota Vikings (3-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/min.png"
      },
      {
        "displayName": "Houston Texans",
        "wins": 2,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Houston Texans (2-3-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png"
      }
    ],
    "wins": 9,
    "losses": 7,
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
        "displayNameAndRecord": "Tampa Bay Buccaneers (5-1-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png"
      },
      {
        "displayName": "New England Patriots",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "New England Patriots (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png"
      },
      {
        "displayName": "Los Angeles Rams",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Los Angeles Rams (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png"
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
        "displayNameAndRecord": "Indianapolis Colts (5-1-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png"
      },
      {
        "displayName": "New Orleans Saints",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "New Orleans Saints (1-5-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/no.png"
      },
      {
        "displayName": "New York Jets",
        "wins": 0,
        "losses": 6,
        "ties": 0,
        "displayNameAndRecord": "New York Jets (0-6-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png"
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
        "displayNameAndRecord": "Dallas Cowboys (2-3-1)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png"
      },
      {
        "displayName": "New York Giants",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "displayNameAndRecord": "New York Giants (2-4-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png"
      },
      {
        "displayName": "Cleveland Browns",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Cleveland Browns (1-5-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png"
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
        "displayNameAndRecord": "San Francisco 49ers (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png"
      },
      {
        "displayName": "Cincinnati Bengals",
        "wins": 3,
        "losses": 4,
        "ties": 0,
        "displayNameAndRecord": "Cincinnati Bengals (3-4-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png"
      },
      {
        "displayName": "Baltimore Ravens",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Baltimore Ravens (1-5-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png"
      }
    ],
    "wins": 8,
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
        "displayNameAndRecord": "Buffalo Bills (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png"
      },
      {
        "displayName": "Green Bay Packers",
        "wins": 3,
        "losses": 1,
        "ties": 1,
        "displayNameAndRecord": "Green Bay Packers (3-1-1)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png"
      },
      {
        "displayName": "Washington Commanders",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Washington Commanders (3-3-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png"
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
        "displayNameAndRecord": "Carolina Panthers (3-3-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/car.png"
      },
      {
        "displayName": "Las Vegas Raiders",
        "wins": 2,
        "losses": 4,
        "ties": 0,
        "displayNameAndRecord": "Las Vegas Raiders (2-4-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png"
      },
      {
        "displayName": "Tennessee Titans",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Tennessee Titans (1-5-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png"
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
        "displayNameAndRecord": "Los Angeles Chargers (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png"
      },
      {
        "displayName": "Detroit Lions",
        "wins": 4,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Detroit Lions (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/det.png"
      },
      {
        "displayName": "Miami Dolphins",
        "wins": 1,
        "losses": 5,
        "ties": 0,
        "displayNameAndRecord": "Miami Dolphins (1-5-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png"
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
        "displayNameAndRecord": "Denver Broncos (4-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/den.png"
      },
      {
        "displayName": "Kansas City Chiefs",
        "wins": 3,
        "losses": 3,
        "ties": 0,
        "displayNameAndRecord": "Kansas City Chiefs (3-3-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png"
      },
      {
        "displayName": "Chicago Bears",
        "wins": 3,
        "losses": 2,
        "ties": 0,
        "displayNameAndRecord": "Chicago Bears (3-2-0)",
        "logoUrl": "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png"
      }
    ],
    "wins": 10,
    "losses": 7,
    "ties": 0
  }
]