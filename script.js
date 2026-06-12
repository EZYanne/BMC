/* ---------- NAVIGATION ---------- */
function go(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelectorAll('.menu button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
  document.getElementById('menu').classList.remove('show');
  document.getElementById('burger').classList.remove('open');
  document.body.classList.remove('menu-open');
  document.querySelectorAll('.has-dropdown.open').forEach(li=>li.classList.remove('open'));
  window.scrollTo({top:0,behavior:'smooth'});
}
/* On mobile, tapping a parent item expands its sub-menu (accordion) instead of navigating.
   On desktop it navigates (sub-menu is shown on hover). */
function navItem(page,e){
  if(window.matchMedia('(max-width:1100px)').matches){
    e.preventDefault();
    const li=e.currentTarget.closest('.has-dropdown');
    const wasOpen=li.classList.contains('open');
    document.querySelectorAll('.has-dropdown.open').forEach(x=>x.classList.remove('open'));
    if(!wasOpen) li.classList.add('open');
  }else{
    go(page);
  }
}
function toggleMenu(){
  const open=document.getElementById('menu').classList.toggle('show');
  document.getElementById('burger').classList.toggle('open');
  document.body.classList.toggle('menu-open',open);
  if(!open) document.querySelectorAll('.has-dropdown.open').forEach(li=>li.classList.remove('open'));
}

/* ---------- MAP LIGHTBOX ---------- */
function openMapLightbox(){
  const lb=document.getElementById('mapLightbox');
  lb.classList.add('show');
  document.body.style.overflow='hidden';
}
function closeMapLightbox(e){
  if(e && e.target.closest('.lightbox-inner') && !e.target.closest('.lightbox-close')) return;
  document.getElementById('mapLightbox').classList.remove('show');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMapLightbox();});

/* ---------- FACILITY GALLERY LIGHTBOX ---------- */
let facItems=[],facIndex=0;
function facUpdate(anim){
  const it=facItems[facIndex];if(!it)return;
  const img=document.getElementById('facImg');
  img.src=it.src;img.alt=it.cap||'Facility photo';
  document.getElementById('facCap').textContent=it.cap?`${it.cap}  ·  ${facIndex+1} / ${facItems.length}`:`${facIndex+1} / ${facItems.length}`;
  const a = anim==='next' ? 'facSlideNext .35s ease'
          : anim==='prev' ? 'facSlidePrev .35s ease'
          : 'popIn .45s cubic-bezier(.34,1.56,.64,1)';
  img.style.animation='none';void img.offsetWidth;img.style.animation=a;
}
function openFac(i){
  facIndex=i;facUpdate('pop');
  document.getElementById('facLightbox').classList.add('show');
  document.body.style.overflow='hidden';
}
function facNav(dir,e){
  if(e)e.stopPropagation();
  facIndex=(facIndex+dir+facItems.length)%facItems.length;
  facUpdate(dir>0?'next':'prev');
}
function closeFac(e){
  if(e && e.target.closest('.lightbox-inner') && !e.target.closest('.lightbox-close')) return;
  document.getElementById('facLightbox').classList.remove('show');
  document.body.style.overflow='';
}
(function(){
  const tiles=document.querySelectorAll('.facility-grid .fac');
  facItems=[...tiles].map(f=>({src:f.querySelector('img').src,cap:f.querySelector('.fac-cap')?.textContent.trim()||''}));
  tiles.forEach((f,i)=>f.addEventListener('click',()=>openFac(i)));
})();
document.addEventListener('keydown',e=>{
  if(!document.getElementById('facLightbox').classList.contains('show'))return;
  if(e.key==='Escape')closeFac();
  else if(e.key==='ArrowLeft')facNav(-1);
  else if(e.key==='ArrowRight')facNav(1);
});
(function(){
  const lb=document.getElementById('facLightbox');let x0=null;
  lb.addEventListener('touchstart',e=>{x0=e.changedTouches[0].clientX;},{passive:true});
  lb.addEventListener('touchend',e=>{
    if(x0===null)return;
    const dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>40)facNav(dx<0?1:-1);
    x0=null;
  },{passive:true});
})();

/* ---------- HERO STAT COUNT-UP ---------- */
function countUp(el){
  const m=el.textContent.trim().match(/^(\d+)(.*)$/);
  if(!m){return;}
  const target=+m[1], suffix=m[2], dur=1500, start=performance.now();
  function tick(now){
    const p=Math.min((now-start)/dur,1);
    const eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(eased*target)+suffix;
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
window.addEventListener('load',()=>{
  document.querySelectorAll('.hero-stats .num').forEach((el,i)=>setTimeout(()=>countUp(el),950+i*140));
});

/* ---------- SCROLL PROGRESS + BACK TO TOP ---------- */
(function(){
  const prog=document.getElementById('scrollProg'), top=document.getElementById('toTop');
  function onScroll(){
    const h=document.documentElement;
    const sc=h.scrollTop||document.body.scrollTop;
    const max=(h.scrollHeight-h.clientHeight)||1;
    prog.style.width=(sc/max*100)+'%';
    top.classList.toggle('show',sc>500);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();

/* ---------- WHAT'S NEW (news / events) ---------- */
(function(){
  /* =========================================================================
     ADMIN: edit the posts below. For each post set:
       cat   – which category it belongs to (must match one in `categories`)
       date  – display date, any text
       title – the headline
       img   – image path (drop new images in assets/img/news/ and point here)
       link  – where "Continue Reading" goes ('#' for now)
     Add or remove items freely — the section and filters update automatically.
     ========================================================================= */
  const posts=[
    {cats:['Events & Health Celebrations','Hospital News & Updates'], date:'October 7, 2025',
     title:'BicutanMed Celebrates Its 2nd Anniversary with a Week-Long Bazaar', img:'assets/img/facility/facility1.webp',
     body:`<p><em>BicutanMed 2nd Year Anniversary Bazaar</em></p>
<p>In celebration of our 2nd Anniversary, Bicutan Medical Center is thrilled to host a Bazaar from October 13 to 18, 2025.</p>
<p>Join us for a week of fun, shopping, and community spirit as we showcase a variety of booths featuring:</p>
<ul><li>Cake</li><li>Ready to Wear (RTW)</li><li>Leche Flan</li><li>Crochet</li><li>Pet Accessories</li><li>Coffee</li><li>Bread and Pastries</li><li>Books</li><li>Charm Accessories</li><li>and more</li></ul>
<p>This special event brings together local sellers and small businesses offering great finds, sweet treats, and handcrafted goods, and is perfect for anyone looking to shop, support, and celebrate with us.</p>
<p>As we mark two years of providing quality healthcare and compassionate service, we want to share this milestone with our patients, visitors, staff, and the entire community.</p>
<p>Come and celebrate with us at the Bicutan Medical Center, 191 M.L. Quezon St., New Lower Bicutan, Taguig City, happening from October 13 to 18, 2025.</p>
<p>Experience a week filled with shopping, treats, and the joy of our growing community.</p>
<p>Stay tuned for more exciting promos!</p>`},
    {cats:['Hospital News & Updates'], date:'July 3, 2025',
     title:'Bicutan Medical Center Supports the 11th Great Tradition Charity Golf', img:'assets/img/facility/facility2.webp',
     body:`<p>Bicutan Medical Center was honored to support the 11th Great Tradition Charity Golf — an invitational tournament and inter-hospital cup raising funds for community health programs.</p>
<p>Events like these reflect our commitment to giving back and strengthening healthcare partnerships across the region.</p>`},
    {cats:['Events & Health Celebrations','Patient Education & Awareness'], date:'March 4, 2025',
     title:'27 Mar | National Buntis Day 2025', img:'assets/img/facility/facility3.webp',
     body:`<p>Join us this 27th of March as Bicutan Medical Center celebrates National Buntis Day 2025 — "Bump, Bloom &amp; Beyond."</p>
<p>Expectant mothers are invited to free prenatal checkups, wellness talks, and a day dedicated to safe and healthy pregnancies. All are welcome!</p>`}
  ];
  const categories=['All Posts','Events & Health Celebrations','Health & Wellness','Hospital News & Updates','Medical Services & Specialties','Patient Education & Awareness','Patient Stories & Testimonials'];
  /* ===================== end admin-editable area ===================== */

  const filter=document.getElementById('newsFilter'), grid=document.getElementById('newsGrid');
  if(!grid)return;
  let active='All Posts';
  categories.forEach(c=>filter.insertAdjacentHTML('beforeend',`<button class="${c===active?'active':''}" data-cat="${c}">${c}</button>`));
  function render(){
    const list=posts.map((p,i)=>({p,i})).filter(o=>active==='All Posts'||o.p.cats.includes(active));
    grid.innerHTML = list.length ? list.map(({p,i})=>`
      <article class="news-card" data-id="${i}">
        <div class="news-img"><img src="${p.img}" alt="${p.title}" loading="lazy"></div>
        <div class="news-body">
          <span class="news-date">${p.date}</span>
          <h3>${p.title}</h3>
          <a class="news-readmore" data-id="${i}" role="button" tabindex="0">Continue Reading &rarr;</a>
        </div>
      </article>`).join('') : `<p class="news-empty">No posts in this category yet.</p>`;
  }
  filter.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
    active=b.dataset.cat;
    filter.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));
    render();
  }));
  // open the article modal when a card / "Continue Reading" is clicked
  grid.addEventListener('click',e=>{
    const card=e.target.closest('[data-id]'); if(!card)return;
    openNews(+card.dataset.id);
  });
  const modal=document.getElementById('newsModal');
  const $=id=>document.getElementById(id);
  function openNews(idx){
    const p=posts[idx];
    $('nmImg').src=p.img; $('nmImg').alt=p.title;
    $('nmTitle').textContent=p.title;
    $('nmDate').textContent=p.date;
    $('nmCat').textContent=p.cats.join(', ');
    $('nmText').innerHTML=p.body||'';
    const url=encodeURIComponent(location.href.split('#')[0]), t=encodeURIComponent(p.title);
    $('nmShareFb').href='https://www.facebook.com/sharer/sharer.php?u='+url;
    $('nmShareX').href='https://twitter.com/intent/tweet?url='+url+'&text='+t;
    $('nmRecent').innerHTML=posts.map((q,i)=>({q,i})).filter(o=>o.i!==idx).slice(0,4)
      .map(({q,i})=>`<div class="recent-item" data-id="${i}"><div class="recent-thumb"><img src="${q.img}" alt="${q.title}" loading="lazy"></div><div class="recent-info"><span class="recent-title">${q.title}</span><span class="recent-date">${q.date}</span></div></div>`).join('');
    modal.querySelector('.news-modal-scroll').scrollTop=0;
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  }
  $('nmRecent').addEventListener('click',e=>{const it=e.target.closest('[data-id]');if(it)openNews(+it.dataset.id);});
  $('nmCopy').addEventListener('click',()=>{
    const done=()=>{const b=$('nmCopy'),o=b.innerHTML;b.innerHTML='<i class="fa-solid fa-check"></i>';setTimeout(()=>b.innerHTML=o,1500);};
    if(navigator.clipboard) navigator.clipboard.writeText(location.href.split('#')[0]).then(done).catch(done); else done();
  });
  window.closeNews=function(e){
    /* close only via the X button or Esc — ignore backdrop / content clicks */
    if(e && !e.target.closest('.news-modal-close'))return;
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  };
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('show'))window.closeNews();});
  render();
})();

/* ---------- HERO IMAGE SLIDESHOW ---------- */
(function(){
  const slides=document.querySelectorAll('#heroSlides .hero-slide');
  if(slides.length<2)return;
  let i=0;
  setInterval(()=>{
    slides[i].classList.remove('active');
    i=(i+1)%slides.length;
    slides[i].classList.add('active');
  },5000);
})();

/* ---------- DATA ---------- */
/* ADMIN: edit Medical Services here. Images live in assets/img/services/. */
const services=[
  {img:'er.webp',                 t:'Emergency Room',          d:'24/7 emergency care with rapid triage and life-saving intervention.'},
  {img:'icu.webp',                t:'Intensive Care Unit (ICU)', d:'Round-the-clock critical care for patients needing close monitoring.'},
  {img:'nicu.webp',               t:'Neonatal ICU (NICU)',     d:'Specialized intensive care for newborns and premature infants.'},
  {img:'or.webp',                 t:'Operating Room',          d:'Modern, fully-equipped surgical suites for safe procedures.'},
  {img:'ogu.webp',                t:'OB-Gyne Unit',            d:'Comprehensive care for women through pregnancy, birth, and beyond.'},
  {img:'outpatient-clinics.webp', t:'Outpatient Clinics',      d:'Consultations and follow-up care across multiple specialties.'},
  {img:'heart-station.webp',      t:'Heart Station',           d:'ECG, treadmill stress tests, and cardiac monitoring services.'},
  {img:'ech.webp',                t:'2D Echo',                 d:'Detailed ultrasound imaging of the heart to assess its function.'},
  {img:'radiology.webp',          t:'Radiology',               d:'X-ray, ultrasound, and advanced diagnostic imaging services.'},
  {img:'laboratory.webp',         t:'Laboratory',              d:'Accurate, timely blood, urine, and diagnostic laboratory testing.'},
  {img:'hemo.webp',               t:'Hemodialysis',            d:'Safe, comfortable dialysis treatment for patients with kidney conditions.'},
  {img:'rtu.webp',                t:'Respiratory Therapy Unit',d:'Pulmonary function testing and breathing therapy services.'},
  {img:'ptu.webp',                t:'Physical Therapy Unit',   d:'Rehabilitation and physiotherapy to restore movement and strength.'},
  {img:'pharmacy.webp',           t:'Pharmacy',                d:'In-house pharmacy stocked with essential medicines and supplies.'},
  {img:'pbc.webp',                t:'Pet Bite Center',         d:'Anti-rabies vaccination and wound care for animal bite cases.'}
];
/* Doctor roster auto-generated from photo filenames in assets/img/doctors/.
   Specialty is a placeholder ('Consultant') — update each entry's `s` with the real specialty. */
const docPhotos=[
  ['Anacta-Pring','anacta-pring'],['Aquino','aquino'],['Bartolome','bartolome'],['Basilio','basilio'],
  ['Bautista C.','bautista-c'],['Bautista M.','bautista-m'],['Bongon','bongon'],['Caballero R.','caballero-r'],
  ['Carlos E.','carlos-e'],['Cedeño J.','cedeno-j'],['Cedeño R.','cedeno-r'],['Cellona','cellona'],
  ['Francisco M.','francisco-m'],['Galicia','galicia'],['Galutira','galutira'],['Guinto C.','guinto-c'],
  ['Guinto P.','guinto-p'],['Imperial','imperial'],['Inoturan','inoturan'],['Kasaju','kasaju'],
  ['Manzano','manzano'],['Matheus','matheus'],['Millare','millare'],['Moratalla','moratalla'],
  ['Panopio','panopio'],['Posio','posio'],['Redecio','redecio'],['Retreta','retreta'],
  ['Reyes C.','reyes-c'],['Reyes L.','reyes-l'],['Salvino','salvino'],['Santiago','santiago'],
  ['Santos E.','santos-e'],['Santos J.','santos-j'],['Segador G.','segador-g'],['Untalan','untalan'],
  ['Velasco','velasco'],['Villanueva','villanueva']
];
/* The 12 specializations patients can filter by (matches the Doctor Schedules page). */
const SPECIALTIES=['Dental','Otolaryngology – ENT','Internal Medicine & Subspecialties','Surgery & Surgical Specialties','Pediatrics','Obstetrics & Gynecology','Ophthalmology','Rehabilitation Medicine','Psychiatry','Orthopedics','Neurology','Urology'];
/* ADMIN: assign each doctor's specialty here — use one of the names in SPECIALTIES above
   (copy it exactly). Leave '' to show the doctor as a general "Consultant".
   This is what powers the "Filter by specialization" dropdown on the View Doctors page. */
const DOC_SPEC={
  'Anacta-Pring':'', 'Aquino':'', 'Bartolome':'', 'Basilio':'',
  'Bautista C.':'', 'Bautista M.':'', 'Bongon':'', 'Caballero R.':'',
  'Carlos E.':'', 'Cedeño J.':'', 'Cedeño R.':'', 'Cellona':'',
  'Francisco M.':'', 'Galicia':'', 'Galutira':'', 'Guinto C.':'',
  'Guinto P.':'', 'Imperial':'', 'Inoturan':'', 'Kasaju':'',
  'Manzano':'', 'Matheus':'', 'Millare':'', 'Moratalla':'',
  'Panopio':'', 'Posio':'', 'Redecio':'', 'Retreta':'',
  'Reyes C.':'', 'Reyes L.':'', 'Salvino':'', 'Santiago':'',
  'Santos E.':'', 'Santos J.':'', 'Segador G.':'', 'Untalan':'',
  'Velasco':'', 'Villanueva':''
};
const doctors=docPhotos.map(([name,file])=>({
  n:'Dr. '+name, s:DOC_SPEC[name]||'Consultant',
  img:'assets/img/doctors/'+file+'.webp'
}));
const faqs=[
  {q:'How do I book an appointment?',a:'You can book online through our Online Feedback & Appointments page, or call our hotline at +63 939 910 9974. Same-day urgent slots are available for many departments.'},
  {q:'What should I bring to my visit?',a:'Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records or referral letters.'},
  {q:'Do you accept insurance?',a:'Yes, we work with most major insurance providers. Our billing team can verify your coverage and explain any out-of-pocket costs before treatment.'},
  {q:'Can family members stay overnight?',a:'One companion may stay overnight in most private rooms and in pediatrics. Please coordinate with the ward nurse for arrangements.'},
  {q:'Is parking available?',a:'Yes, free on-site parking is available with dedicated accessible spaces at both the main entrance and the Emergency Department.'},
  {q:'How do I get my test results?',a:'Results are available through our digital patient portal, or you can request them at the records desk with valid identification.'}
];

/* ---------- RENDER ---------- */
const sg=document.getElementById('servicesGrid');
services.forEach((s,i)=>{
  sg.insertAdjacentHTML('beforeend',`<div class="svc-card" data-id="${i}" role="button" tabindex="0"><div class="svc-img"><img src="assets/img/services/${s.img}" alt="${s.t}" loading="lazy"></div><div class="svc-body"><h3>${s.t}</h3><p>${s.d}</p><span class="svc-more">View details &rarr;</span></div></div>`);
});
/* open a service as its own page/tab */
window.openService=function(i){
  const s=services[i];
  document.getElementById('sdImg').src='assets/img/services/'+s.img;
  document.getElementById('sdImg').alt=s.t;
  document.getElementById('sdTitle').textContent=s.t;
  document.getElementById('sdDesc').textContent=s.d;
  go('serviceDetail');
};
sg.addEventListener('click',e=>{const c=e.target.closest('.svc-card'); if(c)openService(+c.dataset.id);});
sg.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.svc-card')){e.preventDefault();openService(+e.target.closest('.svc-card').dataset.id);}});

/* ---------- HEALTHCARE PACKAGES ---------- */
/* ADMIN: edit packages here. Images live in assets/img/packages/. `body` accepts HTML. */
const STEPS=`<h3 class="pkg-section-title">How to avail</h3><ol class="pkg-steps"><li>Proceed to the <strong>Laboratory Department</strong> on the Ground Floor.</li><li>Inform the laboratory staff that you wish to avail a package — they will give you a charge slip.</li><li>Take the charge slip to the <strong>Cashier</strong> and make the payment.</li><li>Return to the Laboratory to avail your package.</li></ol>`;
const DISC=`<p class="pkg-disclaimer">PWD / Senior Citizen / Employees / Stockholders' discounts and all other government-mandated discounts are not applicable in conjunction with these promotional packages.</p>`;
const packages=[
  {img:'ob-trimester.webp', t:'OB-Trimester Packages', d:'Comprehensive prenatal lab packages for every stage of pregnancy.',
   body:`<p class="pkg-note">Applicable for pregnant Outpatient Department (OPD) patients only.</p>
<div class="pkg-list">
<div class="pkg-item"><h4>1st Trimester — Package 1.1</h4><ul><li>CBC</li><li>Blood Typing</li><li>Urinalysis</li><li>HBsAg</li><li>SRPR / Syphilis</li><li>HIV Screening</li><li>Transvaginal Sonography (TVS)</li></ul><span class="pkg-price">₱ 4,874.45</span></div>
<div class="pkg-item"><h4>2nd Trimester — Package 2.1</h4><ul><li>CBC</li><li>Urinalysis</li><li>Biometry</li></ul><span class="pkg-price">₱ 2,337.17</span></div>
<div class="pkg-item"><h4>2nd Trimester — Package 2.2</h4><ul><li>CBC</li><li>Urinalysis</li><li>75 gms 2-hr OGTT</li><li>Congenital Anomaly Scan (CAS)</li></ul><span class="pkg-price">₱ 5,232.47</span></div>
<div class="pkg-item"><h4>3rd Trimester — Package 3.1</h4><ul><li>CBC</li><li>Urinalysis</li><li>Biometry</li></ul><span class="pkg-price">₱ 2,337.17</span></div>
<div class="pkg-item"><h4>3rd Trimester — Package 3.2</h4><ul><li>CBC</li><li>Urinalysis</li><li>BPS & Biometry</li></ul><span class="pkg-price">₱ 2,442.40</span></div>
</div>${DISC}${STEPS}
<div class="pkg-why"><h3>Why are Trimester Packages essential for your pregnancy?</h3><p>Trimester packages are associated with pregnancy and divided into three trimesters. These OB packages are designed to provide comprehensive care, convenience, cost savings, and continuity of care throughout the pregnancy journey.</p></div>`},
  {img:'lab.webp', t:'Laboratory Packages', d:'Targeted panels — liver, kidney, thyroid, chem, and pre-employment.',
   body:`<p class="pkg-note">All packages are available only for Outpatient Department (OPD) patients.</p>
<div class="pkg-list">
<div class="pkg-item"><h4>A. Liver Function Test</h4><ul><li>ALT</li><li>AST</li><li>TP A/G Ratio</li><li>Albumin</li><li>Alkaline Phosphatase</li></ul><span class="pkg-price">₱ 2,104.43</span></div>
<div class="pkg-item"><h4>B. Kidney Function Test</h4><ul><li>BUN</li><li>BUA</li><li>CREA (with eGFR)</li><li>Sodium</li><li>Potassium</li><li>Chloride</li><li>T. Calcium</li><li>Phosphorus</li><li>Magnesium</li></ul><span class="pkg-price">₱ 3,392.48</span></div>
<div class="pkg-item"><h4>C. Basic Chem 8</h4><ul><li>FBS</li><li>BUN</li><li>CREA</li><li>BUA</li><li>Cholesterol</li><li>Triglycerides</li><li>ALT</li><li>AST</li></ul><span class="pkg-price">₱ 2,047.77</span></div>
<div class="pkg-item"><h4>D. Hypertension Test (Chem 11)</h4><ul><li>FBS</li><li>BUN</li><li>CREA</li><li>BUA</li><li>ALT</li><li>AST</li><li>Sodium</li><li>Potassium</li><li>Lipid Profile (Cholesterol, Triglyceride, HDL, LDL)</li></ul><span class="pkg-price">₱ 3,412.42</span></div>
<div class="pkg-item"><h4>E. Thyroid Function Panel 1</h4><ul><li>TSH</li><li>T3</li><li>T4</li><li>Thyroid Ultrasound</li></ul><span class="pkg-price">₱ 3,264.14</span></div>
<div class="pkg-item"><h4>F. Thyroid Function Panel 2</h4><ul><li>TSH</li><li>FT3</li><li>FT4</li><li>Thyroid Ultrasound</li></ul><span class="pkg-price">₱ 3,595.68</span></div>
<div class="pkg-item"><h4>G. Pre-employment (Food Handler)</h4><ul><li>CBC</li><li>Urinalysis</li><li>Fecalysis</li><li>Anti-HAV IgM</li><li>X-Ray</li></ul><span class="pkg-price">₱ 1,609.48</span></div>
<div class="pkg-item"><h4>H. Pre-employment (Non-Food Handler)</h4><ul><li>CBC</li><li>Urinalysis</li><li>Fecalysis</li><li>HBsAg</li><li>X-Ray</li></ul><span class="pkg-price">₱ 1,547.16</span></div>
</div>${DISC}
<p class="pkg-note">Basic Chem 8 and Hypertension Package (Chem 11) are available <strong>Friday to Sunday, 6:00 AM – 5:00 PM</strong>.</p>
<p class="pkg-note">Preparation: Fast for <strong>10 hours</strong> before the test (Chem 8 &amp; Chem 11).</p>${STEPS}
<div class="pkg-why"><h3>Why choose our Laboratory Packages?</h3><p>Laboratory packages are important for ensuring comprehensive healthcare management. They let individuals proactively monitor their health, detect potential medical issues early, and make informed decisions about their well-being — empowering everyone to take control of their health and pursue preventive measures for a healthier lifestyle.</p></div>`},
  {img:'executive.webp', t:'Executive Package', d:'A complete executive check-up covering 14 key health markers.',
   body:`<p class="pkg-note">Outpatient (OPD) patients only.</p>
<div class="pkg-list one">
<div class="pkg-item"><h4>Executive Check-up Package</h4><ul><li>CBC</li><li>Urinalysis</li><li>FBS</li><li>BUN</li><li>CREA</li><li>BUA</li><li>ALT</li><li>AST</li><li>Lipid Profile</li><li>Sodium</li><li>Potassium</li><li>Chloride</li><li>ALP</li><li>T. Calcium</li></ul><span class="pkg-price">₱ 5,189.91</span></div>
</div>${DISC}
<p class="pkg-note">Preparation: Fast for <strong>10 hours</strong> before the test.</p>${STEPS}
<div class="pkg-why"><h3>Why avail the Executive Package?</h3><p>These packages offer comprehensive assessments that can detect potential health issues early, allowing for timely intervention and treatment. Regular executive check-ups give valuable insight into your overall health status and help identify underlying conditions — empowering you to take proactive steps toward maintaining your well-being for the long term.</p></div>`}
];
const pg=document.getElementById('pkgGrid');
if(pg){
  packages.forEach((p,i)=>pg.insertAdjacentHTML('beforeend',`<div class="svc-card" data-pkg="${i}" role="button" tabindex="0"><div class="svc-img"><img src="assets/img/packages/${p.img}" alt="${p.t}" loading="lazy"></div><div class="svc-body"><h3>${p.t}</h3><p>${p.d}</p><span class="svc-more">View packages &rarr;</span></div></div>`));
  window.openPackage=function(i){
    const p=packages[i];
    document.getElementById('pdImg').src='assets/img/packages/'+p.img;
    document.getElementById('pdImg').alt=p.t;
    document.getElementById('pdTitle').textContent=p.t;
    document.getElementById('pdBody').innerHTML=p.body;
    go('packageDetail');
  };
  pg.addEventListener('click',e=>{const c=e.target.closest('.svc-card'); if(c)openPackage(+c.dataset.pkg);});
  pg.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.svc-card')){e.preventDefault();openPackage(+e.target.closest('.svc-card').dataset.pkg);}});
}

const dg=document.getElementById('docGrid');
function docCardHTML(d){
  return `<div class="doc-card"><div class="doc-photo"><span class="doc-tag">${d.s}</span><img src="${d.img}" alt="${d.n}" loading="lazy" decoding="async" onerror="this.src='assets/img/nopicdoc/logonopic.webp'"></div><div class="doc-body"><h3>${d.n}</h3><div class="doc-spec">${d.s}</div><p>Board-certified physician at Bicutan Medical Center.</p><div class="doc-meta"><span>📅 Available by appointment</span></div></div></div>`;
}
/* ----- DOCTORS: filter + search + pagination ----- */
const PER_PAGE=8;
const docState={q:'',spec:'All',page:1};
function getFilteredDocs(){
  const q=docState.q.trim().toLowerCase();
  return doctors.filter(d=>
    (docState.spec==='All'||d.s===docState.spec) &&
    (!q||d.n.toLowerCase().includes(q)||d.s.toLowerCase().includes(q))
  );
}
function renderDocPage(){
  const list=getFilteredDocs();
  const pages=Math.max(1,Math.ceil(list.length/PER_PAGE));
  if(docState.page>pages)docState.page=pages;
  if(docState.page<1)docState.page=1;
  const start=(docState.page-1)*PER_PAGE;
  const slice=list.slice(start,start+PER_PAGE);
  dg.innerHTML = slice.length
    ? slice.map(docCardHTML).join('')
    : '<p style="grid-column:1/-1;text-align:center;color:var(--slate);padding:40px 0">No doctors match your search.</p>';
  renderPaging(pages,list.length);
  const clr=document.getElementById('docSearchClr');
  if(clr)clr.classList.toggle('show',!!docState.q);
}
function renderPaging(pages){
  const pg=document.getElementById('docPaging');
  if(pages<=1){pg.innerHTML='';return;}
  let h=`<button class="pg-btn" ${docState.page===1?'disabled':''} onclick="gotoDocPage(${docState.page-1})">‹</button>`;
  for(let i=1;i<=pages;i++){h+=`<button class="pg-btn ${i===docState.page?'active':''}" onclick="gotoDocPage(${i})">${i}</button>`;}
  h+=`<button class="pg-btn" ${docState.page===pages?'disabled':''} onclick="gotoDocPage(${docState.page+1})">›</button>`;
  pg.innerHTML=h;
}
function gotoDocPage(p){docState.page=p;renderDocPage();document.querySelector('#doctors .sec-head').scrollIntoView({behavior:'smooth',block:'start'});}
function docSearch(v){docState.q=v;docState.page=1;renderDocPage();}
function clearDocSearch(){docState.q='';docState.page=1;const i=document.getElementById('docSearchInput');if(i)i.value='';renderDocPage();}
function renderDocs(){renderDocPage();} /* back-compat alias */

/* ----- custom specialization dropdown (with icons) on the View Doctors page ----- */
const SPEC_ICONS={
  'All Specializations':'fa-layer-group',
  'Dental':'fa-tooth',
  'Otolaryngology – ENT':'fa-ear-listen',
  'Internal Medicine & Subspecialties':'fa-stethoscope',
  'Surgery & Surgical Specialties':'fa-scissors',
  'Pediatrics':'fa-child-reaching',
  'Obstetrics & Gynecology':'fa-baby',
  'Ophthalmology':'fa-eye',
  'Rehabilitation Medicine':'fa-person-walking',
  'Psychiatry':'fa-comments',
  'Orthopedics':'fa-bone',
  'Neurology':'fa-brain',
  'Urology':'fa-droplet'
};
const docSpecMenu=document.getElementById('docSpecMenu');
const docSpecLabel=document.getElementById('docSpecLabel');
if(docSpecMenu){
  const items=[['All','All Specializations']].concat(SPECIALTIES.map(s=>[s,s]));
  docSpecMenu.innerHTML=items.map(([v,label],i)=>`<li role="option" data-v="${v}" class="${i===0?'active':''}"><i class="fa-solid ${SPEC_ICONS[label]||'fa-stethoscope'}"></i> <span>${label}</span></li>`).join('');
  docSpecMenu.addEventListener('click',e=>{const li=e.target.closest('li');if(li)selectSpec(li.dataset.v);});
}
window.toggleSpecMenu=function(e){if(e)e.stopPropagation();const d=document.getElementById('docSpecDropdown');if(!d)return;const open=d.classList.toggle('open');d.querySelector('.doc-spec-toggle').setAttribute('aria-expanded',open);};
function setSpecUI(v){
  if(!docSpecMenu)return;
  let label='All Specializations';
  docSpecMenu.querySelectorAll('li').forEach(li=>{const on=li.dataset.v===v;li.classList.toggle('active',on);if(on)label=li.querySelector('span').textContent;});
  if(docSpecLabel)docSpecLabel.textContent=label;
}
window.selectSpec=function(v){
  docState.spec=v;docState.page=1;
  setSpecUI(v);
  const d=document.getElementById('docSpecDropdown');if(d)d.classList.remove('open');
  renderDocPage();
};
document.addEventListener('click',e=>{const d=document.getElementById('docSpecDropdown');if(d&&!d.contains(e.target))d.classList.remove('open');});

/* ----- HOME "Find Your Doctor" search ----- */
const hdsSpec=document.getElementById('hdsSpec');
if(hdsSpec) SPECIALTIES.forEach(s=>hdsSpec.insertAdjacentHTML('beforeend',`<option value="${s}">${s}</option>`));
function homeDocSearch(e){
  if(e)e.preventDefault();
  const name=(document.getElementById('hdsName').value||'').trim();
  const spec=hdsSpec?hdsSpec.value:'';
  go('doctors');
  docState.q=name;
  docState.spec=spec||'All';
  docState.page=1;
  const si=document.getElementById('docSearchInput');if(si)si.value=name;
  setSpecUI(docState.spec);
  renderDocPage();
}
renderDocPage();

const faqBox=document.getElementById('faq');
faqs.forEach(f=>{
  faqBox.insertAdjacentHTML('beforeend',`<div class="ac-item"><div class="ac-head" onclick="toggleAc(this)">${f.q}<span class="pl">+</span></div><div class="ac-body"><p>${f.a}</p></div></div>`);
});
function toggleAc(h){
  const item=h.parentElement;const body=h.nextElementSibling;
  const open=item.classList.contains('open');
  document.querySelectorAll('.ac-item').forEach(i=>{i.classList.remove('open');i.querySelector('.ac-body').style.maxHeight=null;});
  if(!open){item.classList.add('open');body.style.maxHeight=body.scrollHeight+'px';}
}

/* ---------- CONTACT (feedback page) ---------- */
/* the feedback page embeds a Microsoft Form; all CTAs just route here */
window.goContact=function(){go('feedback');};

/* ---------- PATIENT & VISITOR'S GUIDE TABS ---------- */
window.showGuideTab=function(tab){
  document.querySelectorAll('.guide-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  document.querySelectorAll('.guide-panel').forEach(p=>{p.hidden=(p.id!=='guide-'+tab);});
  /* scroll up to the tabs (below the sticky header) so the new content starts at the top */
  const tabs=document.querySelector('#guide .guide-tabs');
  if(tabs){
    const y=tabs.getBoundingClientRect().top+window.pageYOffset-90;
    window.scrollTo({top:y<0?0:y,behavior:'smooth'});
  }
};
/* open the guide page from the nav: reset to the first tab and scroll up to the content */
window.goGuide=function(){go('guide');showGuideTab('hmo');};

/* ===== HMO MARQUEE ===== */
const hmoLogos=[
  'maxicare.png','intellicare.png','avega.png','medicard.png','valucare.png','philbritish.png',
  'forticare.webp','flexicare.png','benlife.png','philcare.png','amaphil.png','coophealth.webp',
  'sunlifegrepa.png','pacificcross.png','asiancare.avif','cocolife.png','lacsonlacson.png','medasia.png',
  'wellcare.png','hppi.png','carewell.png','icare.png','kaiser.png','generali.jpg'
];
function fillTrack(track,list){
  const cell=name=>`<div class="hmo-logo"><img src="assets/img/hmo/${name}" alt="${name.split('.')[0]} HMO" loading="lazy"></div>`;
  const html=list.map(cell).join('');
  track.innerHTML=html+html; /* duplicate for seamless loop */
}
const half=Math.ceil(hmoLogos.length/2);
fillTrack(document.getElementById('hmoTrack1'),hmoLogos.slice(0,half));
fillTrack(document.getElementById('hmoTrack2'),hmoLogos.slice(half));
/* mobile menu HMO marquee (plain imgs, duplicated for a seamless loop) */
const menuHmoTrack=document.getElementById('menuHmoTrack');
if(menuHmoTrack){
  const imgs=hmoLogos.map(n=>`<img src="assets/img/hmo/${n}" alt="${n.split('.')[0]} HMO" loading="lazy">`).join('');
  menuHmoTrack.innerHTML=imgs+imgs;
}
/* List of HMOs on the Patient & Visitor's Guide page */
const guideHmoList=document.getElementById('guideHmoList');
if(guideHmoList) guideHmoList.innerHTML=hmoLogos.map(n=>`<div class="g-hmo"><img src="assets/img/hmo/${n}" alt="${n.split('.')[0]} HMO" loading="lazy"></div>`).join('');

/* ===== SCROLL REVEAL ===== */
const rvObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.addEventListener('transitionend', () => {
      e.target.classList.remove('rv','rv-l','rv-r','rv-s');
      e.target.style.transitionDelay = '';
    }, {once:true});
    rvObs.unobserve(e.target);
  });
}, {threshold: .12});

function addRv(el, cls='rv', delay=0) {
  el.classList.add(cls);
  if (delay) el.style.transitionDelay = delay + 'ms';
  rvObs.observe(el);
}

function initReveal() {
  document.querySelectorAll('.strip .item').forEach((el,i) => addRv(el,'rv',i*80));
  document.querySelectorAll('.sec-head').forEach(el => addRv(el,'rv'));
  document.querySelectorAll('#home section:not(.hero) .card').forEach((el,i) => addRv(el,'rv',i*90));
  document.querySelectorAll('#servicesGrid .card').forEach((el,i) => addRv(el,'rv',i*70));
  document.querySelectorAll('.doc-card').forEach((el,i) => addRv(el,'rv',i*55));
  const aboutImg = document.querySelector('.about-hero img');
  if (aboutImg) addRv(aboutImg,'rv-l');
  document.querySelectorAll('.about-hero>div').forEach(el => addRv(el,'rv'));
  document.querySelectorAll('.value').forEach((el,i) => addRv(el,'rv-s',i*100));
  document.querySelectorAll('.tl-item').forEach((el,i) => addRv(el,'rv-l',i*75));
  document.querySelectorAll('.vm-card').forEach((el,i) => addRv(el, i===0?'rv-l':'rv-r'));
  document.querySelectorAll('.cv').forEach((el,i) => addRv(el,'rv-s',i*90));
  document.querySelectorAll('.visit-grid .vc').forEach((el,i) => addRv(el,'rv',i*85));
  document.querySelectorAll('.cta-banner').forEach(el => addRv(el,'rv-s'));
  document.querySelectorAll('.fac').forEach((el,i) => addRv(el,'rv-s',i*70));
  document.querySelectorAll('.docsearch').forEach(el => addRv(el,'rv-s'));
  document.querySelectorAll('.map-info').forEach(el => addRv(el,'rv-l'));
  document.querySelectorAll('.map-frame').forEach(el => addRv(el,'rv-r'));
  document.querySelectorAll('.ac-item').forEach((el,i) => addRv(el,'rv',i*55));
  document.querySelectorAll('.info-card').forEach(el => addRv(el,'rv-r'));
  document.querySelectorAll('.fb-intro').forEach(el => addRv(el,'rv-l'));
  document.querySelectorAll('.form').forEach(el => addRv(el,'rv-r'));
  document.querySelectorAll('.foot-col').forEach((el,i) => addRv(el,'rv',i*70));
}

/* Re-apply reveal after doc filter */
filterDoc = function(btn, dp) {
  document.querySelectorAll('#docFilter button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderDocs(dp);
  document.querySelectorAll('.doc-card').forEach((el,i) => addRv(el,'rv',i*55));
};

initReveal();

/* close mobile menu on outside click */
document.addEventListener('click',e=>{
  const menu=document.getElementById('menu'),burger=document.getElementById('burger');
  if(menu.classList.contains('show')&&!menu.contains(e.target)&&!burger.contains(e.target)){
    menu.classList.remove('show');burger.classList.remove('open');
  }
});

/* ---------- CHAT ASSISTANT (rule-based Q&A) ---------- */
const chatKB=[
  {k:['appointment','book','schedule','consult','reserve'],a:'You can request an appointment on our <a onclick="go(\'feedback\');toggleChat()">Online Feedback &amp; Appointments</a> page, or call us at <a href="tel:+63285381280">02 8538 1280</a>. 📅'},
  {k:['hour','open','close','time','24','schedule of'],a:'We are <b>open 24 hours, 7 days a week</b>. 🕐<br>Visiting hours — General Wards: 9 AM–8 PM · ICU: 11 AM–1 PM · Maternity: 10 AM–7 PM.'},
  {k:['where','location','address','direction','map','located','navigate'],a:'📍 We are at <b>Bicutan Medical Center, M. L. Quezon Avenue, Taguig, Metro Manila</b>. Our nearest landmark is Ricardo P. Cruz Sr. Elementary School.'},
  {k:['contact','phone','number','call','email','viber','sms','reach'],a:'Here\'s how to reach us:<br>📱 Mobile: <a href="tel:+639399109974">+63 939 910 9974</a><br>☎️ Telephone: <a href="tel:+63285381280">02 8538 1280</a><br>✉️ <a href="mailto:infoadmittingbmci@gmail.com">infoadmittingbmci@gmail.com</a>'},
  {k:['hmo','insurance','accredit','maxicare','intellicare','medicard','philhealth','coverage'],a:'We accept most major HMOs — Maxicare, Intellicare, Medicard, ValuCare, Kaiser, PhilCare, and many more. You\'ll find the full list on our home page. 💳'},
  {k:['service','department','treatment','specialt','echo','ct scan','x-ray','xray','lab','imaging'],a:'Our services include Emergency &amp; Trauma, Cardiology, Pediatrics, Neurology, Radiology &amp; Imaging, Oncology, Maternity, Orthopedics, and General Medicine — plus 2D echo and CT scan. <a onclick="go(\'services\');toggleChat()">View all services</a>. 🏥'},
  {k:['doctor','specialist','physician','find a doctor','consultant'],a:'You can browse our specialists on the <a onclick="go(\'doctors\');toggleChat()">Doctors page</a>, or use the “Find Your Doctor” search on the home page. 🩺'},
  {k:['emergency','urgent','er ','ambulance','accident'],a:'🚑 For emergencies, call <a href="tel:+639399109974">+63 939 910 9974</a> immediately — our Emergency Room is open 24/7.'},
  {k:['bed','capacity','room','admit','confine'],a:'We are a <b>100-bed capacity hospital</b> with private consultation rooms and comfortable patient facilities. For admissions, call <a href="tel:+63285381280">02 8538 1280</a>.'},
  {k:['feedback','complaint','suggestion','review'],a:'We\'d love to hear from you! Please share your thoughts on our <a onclick="go(\'feedback\');toggleChat()">Online Feedback</a> page. 💬'},
  {k:['hello','hi','hey','good morning','good afternoon','good evening','kumusta'],a:'Hello! 👋 How can I help you today? You can ask about appointments, hours, location, services, or HMOs.'},
  {k:['thank','salamat'],a:'You\'re welcome! 😊 Is there anything else I can help you with?'},
  {k:['bye','goodbye','done'],a:'Take care! 💚 Remember, we\'re open 24/7 if you need us.'}
];
const chatFallback='I\'m a simple assistant for quick info. 🙏 For anything else, please call <a href="tel:+63285381280">02 8538 1280</a> or use our <a onclick="go(\'feedback\');toggleChat()">Online Feedback</a> page.';
const quickReplies=[
  {l:'📅 Appointment',q:'book appointment'},
  {l:'🕐 Hours',q:'opening hours'},
  {l:'📍 Location',q:'location'},
  {l:'📞 Contact',q:'contact number'},
  {l:'🏥 Services',q:'services'},
  {l:'💳 HMOs',q:'hmo accepted'}
];
let chatStarted=false;
function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function chatScroll(){const b=document.getElementById('chatBody');b.scrollTop=b.scrollHeight;}
function botSay(html){document.getElementById('chatBody').insertAdjacentHTML('beforeend',`<div class="msg bot">${html}</div>`);chatScroll();}
function userSay(text){document.getElementById('chatBody').insertAdjacentHTML('beforeend',`<div class="msg user">${esc(text)}</div>`);chatScroll();}
function findAnswer(text){const t=text.toLowerCase();for(const e of chatKB){if(e.k.some(k=>t.includes(k)))return e.a;}return chatFallback;}
/* If a Claude-powered backend (api/chat.js) is deployed, the widget uses it for
   real AI answers; otherwise it transparently falls back to the rule-based KB. */
const CHAT_API='/api/chat';
let chatHistory=[];
let chatAIAvailable=true; /* flips off after a failed/unreachable call */
function showTyping(){const b=document.getElementById('chatBody');b.insertAdjacentHTML('beforeend','<div class="msg bot typing" id="chatTyping"><span></span><span></span><span></span></div>');chatScroll();}
function clearTyping(){const t=document.getElementById('chatTyping');if(t)t.remove();}
async function botRespond(text){
  showTyping();
  if(chatAIAvailable){
    try{
      const ctrl=new AbortController();const to=setTimeout(()=>ctrl.abort(),12000);
      const r=await fetch(CHAT_API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:text,history:chatHistory}),signal:ctrl.signal});
      clearTimeout(to);
      if(!r.ok)throw new Error('no backend');
      const data=await r.json();
      clearTyping();
      const reply=(data.reply||findAnswer(text));
      botSay(esc(reply).replace(/\n/g,'<br>'));
      chatHistory.push({role:'user',content:text},{role:'assistant',content:reply});
      if(chatHistory.length>12)chatHistory=chatHistory.slice(-12);
      return;
    }catch(err){chatAIAvailable=false;/* fall through to rule-based */}
  }
  setTimeout(()=>{clearTyping();botSay(findAnswer(text));},500);
}
function chatSend(e){e.preventDefault();const inp=document.getElementById('chatInput');const v=inp.value.trim();if(!v)return;userSay(v);inp.value='';botRespond(v);}
function chatAsk(q,label){userSay(label);botRespond(q);}
function toggleChat(){
  const open=document.body.classList.toggle('chat-open');
  if(open){
    if(!chatStarted){
      chatStarted=true;
      botSay('Hi there! 👋 I\'m the <b>BMC virtual assistant</b>. Ask me a question, or tap one of the quick options below.');
    }
    setTimeout(()=>document.getElementById('chatInput').focus(),320);
  }
}
(function(){
  const cq=document.getElementById('chatQuick');
  quickReplies.forEach(r=>cq.insertAdjacentHTML('beforeend',`<button type="button" onclick="chatAsk('${r.q}','${r.l}')">${r.l}</button>`));
})();
