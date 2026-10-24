// Portfolio demonstration reconstructed from the student's Ankara class slides.
// Reproducible calculations; not a production banking decision system.
'use strict';
const districts = [
  {name:'Çankaya',values:[952198,180,9.8,409,9.5]},
  {name:'Yenimahalle',values:[721531,130,9.0,150,8.8]},
  {name:'Keçiören',values:[931722,100,8.2,57,8.0]},
  {name:'Sincan',values:[605366,80,7.5,45,7.2]},
  {name:'Mamak',values:[690329,70,6.8,33,7.0]},
  {name:'Etimesgut',values:[632458,90,7.8,50,7.8]},
];
const criteria = [
  {label:'Nüfus',benefit:true},
  {label:'Kira göstergesi',benefit:false},
  {label:'Ticari hareketlilik',benefit:true},
  {label:'Mevcut şube / rekabet',benefit:false},
  {label:'Ulaşım kolaylığı',benefit:true},
];
const pairwise=[
 [1,2,1,3,3],
 [.5,1,1,2,2],
 [1,1,1,3,2],
 [1/3,.5,1/3,1,1],
 [1/3,.5,.5,1,1],
];
const presets = {
  balanced:[25,20,25,15,15],
  growth:[45,5,35,5,10],
  cost:[8,43,8,36,5],
};
let rawWeights=presets.balanced.slice();
const $=id=>document.getElementById(id);
const fmt=(n,d=2)=>Number(n).toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d});
function normalizeWeights(v){const total=v.reduce((a,b)=>a+b,0);return v.map(n=>total===0?.2:n/total)}
function ahpWeights(){const sum=[0,1,2,3,4].map(j=>pairwise.reduce((s,row)=>s+row[j],0));return pairwise.map(row=>row.reduce((s,v,j)=>s+v/sum[j],0)/5)}
function scoresMinMax(){const min=criteria.map((_,j)=>Math.min(...districts.map(x=>x.values[j])));const max=criteria.map((_,j)=>Math.max(...districts.map(x=>x.values[j])));return districts.map(row=>row.values.map((x,j)=> max[j]===min[j]?5:10*(criteria[j].benefit?x-min[j]:max[j]-x)/(max[j]-min[j])))}
const normalized=scoresMinMax();
function mcdm(w){return normalized.map(row=>row.reduce((s,n,j)=>s+n*w[j],0))}
function topsis(w){const norms=criteria.map((_,j)=>Math.sqrt(districts.reduce((sum,d)=>sum+d.values[j]**2,0)));const weighted=districts.map(d=>d.values.map((v,j)=>v/norms[j]*w[j]));const ideal=criteria.map((c,j)=>c.benefit?Math.max(...weighted.map(r=>r[j])):Math.min(...weighted.map(r=>r[j])));const anti=criteria.map((c,j)=>c.benefit?Math.min(...weighted.map(r=>r[j])):Math.max(...weighted.map(r=>r[j])));return weighted.map(r=>{const dPlus=Math.hypot(...r.map((v,j)=>v-ideal[j]));const dMinus=Math.hypot(...r.map((v,j)=>v-anti[j]));return dPlus+dMinus===0?.5:dMinus/(dPlus+dMinus)})}
const fixedAHP=mcdm(ahpWeights());
function best(scores){return scores.reduce((acc,s,i)=>s>scores[acc]?i:acc,0)}
function render(){const w=normalizeWeights(rawWeights);const m=mcdm(w);const t=topsis(w);const a=fixedAHP;const mWinner=best(m),tWinner=best(t),aWinner=best(a);$('bestMCDM').textContent=districts[mWinner].name;$('bestMCDMValue').textContent=fmt(m[mWinner])+' / 10';$('bestTOPSIS').textContent=districts[tWinner].name;$('bestTOPSISValue').textContent='Ci '+fmt(t[tWinner],3);$('bestAHP').textContent=districts[aWinner].name;$('bestAHPValue').textContent=fmt(a[aWinner])+' / 10';
  $('weightNote').textContent='Girdi toplamı: %'+rawWeights.reduce((a,b)=>a+b,0)+' · Hesaplamada otomatik %100’e normalize edilir.';
  document.querySelectorAll('.criterion input').forEach((input,j)=>{const value=rawWeights[j];input.value=value;input.setAttribute('aria-valuenow',String(value));input.parentElement.querySelector('.weight-value').textContent='%'+value});
  const order=districts.map((_,i)=>i).sort((i,j)=>m[j]-m[i]);
  $('ranking').innerHTML=order.map(i=>`<div class="rank-row ${i===mWinner?'winner':''}"><span>${districts[i].name}</span><div class="track"><div class="fill" style="width:${Math.max(0,Math.min(100,m[i]*10)).toFixed(2)}%"></div></div><span class="value">${fmt(m[i])}</span></div>`).join('');
  $('scores').innerHTML=order.map(i=>`<tr class="${i===mWinner?'highlight':''}"><td>${districts[i].name}</td><td>${fmt(m[i])}</td><td>${fmt(t[i],3)}</td><td>${fmt(a[i])}</td></tr>`).join('');
}
function buildInputs(){ $('criteria').innerHTML=criteria.map((c,i)=>`<div class="criterion"><label class="crit-head" for="weight${i}"><span>${c.label}</span><span class="weight-value">%${rawWeights[i]}</span></label><input id="weight${i}" type="range" min="0" max="60" step="1" value="${rawWeights[i]}" aria-label="${c.label} ağırlığı"><div class="hint">${c.benefit?'Fayda kriteri: yüksek daha iyi':'Maliyet kriteri: düşük daha iyi'}</div></div>`).join('');
  document.querySelectorAll('.criterion input').forEach((el,i)=>el.addEventListener('input',e=>{rawWeights[i]=Number(e.target.value);document.querySelectorAll('.preset').forEach(b=>b.setAttribute('aria-pressed','false'));render()}));
  document.querySelectorAll('.preset').forEach(button=>button.addEventListener('click',()=>{rawWeights=presets[button.dataset.preset].slice();document.querySelectorAll('.preset').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render()}));
}
buildInputs();render();
