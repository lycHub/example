// 添加css3前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/*
调用：
const transform = prefixStyle('transform');
element.style[transform] = '';
*/









//深复制对象方法    
function cloneObj(obj) {  
    var newObj = {};  
    if (obj instanceof Array) {  
        newObj = [];  
    }  
    for (var key in obj) {  
        var val = obj[key];  
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。  
        newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
    }  
    return newObj;  
};



/****************************************************************************/

//兼容获取css样式
 function getStyle (element,attr){
  return window.getComputedStyle?window.getComputedStyle(element, null)[attr]:element.currentStyle[attr];
} 




//获取元素中点坐标
function coordinate(parent,element){
  return {
      left:element.offsetLeft+element.clientWidth/2,
      top:parent.offsetTop+element.offsetTop+element.clientHeight/2
  }
}

//获取两点间的距离
function distance(mouseX,mouseY,targetX,targetY){
 return Math.sqrt(Math.pow(mouseX-targetX,2)+ Math.pow(mouseY-targetY,2));
}

//获取被选中文本的内容
function selectText(){
		if(document.selection){ //ie
			return document.selection.createRange().text;
		}
		else{  //标准
			return window.getSelection().toString();
		}
	}

  //寻找同级下一个元素节点
  function nextElement(element){
    if(element.nextSibling.nodeType!=1){
      return arguments.callee(element.nextSibling);
    }else{
      return element.nextSibling;
    }
  }

  //寻找同级下一个指定的元素节点
   function nextAppoint(element,name){
    if(element.nextSibling.nodeName!=name){
      return arguments.callee(element.nextSibling);
    }else{
      return element.nextSibling;
    }
  }

  //寻找同级上一个元素节点
  function prevElement(element){
    if(element.previousSibling.nodeType!=1){
      return arguments.callee(element.previousSibling);
    }else{
      return element.previousSibling;
    }
  }

  //获取|设置元素属性
  function attr(element,attrName,newValue){
    if(!newValue){
      return element.getAttribute(attrName);
    }else{
      element.setAttribute(attrName,newValue);
    }
  }

  //窗口居中
  function center(element){
    element.style.left=(getInner().width+scroll().left-element.offsetWidth)/2+'px';
    element.style.top=(getInner().height+scroll().top-element.offsetHeight)/2+'px';
  }
  
  //兼容获取事件目标
function getTarget(evt){
    return evt.target?event.target:window.event.srcElement;
}

//添加事件
function addEvent(obj,type,fn){
	if(obj.addEventListener) {
		obj.addEventListener(type,fn,false);
	} else if(obj.attachEvent){
		obj.attachEvent('on'+type,fn);
	}
}

//移除事件
function removeEvent(obj,type,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn,false);
	} else if(obj.detachEvent){
		obj.detachEvent('on'+type,fn);
	}
}

//取消默认行为
function noDefault (evt){
    var e=getEvt(evt);
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue=false;
    }
}

//取消冒泡
function noBubble (evt){
    var e=getEvt(evt);
    if ( e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

//兼容返回键盘编码
function getcode (evt){
    var e=evt||window.event;
    if(!e.charCode){
        return e.keyCode;
    }else{
        return e.charCode;
    }
}

//替换指定字符
function str_replace(str,pos,replaceText){
    return str.substr(0,pos)+replaceText+str.slice(pos+1);
}


//设置cookie
function setCookie(admin,value,expires,path,domain,source){
    var cookieName=encodeURIComponent(admin)+'='+encodeURIComponent(value);
    if(expires instanceof Date){
        cookieName+=';expires='+expires;
    }
    if(path){
        cookieName+=';path='+path;
    }
    if(domain){
        cookieName+=';domain='+domain;
    }
    if(source){
        cookieName+=';source';
    }
    document.cookie=cookieName;
}


//设置过期时间
function set_date(time){
    if(typeof time=='number' && time>0){
        var date=new Date();
        date.setDate(date.getDate()+time);
    }else{
        throw new Error('参数错误');
    }
    return date;
}

//cookie取值
function getCookie(name){
    var cookieName=encodeURIComponent(name)+'=';
    var cookieStart=document.cookie.indexOf(cookieName);
    if(cookieStart>-1){
        var cookieEnd=document.cookie.indexOf(';',cookieStart);
        if(cookieEnd==-1){
            cookieEnd=document.cookie.length;
        }
        var cookieValue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
    }
    return decodeURIComponent(cookieValue);
}



//删除cookie
function unsetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}
