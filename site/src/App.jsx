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
import { SpeedDial } from 'primereact/speeddial';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dock } from 'primereact/dock';
import logo from './img/logo-family-fantasy-football.png';
import iconTeam from './img/icon-team.png';

export default function App() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentGlobalPlayer, setCurrentGlobalPlayer] = useState(null);
  const [stats, setStats] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [teamMapping, setTeamMapping] = useState(null);

  
  const onRowSelect = (event) => {
    setCurrentPlayer(event.data);
    setDialogVisible(true);    
  };

  const highlightPlayer = (event) => {
    if(typeof event === 'string' || event instanceof String){
          console.log(event)
          setCurrentGlobalPlayer(event);
          localStorage.setItem('currentGlobalPlayer', event); 
    }
  }

   const items = [
        {
            label: 'LeaderBoard',
            icon: () => <Avatar icon="pi pi-list" size="xlarge" onClick={() => scrollToSection('leaderBoardSection')}/>
        },
        {
            label: 'Teams Teams',
            icon: () => <Avatar icon="pi pi-id-card" size="xlarge" onClick={() => scrollToSection('teamsSection')}/>,
        },
        {
            label: 'Schedule',
            icon: () => <Avatar icon="pi pi-calendar" size="xlarge" onClick={() => scrollToSection('scheduleSection')}/>,
        },
        {
            labe: 'Player Select',
            icon: () => <SpeedDial model={stats} direction="up" showIcon="pi pi-user" style={{ left: -15, bottom: 10, position: 'fixed' }} />

        }
    ];

    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };




  //get data
  useEffect(() => {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      setSchedule(data.schedule);
      setTeamMapping(data.teamMapping)

      for(var x=0;x<data.standings.length;x++){
        data.standings[x].command = ( (data) => highlightPlayer(data));
        data.standings[x].template = (item, options) => (
          <Button onClick={(e) => {
            options.onClick?.(e); // preserves SpeedDial behavior
            item.command?.(item.name);     // triggers your custom command
          }} style={{width:'95px'}}>
            {item.name}  
          </Button>
        )
      }

      setStats(data.standings);

      const savedPlayer = localStorage.getItem('currentGlobalPlayer');
      if (savedPlayer) {
        setCurrentGlobalPlayer(savedPlayer);
      }

    });
  }, []);


  return (
    <div className="p-4 bg-gray-100 fff-body-tag">
      {/* <SpeedDial model={stats} direction="up" showIcon="pi pi-user" style={{ left: 10, bottom: 10, position: 'fixed' }} /> */}


        {/* Start Leader Boards */}
        <div className='flex justify-center ' id="leaderBoardSection">
          <div className="flex items-center gap-2 p-3 shadow-md bg-white">
            <Image src={logo} alt="Image" width="125" />
            <h1 className='text-2xl p-4 text-shadow-md'>Family Fantasy Football 2025-2026</h1>
          </div>
        </div>

        <br></br>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6 " >
          <div >
            <DataTable value={stats}  header="Winners Leaderboard" sortField="wins" sortOrder={-1} onRowSelect={onRowSelect} selectionMode="single" 
            className="shadow-md fff-winners-table" 
            rowClassName={(rowData) => rowData.name === currentGlobalPlayer ? 'fff-current-global-player' : '' }> 
              <Column field="name" header="Name"></Column>
              <Column field="wins" header="Wins"></Column>
            </DataTable>
          </div>
          <div>
            <DataTable value={stats} header="Losers Leaderboard" sortField="losses" sortOrder={-1} onRowSelect={onRowSelect} selectionMode="single" 
            className="shadow-md fff-losers-table"
            rowClassName={(rowData) => rowData.name === currentGlobalPlayer ? 'fff-current-global-player font-bold' : '' }>
              <Column field="name" header="Name"></Column>
              <Column field="losses" header="Losses"></Column>
            </DataTable>  
          </div>
        </div>

        <br/>        
        <br/>
        {/* End Leader Boards */}


      {/* Start Team Ownership */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  gap-4" id="teamsSection">
         {stats.map((player, index) => (
        <div key={index} className={player.name === currentGlobalPlayer ? 'fff-current-global-player' : ''}>
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
      {/* End Team Ownership */}
     
      {/* Start Dialog */}
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
      {/* End Dialog */}

      <br/><br/>

      {/* Schedule */}
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-4" id="scheduleSection">
        {schedule?.map((game, gameIndex) => (
           
           <Card key={gameIndex} className={`shadow-md ${  currentGlobalPlayer === game.homeTeamOwner || currentGlobalPlayer === game.awayTeamOwner ? 'fff-current-global-player' : ''}`}> 
           {new Date(game.gameTime).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })}<br/>
           <Divider></Divider>
           <div className='p-1'>
              <div className="flex items-center gap-2">
                  <Avatar  image={game.awayTeamLogo} size="large"/>
                  <span>{game.awayTeamFullName}</span>
                  {game.awayTeamOwner &&  <Tag value={game.awayTeamOwner} rounded/> }
                  <span className="ml-auto p-3">{game.awayTeamScore}</span>
              </div>  
            </div>  
            <div className='p-1'>
              <div className="flex items-center gap-2">
                <Avatar  image={game.homeTeamLogo} size="large"/>
                <span>{game.homeTeamFullName}</span>
                {game.homeTeamOwner && <Tag value={game.homeTeamOwner} rounded/> }
                <span className="ml-auto p-3">{game.homeTeamScore}</span>
              </div>   
            </div>   
           </Card>
        ))}


      </div>
      {/* End Schedule */}

      <br/><br/>


        
      <Dock model={items} position="bottom" style={{position:'fixed'}}/>

      <br/><br/>
    </div>
  )
}


