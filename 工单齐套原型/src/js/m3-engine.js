var matFieldDefs=[
{field:"seqNo",name:"序号",type:"NUM",visible:true,queryType:"_",basicQuery:false,advQuery:false},
{field:"configCode",name:"配置编码",type:"TXT",visible:true,queryType:"TXT_1",basicQuery:true,advQuery:true},
{field:"componentMaterialCode",name:"组件物料",type:"TXT",visible:true,queryType:"TXT_1",basicQuery:true,advQuery:true,isLink:true,fixedLeft:true},
{field:"orgName",name:"组织",type:"SEL",visible:true,queryType:"SEL_2",basicQuery:true,advQuery:true},
{field:"componentResponsibleParty",name:"组件责任方",type:"TXT",visible:true,queryType:"TXT_2",basicQuery:true,advQuery:true},
{field:"relatedWorkOrders",name:"关联工单",type:"TXT",visible:true,queryType:"TXT_2",basicQuery:false,advQuery:false,isLink:true,fixedRight:true,systemFixed:true},
{field:"supplyDetails",name:"供给明细",type:"TXT",visible:true,queryType:"TXT_2",basicQuery:false,advQuery:false,isSupply:true,fixedRight:true,systemFixed:true}
];
var operatorDefs={
"TXT_1":[{value:"=",label:"等于"},{value:"!=",label:"不等于"},{value:"IN",label:"包含"},{value:"NOT_IN",label:"不包含"}],
"TXT_2":[{value:"=",label:"等于"},{value:"!=",label:"不等于"},{value:"LIKE",label:"包含"},{value:"NOT_LIKE",label:"不包含"},{value:"IS_NULL",label:"为空"},{value:"IS_NOT_NULL",label:"不为空"}],
"SEL_2":[{value:"=",label:"等于"},{value:"!=",label:"不等于"},{value:"IS_NULL",label:"为空"},{value:"IS_NOT_NULL",label:"不为空"}],
"NUM":[{value:"=",label:"等于"},{value:"!=",label:"不等于"},{value:">",label:"大于"},{value:"<",label:"小于"},{value:">=",label:"大于等于"},{value:"<=",label:"小于等于"},{value:"IS_NULL",label:"为空"},{value:"IS_NOT_NULL",label:"不为空"}],
"BOOL":[{value:"=",label:"等于"},{value:"!=",label:"不等于"}]
};
var availableColumns,selectedColumns,originalColumnConfig;
var allData=[],filteredData=[],currentPage=1,pageSize=50;
var currentSortOrder="";
window.materialWoData={};

 function init(){
 /* 默认所有字段放在"已选列" */
 matFieldDefs.forEach(function(f){f.visible=true;});
 originalColumnConfig=matFieldDefs.map(function(f){return Object.assign({},f)});
 availableColumns=[];
 selectedColumns=originalColumnConfig.map(function(f){return Object.assign({},f)});
 generateSampleData();
 currentPage=1;
 renderTable();
 addCondition();
 }

function generateSampleData(){
var orgs=["深圳工厂","上海工厂","北京工厂","成都工厂"];
var components=[
{code:"CMP-A001",desc:"贴片电容 10uF 25V"},{code:"CMP-A002",desc:"贴片电阻 10K 1%"},
{code:"CMP-B001",desc:"IC STM32F103"},{code:"CMP-B002",desc:"晶振 8MHz"},
{code:"CMP-C001",desc:"PCB板 4层"},{code:"CMP-C002",desc:"PCBA主板"},
{code:"CMP-D001",desc:"焊锡丝"},{code:"CMP-D002",desc:"导热硅脂"}
];
var responsibleParties=["采购部","供应商","客户"];
allData=[];
for(var i=1;i<=60;i++){
var comp=components[Math.floor(Math.random()*components.length)];
var org=orgs[Math.floor(Math.random()*orgs.length)];
var theoreticalStock=Math.floor(Math.random()*500);
var shortage=Math.floor(Math.random()*100)-30;
var stockStatus=theoreticalStock<=0?"缺货":(theoreticalStock<100?"低库存":"正常");
allData.push({
seqNo:i,
configCode:"CFG-2024-"+String(Math.floor(Math.random()*20)+1).padStart(3,"0"),
componentMaterialCode:comp.code+"-"+String(Math.floor(Math.random()*100)).padStart(3,"0"),
componentMaterialDesc:comp.desc,
orgName:org,
componentResponsibleParty:responsibleParties[Math.floor(Math.random()*responsibleParties.length)],
theoreticalAvailableStock:theoreticalStock,
availableStockShortageQty:shortage,
unIssuedQty:Math.floor(Math.random()*200)+50,
committedQty:Math.floor(Math.random()*150),
onHandQty:Math.floor(Math.random()*1000)+100,
configInventoryQty:Math.floor(Math.random()*800),
relatedWorkOrders:Math.floor(Math.random()*10)+1,
stockStatus:stockStatus
});
}
allData.forEach(function(item){
var woList=[];
var count=Math.floor(Math.random()*5)+1;
for(var w=0;w<count;w++){
woList.push({
workOrderNo:"WO-2024-"+String(Math.floor(Math.random()*10000)).padStart(6,"0"),
orgName:item.orgName,
materialCode:"MTR-"+String(Math.floor(Math.random()*10)).padStart(3,"0"),
materialDes:"成品描述-"+w,
orderQty:Math.floor(Math.random()*300)+50,
requiredCompletionDate:new Date(2024,Math.floor(Math.random()*12),Math.floor(Math.random()*28)+1).toISOString().split("T")[0],
workOrderPriority:["P1-紧急","P2-高","P3-普通"][Math.floor(Math.random()*3)],
transferBy:["张三","李四","王五"][Math.floor(Math.random()*3)],
unitUsage:(Math.random()*10+1).toFixed(2),
isRequired:Math.floor(Math.random()*100)+10,
yieldRate:"0.98",
issuedQty:Math.floor(Math.random()*200),
unIssuedQty:Math.floor(Math.random()*100),
availableQty:Math.floor(Math.random()*500),
theoreticalAvailableStockInclPoWo:Math.floor(Math.random()*800),
committedQty:Math.floor(Math.random()*150),
availableStockShortageQty:Math.floor(Math.random()*60)-30,
woShortageQty:Math.floor(Math.random()*50)-20,
isKitComplete:Math.random()>0.3?"齐套":"未齐套"
});
}
materialWoData[item.componentMaterialCode]=woList;
});
filteredData=allData.slice();
}

function buildHeaderHtml(){
var html="<tr><th class='col-check'><input type='checkbox' onchange='toggleAll(this)'></th>";
selectedColumns.forEach(function(col){
var thClass="";
if(col.fixedLeft)thClass="col-left-sticky";
else if(col.isSupply)thClass="col-supply-sticky";
else if(col.fixedRight)thClass="col-right-sticky";
html+='<th class="'+thClass+'">'+col.name+'</th>';
});
html+="</tr>";
return html;
}

function buildBodyHtml(){
var start=(currentPage-1)*pageSize;
var end=Math.min(start+pageSize,filteredData.length);
var html="";
for(var i=start;i<end;i++){
var item=filteredData[i];
var rowClass=item.stockStatus==="缺货"?"row-shortage":(item.stockStatus==="低库存"?"row-low-stock":"");
html+='<tr class="'+rowClass+'"><td class="col-check"><input type="checkbox"></td>';
selectedColumns.forEach(function(col){
var value=item[col.field];
var tdClass=col.fixedLeft?"col-left-sticky":(col.isSupply?"col-supply-sticky":(col.fixedRight?"col-right-sticky":""));
if(col.isLink){
html+='<td class="'+tdClass+'"><a class="link" onclick="openRelatedWosDrawer(\''+item.componentMaterialCode+'\')">'+value+'</a></td>';
}else if(col.isSupply){
html+='<td class="'+tdClass+'"><a class="supply-link" onclick="goToSupply(\'PR\',\''+item.componentMaterialCode+'\')">PR</a> <a class="supply-link" onclick="goToSupply(\'PO\',\''+item.componentMaterialCode+'\')">PO</a> <a class="supply-link" onclick="goToSupply(\'WO\',\''+item.componentMaterialCode+'\')">WO</a></td>';
}else{
html+='<td class="'+tdClass+'">'+(value!==undefined&&value!==null?value:"")+'</td>';
}
});
html+="</tr>";
}
return html;
}

function renderTable(){
document.getElementById("tableHead").innerHTML=buildHeaderHtml();
document.getElementById("tableBody").innerHTML=buildBodyHtml();
document.getElementById("totalCount").textContent=filteredData.length;
document.getElementById("totalPages").textContent=Math.ceil(filteredData.length/pageSize)||1;
document.getElementById("currentPage").textContent=currentPage;
}

function showToast(message,type){
var toast=document.getElementById("toast");
toast.querySelector(".toast-message").textContent=message;
toast.querySelector(".toast-icon").textContent=type==="success"?"✓":"✕";
toast.className="toast "+type+" show";
setTimeout(function(){toast.classList.remove("show")},2500);
}

function sortData(order){
currentSortOrder=order;
document.getElementById("sortAscBtn").classList.toggle("active",order==="asc");
document.getElementById("sortDescBtn").classList.toggle("active",order==="desc");
if(order==="asc")filteredData.sort(function(a,b){return(a.theoreticalAvailableStock||0)-(b.theoreticalAvailableStock||0)});
else if(order==="desc")filteredData.sort(function(a,b){return(b.theoreticalAvailableStock||0)-(a.theoreticalAvailableStock||0)});
currentPage=1;renderTable();
showToast("数据已按理论可用库存"+(order==="asc"?"升序":"降序")+"排列","success");
}

function doSearch(){
var configCode=document.getElementById("configCode").value.trim();
var orgName=document.getElementById("orgName").value;
var componentCode=document.getElementById("componentCode").value.trim();
var stockStatus=document.getElementById("stockStatus").value;
filteredData=allData.filter(function(item){
if(configCode&&item.configCode.indexOf(configCode)===-1)return false;
if(orgName&&item.orgName!==orgName)return false;
if(componentCode&&item.componentMaterialCode.indexOf(componentCode)===-1)return false;
if(stockStatus&&item.stockStatus!==stockStatus)return false;
return true;
});
if(currentSortOrder==="asc")filteredData.sort(function(a,b){return(a.theoreticalAvailableStock||0)-(b.theoreticalAvailableStock||0)});
else if(currentSortOrder==="desc")filteredData.sort(function(a,b){return(b.theoreticalAvailableStock||0)-(a.theoreticalAvailableStock||0)});
currentPage=1;renderTable();
showToast("查询完成，共 "+filteredData.length+" 条记录","success");
}

function resetQuery(){
document.getElementById("configCode").value="";
document.getElementById("orgName").value="";
document.getElementById("componentCode").value="";
document.getElementById("stockStatus").value="";
currentSortOrder="";
document.getElementById("sortAscBtn").classList.remove("active");
document.getElementById("sortDescBtn").classList.remove("active");
filteredData=allData.slice();
currentPage=1;
renderTable();
showToast("查询条件已重置，共 "+filteredData.length+" 条记录","success");
}

function openRelatedWosDrawer(matCode){
var matData=allData.filter(function(d){return d.componentMaterialCode===matCode});
if(matData.length===0)return;
var item=matData[0];
var woList=materialWoData[matCode]||[];
document.getElementById("drawerTitle").textContent=" - "+matCode;
var h='<div class="detail-section"><div class="detail-section-title">物料基本信息</div><div class="detail-grid">';
h+='<div class="detail-item"><span class="detail-label">配置编码</span><span class="detail-value">'+item.configCode+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">组织</span><span class="detail-value">'+item.orgName+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">组件物料</span><span class="detail-value">'+item.componentMaterialCode+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">组件物料描述</span><span class="detail-value">'+item.componentMaterialDesc+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">配置库存数量</span><span class="detail-value">'+item.configInventoryQty+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">可用库存缺料数</span><span class="detail-value'+(item.availableStockShortageQty<0?' text-danger':'')+'">'+item.availableStockShortageQty+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">已承诺数量</span><span class="detail-value">'+item.committedQty+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">未发料数量</span><span class="detail-value">'+item.unIssuedQty+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">组件责任方</span><span class="detail-value">'+item.componentResponsibleParty+'</span></div>';
h+='<div class="detail-item"><span class="detail-label">现存数量</span><span class="detail-value">'+item.onHandQty+'</span></div>';
h+='</div></div>';
h+='<div class="detail-section"><div class="detail-section-title">关联工单列表（共'+woList.length+'项）</div><div class="detail-table-scroll"><table class="detail-table"><thead><tr>';
h+='<th>工单号</th><th>组织</th><th>料号</th><th>说明</th><th>下单数量</th><th>要求完成日期</th><th>工单优先级</th><th>转单人</th><th>单位用量</th><th>必需</th><th>产出率</th><th>已发料量</th><th>未发料数量</th><th>可用量</th><th>理论可用(含PO&WO)</th><th>已承诺数量</th><th>可用库存缺料数</th><th>工单缺料数量</th><th>是否齐套</th>';
h+='</tr></thead><tbody>';
woList.forEach(function(wo){
h+='<tr><td><a class="link" onclick="goToWoDetail(\''+wo.workOrderNo+'\')">'+wo.workOrderNo+'</a></td>';
h+='<td>'+wo.orgName+'</td><td>'+wo.materialCode+'</td><td>'+wo.materialDes+'</td><td>'+wo.orderQty+'</td>';
h+='<td>'+wo.requiredCompletionDate+'</td><td>'+wo.workOrderPriority+'</td><td>'+wo.transferBy+'</td>';
h+='<td>'+wo.unitUsage+'</td><td>'+wo.isRequired+'</td><td>'+wo.yieldRate+'</td>';
h+='<td>'+wo.issuedQty+'</td><td>'+wo.unIssuedQty+'</td><td>'+wo.availableQty+'</td>';
h+='<td>'+wo.theoreticalAvailableStockInclPoWo+'</td><td>'+wo.committedQty+'</td>';
h+='<td class="'+(wo.availableStockShortageQty<0?'text-danger':'')+'">'+wo.availableStockShortageQty+'</td>';
h+='<td class="'+(wo.woShortageQty<0?'text-danger':'')+'">'+wo.woShortageQty+'</td>';
h+='<td><span class="badge '+(wo.isKitComplete==="齐套"?"badge-success":"badge-danger")+'">'+wo.isKitComplete+'</span></td></tr>';
});
h+='</tbody></table></div></div>';
document.getElementById("drawerBody").innerHTML=h;
document.getElementById("drawerOverlay").classList.add("show");
document.getElementById("drawer").classList.add("show");
}

function closeDrawer(){
document.getElementById("drawerOverlay").classList.remove("show");
document.getElementById("drawer").classList.remove("show");
}

function goToWoDetail(woNo){window.location.href="../business/M2-wo-details.html?woNo="+woNo;}
function goToSupply(type,matCode){window.location.href="../supply/"+type.toLowerCase()+"-supply.html?mat="+matCode;}
function changePageSize(){pageSize=parseInt(document.getElementById("pageSizeSelect").value);currentPage=1;renderTable();}
function prevPage(){if(currentPage>1){currentPage--;renderTable();}}
function nextPage(){if(currentPage<Math.ceil(filteredData.length/pageSize)){currentPage++;renderTable();}}
function toggleAll(cb){document.querySelectorAll("#tableBody input[type=checkbox]").forEach(function(c){c.checked=cb.checked;});}

function exportData(){
var headers=selectedColumns.map(function(c){return c.name;});
var csv=headers.join(",")+"\n";
filteredData.forEach(function(item){
var row=selectedColumns.map(function(col){var val=item[col.field];return val!==undefined&&val!==null?val:"";});
csv+=row.join(",")+"\n";
});
var blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});
var link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="物料详情_"+new Date().toISOString().split("T")[0]+".csv";
link.click();
showToast("导出成功，共 "+filteredData.length+" 条数据","success");
}

function openAdvancedSearch(){document.getElementById("advancedModal").classList.add("show");document.getElementById("advOverlay").style.display="block";}
function closeAdvancedSearch(){document.getElementById("advancedModal").classList.remove("show");document.getElementById("advOverlay").style.display="none";}
function addCondition(){
var advFields=matFieldDefs.filter(function(f){return f.advQuery;});
var fieldOpts=advFields.map(function(f){return '<option value="'+f.field+'" data-type="'+f.queryType+'">'+f.name+'</option>';}).join("");
document.getElementById("conditionList").innerHTML+='<div class="condition-item"><select class="field-select" onchange="updateOperators(this)">'+fieldOpts+'</select><select class="op-select"><option value="=">等于</option></select><input type="text" placeholder="输入值"><button class="condition-delete" onclick="this.parentElement.remove();updateCondCount();">×</button></div>';
updateCondCount();
}
function updateOperators(select){
var type=select.options[select.selectedIndex].dataset.type;
var ops=operatorDefs[type]||operatorDefs["TXT_2"];
select.parentElement.querySelector(".op-select").innerHTML=ops.map(function(o){return '<option value="'+o.value+'">'+o.label+'</option>';}).join("");
}
function clearConditions(){document.getElementById("conditionList").innerHTML="";addCondition();}
function updateCondCount(){document.getElementById("conditionCount").textContent=document.querySelectorAll(".condition-item").length;}
function applyAdvancedSearch(){closeAdvancedSearch();showToast("高级查询条件已应用","success");}

function openColumnConfig(){renderColumnPanels();document.getElementById("columnModal").classList.add("show");document.getElementById("colOverlay").style.display="block";}
function closeColumnConfig(){document.getElementById("columnModal").classList.remove("show");document.getElementById("colOverlay").style.display="none";}
function renderColumnPanels(){
document.getElementById("availableColumns").innerHTML=availableColumns.map(function(c,i){return '<div class="column-item" data-idx="'+i+'"><input type="checkbox"><span>'+c.name+'</span></div>';}).join("");
document.getElementById("selectedColumns").innerHTML=selectedColumns.map(function(c,i){return '<div class="column-item selected" data-idx="'+i+'"><input type="checkbox" checked><span>'+c.name+'</span></div>';}).join("");
document.getElementById("availableCount").textContent=availableColumns.length;
document.getElementById("selectedCount").textContent=selectedColumns.length;
}
function addSelectedColumns(){
var items=document.querySelectorAll("#availableColumns .column-item input:checked");
var indices=[];items.forEach(function(cb){indices.push(parseInt(cb.closest(".column-item").dataset.idx));});
indices.sort(function(a,b){return b-a;});
indices.forEach(function(idx){if(!isNaN(idx)&&idx>=0&&idx<availableColumns.length){selectedColumns.push(availableColumns[idx]);availableColumns.splice(idx,1);}});
renderColumnPanels();
}
function addAllColumns(){selectedColumns.push.apply(selectedColumns,availableColumns.splice(0));renderColumnPanels();}
function removeSelectedColumns(){
var items=document.querySelectorAll("#selectedColumns .column-item input:checked");
var indices=[];items.forEach(function(cb){indices.push(parseInt(cb.closest(".column-item").dataset.idx));});
indices.sort(function(a,b){return b-a;});
indices.forEach(function(idx){if(!isNaN(idx)&&idx>=0&&idx<selectedColumns.length){availableColumns.push(selectedColumns[idx]);selectedColumns.splice(idx,1);}});
renderColumnPanels();
}
function removeAllColumns(){availableColumns.push.apply(availableColumns,selectedColumns.splice(0));renderColumnPanels();}
 function resetColumnConfig(){
 selectedColumns=matFieldDefs.map(function(f){return Object.assign({},f)});
 originalColumnConfig=selectedColumns.map(function(f){return Object.assign({},f)});
 availableColumns=[];
 renderColumnPanels();
 showToast("已恢复默认列配置（全部显示）","success");
 }
function applyColumnConfig(){
selectedColumns=selectedColumns.map(function(c){return Object.assign({},c,{visible:true})});
availableColumns.forEach(function(c){var found=matFieldDefs.find(function(f){return f.field===c.field});if(found)found.visible=false;});
selectedColumns.forEach(function(c){var found=matFieldDefs.find(function(f){return f.field===c.field});if(found)found.visible=true;});
originalColumnConfig=selectedColumns.map(function(f){return Object.assign({},f)});
renderTable();closeColumnConfig();showToast("列配置已应用","success");
}

window.onload=init;
