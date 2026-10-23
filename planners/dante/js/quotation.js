(function(App){
    App.quotationForPlan=function(){
        const s=App.state,b=App.bomForPlan(s.roomLength,s.roomWidth,s.devices,s.auxDisplays),{line}=Quotation;
        const lines=[line('NDP600',1,'Digital podium sales set including body, active stylus and wireless microphone; local control and hybrid meeting computer access.'),line('NDP600 Height-Adjustable Stand',1,'Separate height-adjustable stand for the NDP600 podium.')];
        const purposes={m100:'Ceiling microphone for remote speech capture and local PA feed.',m40:'Ceiling microphone for speech capture and local PA feed.',dc20:'Dante ceiling speaker for classroom listening and teacher monitoring.'};
        for(const type of ['m100','m40','dc20'])if(b.counts[type])lines.push(line(type.toUpperCase(),b.counts[type],purposes[type]));
        if(b.du11)lines.push(line('DU11',b.du11,'Dante audio interface linking laptop / podium OPS and room audio.'));
        if(b.processor)lines.push(line(b.processor.type,b.processor.count,'Dante audio processing for the currently configured channel count.',false,false));
        for(const size of [55,65,75])if(b.counts[size])lines.push(line(`Auxiliary Display / TV ${size}-inch`,b.counts[size],'Auxiliary classroom display; model, mounting and signal distribution require selection.',true));
        const points=s.devices.map(d=>({...d,label:d.type.toUpperCase(),radius:d.type==='m100'?(s.show.m100_pickup?App.radiiForDevice(d,s.radii,s.heightProfile,s.roomWidth).m100Pickup:0):d.type==='m40'?(s.show.m40_pickup?s.radii.m40Pickup:0):(s.show.dc20?s.radii.dc20:0)}));
        points.push(...s.auxDisplays.map(d=>({...d,label:`TV ${d.size}-inch`})),{x:1,y:1,label:'NDP600'});
        const lang=document.getElementById('langSelect').value,local=App.presentationCopy(lang),en=App.presentationCopy('en');
        const translations=Object.keys(en).map(k=>[local[k],en[k]]);translations.push(['辅助屏','AUX'],['主显示屏','MAIN DISPLAY']);
        return {translations,title:'Dante Classroom',width:s.roomLength,depth:s.roomWidth,lines,points,summary:'Dante classroom audio and podium control for local teaching and hybrid meetings.',detail:'Ceiling microphones capture room speech. Dante processing and adapters connect room audio to the meeting computer. Ceiling speakers support classroom listening. NDP600 provides podium control and computer access.',notes:['Coverage circles are estimates; verify room acoustics, network power and processing capacity on site.']};
    };
    window.addEventListener('DOMContentLoaded',()=>{
        const sidebar=document.querySelector('.sidebar');sidebar.id='dante-options';sidebar.hidden=true;
        const toggle=document.createElement('button');toggle.id='dante-options-toggle';toggle.className='theme-toggle';toggle.setAttribute('aria-controls',sidebar.id);toggle.setAttribute('aria-expanded','false');
        toggle.onclick=()=>{sidebar.hidden=!sidebar.hidden;toggle.setAttribute('aria-expanded',String(!sidebar.hidden));};
        document.querySelector('.top-nav').prepend(toggle);
        const back=document.createElement('a');back.href=new URLSearchParams(location.search).get('home')||'../../index.html';back.className='theme-toggle';document.querySelector('.top-nav').prepend(back);
        const button=document.createElement('button');button.id='export-quotation';button.className='action-btn';button.onclick=()=>Quotation.download(button,App.quotationForPlan());sidebar.prepend(button);
        const refresh=()=>{const lang=document.getElementById('langSelect').value;document.documentElement.lang=lang;const t=Quotation.words(lang);button.textContent=t[0];back.textContent=t[3];toggle.textContent=lang==='zh'?'配置与报价':'Configuration / quotation';};
        document.getElementById('langSelect').addEventListener('change',refresh);refresh();
        const q=new URLSearchParams(location.search);if(q.get('theme')==='light'&&!document.body.classList.contains('light-mode'))App.toggleTheme();
        if(q.get('lang')&&document.querySelector(`#langSelect option[value="${CSS.escape(q.get('lang'))}"]`)){document.getElementById('langSelect').value=q.get('lang');App.changeLanguage(q.get('lang'));refresh();}
    });
})(window.AISpeech);
