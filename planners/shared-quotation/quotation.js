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
    const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
    function captureSvg(element, pairs) {
        if(!element)return null;
        const clone=element.cloneNode(true), a=[element,...element.querySelectorAll('*')],b=[clone,...clone.querySelectorAll('*')];
        a.forEach((node,i)=>{const css=getComputedStyle(node);for(const key of ['fill','stroke','stroke-width','opacity','font-size','font-family','font-weight','display'])b[i].style.setProperty(key,css.getPropertyValue(key));});
        const replacements=(pairs||[]).filter(([from,to])=>from&&to&&from!==to).sort((a,b)=>b[0].length-a[0].length);
        clone.querySelectorAll('text').forEach(node=>{let text=node.textContent;for(const [from,to] of replacements)text=text.split(from).join(to);node.textContent=text;});
        const box=element.viewBox.baseVal;const width=box.width||element.clientWidth,height=box.height||element.clientHeight;
        clone.setAttribute('width',width);clone.setAttribute('height',height);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
        return {svg:new XMLSerializer().serializeToString(clone),width,height};
    }
    async function layoutImage(plan) {
        const scale = Math.min(48, 850 / Math.max(plan.width, plan.depth));
        const w = plan.width * scale + 100, h = plan.depth * scale + 130;
        const x = p => 50 + p.x * scale, y = p => 65 + p.y * scale;
        const devices = plan.points || [];
        const shapes = devices.map(p => `${p.radius ? `<circle cx="${x(p)}" cy="${y(p)}" r="${p.radius*scale}" fill="${p.color||'#22c55e'}" fill-opacity=".07" stroke="${p.color||'#22c55e'}" stroke-opacity=".4"/>` : ''}<circle cx="${x(p)}" cy="${y(p)}" r="5" fill="${p.color||'#0072ce'}"/><text x="${x(p)+7}" y="${y(p)-7}" font-size="11">${esc(p.label)}</text>`).join('');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="white"/><g font-family="Arial" fill="#172b4d"><text x="50" y="25" font-size="17">${esc(plan.title)}</text><text x="50" y="45" font-size="12">${plan.width} m × ${plan.depth} m · current layout / coverage estimate</text><defs><clipPath id="room"><rect x="50" y="65" width="${plan.width*scale}" height="${plan.depth*scale}"/></clipPath></defs><rect x="50" y="65" width="${plan.width*scale}" height="${plan.depth*scale}" fill="#f8fafc" stroke="#64748b"/><g clip-path="url(#room)">${shapes}</g><text x="50" y="${h-20}" font-size="11">Front at top · Preliminary layout; on-site verification required.</text></g></svg>`;
        const actual=plan.capture;
        const url = URL.createObjectURL(new Blob([actual?.svg||svg], {type:'image/svg+xml'}));
        try {
            const img = new Image(); img.src = url; await img.decode();
            const canvas = document.createElement('canvas'); canvas.width=(actual?.width||w)*2; canvas.height=(actual?.height||h)*2;
            canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
            return {data:canvas.toDataURL('image/png'), width:actual?.width||w, height:actual?.height||h};
        } finally { URL.revokeObjectURL(url); }
    }
    async function exportPlan(plan) {
        if (!plan || ![plan.width,plan.depth].every(n=>Number.isFinite(n)&&n>0) || plan.lines.some(l=>!Number.isFinite(l.quantity)||l.quantity<0)) throw new Error('Invalid plan');
        const wb = new ExcelJS.Workbook(); wb.calcProperties.fullCalcOnLoad = true;
        const ws = wb.addWorksheet(plan.title.slice(0,31), {views:[{state:'normal',showGridLines:false}]});
        const widths=[20.9,33.6,50.3,18.6,18.6,14.5,17.3]; widths.forEach((v,i)=>ws.getColumn(i+1).width=v);
        [18,14.25,14.25,14.25,55,90,250,160,45].forEach((v,i)=>ws.getRow(i+1).height=v);
        for(let r=1;r<=6;r++) ws.mergeCells(r,1,r,7);
        ws.mergeCells('A7:C8'); ws.mergeCells('D7:G8'); ws.mergeCells('A9:C9');
        ['IQ HOLDING (HK) LIMITED','IQ & Q-NEX Smart Education Solutions','6th Building, Pioneer Park I, Fuzhou High-technology Base, Shangjie Town, Minhou County, Fuzhou, China','TEL: 86-591-38202660   FAX: 86-591-38203003   WEB: WWW.IQBOARD.NET',`Quotation Proposal: ${plan.title}`,`Solution Description\n${plan.summary}`].forEach((v,i)=>ws.getCell(i+1,1).value=v);
        ws.getCell('A7').value=`${plan.detail}\n\nRoom: ${plan.width} × ${plan.depth} m.\nPreliminary configuration for sales review. Pricing, supply and compatibility require confirmation.\n${(plan.notes||[]).join('\n')}`;
        const image = await layoutImage(plan);
        const imageId=wb.addImage({base64:image.data,extension:'png'});
        const ratio=Math.min(480/image.width,510/image.height);
        const iw=image.width*ratio,ih=image.height*ratio,left=(500-iw)/2,top=(546-ih)/2;
        ws.addImage(imageId,{tl:{nativeCol:3,nativeColOff:Math.round(left*9525),nativeRow:6,nativeRowOff:Math.round(top*9525)},br:{nativeCol:3,nativeColOff:Math.round((left+iw)*9525),nativeRow:6,nativeRowOff:Math.round((top+ih)*9525)},editAs:'oneCell'});
        [[1,'Model / Product'],[4,'Unit Price\n(USD/unit)'],[5,'Qty per Each Room'],[6,'Quantity for Rooms'],[7,'Sub Total\n(USD)']].forEach(([c,v])=>ws.getCell(9,c).value=v);
        const pending = plan.lines.filter(l=>l.pending&&l.quantity>0), lines=plan.lines.filter(l=>!l.pending&&l.quantity>0);
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
        ws.getCell(total+1,1).value=`Notes:\n• Preliminary configuration; prices are zero for salesperson completion.\n• EXW unless otherwise agreed. Cables, brackets, installation and certificates excluded unless listed.\n• Standard warranty: 1 year; confirm final terms before issue. Force majeure may affect the quotation.\n• Pending selection: ${pending.length? 'see Pending Selection sheet; excluded from amount.':'none.'}\n• Product images pending: ${missing.join(', ')||'none'}.`;
        ws.eachRow(row=>row.eachCell({includeEmpty:true},cell=>{cell.alignment={vertical:'middle',wrapText:true};cell.border={bottom:{style:'thin',color:{argb:'FFCBD5E1'}}};}));
        for(let r=1;r<=5;r++)ws.getCell(r,1).alignment={horizontal:'center',vertical:'middle',wrapText:true};
        ws.getRow(9).font={bold:true}; ws.getRow(9).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFDCE6F1'}};
        if(pending.length){const ps=wb.addWorksheet('Pending Selection');ps.columns=[{header:'Equipment / Requirement',key:'model',width:38},{header:'Quantity',key:'quantity',width:15},{header:'Purpose / Confirmation required',key:'description',width:95}];pending.forEach(l=>ps.addRow(l));ps.eachRow(r=>r.eachCell(c=>c.alignment={wrapText:true,vertical:'top'}));}
        const bytes=await wb.xlsx.writeBuffer();
        const date=new Date(),stamp=`${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
        const name=`Proposal for ${plan.title} from IQ-Q-NEX ${stamp}.xlsx`;
        const url=URL.createObjectURL(new Blob([bytes],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
        const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
        return {name,lines,pending};
    }
    async function download(button, plan) {
        if(button.disabled)return;const t=words(document.documentElement.lang);button.disabled=true;button.textContent=t[1];
        try { plan={...plan,capture:captureSvg(document.querySelector(plan.title.startsWith('LCS')?'.lcs-app svg':'#canvas'),plan.translations)}; await exportPlan(plan);button.textContent=t[0]; } catch(e) {console.error(e);button.textContent=t[2];} finally{button.disabled=false;}
    }
    window.Quotation={line,words,exportPlan,download};
})();
