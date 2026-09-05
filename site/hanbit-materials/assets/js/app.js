(() => {
  const site = window.CORECHEM_SITE;
  const materials = window.CORECHEM_MATERIALS;
  const flow = window.CORECHEM_FLOW;
  const machined = window.CORECHEM_MACHINED_PARTS;
  const i18n = window.CORECHEM_I18N;
  const state = { lang: chooseLanguage(), material: chooseMaterial(), inquiry:{type:'material',material:'',formGrade:'',quantity:'',application:'',delivery:'',company:'',name:'',email:'',drawing:'',critical:''} };

  function chooseLanguage() {
    const requested = new URLSearchParams(location.search).get('lang');
    if (site.languages.includes(requested)) return requested;
    try { const saved = localStorage.getItem('corechem-language'); if (site.languages.includes(saved)) return saved; } catch {}
    return (navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : site.defaultLanguage;
  }
  function chooseMaterial() {
    const requested = new URLSearchParams(location.search).get('material');
    return materials.some(item => item.id === requested) ? requested : site.defaultMaterial;
  }
  function t(key) { return i18n[state.lang][key] || key; }
  function escapeHTML(value='') { return value.replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character])); }
  function currentMaterial() { return materials.find(item => item.id === state.material) || materials[0]; }
  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(element => { const value = i18n[state.lang][element.dataset.i18n]; if (value !== undefined) element.innerHTML = value; });
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === state.lang)));
    document.querySelector('#draftBanner').hidden = !site.draftMode;
    updateMetadata();
    renderAll();
  }
  function updateMetadata() {
    const metadata={
      ko:{title:'CoreChem — 산업용 고성능 소재 트레이딩',description:'PCTFE, PTFE, PEEK, PFA의 특성부터 기술자료와 공급 문의까지 한곳에서 연결합니다.'},
      en:{title:'CoreChem — High-performance materials trading',description:'Connect PCTFE, PTFE, PEEK and PFA properties, technical documents and supply enquiries in one place.'},
      ja:{title:'CoreChem — 高機能素材トレーディング',description:'PCTFE、PTFE、PEEK、PFAの特性、技術資料、供給のお問い合わせを一か所につなぎます。'}
    }[state.lang];
    document.title=metadata.title;
    document.querySelector('meta[name="description"]').content=metadata.description;
    document.querySelector('meta[property="og:title"]').content=metadata.title;
    document.querySelector('meta[property="og:description"]').content=metadata.description;
  }
  function renderTabs() {
    const host = document.querySelector('#materialTabs');
    host.innerHTML = materials.map(material => `<button class="material-tab" id="tab-${material.id}" type="button" role="tab" data-material="${material.id}" aria-controls="materialStage" aria-selected="${material.id === state.material}" tabindex="${material.id === state.material ? '0' : '-1'}"><small>${t(material.priority)}</small><b>${material.name}</b></button>`).join('');
    host.querySelectorAll('button').forEach(button => button.addEventListener('click', () => selectMaterial(button.dataset.material)));
  }
  function renderMaterial() {
    const material = currentMaterial(); const copy = material.copy[state.lang];
    document.querySelector('#materialStage').innerHTML = `<div class="material-stage-grid"><div><div class="material-title-row"><div><span class="material-full">${material.fullName}</span><h3>${material.name}</h3></div><span class="material-badge">${t(material.priority)}</span></div><p class="material-summary">${copy.summary}</p><div class="material-actions"><a class="button primary" href="#inquiry" data-material-inquiry="${material.id}">${t('requestMaterial')}</a><a class="button quiet" href="#documents">${t('requestDocuments')}</a><a class="button quiet" href="#machined">${t('relatedMachined')}</a></div></div><div class="material-data"><div class="data-block"><h4>${t('properties')}</h4><ul>${copy.properties.map(value => `<li>${value}</li>`).join('')}</ul></div><div class="data-block"><h4>${t('applications')}</h4><ul>${copy.applications.map(value => `<li>${value}</li>`).join('')}</ul></div><div class="data-block"><h4>${t('forms')}</h4><ul>${copy.forms.map(value => `<li>${value}</li>`).join('')}</ul></div><div class="data-block"><h4>${t('reviewNote')}</h4><p>${copy.note}</p></div></div></div>`;
    document.querySelector('[data-material-inquiry]').addEventListener('click',()=>{state.inquiry.type='material';state.inquiry.material=material.id;renderInquiry();});
  }
  function renderMachined() {
    document.querySelector('#machinedGrid').innerHTML=machined.categories.map(item=>{const copy=item.copy[state.lang];return `<article class="machined-card"><span class="solution-code">${item.code}</span><span class="machined-icon">${item.icon}</span><span class="claim-status ${item.status}">${t(item.status==='reference'?'statusReference':'statusPartnerReview')}</span><h3>${copy.title}</h3><p>${copy.text}</p><button type="button" data-machined-inquiry>${t('machinedInquiry')} →</button></article>`}).join('');
    document.querySelector('#semiconductorFocus').innerHTML=machined.semiconductorFocus.map(item=>{const copy=item.copy[state.lang];return `<article class="focus-card"><span class="solution-code">${item.code}</span><span class="machined-icon">${item.icon}</span><h3>${copy.title}</h3><p>${copy.text}</p></article>`}).join('');
    document.querySelectorAll('[data-machined-inquiry]').forEach(button=>button.addEventListener('click',()=>{state.inquiry.type='machined';state.inquiry.material='';renderInquiry();document.querySelector('#inquiry').scrollIntoView();}));
  }
  function renderFooter() {
    const contact = site.contact;
    document.querySelector('#footerContact').innerHTML = `<a href="mailto:${contact.email}">${contact.email}</a><br><a href="tel:${contact.phone.replace(/[^+\d]/g, '')}">${contact.phone}</a><br>${contact.address[state.lang]}`;
  }
  function familyLabel(material) { return material.family === 'fluoropolymer' ? t('fluoropolymer') : t('engineeringPlastic'); }
  function renderComparison() {
    const rows = [
      { label:t('family'), value:item => familyLabel(item) },
      { label:t('properties'), value:item => `<ul>${item.copy[state.lang].properties.map(value=>`<li>${value}</li>`).join('')}</ul>` },
      { label:t('applications'), value:item => `<ul>${item.copy[state.lang].applications.map(value=>`<li>${value}</li>`).join('')}</ul>` },
      { label:t('forms'), value:item => `<ul>${item.copy[state.lang].forms.map(value=>`<li>${value}</li>`).join('')}</ul>` }
    ];
    document.querySelector('#comparisonTable').innerHTML = `<table><thead><tr><th>${t('compareTitle')}</th>${materials.map(item=>`<th class="${item.id===state.material?'is-selected':''}"><button class="compare-material" data-compare-material="${item.id}"><small>${t(item.priority)}</small><strong>${item.name}</strong></button></th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr><th>${row.label}</th>${materials.map(item=>`<td class="${item.id===state.material?'is-selected':''}">${row.value(item)}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="comparison-note">${currentMaterial().copy[state.lang].note}</p>`;
    document.querySelectorAll('[data-compare-material]').forEach(button=>button.addEventListener('click',()=>{selectMaterial(button.dataset.compareMaterial);document.querySelector('#materials').scrollIntoView();}));
  }
  function renderSolutions() {
    document.querySelector('#solutionGrid').innerHTML=flow.solutions.map(solution=>{const copy=solution.copy[state.lang];const machining=solution.code==='05'?`<button type="button" data-solution-machined>${t('openMachined')} →</button>`:'';return `<article class="solution-card"><span class="solution-code">${solution.code}</span><h3>${copy.title}</h3><p>${copy.text}</p><div class="solution-materials" aria-label="${t('reviewCandidates')}">${solution.materials.map(id=>`<span>${materials.find(item=>item.id===id).name}</span>`).join('')}</div><button type="button" data-solution-material="${solution.materials[0]}">${t('openMaterial')} →</button>${machining}</article>`}).join('');
    document.querySelectorAll('[data-solution-material]').forEach(button=>button.addEventListener('click',()=>{selectMaterial(button.dataset.solutionMaterial);document.querySelector('#materials').scrollIntoView();}));
    document.querySelectorAll('[data-solution-machined]').forEach(button=>button.addEventListener('click',()=>{state.inquiry.type='machined';renderInquiry();document.querySelector('#machined').scrollIntoView();}));
  }
  function renderDocuments() {
    document.querySelector('#documentList').innerHTML=flow.documents.map(item=>{const copy=item.copy[state.lang];return `<div class="document-row"><span>${item.code}</span><p>${copy.name}</p><small>${copy.status}</small><a href="#inquiry" data-inquiry-kind="documents">${t('documentInquiry')} →</a></div>`}).join('');
    document.querySelectorAll('[data-inquiry-kind="documents"]').forEach(link=>link.addEventListener('click',()=>{state.inquiry.type='documents';state.inquiry.material=state.material;renderInquiry();}));
  }
  function renderProcess() {
    document.querySelector('#processTrack').innerHTML=flow.process.map((item,index)=>{const copy=item.copy[state.lang];return `<article class="process-step"><b>${String(index+1).padStart(2,'0')}</b><h3>${copy.title}</h3><p>${copy.text}</p></article>`}).join('');
  }
  function renderCompany() {
    document.querySelector('#companyFacts').innerHTML=flow.companyFacts.map(item=>`<div><dt>${item.label[state.lang]}</dt><dd>${item.value[state.lang]}</dd></div>`).join('');
  }
  function renderInquiry() {
    const q=state.inquiry; const machiningFields=q.type==='machined'?`<label class="field">${label('drawingAvailability')}<select name="drawing"><option value="">${t('notSure')}</option><option value="yes" ${q.drawing==='yes'?'selected':''}>${t('drawingAttached')}</option><option value="later" ${q.drawing==='later'?'selected':''}>${t('drawingLater')}</option></select></label><label class="field">${label('criticalRequirement')}<input name="critical" value="${escapeHTML(q.critical)}"></label>`:'';
    const label=(key,required=false)=>`<span class="field-label"><span>${t(key)}</span><small>${t(required?'required':'optional')}</small></span>`;
    document.querySelector('#inquiryBuilder').innerHTML=`<form class="inquiry-form" id="inquiryForm"><div class="form-grid">
      <label class="field wide">${label('inquiryType',true)}<select name="type"><option value="material" ${q.type==='material'?'selected':''}>${t('typeMaterial')}</option><option value="machined" ${q.type==='machined'?'selected':''}>${t('typeMachined')}</option><option value="documents" ${q.type==='documents'?'selected':''}>${t('typeDocuments')}</option><option value="partner" ${q.type==='partner'?'selected':''}>${t('typePartner')}</option></select></label>
      <label class="field wide">${label('interestMaterial')}<select name="material"><option value="">${t('notSure')}</option>${materials.map(item=>`<option value="${item.id}" ${q.material===item.id?'selected':''}>${item.name} — ${item.fullName}</option>`).join('')}</select></label>
      <label class="field">${label('formGrade')}<input name="formGrade" value="${escapeHTML(q.formGrade)}"></label><label class="field">${label('quantity')}<input name="quantity" value="${escapeHTML(q.quantity)}"></label>
      <label class="field wide">${label('applicationRequirement')}<textarea name="application">${escapeHTML(q.application)}</textarea></label>${machiningFields}<label class="field wide">${label('delivery')}<input name="delivery" value="${escapeHTML(q.delivery)}"></label>
      <label class="field">${label('companyName')}<input name="company" value="${escapeHTML(q.company)}"></label><label class="field">${label('contactName',true)}<input name="name" value="${escapeHTML(q.name)}" required></label><label class="field wide">${label('replyEmail',true)}<input name="email" type="email" value="${escapeHTML(q.email)}" required></label>
      </div><div class="inquiry-actions"><button class="main-action" type="submit">${t('openMail')} →</button><button type="button" data-copy-summary>${t('copySummary')}</button><button type="button" data-copy-address>${t('copyAddress')}</button></div><p class="privacy-note">${t('privacyNote')}</p>${q.type==='machined'?`<p class="drawing-note">${t('mailAttachmentNote')}</p>`:''}${site.draftMode?`<p class="draft-email-note">${t('draftEmailNote')}</p>`:''}<p class="form-status" role="status" aria-live="polite"></p></form>`;
    const form=document.querySelector('#inquiryForm');
    form.addEventListener('input',event=>{if(event.target.name)state.inquiry[event.target.name]=event.target.value;});
    form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;saveInquiry(form);location.href=makeMailto();});
    form.querySelector('[data-copy-summary]').addEventListener('click',async()=>{saveInquiry(form);await copyText(buildSummary());});
    form.querySelector('[data-copy-address]').addEventListener('click',async()=>copyText(site.contact.email));
  }
  function saveInquiry(form) { new FormData(form).forEach((value,key)=>{state.inquiry[key]=String(value).trim();}); }
  function inquiryTypeLabel() { return t({material:'typeMaterial',machined:'typeMachined',documents:'typeDocuments',partner:'typePartner'}[state.inquiry.type]); }
  function buildSummary() {
    const q=state.inquiry; const material=materials.find(item=>item.id===q.material)?.name||t('notSure');
    const labels=[['inquiryType',inquiryTypeLabel()],['interestMaterial',material],['formGrade',q.formGrade],['quantity',q.quantity],['applicationRequirement',q.application]]; if(q.type==='machined')labels.push(['drawingAvailability',q.drawing],['criticalRequirement',q.critical]); labels.push(['delivery',q.delivery],['companyName',q.company],['contactName',q.name],['replyEmail',q.email]);
    return labels.map(([key,value])=>`${t(key)}: ${value||'-'}`).join('\n');
  }
  function makeMailto() { const subjects={material:'mailSubjectMaterial',machined:'mailSubjectMachined',documents:'mailSubjectDocuments',partner:'mailSubjectPartner'};return `mailto:${site.contact.email}?subject=${encodeURIComponent(t(subjects[state.inquiry.type]))}&body=${encodeURIComponent(buildSummary())}`; }
  async function copyText(value) {
    const status=document.querySelector('.form-status');
    try { await navigator.clipboard.writeText(value); status.textContent=t('copied'); }
    catch { const area=document.createElement('textarea');area.value=value;document.body.append(area);area.select();const ok=document.execCommand('copy');area.remove();status.textContent=t(ok?'copied':'copyFailed'); }
  }
  function renderAll() { renderTabs(); renderMaterial(); renderMachined(); renderComparison(); renderSolutions(); renderDocuments(); renderProcess(); renderCompany(); renderInquiry(); renderFooter(); }
  function selectMaterial(id) {
    state.material = id; const url = new URL(location.href); url.searchParams.set('material', id); url.searchParams.set('lang', state.lang); history.replaceState({}, '', url); renderTabs(); renderMaterial(); renderComparison();
  }
  function handleTabKeys(event) {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault(); const index=materials.findIndex(item=>item.id===state.material); let next=index;
    if(event.key==='ArrowRight') next=(index+1)%materials.length;
    if(event.key==='ArrowLeft') next=(index-1+materials.length)%materials.length;
    if(event.key==='Home') next=0; if(event.key==='End') next=materials.length-1;
    selectMaterial(materials[next].id); document.querySelector(`#tab-${materials[next].id}`).focus();
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => { state.lang = button.dataset.lang; try { localStorage.setItem('corechem-language', state.lang); } catch {} const url = new URL(location.href); url.searchParams.set('lang', state.lang); history.replaceState({}, '', url); applyLanguage(); }));
  document.querySelector('#materialTabs').addEventListener('keydown', handleTabKeys);
  document.querySelector('[data-partner-inquiry]').addEventListener('click',()=>{state.inquiry.type='partner';state.inquiry.material='';renderInquiry();});
  function initExperience() {
    const progress=document.querySelector('.scroll-progress i');
    const updateProgress=()=>{const range=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${range>0?Math.min(1,scrollY/range):0})`;};
    addEventListener('scroll',updateProgress,{passive:true});updateProgress();
    const sections=[...document.querySelectorAll('main > section')];
    sections.forEach(section=>section.classList.add('reveal'));
    const hashTarget=location.hash&&document.querySelector(location.hash);
    if(hashTarget?.matches('main > section')){
      hashTarget.classList.add('is-visible');
      requestAnimationFrame(()=>{const root=document.documentElement;const previous=root.style.scrollBehavior;root.style.scrollBehavior='auto';hashTarget.scrollIntoView({block:'start'});root.style.scrollBehavior=previous;});
    }
    if('IntersectionObserver' in window){
      const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
      sections.forEach(section=>revealObserver.observe(section));
      const navMap={materials:'materials',solutions:'solutions',company:'company',inquiry:'inquiry'};
      const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;document.querySelectorAll('.main-nav a').forEach(link=>link.classList.toggle('is-active',link.getAttribute('href')===`#${navMap[entry.target.id]||entry.target.id}`));}),{rootMargin:'-35% 0px -55%',threshold:0});
      sections.filter(section=>navMap[section.id]).forEach(section=>navObserver.observe(section));
    } else sections.forEach(section=>section.classList.add('is-visible'));
  }
  applyLanguage();
  initExperience();
})();
