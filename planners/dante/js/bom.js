// The canvas BOM and downloadable workbook share the same current plan lines.
(function(App){
 App.updateBOM=function(){
  const target=document.getElementById('bomList');if(!target)return;
  const lang=document.getElementById('langSelect').value;
  target.replaceChildren(...App.quotationForPlan().lines.filter(l=>l.quantity>0).map(l=>{
   const row=document.createElement('div');row.className='bom-item';
   const label=document.createElement('span');label.textContent=l.model+(l.pending?' · '+(lang==='zh'?'待选型':'Pending selection'):'');
   const qty=document.createElement('strong');qty.textContent='× '+l.quantity;row.append(label,qty);return row;
  }));
 };
})(window.AISpeech);
