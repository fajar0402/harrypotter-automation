/*
	LAST UPDATED: 07/09/2014
	Version 2014.07.13
	AWS Gluster Mount Remediation  Test Universal - 09/03/2015 
	
*/


var ModalSPS = function() {};

jQuery.extend(ModalSPS.prototype, {   
init: function(spsId,successUrl,failureUrl,keyIndex,nonce,expirationTime,clientId,signature) {
	this.si = spsId;
	this.su = successUrl;
	this.fu =failureUrl;
	this.ki = keyIndex;
	this.n = nonce;
	this.et = expirationTime;
	this.ci = clientId;
	this.s = signature;	
	
	vModal.setSuccessURL(vModal.su);
	vModal.setFailureURL(vModal.fu);
	vModal.setSuccessCloseHook(vModal.defaultSuccessHook);	
	vModal.setFailureCloseHook(vModal.defaultFailureHook);	

	
	
},data: function(data) {
	this.d = data;
},setSuccessURL: function(url) {
	this.successURL = url;
},getSuccessURL: function() {
	return this.successURL;	
},setFailureURL: function(url) {
	this.failureURL = url;
},getFailureURL: function() {
	return this.failureURL;
},setSuccessCloseHook: function(hook) { 
	this.successCloseHook = hook;
},getSuccessCloseHook: function() { 
	return this.successCloseHook(); 	  
},setFailureCloseHook: function(hook) { 
	this.failureCloseHook = hook;
},getFailureCloseHook: function() { 
	return this.failureCloseHook(); 
},defaultSuccessHook: function(){
	location.href=this.getSuccessURL();
},defaultFailureHook: function(){
	location.href=this.getFailureURL();	
}



});


var vModal = new ModalSPS();



var imgRoot="https://myaccount.scholastic.com/content/universal/images/";
var GB_DONE = false, GB_HEIGHT = 707, GB_WIDTH = 400, GB_TOP = 132;
var maActiveTab, maDefaultStore, oc = (typeof oc != 'undefined') ? encodeURIComponent(oc) : '';
var rpType = (typeof srt != 'undefined') ? srt : '';
var sur = "";
var redirectFn = "";
var maNewActiveTab = "";
var appName = "";
var ibtsp = "";
var cac = "";
var sourceId = "";
var useRegistrationType = "";
var destpopup = "n";
var rpView = "";
var noGWT = "true";
var sul = "";
var sUCN = "";
var doMobile = "";
var preRegToken = "";
var iFrameSize=300;
var internalSize=100;
var existentTEUser="";

function GB_show(url, height, width) {   
  var position = getPageSize();
  GB_HEIGHT = height || 400;
  GB_WIDTH = width || 400;
  if((!jQuery('#GB_overlay').length>0) || (!jQuery('#ma_wrapper').length>0)) {
	jQuery('#GB_overlay').remove();
	jQuery('#ma_wrapper').remove();
    jQuery(document.body).append("<div id='GB_overlay'></div><div id='ma_wrapper'></div>");
    GB_DONE = true;
  }
  hideSelectBoxes();
  maOverlay();
  jQuery("#GB_overlay").show();
  jQuery("#GB_frame").remove();
  if (isMobile2()){


	  jQuery("#ma_wrapper").append("<iframe id='GB_frame' name='GB_frame' frameborder='0' scrolling='yes' allowtransparency='true' width='660px;' height='10000px;' src='"+url+"'></iframe>"); 
  }else{
	  jQuery("#ma_wrapper").append("<iframe id='GB_frame' name='GB_frame' frameborder='0' scrolling='no' allowtransparency='true' width='1041px;' height='709' src='"+url+"'></iframe>");  
  }  
  
  
  
  
  GB_position();   
  jQuery("#ma_wrapper").show();
}

function GB_show2(url, height, width) {   
	var position = getPageSize();
  
  GB_HEIGHT = height || 400;
  GB_WIDTH = width || 400;
  if((!jQuery('#GB_overlay').length>0) || (!jQuery('#ma_wrapper').length>0)) {
	jQuery('#GB_overlay').remove();
	jQuery('#ma_wrapper').remove();
      

	if (isMobile2()){
		jQuery(document.body).prepend("<div id='GB_pagetop'></div>");
		jQuery(document.body).append("<div id='GB_overlay' style='height: 10000px;'></div><div id='ma_wrapper' style='width: "+position[0]+"px; height: 10000px;  left: 0px; top: 0px;'></div><a href='#' id='scrolltop_link' style='position:fixed; bottom:0px; right:0px; background:#666; z-index:1000003; font-size:36px; box-sizing: border-box; text-align:center; -webkit-border-top-left-radius: 10px; -webkit-border-top-right-radius: 10px; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px; color:#fff; text-decoration:none; font-family:Arial, sans-serif; padding:16px; display:none;'>&#9650;<br>TOP</a>");
	
		
	}else{	
	    jQuery(document.body).append("<div id='GB_overlay' style='height: 756px;'></div><div id='ma_wrapper' style='width: 1024px; height: 614px; left: 50%; margin-left: -512px;  top: 45px;'></div>");
	}
    GB_DONE = true;
  }
  hideSelectBoxes();
  maOverlay();
  jQuery("#GB_overlay").show();
  jQuery("#GB_frame").remove();
  if (isMobile2()){
	  
      var wrapper = "<iframe id='GB_frame' name='GB_frame' frameborder='0' scrolling='yes' allowtransparency='true' width='"+position[0]+"px;' height='10000px;' src='"+url+"'></iframe>";
	  
	  jQuery("#ma_wrapper").append(wrapper); 
  }else{
	  jQuery("#ma_wrapper").append("<iframe id='GB_frame' name='GB_frame' frameborder='0' scrolling='no' allowtransparency='true' width='1024' height='709' src='"+url+"'></iframe>");  
  }
  //GB_position();   
  jQuery("#ma_wrapper").show();
}


function getSuccessRegistration() {
	return sur;
}
function resetSuccessRegistration() {
	sur = "";

}
function setSuccessRegistration() {
	sur = "sur";
}

function showMyProfileTab(){
	GB_hide("4");
	disableDestPopUp();
	MA_show();
}

function MA_show2() {
	
	
	if (appName=="ofe"){
		 doMobile="true";
	}
	

	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
    }
	var url = MYACCOUNT_HOST + '/myaccount/MyAccount.htm';
	if (typeof maDefaultStore != "undefined") {
		url += maDefaultStore;
	}
	if (typeof rpView != "") {
		if (url.indexOf('?') != -1) { url += '&amp;v=' + rpView; }
		else { url += '?v=' + rpView; }		
	}	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}

	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }		
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }		
	}
	
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}

	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	
	if (typeof maNewActiveTab != "") {
		if (url.indexOf('?') != -1) { url += '&amp;at=' + maNewActiveTab; }
		else { url += '?at=' + maNewActiveTab; }		
	}
	
	//te
	if (typeof existentTEUser != "") {
		if (url.indexOf('?') != -1) { url += '&amp;existentTEUser=' + existentTEUser; }
		else { url += '?existentTEUser=' + existentTEUser; }		
	}
	
	var type="w";
	if (isMobile2()){
		type="m";
	}
	//
	if (url.indexOf('?') != -1) { url += '&amp;size=' + type; }
	else { url += '?size=' + type; }		

	
	
	if (typeof maActiveTab != "undefined") {
		url +=  maActiveTab;
	}
	GB_show2(url,614,1024);		

	return false;	
}




function RP_show2() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	
	var socialmedia="";
	
	var destiny="Default";
	if (rpType=="f"){
		 destiny="Face";
	}else if (rpType=="pr" || rpType=="lopr"){
		 destiny="Parent";
	}else if (rpType=="er" || rpType=="loer"){
		 destiny="Educator";
	}else if (rpType=="cpt"){
		 destiny="CPT";
	}else if (rpType=="ww"){
		 destiny="WW";		 
	}else if (rpType=="srss"){
		 destiny="srss";		 
	}else if (rpType=="sm"){
		 destiny="SocialMedia";	 
		 socialmedia = "&firstName=Jyoti&lastName=Chhablani&email=jyoti.chhablani@gmail.com&identifier=https://www.google.com/profiles/111111111111111111111&providerSpecifier=google";
	}else if (rpType=="ofe" || rpType=="loefe"){
		 doMobile="true";
		 destiny="OFE";
	}else if (rpType=="te" || rpType=="lote"){
		 destiny="te";		
	} else {
		destiny="Default";
	}
	
	var url =  MYACCOUNT_HOST + '/registration/'+destiny+'.htm?t=' + rpType + '&amp;oc=' + oc;		
	
	url = (typeof sur != 'undefined' && sur != '') ? url+ '&amp;sur=' + sur:url;
	url = (typeof appName != 'undefined' && appName != '') ?(url+'&amp;appName='+appName):url;
	url = (typeof sUCN != 'undefined' && sUCN != '') ?(url+'&amp;sUCN='+sUCN):url;
	url = (typeof preRegToken != 'undefined' && preRegToken != '') ?(url+'&amp;preRegToken='+preRegToken):url;
	url = (typeof doMobile != 'undefined' && doMobile != '') ?(url+'&amp;doMobile='+doMobile):url;
	url = (typeof ibtsp != 'undefined' && ibtsp != '') ?(url+'&amp;ibtsp='+ibtsp):url;
	url = (typeof sourceId != 'undefined' && sourceId != '') ?(url+'&amp;sourceId='+sourceId):url;
	url = (typeof cac != 'undefined' && cac != '') ? url+ '&amp;cac=' + cac:url;
	

	//rpType=="srss" preRegToken

	if (rpType=="ofe" && location.protocol=="http:"){

	}
	

	var size="w";
	if (isMobile2()){
		size="m";
	}

	url = (typeof cac != 'undefined' && size != '') ? url+ '&amp;size=' + size:url;

	
	
	url = url + socialmedia;//only for local
	GB_show2(url,614,1024);	
	
	return false;	
}


function MA_show() {
	//if (envType!="prod" && envType!="intprod") {
	if (noGWT=="true") {
		return MA_show2();
	}
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
    }
	var url = MYACCOUNT_HOST + '/com.scholastic.myaccount.MyAccount/MyAccount.html';
	if (typeof maDefaultStore != "undefined") {
		url += maDefaultStore;
	}
	if (typeof rpView != "") {
		if (url.indexOf('?') != -1) { url += '&amp;v=' + rpView; }
		else { url += '?v=' + rpView; }		
	}	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}

	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }		
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }		
	}
	
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	

	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	
	if (typeof maNewActiveTab != "") {
		if (url.indexOf('?') != -1) { url += '&amp;at=' + maNewActiveTab; }
		else { url += '?at=' + maNewActiveTab; }		
	}
	if (typeof sul != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sul=' + sul; }
		else { url += '?sul=' + sul; }		
	}
	if (typeof maActiveTab != "undefined") {
		url +=  maActiveTab;
	}
	
	GB_show(url,614,1024);		

	return false;	
}





function MA_showLoginForSSO() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	//if (envType!="prod" && envType!="intprod"){
	if (noGWT=="true") {
		return  MA_showLoginForSSO2();
	}
	var url = MYACCOUNT_HOST + '/com.scholastic.myaccount.MyAccount/MyAccount.html?sul=losso';
	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }		
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }		
	}
	
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	GB_show2(url,614,1024);	
	return false;	
}

function MA_showLoginForSSO2() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	var url = MYACCOUNT_HOST + '/myaccount/MyAccount.htm?sul=losso';
	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }
	}
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	GB_show2(url,614,1024);	
	return false;	
}

function MA_showLoginForSSON() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	//if (envType!="prod" && envType!="intprod"){
	if (noGWT=="true") {
		return  MA_showLoginForSSON2();
	}
	var url = MYACCOUNT_HOST + '/com.scholastic.myaccount.MyAccount/MyAccount.html';
	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }		
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }		
	}
	
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}

	GB_show2(url,614,1024);	
	return false;	
}

function MA_showLoginForSSON2() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	var url = MYACCOUNT_HOST + '/myaccount/MyAccount.htm';
	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }
	}	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }
	}
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	

	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}

	GB_show2(url,614,1024);	
	return false;	
}

function MA_showLoginGen() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	//if (envType!="prod" && envType!="intprod"){
	if (noGWT=="true") {
		return  MA_showLoginGen2();
	}
	var url = MYACCOUNT_HOST + '/com.scholastic.myaccount.MyAccount/MyAccount.html';
	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }		
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }		
	}
	
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	GB_show2(url,614,1024);	
	return false;	
}

function MA_showLoginGen2() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	var url = MYACCOUNT_HOST + '/myaccount/MyAccount.htm';
	
	if (typeof rpType != "") {
		if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
		else { url += '?t=' + rpType; }		
	}
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	if (typeof sur != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sur=' + sur; }
		else { url += '?sur=' + sur; }		
	}
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }
	}
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }
	}
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '?ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	GB_show2(url,614,1024);	
	return false;	
}


function MA_useRegistrationType() {
	useRegistrationType = "true";
}

function MA_showLogin() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	//if (envType!="prod" && envType!="intprod"){
	if (noGWT=="true") {
		return  MA_showLogin2();
	}	
	var url = MYACCOUNT_HOST + '/com.scholastic.myaccount.MyAccount/MyAccount.html';
	
	if (typeof useRegistrationType != "") {
		if(useRegistrationType == "true") {
			if (typeof rpType != "") {
				if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
				else { url += '?t=' + rpType; }		
			}
		} else {
			url += '?t=lo';
		}
	} else {
		url += '?t=lo';
	}
	
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '&ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}	
	
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }		
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }		
	}	
	
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	GB_show2(url,614,1024);	
	return false;	
}

function MA_showLogin2() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	
	var url = MYACCOUNT_HOST + '/myaccount/MyAccount.htm';
	
	if (typeof useRegistrationType != "") {
		if(useRegistrationType == "true") {
			if (typeof rpType != "") {
				if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
				else { url += '?t=' + rpType; }		
			}
		} else {
			url += '?t=lo';
		}
	} else {
		url += '?t=lo';
	}
	
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '&ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}	
	
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }
	}
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }
	}
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	GB_show2(url,614,1024);	
	return false;	
}


function RP_show() {
        //Temporaryli set for Registration2 dev and QA
	//if (envType!="prod" && envType!="intprod"){
	if (noGWT=="true") {
		return  RP_show2();
	}
	

	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	var url = (typeof rpType != 'undefined' && rpType != '') ? '/com.scholastic.registration.Registration/Registration.html?t=' + rpType + '&amp;oc=' + oc : '/com.scholastic.registration.Registration/Registration.html?oc=' + oc;		
	
	url = (typeof sur != 'undefined' && sur != '') ? url+ '&amp;sur=' + sur:url;
	url = (typeof appName != 'undefined' && appName != '') ?(url+'&amp;appName='+appName):url;
	url = (typeof sUCN != 'undefined' && sUCN != '') ?(url+'&amp;sUCN='+sUCN):url;
	url = (typeof preRegToken != 'undefined' && preRegToken != '') ?(url+'&amp;preRegToken='+preRegToken):url;
	url = (typeof doMobile != 'undefined' && doMobile != '') ?(url+'&amp;doMobile='+doMobile):url;
	url = (typeof ibtsp != 'undefined' && ibtsp != '') ?(url+'&amp;ibtsp='+ibtsp):url;
	url = (typeof sourceId != 'undefined' && sourceId != '') ?(url+'&amp;sourceId='+sourceId):url;
	url = (typeof cac != 'undefined' && cac != '') ? url+ '&amp;cac=' + cac:url;
	
	var uri = MYACCOUNT_HOST + url;
	GB_show2(uri,614,1024);	
	return false;	
}


function MA_school() {

	setViewType("a");
	setActiveTab("AD");
	MA_show();
	
}



function setActiveTab(tabName) { 
	maActiveTab = "#" + tabName;
	maNewActiveTab = tabName; 
}

function setDefaultStore(storeID) { maDefaultStore = "?" + storeID; }
function setRegistrationType(type) {
	rpType = type; /* possible types are: c - clubs, ts - teacher store, lo - login only */
}
function setViewType(view) {
	rpView = view; /* possible types are: a - Face Ma2*/
}
function setSul(_type) {
	sul = _type; /* possible types are: a - Face Ma2*/
}
function setParentAppName(name) {
	appName = name; /* possible names are: cool - clubs*/
}
function setSchoolsUCN(sucn) {
	sUCN = sucn; 
}

function setPreRegToken(_preRegToken) {
	preRegToken = _preRegToken; 
}

function setMobile(_doMobile) {
	doMobile = _doMobile; 
}
function hideIBTSPPopUp() {
	ibtsp = 'y'; 
}
function showIBTSPPopUp() {
	ibtsp = 'n'; 
}

//TE
function setExistentTEUser(_existentTEUser) {
	existentTEUser = _existentTEUser; 
}

function setParentSourceId(inSourceId) {
	sourceId = inSourceId; /* possible names are: cool - clubs*/
}
function setCac(teacherCac) {
	cac = teacherCac;
}

var myAccoutCloseHook, onSignOutHook, onSuccessRegistration, onGenericSuccessRegistrationHook,onGenericSuccessLoginHook, shopForEbooksHook, shopForGradeEBooksHook, aboutUsHook, viewEBookDetailsHook,downloadeReaderHook;
function setMyAccountCloseHook(hook){ myAccoutCloseHook = hook; }
function setOnSignOutHook(hook){ onSignOutHook = hook; }
function setOnSuccessRegistration(hook){ onSuccessRegistration = hook; }
function setOnGenericSuccessRegistrationHook(hook){ onGenericSuccessRegistrationHook = hook; }
function setOnGenericSuccessLoginHook(hook){ onGenericSuccessLoginHook = hook; }
function setShopForEBooksHook(hook){ shopForEbooksHook = hook; }
function setShopForGradeEBooksHook(hook){ shopForGradeEBooksHook = hook; }
function setAboutUsHook(hook){ aboutUsHook = hook; }
function setViewEBookDetailsHook(hook){ viewEBookDetailsHook = hook; }
function setDownloadeReaderHook(hook){ downloadeReaderHook = hook; }
function getDownloadeReaderHook(){ return downloadeReaderHook; }



function GB_hide(param) {
 //var ver = schlVer || '';
jQuery("#ma_wrapper,#GB_overlay").hide();
showSelectBoxes();
jQuery("#GB_frame").remove();
if (typeof nodisplay == "undefined") { chkLS(); }
if(eval(param) == "1") {
	if (myAccoutCloseHook != null) {
		setCloseHook(myAccoutCloseHook);
		setCompleteHook(myAccoutCloseHook);
	}
	SPS_MyAccount.invokeAddChildModel("COOL","");
}else if(eval(param) == "2") {

	if (myAccoutCloseHook != null) {
		setCloseHook(myAccoutCloseHook);
	}
	if (myAccoutCloseHook != null) {
		setCompleteHook(myAccoutCloseHook);
	}
	SPS_MyAccount.invokeBTSRedirect(appName,"");
}
else {

	if (myAccoutCloseHook != null) { myAccoutCloseHook(); }
}
}


function enableDestPopUp(){
var allowedDomain = false;

if ( location.hostname == 'www.scholastic.com' ) {
var path = location.pathname;
if ( path.indexOf('/home') == 0 || path.indexOf('/teachers') == 0 || path.indexOf('/parents') == 0 ) {
allowedDomain = true;
}
}
else if ( location.hostname == 'teacher.scholastic.com' ) {
allowedDomain = true;
}

if ( allowedDomain ) {
	setDestPopUpValue('y');
}
    
}


function disableDestPopUp(){
	setDestPopUpValue('n');
}

function getDestVar(){
	return destpopup;
}

function isDestEnabled(){
	return (('y'==destpopup)||(destpopup==''|| typeof destpopup=='undefined'));
}

function setDestPopUpValue(val){
	destpopup = val;
}

function setSSORegistrationComplete() {
	if(sur != '') {
		setRedirectFunction();
	}
}

function getRedirectFunction() {
	return redirectFn;
}
function setRedirectFunction() {
	redirectFn = "sso";
}

function resetRedirectFunction() {
	redirectFn = "";
}

function PostRegRedirect(param) {

jQuery("#ma_wrapper,#GB_overlay").hide();
showSelectBoxes();
jQuery("#GB_frame").remove();
//if (onSuccessRegistration != null) { 
//	onSuccessRegistration(); 
//}

//var x = new SPS_MyAccount();
if(eval(param) == "1") {
	if (onSuccessRegistration != null) {
		setCloseHook(onSuccessRegistration);
		setCompleteHook(onSuccessRegistration);
	}
	SPS_MyAccount.invokeAddChildModel("COOL","");
}else if(eval(param) == "2") {

	if (onSuccessRegistration != null) {
		setCloseHook(onSuccessRegistration);
		setCompleteHook(onSuccessRegistration);
	}
	SPS_MyAccount.invokeBTSRedirect(appName,"");
}else {
	if (onSuccessRegistration != null) { onSuccessRegistration(); }
}
}



function GenericPostLoginRedirect(param) {
	  jQuery("#ma_wrapper,#GB_overlay").hide();
	  showSelectBoxes();
	  jQuery("#GB_frame").remove();

	  if(eval(param) == "1") {
			if (onGenericSuccessLoginHook != null) {
				setCloseHook(onGenericSuccessLoginHook);
				setCompleteHook(onGenericSuccessLoginHook);
			}
			SPS_MyAccount.invokeAddChildModel("COOL","");
		}else if(eval(param) == "2") {

			if (onGenericSuccessLoginHook != null) {
				setCloseHook(onGenericSuccessLoginHook);
				setCompleteHook(onGenericSuccessLoginHook);
			}
			SPS_MyAccount.invokeBTSRedirect(appName,"");
		}else {
	    if (onGenericSuccessLoginHook != null) { 
		  onGenericSuccessLoginHook(); 
	   }
	   }
}
	
function GenericPostRegRedirect() {
	  jQuery("#ma_wrapper,#GB_overlay").hide();
	  showSelectBoxes();
	  jQuery("#GB_frame").remove();
	  if (onGenericSuccessRegistrationHook!= null) { 
		  onGenericSuccessRegistrationHook(); 
	  }
	}

function RP_hide() { GenericPostRegRedirect(); }

function maOverlay() {  
  var arrayPageSize = getPageSize();
  var arrayPageScroll = getPageScroll();
  var h = arrayPageSize[1] + arrayPageScroll[1];
  if (h < (GB_HEIGHT + GB_TOP)) { h = GB_HEIGHT + GB_TOP + 10; }
  
  
  if (isMobile2()==false){
	jQuery("#GB_overlay").css({height: h + 'px'});
  }
  
}

function GB_position() {
  var de = document.documentElement;
  var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
  jQuery("#ma_wrapper").css({width:GB_WIDTH+"px",height:GB_HEIGHT+"px",
    left: "22px",top: GB_TOP + "px"}); 
}

function getPageScroll(){

	var yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}

	var arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}



function showSelectBoxes(){
	var selects = document.getElementsByTagName("select");
	for (i = 0; i != selects.length; i++) { selects[i].style.visibility = "visible"; }
}

function hideSelectBoxes(){
	var selects = document.getElementsByTagName("select");
	for (i = 0; i != selects.length; i++) { selects[i].style.visibility = "hidden"; }
}

function displayPersonal() {
	personalText = "<strong>";
	if ( personal ) {
		var temp = unescape(personal).split('|');
		//personal = (', ' + temp[2] + ' ' + temp[3]).toLowerCase();
		personalText += (temp[2].substring(0,15));
	}
	else personalText += "";
	personalText += "</strong>";
	document.getElementById("unPersonalized").innerHTML = personalText;
}
function updatePersonal(which) {
	personalText = "<strong>";
	if (which == 'lo')
	{
		personalText += "";
	}
	else {
		if ( readCookie('SPS_UD') != null && readCookie('SPS_UD') != "" ) {
			var temp = unescape(readCookie('SPS_UD')).split('|');
			var temp2 = temp[2];// + ' ' + temp[3];
			if (temp2.length <= 15) personalText += temp2;
			else personalText += temp[2].substring(0,15);
		}
		else personalText += "";
	}
	personalText += "</strong>";
	document.getElementById("unPersonalized").innerHTML = personalText;
}
function displaySignInOut() {
	if ( location.href.indexOf('/sps_my_account/accmgmt/GenericSignin.jsp') != -1 ) {
		return '<span id="sio"><a href="/sps_my_account/accmgmt/GenericSignin.jsp" onclick="return MA_showLogin();" id="uniNavSIO"><div>Sign in</div></a></span>';

	}
	else {
		if ( personal != null && personal != "" ) {
			return '<span id="sio"><a href="' + SPS_HOST + '/sps_my_account/accmgmt/GenericSignin.jsp?finalSuccessURL=http://www.scholastic.com" onclick="maLogOut();return false;" id="uniNavSIO"><div>Sign Out</div></a></span>';
		}
		else {
			if ( (typeof schlKids == "undefined") || !schlKids )
				signinURL = SPS_HOST + '/sps_my_account/accmgmt/GenericSignin.jsp?finalSuccessURL=' + location.href;
			else
				signinURL = DOTCOM_HOST + "/kidslogin";
			return '<span id="sio"><a href="' + signinURL + '" onclick="return MA_showLogin();" id="uniNavSIO"><div>Sign In</div></a></span>';
		}
	}
}
function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "="+value+expires+"; domain=scholastic." + document.domain.split(".").pop() + "; path=/";
}
function saveCookie(name, value) {
	var date = new Date();
	date.setTime(date.getTime() + (365*100*24*60*60*1000)); //setting persistance cookie for 100 years
	var expires = "; expires="+date.toGMTString();
	document.cookie = name + "="+value+expires+"; domain=scholastic." + document.domain.split(".").pop() + "; path=/";
}
function readCookie(name)
{

	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) { createCookie(name,"",-1); }
//function openPopup() { $('#kids_registration_popup_container').show() }
function deleteCookie(name) { saveCookie(name,"",-1); }
function kookie(name,value,days){
if (days)
	{
		var date = new Date();
		date.setTime(date.getTime() + (365*100*24*60*60*1000)); //setting persistance cookie for 100 years
		var expires = "; expires="+date.toGMTString();
	}
else var expires = "";
document.cookie = name + "="+value+expires+"; domain=scholastic." + document.domain.split(".").pop() + "; path=/";
}


function maLogOut(){
	kookies = ['SPS_TSP','SPS_SESSION','SPS_UD','lithiumSSO:scholastic','prefCTR:scholastic','PR_SUB','SPS_BUS','XUS_EI'];
	for (var i = 0; i < kookies.length; i++) { kookie(kookies[i],'',-1); }
	if ( document.getElementById('sio') ) {
		document.getElementById("sio").innerHTML = '<a href="' + SPS_HOST + '/sps_my_account/accmgmt/GenericSignin.jsp"  onclick="return MA_showLogin();" id="uniNavSIO"><div>Sign in</div></a>';
		updatePersonal('lo');
	}
	if (onSignOutHook != null) { onSignOutHook(); }
}
function chkLS() {
	if ( document.getElementById('sio') ) {
		if ( location.href.indexOf('/sps_my_account/accmgmt/GenericSignin.jsp') != -1 ) {
			document.getElementById("sio").innerHTML = '<a href="/sps_my_account/accmgmt/GenericSignin.jsp" onclick="return MA_showLogin();" id="uniNavSIO"><div>Sign In</div></a>';

		}
		else {
			if ( readCookie('SPS_UD') != null && readCookie('SPS_UD') != "" ) {
				document.getElementById("sio").innerHTML = '<a href="' + SPS_HOST + '/sps_my_account/accmgmt/GenericSignin.jsp?finalSuccessURL=http://www.scholastic.com" onclick="maLogOut();return false;" id="uniNavSIO"><div>Sign Out</div></a>';
			}
			else {
				if ( (typeof schlKids == "undefined") || !schlKids )
					signinURL = SPS_HOST + '/sps_my_account/accmgmt/GenericSignin.jsp?finalSuccessURL=' + location.href;
				else
					signinURL = DOTCOM_HOST + "/kidslogin";
				document.getElementById("sio").innerHTML = '<a href="' + signinURL + '" onclick="return MA_showLogin();" id="uniNavSIO"><div>Sign in</div></a>';
			}
			
		}
		updatePersonal();
	}
}

function shopForEBooks1(){

                if (shopForEbooksHook != null) { 
                                shopForEbooksHook(); 
                } else {
                                window.location = SCHWS_HOST + "/SchWS/link2COOL.jsp";
                }
}
function shopForEBooks(){
	if (shopForEbooksHook != null) { 
		shopForEbooksHook(); 
	} else {
	        window.location = SCHWS_HOST + "/SchWS/link2COOL.jsp";		
	}
}

function shopForGradeEBooks(grade){
	
	if (shopForGradeEBooksHook != null) { 
		shopForGradeEBooksHook(grade); 
	} else {
	        window.location = SCHWS_HOST + "/SchWS/link2COOL.jsp";		
	}	
}

function AboutUs(){

	if (aboutUsHook != null) { 
		aboutUsHook(); 
	} else {
	        window.location = SCHWS_HOST + "/SchWS/link2COOL.jsp";		
	}	
}
function viewEBookDetails(isbn){

	if (viewEBookDetailsHook != null) { 
		viewEBookDetailsHook(isbn); 
	} else {
	        window.location = SCHWS_HOST + "/SchWS/link2COOL.jsp";		
	}	
}

function downloadeReader(agent){

	if (downloadeReaderHook != null) { 
		downloadeReaderHook(agent); 
	} else {
	        window.location = SCHWS_HOST + "/SchWS/link2COOL.jsp";		
	}	
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) return pair[1];
	}
}

var ua = navigator.userAgent.toLowerCase();
var isMobile = /ipad/i.test(ua) || /iphone/i.test(ua) || /ipod/i.test(ua)||/silk/i.test(ua)||/android/i.test(ua);
      if (isMobile2("true")){
		document.writeln('<style>#GB_overlay { background-image: url(' + imgRoot + 'overlay.png);position: absolute;margin: auto;top: 0;left: 0;z-index:  1000002;width:  100%;height: 100%;} * html #GB_overlay {background-color: #000;background-color: transparent;background-image: url(' + imgRoot + 'blank.gif);filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + imgRoot + 'overlay.png", sizingMethod="scale");} ');
		document.writeln("#ma_wrapper {top: 0px;left: 0px;position: absolute;overflow: auto;z-index:  1000003; -webkit-overflow-scrolling: touch; overflow-y: scroll; } ");
		//document.writeln('#GB_frame {border: 0;margin: 0;overflow: auto; width: 660px;} .gwt-HTML {overflow:auto} ');
		document.writeln('#readingManagerFrame {overflow:auto}</style>');
	}else{
		document.writeln('<style>#GB_overlay { background-image: url(' + imgRoot + 'overlay.png);position: absolute;margin: auto;top: 0;left: 0;z-index:  1000002;width:  100%;height: 100%;} * html #GB_overlay {background-color: #000;background-color: transparent;background-image: url(' + imgRoot + 'blank.gif);filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + imgRoot + 'overlay.png", sizingMethod="scale");} ');
		document.writeln('#ma_wrapper {top: 10px;left: 0px;position: absolute;overflow: hidden;z-index:  1000003;width: 1044px;height: 614px;} #GB_frame {border: 0;margin: 0;overflow: hidden;width: 1046px;height: 614px;}</style>');
	}



function invokePasswordReset(appType,token){
	var afterHook = function (){
		location.href = parent.SPS_MyAccount.parameter;
	};
	setCloseHook(afterHook);
	var onComplete = function(){
		location.href = parent.SPS_MyAccount.parameter;
	};
	setCompleteHook(onComplete);
	SPS_MyAccount.allowMobile=true;
	SPS_MyAccount.invokePasswordResetModel(appType,token);
}

function invokePasswordResetPCI(appType,token){
	var onComplete = function(){
		location.href = parent.SPS_MyAccount.parameter;
	};
	
	vModal.init("","","","","","","","",token);
	vModal.setSuccessCloseHook(onComplete);
	vModal.setFailureCloseHook(onComplete);
	PWD_show();
	
}


function invokeSRSS(token){
	var afterHook = function (){
	//	location.href = parent.SPS_MyAccount.parameter;
	};
	setCloseHook(afterHook);
	var onComplete = function(){
	//	location.href = parent.SPS_MyAccount.parameter;
	};
	setCompleteHook(onComplete);
			
	//passwordReset(appType,token);
	//SPS_MyAccount.allowMobile=true;
	SPS_MyAccount.invokeSRSSModel(token);
}

var RegistrationModalController =
{
	PARENT_TYPE: 'pr',
	EDUCATOR_TYPE: 'er',
	QUERY_PARAM: 'regtype',
	show: function()
	{
		var regType = this.getRegistrationType();
		if (document.domain.indexOf("scholastic") != -1) {
			document.domain = "scholastic." + document.domain.split(".").pop();
		}		
		resetSuccessRegistration();
        setRegistrationType(regType);
        RP_show();
        window.scrollTo(0, 0);
	},
	getRegistrationType: function()
	{
		var regType = "";
		if(getQueryVariable(this.QUERY_PARAM) == this.PARENT_TYPE)
		{
			regType = this.PARENT_TYPE;
		}
		else if(getQueryVariable(this.QUERY_PARAM) == this.EDUCATOR_TYPE)
		{
			regType = this.EDUCATOR_TYPE;
		}
		return regType;
	}
};




jQuery(function(){
	if (getQueryVariable("spsmodal")=='pwdreset') {
		if (document.domain.indexOf("scholastic") != -1) {
			document.domain = "scholastic." + document.domain.split(".").pop();
		}
		invokePasswordReset('pr', getQueryVariable('token'));
	}
	else if (getQueryVariable("spsmodal")=='pwdreset2') {
		if (document.domain.indexOf("scholastic") != -1) {
			document.domain = "scholastic." + document.domain.split(".").pop();
		}

		var successURL=  getQueryVariable('successURL');
		vModal.init(getQueryVariable('spsId'),getQueryVariable('successURL'),getQueryVariable('failureURL'),getQueryVariable('keyIndex'),getQueryVariable('nonce'),getQueryVariable('expirationTime'),getQueryVariable('clientId'),getQueryVariable('signature'));
		vModal.data(getQueryVariable('data'));
		vModal.setSuccessURL(successURL);
		vModal.setFailureURL(successURL);
		vModal.setSuccessCloseHook(vModal.defaultSuccessHook);
		vModal.setFailureCloseHook(vModal.defaultFailureHook);
		
		
		
		PWD_show();
	}
    else if (getQueryVariable("registration")=='y') {
		RegistrationModalController.show();
	}
	 else if(getQueryVariable("myaccount")=="y" ){
			 if ( location.hash == '#atdone' ) return;
	
			if(document.domain.indexOf("scholastic")!=-1){
				document.domain="scholastic."+document.domain.split(".").pop();
			}
			if( getQueryVariable("at") != ""){
				setActiveTab(getQueryVariable("at"));
			}
			
			location.hash='#atdone';
			MA_show2();
	 }
	 else if(getQueryVariable("teregistration")=="y" ){
		 teregistration();		
 }
	 else if (getQueryVariable("spsmodal")=='srss') {
			if (document.domain.indexOf("scholastic") != -1) {
				document.domain = "scholastic." + document.domain.split(".").pop();
			}
			rpType="srss";
			preRegToken=getQueryVariable('preRegToken');
			RP_show2();
		}
			  
});



var myLocalFunctionMAClose = function(){
			location.href="http://store.scholastic.com/shop/Teaching+Resources/4502~4518~15";
			
	};

function teregistration(){
	 if ( location.hash == '#atdone' ) return;

		if(document.domain.indexOf("scholastic")!=-1){
			document.domain="scholastic."+document.domain.split(".").pop();
		}
		if( getQueryVariable("type") != ""){
			rpType=getQueryVariable("type");
		}
		preRegToken=getQueryVariable('preRegToken');
		location.hash='#atdone';
		if(rpType == 'te'){
			RP_show2();
		}
		else if (rpType == 'teexist')
		{
			MA_show2();
		}
};

jQuery.fn.isMobile = function (fnc) {
	try {
		if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
	     return true;
	    };
	    return false;
	 } catch(e){ console.log("Error in isMobile"); return false; }
};
function isMobile2(force) {
	
	if (doMobile!="true" && force!="true"){
		return false;
	}
	//alert("navigator.userAgent="+navigator.userAgent);
	//filter by default
	try {
		//
	     if(/iPad/i.test(navigator.userAgent)) {
	   // 	 
	    	 return false;
	    }else {
	    //	
	    }
	 } catch(e){ }
	 //
	var position=getPageSize();
	//alert("position[3]="+position[2]);
	if (position[2]>660){
		return false;
	}else{
		return true;
	}
	


	  
	 
};

/*    JANRAIN CHANGES   */


function silentClose() {
       jQuery("#ma_wrapper,#GB_overlay").hide();
       showSelectBoxes();
       jQuery("#GB_frame").remove();
}

function MA_SocialMedia(socialMediaURLParams) {

       if (document.domain.indexOf("scholastic") != -1) {
              document.domain = "scholastic." + document.domain.split(".").pop();
    }
       //
       var url = MYACCOUNT_HOST + socialMediaURLParams;
       //

       GB_position(); 
       GB_show2(encodeURI(url),614,1024);       

       return false; 
}




function MA_ShowPostSocialLogin() {      
	if (onSuccessRegistration != null) {
		onSuccessRegistration();
	}
}

/*   ENDS JANRAIN CHANGES   */

function MA_showLoginOFE() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	//if (envType!="prod" && envType!="intprod"){
	if (noGWT=="true") {
		return  MA_showLogin2();
	}	
	var url = MYACCOUNT_HOST + '/com.scholastic.myaccount.MyAccount/MyAccount.html';
	
	if (typeof useRegistrationType != "") {
		if(useRegistrationType == "true") {
			if (typeof rpType != "") {
				if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
				else { url += '?t=' + rpType; }		
			}
		} else {
			url += '?t=lo';
		}
	} else {
		url += '?t=lo';
	}
	
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '&ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}	
	
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }
	}
	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }
	}	
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	GB_show(url,614,1024);	
	return false;	
}


function MA_showLogin2OFE() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	
	var url = MYACCOUNT_HOST + '/myaccount/MyAccount.htm';
	
	if (typeof useRegistrationType != "") {
		if(useRegistrationType == "true") {
			if (typeof rpType != "") {
				if (url.indexOf('?') != -1) { url += '&amp;t=' + rpType; }
				else { url += '?t=' + rpType; }		
			}
		} else {
			url += '?t=ofe';
		}
	} else {
		url += '?t=ofe';
	}
	
	if (typeof oc != "") {
		if (url.indexOf('?') != -1) { url += '&amp;oc=' + oc; }
		else { url += '?oc=' + oc; }		
	}
	
	if (typeof ibtsp != "") {
		if (url.indexOf('?') != -1) { url += '&amp;ibtsp=' + ibtsp; }
		else { url += '&ibtsp=' + ibtsp; }		
	}
	
	if(typeof destpopup != ""){
		if (url.indexOf('?') != -1) { url += '&amp;destpopup=' + destpopup; }
		else { url += '?destpopup=' + destpopup; }		
	}	
	
	if (typeof appName != "") {
		if (url.indexOf('?') != -1) { url += '&amp;appName=' + appName; }
		else { url += '?appName=' + appName; }		
	}
	if (typeof doMobile != "") {
		if (url.indexOf('?') != -1) { url += '&amp;doMobile=' + doMobile; }
		else { url += '?doMobile=' + doMobile; }		
	}
	if (typeof sUCN != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sUCN=' + sUCN; }
		else { url += '?sUCN=' + sUCN; }
	}	
	if (typeof preRegToken != "") {
		if (url.indexOf('?') != -1) { url += '&amp;preRegToken=' + preRegToken; }
		else { url += '?preRegToken=' + preRegToken; }
	}
	
	if (typeof sourceId != "") {
		if (url.indexOf('?') != -1) { url += '&amp;sourceId=' + sourceId; }
		else { url += '?sourceId=' + sourceId; }		
	}
	
	GB_show2(url,614,1024);	
	return false;	
};


function ebooksShow(url, height, width) {   
	  GB_HEIGHT = height || 400;
	  GB_WIDTH = width || 400;
	  if((!jQuery('#ma_wrapper1').length>0)) {
		jQuery('#ma_wrapper1').remove();
	    jQuery(document.body).append("<div id='ma_wrapper1' style='width: 100%; height: 100%; position: fixed; display:none; '></div>");
	    GB_DONE = true;
	  }
	  hideSelectBoxes();
	  maOverlay();
	  jQuery("#GB_frame1").remove();
	  jQuery("#ma_wrapper1").append("<iframe id='GB_frame1' name='GB_frame1' frameborder='0' scrolling='no' allowtransparency='true' width='100%' height='100%' src='"+url+"'></iframe>");  
	  GB_position();   
	  jQuery("#ma_wrapper1").show();
	}

function getPageSize(){
	var pageHeight, pageWidth, xScroll, yScroll;
	var  bodyOffsetHeight= 0;
	var bodyScrollHeight=0;
	var bodyOffsetWidth=0;
	var bodyOffsetHeight=0;
	if (document.body){
		bodyOffsetHeight = document.body.offsetHeight;
		bodyScrollHeight = document.body.scrollHeight;
		bodyOffsetWidth = document.body.offsetWidth;
		bodyOffsetHeight = document.body.offsetHeight;
	
	}
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if ( bodyScrollHeight> bodyOffsetHeight ){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = bodyOffsetWidth;
		yScroll = bodyOffsetHeight;
	}
	
	
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	if(yScroll < windowHeight){ pageHeight = windowHeight; }
	else { pageHeight = yScroll; }

	if(xScroll < windowWidth){ pageWidth = windowWidth; }
	else { pageWidth = xScroll; }
	
	var height = jQuery(this).height(),
    w  = jQuery(this).width();

	window.devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;
	
	var r = w / window.devicePixelRatio;

	var arrayPageSize = new Array(pageWidth,pageHeight,r,windowHeight);
	return arrayPageSize;
}


function topIframe(){
	jQuery('html, body').animate({scrollTop: (jQuery('#GB_pagetop').offset().top)},500);
}




function sso(param){
	if (param ==undefined ){
		param ="";
	}
	window.location = TE_SSO+"?dpopup="+param; 
	GB_hide("");
}

function tso(param){
	if (param ==undefined ){
		param ="";
	}
	window.location =  TE_TSO+"?dpopup="+param ;
	GB_hide("");
}


function fly(){
		window.location = TE_FLY;
		GB_hide("");
}


function mydownloadEmpty(redirectTo){
	window.location = redirectTo;
	
}


function PWD_show() {
	if (document.domain.indexOf("scholastic") != -1) {
   		document.domain = "scholastic." + document.domain.split(".").pop();
	}
	

	
	var url =  MYACCOUNT_HOST + '/myaccount/'+"PwdReset.htm?";		
	
	url = (typeof sur != 'undefined' && sur != '') ? url+ '&amp;sur=' + sur:url;
	url = (typeof appName != 'undefined' && appName != '') ?(url+'&amp;appName='+appName):url;
	url = (typeof sUCN != 'undefined' && sUCN != '') ?(url+'&amp;sUCN='+sUCN):url;
	url = (typeof preRegToken != 'undefined' && preRegToken != '') ?(url+'&amp;preRegToken='+preRegToken):url;
	url = (typeof doMobile != 'undefined' && doMobile != '') ?(url+'&amp;doMobile='+doMobile):url;
	url = (typeof ibtsp != 'undefined' && ibtsp != '') ?(url+'&amp;ibtsp='+ibtsp):url;
	url = (typeof sourceId != 'undefined' && sourceId != '') ?(url+'&amp;sourceId='+sourceId):url;
	url = (typeof cac != 'undefined' && cac != '') ? url+ '&amp;cac=' + cac:url;
	

	//rpType=="srss" preRegToken

	if (rpType=="ofe" && location.protocol=="http:"){
		url=url.replace("https:","http:");
		
	}
	

	var size="w";
	/*if (isMobile2()){
		size="m";
	}*/

	url = (typeof cac != 'undefined' && size != '') ? url+ '&amp;size=' + size:url;

	
	
	GB_showP(url,614,1024);	
//	scrollOrigin();
	return false;	
}


function GB_showP(url, height, width) {   
	var position = getPageSize();
  
  GB_HEIGHT = height || 400;
  GB_WIDTH = width || 400;
  if((!jQuery('#GB_overlay').length>0) || (!jQuery('#ma_wrapper').length>0)) {
	jQuery('#GB_overlay').remove();
	jQuery('#ma_wrapper').remove();
      

	if (isMobile2()){
		jQuery(document.body).prepend("<div id='GB_pagetop'></div>");
		jQuery(document.body).append("<div id='GB_overlay' style='height: 10000px;'></div><div id='ma_wrapper' style='width: "+position[0]+"px; height: 10000px;  left: 0px; top: 0px;'></div><a href='#' id='scrolltop_link' style='position:fixed; bottom:0px; right:0px; background:#666; z-index:1000003; font-size:36px; box-sizing: border-box; text-align:center; -webkit-border-top-left-radius: 10px; -webkit-border-top-right-radius: 10px; -moz-border-radius-topleft: 10px; -moz-border-radius-topright: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px; color:#fff; text-decoration:none; font-family:Arial, sans-serif; padding:16px; display:none;'>&#9650;<br>TOP</a>");
	
		
	}else{	
	    jQuery(document.body).append("<div id='GB_overlay' style='height: 756px;'></div><div id='ma_wrapper' style='width: 1024px; height: 614px; left: 50%; margin-left: -512px;  top: 45px;'></div>");
	}
    GB_DONE = true;
  }
  hideSelectBoxes();
  maOverlay();
  jQuery("#GB_overlay").show();
  jQuery("#GB_frame").remove();
  jQuery("#ma_wrapper").append("<iframe id='GB_frame' name='GB_frame' frameborder='0' scrolling='no' allowtransparency='true' width='1024' height='709' ></iframe>");  
 

  jQuery("#ma_wrapper").show();
  
  
  var form=jQuery("<form style='display:none;'>").attr({
	    method: "post",
	    action: url,
	    target: "GB_frame"
	});
	form.append(jQuery("<input/>").attr({name:"si",value:vModal.si}));
	form.append(jQuery("<input/>").attr({name:"su",value:vModal.su}));
	form.append(jQuery("<input/>").attr({name:"fu",value:vModal.fu}));
	form.append(jQuery("<input/>").attr({name:"ki",value:vModal.ki}));
	form.append(jQuery("<input/>").attr({name:"n",value:vModal.n}));
	form.append(jQuery("<input/>").attr({name:"et",value:vModal.et}));
	form.append(jQuery("<input/>").attr({name:"ci",value:vModal.ci}));
	form.append(jQuery("<input/>").attr({name:"s",value:vModal.s}));
	
	if (vModal.d){
		form.append(jQuery("<input/>").attr({name:"d",value:vModal.d}));	
	} 
	
	jQuery("body").append(form);
	form.submit();
  
	
	
	


	
	
	
  
}


function scrollOrigin() {
    window.scrollTo(0, 0);
}

//MyAccount1 deeplink to MA2 functions

function launchEducatorRegistration(){
       
       setRegistrationType("er");
       RP_show2();
       //setMyAccountCloseHook(myaccount1Reload());
       setOnGenericSuccessRegistrationHook(myLocalFinalSuccessHook);
       return;       
}

function launchConsumerRegistration(){
       
       setRegistrationType("pr");
       RP_show2();
       //setMyAccountCloseHook(myaccount1Reload());
       setOnGenericSuccessRegistrationHook(myLocalFinalSuccessHook);
       return;
       
}


function myaccount1Reload(){
       window.location.reload(true);       
}

function myLocalSuccessHook(){
       
       
       var successURL = getURLParamMA1("successURL");
if (successURL.indexOf("http") > -1) {
              
               return  successURL;
       }
       
        else{
              successURL  = SPS_HOST + '/'+ successURL ;
              return  successURL;
              
        }
       
}
       setOnGenericSuccessLoginHook(myLocalFinalSuccessHook);
       setOnGenericSuccessRegistrationHook(myLocalFinalSuccessHook);


       
//To get parameter value from URL. 
function getURLParamMA1(name)
    {
         var url = window.location.href;
         var query_string = url.split("?");
         var params = query_string[1].split("&");
         var i = 0;
          while (i < params.length) {
            // compare param name against arg passed in
            var param_item = params[i].split("=");
            if (param_item[0] == name) {
                // if they match, return the value
                return param_item[1];
            }
            i++;
        }
        return "";
    }
       

// To get hostname, example  https://my.scholastic.com

function extractDomain() {
    var domain;
    var url = window.location.href;
    
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
        port = url.split(':')[0];
        return port + "://" + domain;
       
    }
    else {
        domain = url.split('/')[0];
        return domain;
    }
    
}


function myLocalCancelHook(){
       
       var cancelURL = getURLParamMA1("cancelURL");
       
       if (cancelURL.indexOf("http") > -1) {
              
               return  cancelURL;
       }
       
        else{
              cancelURL  = SPS_HOST + '/'+ cancelURL ;
              return  cancelURL ;
              
        }
       
}
       
function myLocalFinalSuccessHook(){
       
       var finalSuccessURL = getURLParamMA1("finalSuccessURL");
       var successURL = getURLParamMA1("successURL");
       var cancelURL = getURLParamMA1("cancelURL");
       

       if(finalSuccessURL != null){
          if (finalSuccessURL.indexOf("http") > -1) {
              
              
               return  finalSuccessURL;
           }
       
          else{
              finalSuccessURL = SPS_HOST + '/'+ finalSuccessURL;
              return  finalSuccessURL ;
              
               
           }
       
       }
       
       else if(successURL!= null) {
              
              if (successURL.indexOf("http") > -1) {
                           
                            return  successURL;
                     }
                     
                      else{
                           successURL  = SPS_HOST + '/'+ successURL ;
                           return  successURL;
                           
                      }
              
              }
                     
       
     else if(cancelURL != null) {
              
              if (cancelURL.indexOf("http") > -1) {
                           
                            return  cancelURL;
                     }
                     
                      else{
                           cancelURL = SPS_HOST + '/'+ cancelURL ;
                           return  cancelURL;
                           
                      }
              
              }
       
       
       
       }
              
       
function myLocalFailureHook(){
       
       var failureURL = getURLParamMA1("failureURL");
       
       if (failureURL .indexOf("http") > -1) {
              
               return  failureURL ;
       }
       
        else{
              failureURL  = SPS_HOST + '/' + failureURL ;
              return  failureURL  ;
              
        }      
       
}
