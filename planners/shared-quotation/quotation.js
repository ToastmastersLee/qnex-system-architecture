/* Browser-only preliminary quotations. Prices are intentionally zero. */
(function () {
    const copy = {
        en:['Export quotation','Preparing…','Quotation failed. Retry.','Back to main'],
        zh:['导出报价表','正在生成…','导出失败，请重试','返回主页面'],
        es:['Exportar cotización','Preparando…','Error. Reintentar.','Volver al inicio'],
        ja:['見積書を出力','作成中…','失敗しました。再試行。','メインに戻る'],
        ko:['견적서 내보내기','준비 중…','실패. 다시 시도하세요.','메인으로'],
        it:['Esporta preventivo','Preparazione…','Errore. Riprova.','Torna alla home'],
        hu:['Árajánlat exportálása','Előkészítés…','Hiba. Próbálja újra.','Főoldal'],
        ar:['تصدير عرض سعر','جارٍ التحضير…','فشل. أعد المحاولة.','الصفحة الرئيسية'],
        fr:['Exporter le devis','Préparation…','Échec. Réessayer.','Accueil'],
        mn:['Үнийн санал татах','Бэлтгэж байна…','Алдаа. Дахин оролдоно уу.','Нүүр хуудас']
    };
    const words = lang => copy[lang] || copy.en;
    const line = (model, quantity, description, pending = false, perRoom = true) => ({ model, quantity, description, pending, perRoom });
    const qnexModels=['NDP600','SL100','NMP311'];
    function qnexLines(model='NDP600') {
        if(!qnexModels.includes(model))throw new Error('Unsupported Q-NEX model');
        const names={NDP600:'Digital podium sales set including body, active stylus and wireless microphone.',SL100:'Smart podium for teaching presentations and integrated room device control.',NMP311:'Networked media processor for teaching AV and integrated room device control.'};
        const rows=[line(model,1,names[model])];
        if(model==='NDP600')rows.push(line('NDP600 Height-Adjustable Stand',1,'Separate height-adjustable stand for the NDP600 podium.'));
        return rows;
    }
    function scenarioDetail(model,recording=false) {
        return `1. Teaching: Present lesson content using the selected room displays and audio equipment.${recording?' Capture lessons with the selected LCS cameras and microphones.':''}\n\n2. Hybrid learning: Connect compatible room cameras and microphones to the meeting computer for remote participation.\n\n3. Centralized control: ${model} brings connected room devices under Q-NEX Console / App control.\n\n4. Cascading control: Extend coordinated control to compatible displays and room equipment through the deployed control connections.`;
    }
    async function exportPlan(plan) {
        if (!plan || ![plan.width,plan.depth].every(n=>Number.isFinite(n)&&n>0) || plan.lines.some(l=>!Number.isFinite(l.quantity)||l.quantity<0)) throw new Error('Invalid plan');
        const wb = new ExcelJS.Workbook(); wb.calcProperties.fullCalcOnLoad = true;
        const ws = wb.addWorksheet(plan.title.slice(0,31), {views:[{state:'normal',showGridLines:false}]});
        const widths=[20.9,33.6,50.3,18.6,18.6,14.5,17.3]; widths.forEach((v,i)=>ws.getColumn(i+1).width=v);
        [18,14.25,14.25,14.25,45,55,145,15,45].forEach((v,i)=>ws.getRow(i+1).height=v);
        for(let r=1;r<=6;r++) ws.mergeCells(r,1,r,7);
        ws.mergeCells('A7:G8'); ws.mergeCells('A9:C9');
        ['IQ HOLDING (HK) LIMITED','IQ & Q-NEX Smart Education Solutions','6th Building, Pioneer Park I, Fuzhou High-technology Base, Shangjie Town, Minhou County, Fuzhou, China','TEL: 86-591-38202660   FAX: 86-591-38203003   WEB: WWW.IQBOARD.NET',`Quotation Proposal: ${plan.title}`,`Solution Description\n${plan.summary}`].forEach((v,i)=>ws.getCell(i+1,1).value=v);
        ws.getCell('A7').value=plan.detail;
        [[1,'Model / Product'],[4,'Unit Price\n(USD/unit)'],[5,'Qty per Each Room'],[6,'Quantity for Rooms'],[7,'Sub Total\n(USD)']].forEach(([c,v])=>ws.getCell(9,c).value=v);
        const lines=plan.lines.filter(l=>l.quantity>0);
        const missing=[];
        for(let i=0;i<lines.length;i++) {
            const l=lines[i],r=10+i; ws.getRow(r).height=82;
            [l.model,null,l.description,0,l.quantity,l.perRoom?1:null,{formula:`D${r}*E${r}${l.perRoom?'*F'+r:''}`,result:0}].forEach((v,c)=>ws.getCell(r,c+1).value=v);
            const asset=window.QUOTATION_IMAGES?.[l.model];
            if(asset) {
                const pic=new Image(); pic.src=asset; await pic.decode();
                const s=Math.min(215/pic.width,94/pic.height), width=pic.width*s,height=pic.height*s;
                const id=wb.addImage({base64:asset,extension:'png'});
                const left=(240-width)/2,top=(109-height)/2;
                ws.addImage(id,{tl:{nativeCol:1,nativeColOff:Math.round(left*9525),nativeRow:r-1,nativeRowOff:Math.round(top*9525)},br:{nativeCol:1,nativeColOff:Math.round((left+width)*9525),nativeRow:r-1,nativeRowOff:Math.round((top+height)*9525)},editAs:'oneCell'});
            } else { missing.push(l.model); ws.getCell(r,3).value+=' Product image pending.'; }
            ws.getCell(r,4).numFmt='$#,##0.00'; ws.getCell(r,7).numFmt='$#,##0.00';
            ws.getCell(r,4).font={color:{argb:'FF0000FF'}};
        }
        const total=10+lines.length; ws.mergeCells(total,1,total,6); ws.getCell(total,1).value='Amount:';
        ws.getCell(total,7).value={formula:lines.length?`SUM(G10:G${total-1})`:'0',result:0}; ws.getCell(total,7).numFmt='$#,##0.00';
        ws.mergeCells(total+1,1,total+1,7); ws.getRow(total+1).height=140;
        ws.getCell(total+1,1).value=`Notes:\n• Preliminary configuration; prices are zero for salesperson completion.\n• EXW unless otherwise agreed. Cables, brackets, installation and certificates excluded unless listed.\n• Standard warranty: 1 year; confirm final terms before issue. Force majeure may affect the quotation.\n• Product images pending: ${missing.join(', ')||'none'}.`;
        ws.eachRow(row=>row.eachCell({includeEmpty:true},cell=>{cell.alignment={vertical:'middle',wrapText:true};cell.border={bottom:{style:'thin',color:{argb:'FFCBD5E1'}}};}));
        for(let r=1;r<=5;r++)ws.getCell(r,1).alignment={horizontal:'center',vertical:'middle',wrapText:true};
        ws.getRow(9).font={bold:true}; ws.getRow(9).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFDCE6F1'}};
        const bytes=await wb.xlsx.writeBuffer();
        const date=new Date(),stamp=`${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
        const name=`Proposal for ${plan.title} from IQ-Q-NEX ${stamp}.xlsx`;
        const url=URL.createObjectURL(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
        const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
        return {name,lines};
    }
    async function download(button, plan) {
        if(button.disabled)return;const t=words(document.documentElement.lang);button.disabled=true;button.textContent=t[1];
        try { await exportPlan(plan);button.textContent=t[0]; } catch(e) {console.error(e);button.textContent=t[2];} finally{button.disabled=false;}
    }
    window.Quotation={line,words,exportPlan,download,qnexModels,qnexLines,scenarioDetail};
})();
