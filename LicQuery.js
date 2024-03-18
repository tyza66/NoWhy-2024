var fileNme = "";

$(function () {
var gsmc = $("#gsmc").textbox("getValue");
var num = $("#num").textbox("getValue");
var registerprovince = $("#registerprovince").combobox("getValue");
var registercity = $("#registercity").combotree("getValues");
var rc = "";
for (var p in registercity) {
	if (rc.trim() != "") {
		rc += "," + registercity[p];
	} else {
		rc = registercity[p];
	}
}
var bq = $("#bq").combobox("getValue");
var name = $("#name").textbox("getValue");
var flag = $("#flag").combobox("getValue");
var islicensing = $("#islicensing").combobox("getValue");
var business_name = $("#business_name").combobox("getValue");
var servername = $("#servername").combobox("getValue");
var associationcontent = $("#associationcontent").combotree("getValues");
var as = "";
for (var p in associationcontent) {
	if (as.trim() != "") {
		as += "," + associationcontent[p];
	} else {
		as = associationcontent[p];
	}
}
var ispreapproval = $("#ispreapproval").combobox("getValue");
var mc = $("#mc").textbox("getValue");
var domain_pass = $("#domain_pass").textbox("getValue");
var regdate = $("#regdate").val();
var license_validity = $("#license_validity").val();
var versionmissionid = $("#versionmissionid").combobox("getValue");
var reportNum = $("#reportNum").combobox("getValue");

var org = $("#org").combobox("getValue");
var firstlicensingdate = $("#firstlicensingdate").val();

//进入页面时执行查询批次数据
$('#licDataGrid').datagrid({
	url : ctx + '/licquery/getLicGridData',
	loadMsg : "正在查询...",
	emptyMsg : "暂无查询结果",
	fit : true,
	rownumbers : true,
	fitColumns : true,
	striped : true, //是否显示斑马线效果。
	nowrap : false,
	pagination : true, //如果为true，则在DataGrid控件底部显示分页工具栏。
	pagePosition : 'bottom',
	pageNumber : 1,
	pageSize : 10,
	pageList: [10, 20, 30, 40, 50, 100],
	queryParams : {
		batchfrom : "0",
		provinceId : provinceId,
		gsmc : gsmc,
		num : num,
		registerprovince : registerprovince,
		registercity : rc,
		bq : bq,
		name : name,
		flag : flag,
		islicensing : islicensing,
		business_name : business_name,
		servername : servername,
		associationcontent : as,
		ispreapproval : ispreapproval,
		mc : mc,
		domain_pass : domain_pass,
		regdate : regdate,
		license_validity : license_validity,
		versionmissionid : versionmissionid,
		reportNum : reportNum,
		org : org,
		firstlicensingdate : firstlicensingdate
	},
	loadFilter : function(result) {
		var data = {};
		if (result.list) {
			data.rows = result.list;
			data.total = result.total;
		} else {
			data.total = 0;
		}
		return data;
	},
	columns : [ [
		{
			field : 'gsmc',
			title : '企业名称',
			width : '15%',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				if (value == undefined || value == null) {
					value = '';
				}else{
					fileNme  = value;
				}
				
				return "<a style='color:#008cff' title='许可证相关信息' onclick=\"showLicInfos('" + row.licid + "','" + row.regdate + "');\">" + value + "</a>";
			}
		},
		{
			field : 'num',
			title : '许可证号',
			width : '10%',
			resizable : false,
			fixed : true/*,
			formatter : function(value, row) {
				if (value == undefined || value == null) {
					value = '';
				}
				return "<a style='color:#008cff' title='许可证详情' onclick=\"showLicDetail('" + row.licid + "');\">" + value + "</a>";
			}*/
		},
		{
			field : 'regorgan',
			title : '发证机关',
			width : '5%',
			resizable : false,
			fixed : true
		},
		{
			field : 'regdate',
			title : '发证日期',
			width : '5%',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				if (value == undefined || value == null) {
					value = '';
				} else {
					value = value.substring(0, 10);
				}
				return value;
			}
		},
		// {
		// 	field : 'firstlicensingdate',
		// 	title : '首次发证日期',
		// 	width : '120',
		// 	resizable : false,
		// 	fixed : true,
		// 	formatter : function(value, row) {
		// 		if (value == undefined || value == null) {
		// 			value = '';
		// 		} else {
		// 			value = value.substring(0, 10);
		// 		}
		// 		return value;
		// 	}
		// },
		{
			field : 'validity',
			title : '有效日期',
			width : '7%',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				if (value == undefined || value == null) {
					value = '';
				} else {
					value = value.substring(0, 10);
				}
				return value;
			}
		},
		{
			field : 'islicensing',
			title : '是否领证',
			width : '3%',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				if (value == undefined || value == null) {
					value = '';
				}
				var txt = '';
				if (value == 1) {
					txt = '已领证';
				} else {
					txt = '未领证';
				}
				return txt;
			}
		},		
		{
			field : 'business_name',
			title : '业务种类',
			width : '28%',
			resizable : false,
			fixed : true
		},
		{
			field : 'versionmissionid',
			title : '许可证类型',
			width : '4%',
			align : 'center',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				if (value == undefined || value == null) {
					value = '';
				}
				var txt = '';
				if (value == 'kdqxk'||value == 'snxk') {
					txt = '增值电信';
				} else if (value == 'kdqcngz'||value == 'cngz') {
					txt = '告知承诺';
				}
				return txt;
			}
		},
		{
			field : 'licurl',
			title : '电子证照',
			width : '6%',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				var result="";
debugger;
					
					var dzzzanxs = $("#power").val();
					var dzzzck = $("#power_watch").val();
					fileUrl = value;
					if(dzzzanxs=="dzzzanxs"){
						result +="<a  style='color:#008cff' id='"+row.licid+"' onclick=\"creatDZZZ(this);\">电子证照生成</a> </br> ";
					}
					if(dzzzck=="dzzzck"){
						result +="<a  style='color:#008cff' id='"+row.licid+"' onclick=\"QianZDZZZ(this);\">电子证照签章</a> </br> ";
					    result += "<a  target='_blank' style='color:#008cff' title='电子证照'  href='"+value+"'>电子证照查看</a></br>";
						result += "<a  target='_blank' style='color:#008cff' name = '"+value+"' title='"+row.licid+"' onclick=\"loadDZZZ(this);\">电子证照下载</a ></br>";
					}

				return result;
			}
		},
		{
			field : 'caozuo',
			title : '操作',
			width : '5%',
			resizable : false,
			fixed : true,
			formatter : function(value, row) {
				value = "发送短信"
				if(row.flag == 1 && row.islicensing != 1 && row.version_no == 1 && row.process_id.trim() != ''){
					return "<a style='color:#008cff' title='发送短信' onclick=\"showShortMessDetail('" + row.licid + "');\">" + value + "</a>";
				}
			}
		}
	] ],
	frozenColumns : [ [
		{
			field : '',
			checkbox : true
		}
	] ]
});
});

var winHeight = document.documentElement.clientHeight;
var winWidth = document.documentElement.clientWidth;



/*xkdf/push/processId?增值电信业务经营许可证-地方通管局版 证照接口地址，
传参processId,目前证照那边平台接口有问题，明天可测试@邓智文
*/
function creatDZZZ(obj){
	var id = "dzzz" +guid()
	$(obj).parent().attr("id",id);
	$(obj).parent().html("证照生成中</br>请稍后查看！");
	console.info($(obj));
	var LICID=$(obj).attr("id");
	$.ajax({
		    url : ctx +'/xkdf/push?processId=&licId='+LICID,
		    type : "GET",
			dataType : "json",
			success : function(data){
				var   status=data.status;
				var   http=data.http;
				var   result="";
				if(status=="success"){
					$(obj).css("color","red");
					var  value= data.result;
					var http='http://'+data.http;
					var  urlstr =data.result;
					debugger;
					result ="<a style='color:#008cff' id='"+LICID+"' onclick=\"creatDZZZ(this);\">电子证照生成</a></br> ";
				    result +="<a style='color:#008cff' id='"+LICID+"' onclick=\"QianZDZZZ(this);\">电子证照签章</a></br> ";
                    result += "<a  target='_blank' style='color:#008cff' title='电子证照查看'  href='"+urlstr+"'>电子证照查看</a></br>";
 					result += "<a  target='_blank'style='color:#008cff' name = '"+urlstr+"' title='"+LICID+"'  onclick=\"loadDZZZ(this);\">电子证照下载</a></br>";
	
				   $("#"+id).html(result);
					alert("电子证照生成成功!");
				}else if(status=="error"){
					alert("系统繁忙,请稍后再试!");
				}
            }
      });
}
function QianZDZZZ(obj){
	var id = "dzzz" +guid()
	$(obj).parent().attr("id",id);
	$(obj).parent().html("<p>证照签章中</br>请稍后查看！</p>");
	var LICID=$(obj).attr("id");
	$.ajax({
		    url : ctx +'/xkdf/pushQZ?processId=&licId='+LICID,
		    type : "GET",
			dataType : "json",
			success : function(data){
				var   status=data.status;
				var   http=data.http;
				var result="";
				if(status=="success"){
					var  value= data.result;
					var http='http://'+data.http;
					var  urlstr =data.result;
					debugger;
					result ="<a style='color:#008cff' id='"+LICID+"' onclick=\"creatDZZZ(this);\">电子证照生成</a></br> ";
				    result +="<a style='color:#008cff' id='"+LICID+"' onclick=\"QianZDZZZ(this);\">电子证照签章</a></br> ";
                    result += "<a  target='_blank' style='color:#008cff' title='电子证照查看'  href='"+http+urlstr+"'>电子证照查看</a></br>";
 					result += "<a  target='_blank'style='color:#008cff' name = '"+http+urlstr+"' title='"+LICID+"'  onclick=\"loadDZZZ(this);\">电子证照下载</a></br>";
	
				    $("#"+id).html(result);
					alert("电子证照签章成功!");
				}else if(status=="error"){
					alert("系统繁忙,请稍后再试!");
				}
            }
      });
}

//查看详情
function showLicDetail(licid) {
	detailDaiglog = $('#win').dialog({
		href : ctx + '/licquery/showLicDetail?licid=' + licid,
		title : '许可证详细信息',
		width : 980,
		height : 800,
		minimizable : false,
		maximizable : false,
		modal : true,
		loadMsg : "正在查询许可证信息",
		iconCls : 'icon-filter',
		buttons : [ {
			text : '关闭',
			handler : function() {
				detailDaiglog.window("close");
			}
		} ]
	});
}

//查看短信模板详情
function showShortMessDetail(licid) {
	detailDaiglog = $('#win').dialog({
		href : ctx + '/licquery/getShortMessContent?licId=' + licid,
		title : '短信详细信息',
		width : 500,
		height : 400,
		minimizable : false,
		maximizable : false,
		modal : true,
		loadMsg : "正在查询短信详细信息",
		iconCls : 'icon-filter'
	});
}

//查看相关信息
function showLicInfos(licid, regdate) {
	debugger;
	detailDaiglog = $('#win').dialog({
		href : ctx + '/licquery/showLicInfos?licid=' + licid + '&licregdate='+regdate,
		title : '许可证相关信息',
		width : 980,
		height : 800,
		minimizable : false,
		maximizable : false,
		modal : true,
		loadMsg : "正在查询许可证相关信息",
		iconCls : 'icon-filter',
		resizable : true,
		buttons : [ {
			text : '关闭',
			handler : function() {
				detailDaiglog.window("close");
			}
		} ]
	});
}

//清除条件
function licFormClear() {
	$("#licSearchForm").form("reset");
}

//查询
function licSearchForm() {
	var gsmc = $("#gsmc").textbox("getValue");
	var num = $("#num").textbox("getValue");
	var registerprovince = $("#registerprovince").combobox("getValue");
	var registercity = $("#registercity").combotree("getValues");
	var rc = "";
	for (var p in registercity) {
		if (rc.trim() != "") {
			rc += "," + registercity[p];
		} else {
			rc = registercity[p];
		}
	}
	var bq = $("#bq").combobox("getValue");
	var name = $("#name").textbox("getValue");
	var flag = $("#flag").combobox("getValue");
	var islicensing = $("#islicensing").combobox("getValue");
	var business_name = $("#business_name").combobox("getValue");
	var servername = $("#servername").combobox("getValue");
	var associationcontent = $("#associationcontent").combotree("getValues");
	var as = "";
	for (var p in associationcontent) {
		if (as.trim() != "") {
			as += "," + associationcontent[p];
		} else {
			as = associationcontent[p];
		}
	}
	var ispreapproval = $("#ispreapproval").combobox("getValue");
	var mc = $("#mc").textbox("getValue");
	var domain_pass = $("#domain_pass").textbox("getValue");
	var regdate = $("#regdate").val();
	var license_validity = $("#license_validity").val();
	var versionmissionid = $("#versionmissionid").combobox("getValue");
	var reportNum = $("#reportNum").combobox("getValue");

	var org = $("#org").combobox("getValue");
	var firstlicensingdate = $("#firstlicensingdate").val();
	
	$('#licDataGrid').datagrid('load', {
		provinceId : provinceId,
		gsmc : gsmc,
		num : num,
		registerprovince : registerprovince,
		registercity : rc,
		bq : bq,
		name : name,
		flag : flag,
		islicensing : islicensing,
		business_name : business_name,
		servername : servername,
		associationcontent : as,
		ispreapproval : ispreapproval,
		mc : mc,
		domain_pass : domain_pass,
		regdate : regdate,
		license_validity : license_validity,
		versionmissionid : versionmissionid,
		reportNum : reportNum,
		org : org,
		firstlicensingdate : firstlicensingdate,
	});
	return false; //防止重复提交
}
function loadDZZZ(obj){
    var id = "dzzz" +guid()
	$(obj).parent().attr("id",id);
	$(obj).parent().html("<p>证照下载中</br>请稍后查看！</p>");
 	var LICID=$(obj).attr("title");
 	var fileUrl=$(obj).attr("name");
 $.ajax({
      url : ctx +'/xkdf/loadDZZZ?licId='+LICID,
      type : "GET",
   dataType : "json",
   success : function(data){
	debugger;
    var   url=data.message;
	var status = data.status;
	if(status =='10'){
		alert(url);
	}else{
    //window.location.href=url;
	downloadFileByBase64('data:application/pdf;base64,'+ url,fileNme+"电子证照");
	setTimeout(function () {
		var result = '';
        result ="<a style='color:#008cff' id='"+LICID+"' onclick=\"creatDZZZ(this);\">电子证照生成</a></br> ";
	    result +="<a style='color:#008cff' id='"+LICID+"' onclick=\"QianZDZZZ(this);\">电子证照签章</a></br> ";
        result += "<a  target='_blank' style='color:#008cff' title='电子证照查看'  href='"+fileUrl+"'>电子证照查看</a></br>";
 	    result += "<a  target='_blank'style='color:#008cff' name = '"+fileUrl+"' title='"+LICID+"'  onclick=\"loadDZZZ(this);\">电子证照下载</a></br>";
        $("#"+id).html(result);
    }, 2000);
	
	}
   
            }
      });

}
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
 
function downloadFile(url,name='What\'s the fuvk'){
    var a = document.createElement("a")
    a.setAttribute("href",url)
    a.setAttribute("download",name)
    a.setAttribute("target","_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);  
    a.dispatchEvent(clickEvent);
    
}
 
function downloadFileByBase64(base64,name){
    var myBlob = dataURLtoBlob(base64)
    var myUrl = URL.createObjectURL(myBlob)
    downloadFile(myUrl,name)
}
 


     
        

//发送短信
function sendMessage(){
	var gridCheckeds = $('#licDataGrid').datagrid('getChecked');
	if(!gridCheckeds || !gridCheckeds.length){
		layer.alert('请选择数据后操作', {icon: 5});
		return false;
	}
	var licids = [];
	$.each(gridCheckeds, function (index, item) {
		licids.push(item.licid);
	});
	licids = licids.toString();
	layer.open({
		title: '发送短信',
		area: ['500px', '300px'],
		content: '<div><textarea id="sendMessageTextarea" ' +
			'style="width:100%;height:160px;resize:none;padding:10px;box-sizing:border-box;" ' +
			'placeholder="请输入短信内容" maxlength="150"></textarea></div>',
		btn: ['发送', '取消'],
		yes: function(index, layero) {
			var value = $.trim($('#sendMessageTextarea').val());
			$.ajax({
				url: ctx + '/SendMessage/sendMessage' ,
				type: 'post',
				data: {
					licids: licids,
					msg: value
				},
				dataType: 'json',
				success: function (data) {
					if(data.data){
						layer.alert('短信已发送', {icon: 1});
						layer.close(index);
					}else{
						layer.alert('短信发送失败', {icon: 5});
					}
				},
				error: function () {
					layer.alert('短信发送失败', {icon: 5});
				}
			});
		},
	});
}

//下拉框赋值
//注册省
$("#registerprovince").combobox({
	url : ctx + '/licquery/getregisterprovince',
	valueField : 'id',
	textField : 'text',
	editable : false,
	//panelHeight:60,
	//注册省联动注册城市
	onChange : function(n, o) {
		var registerprovince = $("#registerprovince").combobox("getValue");
		//注册城市
		$("#registercity").combotree({
			url : ctx + '/licquery/getregistercity?id=' + registerprovince,
			multiple : true,
			valueField : 'id',
			textField : 'text',
			editable : false,
		//panelHeight:60
		});
	}
});
//注册城市
$("#registercity").combotree({
	data : [ {
		"id" : "",
		"text" : "请选择"
	} ],
	valueField : 'id',
	textField : 'text',
	editable : false,
//panelHeight:60
});
//许可证状态
$("#flag").combobox({
	data : [ {
		"id" : "",
		"text" : "全部"
	}, {
		"id" : "1",
		"text" : "正常"
	}, {
		"id" : "-103",
		"text" : "撤销"
	}, {
		"id" : "-104",
		"text" : "无效"
	}, {
		"id" : "-105",
		"text" : "吊销"
	}, {
		"id" : "-106",
		"text" : "注销"
	}, {
		"id" : "-102",
		"text" : "过期"
	} ],
	valueField : 'id',
	textField : 'text',
	value : '1',
	editable : false,
//panelHeight:60
});
//业务种类
$("#business_name").combobox({
	/*data : [ {
		"id" : "",
		"text" : "请选择"
	}, {
		"id" : "41",
		"text" : "国内甚小口径终端地球站通信业务"
	}, {
		"id" : "22",
		"text" : "固定网国内数据传送业务"
	}, {
		"id" : "44",
		"text" : "网络托管业务"
	}, {
		"id" : "49",
		"text" : "互联网数据中心业务"
	}, {
		"id" : "143",
		"text" : "内容分发网络业务"
	}, {
		"id" : "42",
		"text" : "国内互联网虚拟专用网业务"
	}, {
		"id" : "48",
		"text" : "互联网接入服务业务"
	}, {
		"id" : "51",
		"text" : "在线数据处理与交易处理业务"
	}, {
		"id" : "81",
		"text" : "国内多方通信服务业务"
	}, {
		"id" : "2",
		"text" : "存储转发类业务"
	}, {
		"id" : "43",
		"text" : "国内呼叫中心业务"
	}, {
		"id" : "47",
		"text" : "信息服务业务（仅限互联网信息服务）"
	}, {
		"id" : "46",
		"text" : "信息服务业务（不含互联网信息服务）"
	}, {
		"id" : "144",
		"text" : "互联网域名解析服务业务"
	}, {
		"id" : "142",
		"text" : "通过转售方式提供的蜂窝移动通信业务"
	} ],*/
	valueField : 'id',
	textField : 'text',
	url: ctx + '/licquery/getYewuName?lx=K',
	editable : false,
	//panelHeight:60
	//业务种类联动显示服务项目和覆盖范围下拉选项
	onChange : function(n, o) {
		var business_name = $("#business_name").combobox("getValue");
		var servernameDATA = [ {
			"id" : "",
			"text" : "请选择"
		} ];
		var fgfwurl = ctx + '/licquery/getFGFW';
		var preapprovalDATA = [ {
			"id" : "",
			"text" : "请选择"
		} ];
		if (business_name == '41') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=quanguo'
		} else if (business_name == '22') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '44') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '49') {
			servernameDATA.push({
				'id' : '仅限互联网资源协作服务',
				'text' : '仅限互联网资源协作服务'
			}, {
				'id' : '不含互联网资源协作服务',
				'text' : '不含互联网资源协作服务'
			});
			fgfwurl = ctx + '/licquery/getFGFW?leave=shi'
		} else if (business_name == '143') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '42') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '48') {
			servernameDATA.push({
				'id' : '为互联网平台提供接入服务',
				'text' : '为互联网平台提供接入服务'
			}, {
				'id' : '为上网用户提供接入服务',
				'text' : '为上网用户提供接入服务'
			});
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '51') {
			servernameDATA.push({
				"id" : "交易处理业务",
				"text" : "交易处理业务"
			}, {
				"id" : "网络/电子设备数据处理业务",
				"text" : "网络/电子设备数据处理业务"
			}, {
				"id" : "含网络借贷信息中介类的互联网金融业务",
				"text" : "含网络借贷信息中介类的互联网金融业务"
			}, {
				"id" : "电子数据交换业务",
				"text" : "电子数据交换业务"
			});
			fgfwurl = ctx + '/licquery/getFGFW?leave=quanguo'
		} else if (business_name == '81') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '2') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		} else if (business_name == '43') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=quanguo'
		} else if (business_name == '47') {
			servernameDATA.push({
				"id" : "信息发布平台和递送服务",
				"text" : "信息发布平台和递送服务"
			}, {
				"id" : "信息搜索查询服务",
				"text" : "信息搜索查询服务"
			}, {
				"id" : "信息社区服务",
				"text" : "信息社区服务"
			}, {
				"id" : "信息即时交互服务",
				"text" : "信息即时交互服务"
			}, {
				"id" : "信息保护和加工处理服务",
				"text" : "信息保护和加工处理服务"
			});
			preapprovalDATA.push({
				"id" : "新闻",
				"text" : "新闻"
			}, {
				"id" : "出版",
				"text" : "出版"
			}, {
				"id" : "药品和医疗器械",
				"text" : "药品和医疗器械"
			}, {
				"id" : "文化",
				"text" : "文化"
			}, {
				"id" : "视听节目",
				"text" : "视听节目"
			});
			fgfwurl = ctx + '/licquery/getFGFW?leave=quanguo'
		} else if (business_name == '46') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=quanguo'
		} else if (business_name == '144') {
			fgfwurl = ctx + '/licquery/getFGFW?leave=quanguo'
		} else if (business_name == '142') {
			preapprovalDATA.push({
				"id" : "中国电信",
				"text" : "中国电信"
			},
				{
					"id" : "中国移动",
					"text" : "中国移动"
				},
				{
					"id" : "中国联通",
					"text" : "中国联通"
				});
			fgfwurl = ctx + '/licquery/getFGFW?leave=sheng'
		}
		//服务项目
		$("#servername").combobox({
			data : servernameDATA,
			valueField : 'id',
			textField : 'text',
			editable : false,
		//panelHeight:60
		});
		//覆盖范围
		$("#associationcontent").combotree({
			url : fgfwurl,
			multiple : true,
			editable : false,
		//panelHeight:60
		});
		//前置审批项
		$("#ispreapproval").combobox({
			data : preapprovalDATA,
			valueField : 'id',
			textField : 'text',
			editable : false,
		//panelHeight:60
		});
	}
});
//服务项目
$("#servername").combobox({
	data : [ {
		"id" : "",
		"text" : "请选择"
	} ],
	valueField : 'id',
	textField : 'text',
	editable : false,
//panelHeight:60
});
//覆盖范围
$("#associationcontent").combotree({
	url : ctx + '/licquery/getFGFW',
	multiple : true,
	editable : false,
//panelHeight:60
});

//发证机关
$("#org").combobox({
	url : ctx + '/licquery/getregisterprovince2',
	valueField : 'id',
	textField : 'text',
	editable : false,
//panelHeight:60
});

//前置审批项
$("#ispreapproval").combobox({
	data : [ {
		"id" : "",
		"text" : "请选择"
	} ],
	valueField : 'id',
	textField : 'text',
	editable : false,
//panelHeight:60
});

function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
//公司性质
$("#bq").combobox({
	data : [ {
		"id" : "",
		"text" : "全部"
	}, {
		"id" : "1",
		"text" : "国有控股"
	}, {
		"id" : "2",
		"text" : "民营控股"
	}, {
		"id" : "3",
		"text" : "外商投资"
	} ],
	valueField : 'id',
	textField : 'text',
	editable : false,
//panelHeight:60
});
//是否领证
$("#islicensing").combobox({
	data : [ {
		"id" : "",
		"text" : "全部"
	}, {
		"id" : "1",
		"text" : "已领证"
	}, {
		"id" : "2",
		"text" : "未领证"
	} ],
	valueField : 'id',
	textField : 'text',
	editable : false,
//panelHeight:60
});
//许可证类型
$("#versionmissionid").combobox({
	data : [ {
		"id" : "",
		"text" : "全部"
	}, {
		"id" : "xk",
		"text" : "增值电信"
	}, {
		"id" : "cngz",
		"text" : "告知承诺"
	} ],
	valueField : 'id',
	textField : 'text'
});
