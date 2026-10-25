"use client";
import {useMemo,useState} from "react";
import {Bell,Clock3,Info,TrendingUp} from "lucide-react";
type Match={at:string;win:boolean;rr:number;agent:string};
const formatter=(hour:number)=>String(hour%24).padStart(2,"0")+":00";
const getBerlinHour=(date:Date)=>Number(new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Berlin",hour:"2-digit",hourCycle:"h23"}).format(date));
function wilson(w:number,n:number){if(!n)return [0,1];const z=1.96,p=w/n,d=1+z*z/n,mid=(p+z*z/(2*n))/d,delta=z*Math.sqrt((p*(1-p)+z*z/(4*n))/n)/d;return [Math.max(0,mid-delta),Math.min(1,mid+delta)];}
export function QueueForecast({games}:{games:Match[]}){
 const [agent,setAgent]=useState("All agents");
 const [offset,setOffset]=useState(0);
 const now=new Date();const localHour=getBerlinHour(new Date(now.getTime()+offset*3600000));
 const records=useMemo(()=>games.filter(x=>agent==="All agents"||x.agent===agent),[games,agent]);
 const slots=[0,1,2,3,4,5].map(a=>{const hour=(localHour+a)%24;const subset=records.filter(g=>Math.abs(getBerlinHour(new Date(g.at))-hour)<=1||Math.abs(getBerlinHour(new Date(g.at))-hour)>=23);const w=subset.filter(g=>g.win).length;const rate=subset.length?w/subset.length:0;const interval=wilson(w,subset.length);const avgRR=subset.length?subset.reduce((sum,g)=>sum+g.rr,0)/subset.length:0;return{hour,n:subset.length,w,rate,interval,avgRR};});
 const valid=slots.filter(x=>x.n>=20);
 const best=[...valid].sort((a,b)=>b.interval[0]-a.interval[0])[0];
 const current=slots[0];const meaningful=best&&best.hour!==current.hour&&best.interval[0]>current.interval[1];
 const label=(x:typeof current)=>x.n<20?"Insufficient data":x.rate>=0.55?"Historically favorable":x.rate<0.45?"Historically unfavorable":"Typical range";
 return <section className="forecast" id="queue-forecast">
 <div className="forecast-heading"><div><span className="overline">00 / PRE-QUEUE INTELLIGENCE</span><h2>Queue forecast<span className="forecast-beta"> BETA</span></h2><p>Explore historically stronger playtime windows. Not a prediction of your next match.</p></div><div className="forecast-control"><label htmlFor="forecastAgent">AGENT</label><select id="forecastAgent" value={agent} onChange={e=>setAgent(e.target.value)}><option>All agents</option><option>Omen</option><option>KAY/O</option></select></div></div>
 <div className="forecast-main"><div className="forecast-current"><span className="forecast-kicker"><span className="forecast-dot"/> CURRENT WINDOW · {formatter(localHour)} BERLIN</span><strong>{label(current)}</strong><p>{current.n} historical demo matches near this time · {current.n?Math.round(current.rate*100)+"% observed win rate":"No observations"}</p><div className="forecast-interval">95% uncertainty interval: {current.n?(current.interval[0]*100).toFixed(0)+"–"+(current.interval[1]*100).toFixed(0)+"%":"Not available"}</div></div><div className="forecast-advice"><div className="forecast-advice-title"><TrendingUp size={20}/> YOUR NEXT WINDOWS</div>{meaningful?<><strong>{formatter(best.hour)} has a stronger historical signal</strong><p>Its 95% interval does not overlap the current window. This still does not establish causation.</p></>:<><strong>No reliable time advantage detected</strong><p>We cannot confidently recommend waiting based on these matches. Consider energy, focus and how you feel before queuing.</p></>}<div className="forecast-advice-foot"><Bell size={15}/> Reminder notifications can be added after real data and user opt-in.</div></div></div>
 <div className="forecast-slots">{slots.map((s,i)=><div className="forecast-slot" key={i}><span>{i===0?"NOW":"IN "+i+"H"}</span><strong>{formatter(s.hour)}</strong><div className="forecast-slotmeter"><i style={{width:s.n?Math.round(s.rate*100)+"%":"0%"}}/></div><b>{s.n>=20?Math.round(s.rate*100)+"% WR":"LOW DATA"}</b><small>{s.n} matches · {s.avgRR>=0?"+":""}{s.avgRR.toFixed(1)} RR/match</small></div>)}</div>
 <div className="forecast-disclaimer"><Info size={15}/><span>This prototype uses synthetic fixtures, not your account. Times are Europe/Berlin and calculated from historical ±1-hour windows. A minimum of 20 matches is needed to display a rate. Avoid treating a percentage as a future win probability.</span></div>
 </section>
}
