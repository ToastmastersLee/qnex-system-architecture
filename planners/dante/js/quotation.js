(function(App){
    App.state.qnexModel='NDP600';
    App.state.showAuxDisplays=true;
    App.renderQnex=function(){
        const svg=document.getElementById('canvas');
        let g=document.getElementById('qnex-system-node');
        if(!g){g=document.createElementNS('http://www.w3.org/2000/svg','g');g.id='qnex-system-node';svg.append(g);}
        g.setAttribute('transform',`translate(${App.state.roomLength*App.PPM-100},30)`);
        g.innerHTML=`<rect x="-75" y="-12" width="150" height="25" rx="4" fill="#0072ce"/><text text-anchor="middle" y="4" fill="white" font-size="12">Q-NEX ${App.state.qnexModel}</text>`;
    };

    App.quotationForPlan=function(){
        const s=App.state,b=App.bomForPlan(s.roomLength,s.roomWidth,s.devices,s.auxDisplays),{line}=Quotation;
        const lines=Quotation.qnexLines(s.qnexModel);
        const purposes={m100:'Ceiling microphone for remote speech capture and local PA feed.',m40:'Ceiling microphone for speech capture and local PA feed.',dc20:'Dante ceiling speaker for classroom listening and teacher monitoring.'};
        for(const type of ['m100','m40','dc20'])if(b.counts[type])lines.push(line(type.toUpperCase(),b.counts[type],purposes[type]));
        if(b.du11)lines.push(line('DU11',b.du11,'Dante audio interface linking laptop / podium OPS and room audio.'));
        if(b.processor)lines.push(line(b.processor.type,b.processor.count,'Dante audio processing for the currently configured channel count.',false,false));
        for(const size of [55,65,75])if(b.counts[size])lines.push(line(`Auxiliary Display / TV ${size}-inch`,b.counts[size],'Auxiliary classroom display; model, mounting and signal distribution require selection.'));
        return {title:'Dante Classroom',width:s.roomLength,depth:s.roomWidth,lines,
            summary:`Teaching, hybrid learning and unified classroom control with ${s.qnexModel} and Dante audio.`,
            detail:Quotation.scenarioDetail(s.qnexModel)};
    };
    window.addEventListener('DOMContentLoaded',()=>{
        const sidebar=document.querySelector('.sidebar');sidebar.id='dante-options';sidebar.hidden=true;
        const toggle=document.createElement('button');toggle.id='dante-options-toggle';toggle.className='theme-toggle';toggle.setAttribute('aria-controls',sidebar.id);toggle.setAttribute('aria-expanded','false');
        toggle.onclick=()=>{sidebar.hidden=!sidebar.hidden;toggle.setAttribute('aria-expanded',String(!sidebar.hidden));};
        document.querySelector('.top-nav').prepend(toggle);
        const back=document.createElement('a');back.href=new URLSearchParams(location.search).get('home')||'../../index.html';back.className='theme-toggle';document.querySelector('.top-nav').prepend(back);
        const button=document.createElement('button');button.id='export-quotation';button.className='action-btn';button.onclick=()=>Quotation.download(button,App.quotationForPlan());sidebar.prepend(button);
        const systemLabel=document.createElement('label');systemLabel.className='control-group';
        const systemTitle=document.createElement('span');systemLabel.append(systemTitle);
        const system=document.createElement('select');system.id='qnex-model';system.className='custom-select';
        Quotation.qnexModels.forEach(model=>system.add(new Option(model,model)));system.value=App.state.qnexModel;
        system.onchange=()=>{App.state.qnexModel=system.value;App.updateBOM();};systemLabel.append(system);sidebar.prepend(systemLabel);
        const auxLabel=document.createElement('label');const aux=document.createElement('input');aux.type='checkbox';aux.id='include-aux-displays';aux.checked=App.state.showAuxDisplays;
        const auxTitle=document.createElement('span');auxLabel.append(aux,auxTitle);document.getElementById('auxDisplaySummary').before(auxLabel);
        aux.onchange=()=>{App.state.showAuxDisplays=aux.checked;App.renderRoom();};
        const refresh=()=>{const lang=document.getElementById('langSelect').value;document.documentElement.lang=lang;const t=Quotation.words(lang);button.textContent=t[0];back.textContent=t[3];systemTitle.textContent=lang==='zh'?'Q-NEX 系统':'Q-NEX System';auxTitle.textContent=lang==='zh'?'辅助显示屏':'Auxiliary Displays';toggle.textContent=lang==='zh'?'配置与报价':'Configuration / quotation';};
        document.getElementById('langSelect').addEventListener('change',refresh);refresh();
        const q=new URLSearchParams(location.search);if(q.get('theme')==='light'&&!document.body.classList.contains('light-mode'))App.toggleTheme();
        if(q.get('lang')&&document.querySelector(`#langSelect option[value="${CSS.escape(q.get('lang'))}"]`)){document.getElementById('langSelect').value=q.get('lang');App.changeLanguage(q.get('lang'));refresh();}
    });
})(window.AISpeech);
