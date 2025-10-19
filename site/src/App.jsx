import React, { useState,useEffect  } from 'react';
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
  const [stats, setStats] = useState([]);

  

  const onRowSelect = (event) => {
    setCurrentPlayer(event.data);
    setDialogVisible(true);    
  };

  //get data
  useEffect(() => {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      setStats(data);
    });
  }, []);


  return (
    <div className="p-4 bg-gray-100 fff-body-tag">
      <ScrollTop />

        <div className='flex justify-center '>
          <div className="flex items-center gap-2 p-3 shadow-md bg-white">
            <Image src={logo} alt="Image" width="125" />
            <h1 className='text-2xl p-4 text-shadow-md'>Family Fantasy Football 2025-2026</h1>
          </div>
        </div>

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


