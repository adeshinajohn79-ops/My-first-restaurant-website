// tags: k = kind (Nigerian/Seafood), h = heat 1-3, s = size (light/hearty)
const MENU={
 "Nigerian classics":[
  ["Party jollof rice","6,500","Smoky tomato rice with fried plantain and your choice of chicken or beef.","Nigerian",2,"hearty"],
  ["Egusi soup with pounded yam","8,000","Melon seed soup with leafy greens, assorted meat and stockfish.","Nigerian",2,"hearty"],
  ["Efo riro with eba","7,500","Rich spinach stew cooked in palm oil and locust beans, served with eba.","Nigerian",2,"hearty"],
  ["Beef suya","5,000","Skewers rubbed in yaji spice, grilled over charcoal with onions and tomato.","Nigerian",3,"light"],
  ["Moi moi","3,500","Steamed bean pudding with peppers, egg and fish.","Nigerian",1,"light"],
  ["Ofada rice and ayamase","7,000","Local rice with green pepper stew, assorted meat and boiled egg.","Nigerian",3,"hearty"]],
 "From the sea":[
  ["Grilled tilapia","9,000","Whole fish grilled with pepper and onion, served with plantain.","Seafood",2,"hearty"],
  ["Catfish pepper soup","7,500","Light, peppery broth with fresh catfish, scent leaf and uziza.","Seafood",3,"light"],
  ["Garlic pepper prawns","10,500","Jumbo prawns pan-seared in garlic butter and scotch bonnet.","Seafood",3,"light"],
  ["Seafood okro soup","9,500","Okro soup with prawns, crab, fish and periwinkle, served with fufu.","Seafood",2,"hearty"],
  ["Grilled croaker and yam","9,500","Croaker with yam chips and a fresh pepper dip.","Seafood",1,"hearty"],
  ["Calamari with chilli dip","6,500","Lightly fried squid rings, lemon and a sweet chilli dip.","Seafood",1,"light"]],
 "Sides and drinks":[
  ["Dodo","2,000","Fried ripe plantain.","Side",1,"light"],
  ["Puff puff","2,500","Soft fried dough balls, dusted with sugar.","Side",1,"light"],
  ["Chapman","3,000","Fruity, fizzy and cold, with citrus and bitters.","Drink",1,"light"],
  ["Zobo","2,500","Chilled hibiscus drink with ginger and pineapple.","Drink",1,"light"]]
};
const HOURS=[["Sunday",[12,21]],["Monday",[11,22]],["Tuesday",[11,22]],["Wednesday",[11,22]],["Thursday",[11,22]],["Friday",[11,23]],["Saturday",[11,23]]];
const fmt=h=>{const x=h%24;return ((x%12)||12)+(x>=12?"pm":"am")};
const HEAT=["Mild","Medium","Hot"];

// Dish illustrations
const sv=b=>`<svg viewBox='0 0 64 64' aria-hidden='true'>${b}</svg>`;
const plate=`<circle cx='32' cy='32' r='26' fill='#fff8ea' stroke='#d9c7a6'/>`;
const soup=c=>sv(plate+`<circle cx='32' cy='32' r='19' fill='#2a3470'/><circle cx='32' cy='32' r='16' fill='${c}'/><g fill='#fff' opacity='.45'><circle cx='26' cy='28' r='3'/><circle cx='37' cy='36' r='2.5'/><circle cx='35' cy='26' r='2'/></g>`);
const drink=c=>sv(`<path d='M20 14h24l-4 38a4 4 0 0 1-4 3H28a4 4 0 0 1-4-3z' fill='${c}'/><path d='M20 14h24l-1 10H21z' fill='#fff' opacity='.4'/><line x1='38' y1='6' x2='34' y2='30' stroke='#12283a' stroke-width='3'/>`);
const ICONS={
 rice:sv(plate+`<circle cx='29' cy='30' r='14' fill='#d6451b'/><g fill='#f08a4b'><circle cx='25' cy='26' r='1.6'/><circle cx='32' cy='24' r='1.6'/><circle cx='30' cy='33' r='1.6'/><circle cx='23' cy='33' r='1.6'/><circle cx='36' cy='30' r='1.6'/></g><g fill='#f2b632' stroke='#b9791b'><ellipse cx='44' cy='42' rx='7' ry='4' transform='rotate(-30 44 42)'/><ellipse cx='36' cy='47' rx='7' ry='4' transform='rotate(-10 36 47)'/></g>`),
 soupG:soup('#4e8a3a'),soupY:soup('#d9a21f'),soupR:soup('#c2371b'),
 skewer:sv(`<line x1='8' y1='50' x2='56' y2='14' stroke='#8a5a2b' stroke-width='3' stroke-linecap='round'/><g fill='#7a3b1d'><circle cx='18' cy='43' r='6.5'/><circle cx='27' cy='36' r='6.5'/><circle cx='36' cy='30' r='6.5'/><circle cx='45' cy='23' r='6.5'/></g><g fill='#d63b4a'><circle cx='22' cy='51' r='3'/><circle cx='50' cy='34' r='3'/></g>`),
 fish:sv(`<ellipse cx='30' cy='32' rx='20' ry='11' fill='#9fb4bd' stroke='#5f7882'/><path d='M48 32l10-9v18z' fill='#9fb4bd' stroke='#5f7882'/><circle cx='19' cy='30' r='2' fill='#12283a'/><path d='M26 25q4 7 0 14M34 24q4 8 0 16' stroke='#5f7882' fill='none' stroke-width='2'/>`),
 prawn:sv(`<path d='M18 44q-8-14 6-24q14-8 24 4q4 10-6 14' fill='none' stroke='#ef7a52' stroke-width='9' stroke-linecap='round'/><path d='M42 38l8 6M40 42l6 8' stroke='#c9471f' stroke-width='3' stroke-linecap='round'/><circle cx='21' cy='25' r='1.8' fill='#12283a'/>`),
 snack:sv(`<g fill='#e8a63a' stroke='#b9791b'><circle cx='24' cy='38' r='11'/><circle cx='40' cy='38' r='11'/><circle cx='32' cy='24' r='11'/></g><g fill='#fff' opacity='.7'><circle cx='28' cy='20' r='1.5'/><circle cx='36' cy='26' r='1.5'/><circle cx='22' cy='36' r='1.5'/><circle cx='42' cy='36' r='1.5'/></g>`),
 chapman:drink('#d63b4a'),zobo:drink('#8a1f3d')
};
const IMAP={'Party jollof rice':'rice','Egusi soup with pounded yam':'soupY','Efo riro with eba':'soupG','Beef suya':'skewer','Moi moi':'snack','Ofada rice and ayamase':'rice','Grilled tilapia':'fish','Catfish pepper soup':'soupR','Garlic pepper prawns':'prawn','Seafood okro soup':'soupG','Grilled croaker and yam':'fish','Calamari with chilli dip':'snack','Dodo':'snack','Puff puff':'snack','Chapman':'chapman','Zobo':'zobo'};
const icon=n=>ICONS[IMAP[n]]||ICONS.rice;

// Chips
const OPTS={kind:["Anything","Nigerian","Seafood"],heat:["Any","Mild","Medium","Hot"],size:["Any","Light","Hearty"]};
document.querySelectorAll(".chips").forEach(c=>{
  const n=c.dataset.name;
  OPTS[n].forEach((o,i)=>{
    const id=n+i;
    c.insertAdjacentHTML("beforeend",`<input type="radio" name="${n}" id="${id}" value="${o}"${i===0?" checked":""}><label for="${id}">${o}</label>`);
  });
});
const val=n=>document.querySelector(`input[name="${n}"]:checked`).value;
const all=[];Object.values(MENU).forEach(a=>a.forEach(d=>{if(d[3]==="Nigerian"||d[3]==="Seafood")all.push(d)}));
let current=null;
const res=document.getElementById("result");
document.getElementById("pick").onclick=()=>{
  const k=val("kind"),h=val("heat"),s=val("size");
  let pool=all.filter(d=>(k==="Anything"||d[3]===k)&&(h==="Any"||HEAT[d[4]-1]===h)&&(s==="Any"||d[5]===s.toLowerCase()));
  res.className="";
  if(!pool.length){res.textContent="Nothing matches all three. Try loosening one choice.";return}
  const others=pool.filter(d=>d!==current);if(others.length)pool=others;
  current=pool[Math.floor(Math.random()*pool.length)];
  const [n,p,desc,kind,heat,size]=current;
  res.innerHTML="<div class='ic big'>"+icon(n)+"</div><h3></h3><p class='meta'></p><p class='d'></p><button class='btn alt' type='button' id='add'>Mention it in my reservation</button>";
  res.querySelector("h3").textContent=n;
  res.querySelector(".meta").textContent=kind+", "+HEAT[heat-1].toLowerCase()+", "+size+", ₦"+p;
  res.querySelector(".d").textContent=desc;
  res.querySelector("#add").onclick=()=>{
    const t=document.getElementById("notes");t.value=(t.value?t.value+"\n":"")+"I would like to try: "+n;
    location.hash="reserve";
  };
  void res.offsetWidth;res.className="fresh";
};

// Menu tabs
const tabs=document.querySelector(".tabs"),dishes=document.getElementById("dishes");
Object.keys(MENU).forEach((k,i)=>{
  const b=document.createElement("button");b.type="button";b.setAttribute("role","tab");b.textContent=k;b.setAttribute("aria-selected",i===0);
  b.onclick=()=>{[...tabs.children].forEach(c=>c.setAttribute("aria-selected",c===b));show(k)};
  tabs.appendChild(b);
});
function show(k){
  dishes.innerHTML="";
  MENU[k].forEach(d=>{
    const el=document.createElement("div");el.className="dish";
    el.innerHTML="<div class='ic'>"+icon(d[0])+"</div><h3></h3><span class='price'></span><p></p>";
    el.children[1].textContent=d[0];el.children[2].textContent="₦"+d[1];el.children[3].textContent=d[2];
    dishes.appendChild(el);
  });
}
show(Object.keys(MENU)[0]);

// Hours
const now=new Date(),tb=document.querySelector("#hours tbody");
HOURS.forEach(([d,h],i)=>{
  const tr=document.createElement("tr");if(i===now.getDay())tr.className="today";
  tr.innerHTML="<td></td><td></td>";tr.children[0].textContent=d;tr.children[1].textContent=fmt(h[0])+" to "+fmt(h[1]);
  tb.appendChild(tr);
});

// Dish slideshow
const slides=['Party jollof rice','Grilled tilapia','Beef suya','Egusi soup with pounded yam','Garlic pepper prawns','Catfish pepper soup'].map(n=>all.find(x=>x[0]===n)).filter(Boolean);
const track=document.getElementById('track'),dotsEl=document.getElementById('dots'),showEl=document.getElementById('show');
let si=0,timer=null;
slides.forEach((d,i)=>{
  const s=document.createElement('div');s.className='slide';s.setAttribute('role','group');s.setAttribute('aria-label',(i+1)+' of '+slides.length);
  s.innerHTML="<div class='ic'>"+icon(d[0])+"</div><div><h3></h3><p class='meta'></p><p class='sd'></p><span class='price'></span></div>";
  s.querySelector('h3').textContent=d[0];
  s.querySelector('.meta').textContent=d[3]+', '+HEAT[d[4]-1].toLowerCase();
  s.querySelector('.sd').textContent=d[2];
  s.querySelector('.price').textContent='₦'+d[1];
  track.appendChild(s);
  const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Show dish '+(i+1));b.onclick=()=>{go(i);restart()};
  dotsEl.appendChild(b);
});
function go(i){
  si=(i+slides.length)%slides.length;
  track.style.transform='translateX(-'+(si*100)+'%)';
  [...track.children].forEach((s,k)=>s.setAttribute('aria-hidden',k!==si));
  [...dotsEl.children].forEach((b,k)=>b.setAttribute('aria-current',k===si));
}
function stop(){clearInterval(timer);timer=null}
function restart(){stop();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>go(si+1),5000)}
document.getElementById('prev').onclick=()=>{go(si-1);restart()};
document.getElementById('next').onclick=()=>{go(si+1);restart()};
showEl.addEventListener('mouseenter',stop);showEl.addEventListener('focusin',stop);
showEl.addEventListener('mouseleave',restart);showEl.addEventListener('focusout',restart);
go(0);restart();

// House favourites on the home page
const favEl=document.getElementById('fav');
['Party jollof rice','Beef suya','Garlic pepper prawns'].forEach(n=>{
  const d=all.find(x=>x[0]===n);if(!d)return;
  const a=document.createElement('a');a.className='fav';a.href='#menu';
  a.innerHTML="<div class='ic'>"+icon(n)+"</div><h3></h3><p></p><span class='price'></span>";
  a.querySelector('h3').textContent=n;a.querySelector('p').textContent=d[2];a.querySelector('.price').textContent='₦'+d[1];
  favEl.appendChild(a);
});

// Page routing: each page is a view named in the URL hash
const VIEWS=["home","menu","finder","about","reserve"],TITLES={home:"Lugard Dishes",menu:"Menu",finder:"Find a dish",about:"About",reserve:"Reserve"};
function route(){
  let h=location.hash.slice(1);if(!VIEWS.includes(h))h="home";
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("on",v.id===h));
  document.querySelectorAll("nav a").forEach(a=>{if(a.getAttribute("href")==="#"+h)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  document.title=h==="home"?"Lugard Dishes":TITLES[h]+" | Lugard Dishes";
  window.scrollTo(0,0);
}
addEventListener("hashchange",route);route();

// Reservation form: opens the visitor's email app with a prefilled message
const time=document.getElementById("time"),party=document.getElementById("party"),date=document.getElementById("date");
for(let h=12;h<=21;h++)["00","30"].forEach(m=>{const o=document.createElement("option");o.value=((h%12)||12)+":"+m+(h>=12?" pm":" am");o.textContent=o.value;time.appendChild(o)});
for(let i=1;i<=12;i++){const o=document.createElement("option");o.value=i;o.textContent=i+(i===1?" guest":" guests");if(i===2)o.selected=true;party.appendChild(o)}
date.min=now.toISOString().slice(0,10);
document.getElementById("resForm").addEventListener("submit",e=>{
  e.preventDefault();
  const m=document.getElementById("msg"),name=document.getElementById("name").value.trim(),phone=document.getElementById("phone").value.trim();
  if(!name||!phone||!date.value){m.style.color="var(--accent)";m.textContent="Add your name, phone number and a date to continue.";return}
  const body="Reservation request\n\nName: "+name+"\nPhone: "+phone+"\nDate: "+date.value+"\nTime: "+time.value+"\nParty size: "+party.value+"\nNotes: "+(document.getElementById("notes").value.trim()||"None");
  const link="mailto:adeshinajohn79@gmail.com?subject="+encodeURIComponent("Reservation request: "+name+", "+date.value)+"&body="+encodeURIComponent(body);
  m.style.color="var(--ok)";
  m.innerHTML="Your email is ready. <a id='ml' target='_top'>Open it and press send</a> to finish your request.";
  const a=document.getElementById("ml");a.href=link;
  try{a.click()}catch(_){}
});
