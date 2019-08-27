$.arrayFilename=[];
$.indexGetScripts=0;
$.countGetScripts=0;
$.pageQueue=null;
$.pageQueueBool=false;
$.history=[];
$.routing=function(route,params,options)
{
  
    options=$.extend(true,{
      assets:{
        js:true,
        css:false,
      }
    },options)
    if(route!=""&&route!=undefined)
    {
      $.pageQueue=$.ajax({
            url: route+"index.html",
            beforeSend:function (xhr) {
              if($.pageQueue != null) {
                  $.pageQueue.abort();
                  $.pageQueueBool=true;
              }
          },
            success:function(data){
              $main=$(data).filter(function(a,b){
                return $(b).hasClass("gs-app")?$(b):null;
              })
              if($main!=null)
              {
                parms=route+(params?"?":"");
                let i=0;
                $.each(params,function(index,value){
                  i>0?parms+="&":"";
                  parms+=index+"="+value;
                  i++;
                });
                window.history.pushState("", "",parms);
                if($main.children(".gs-main"))
                {
                  $(".gs-app .gs-main").replaceWith($main.children(".gs-main"));
                }
                if($main.children(".gs-scripts"))
                {
                  $(".gs-app .gs-scripts").replaceWith($main.children(".gs-scripts"));
                }
                if(options.assets.js==true)
                {
                    $.assets([route+"index.js"],"script");
                }
                if(options.assets.css==true)
                {
                  $.styles([...$(data).filter(function(index,element){
                    return ($(element).prop("tagName")=="LINK"||$(element).prop("tagName")=="STYLE")&&$(element).attr("data-href")!=undefined;
                    })]);
                }
                aborted=false;
              }
            }
        });
        $.history.push({url:location.href});
    }
}

$.assets = function get(url,type) {
  type=""
  parm={
    url:url,
    dataType: type
  };
  return new Promise((resolve, reject) => {
      $.ajax(parm).done(function(data){
        resolve(data);
      }).fail(function(){
        reject(data);
      })
  });
}

$.scripts=function(filename=[],contructor){
  if(filename.length==$.indexGetScripts)
    return contructor!=undefined?contructor():false;
  if(filename[$.indexGetScripts]!=undefined)
  $.ajax({
    url: filename[$.indexGetScripts]+".js",
    dataType: "script",
    success:function(){
        if(filename[$.indexGetScripts].indexOf("index")==-1&&filename[$.indexGetScripts]!="materialize.default")
            $.arrayFilename.push(filename[$.indexGetScripts]);                   
        $.indexGetScripts++;
        $.scripts(filename);
    }
  });
}
$.init=function(layouts){
    $.styles([...$(document).find("link")],0);
    $.scripts([...$(document).find("script.gs-scripts")]);
    if(layouts!=undefined)
      $.layout(layouts,"body")
    $(document).on("click","a",function(e){
        if($(this).attr("data-routing")!=undefined)
        {
          aborted=true;
          params=undefined;
          if($(this).attr("href").indexOf("?")!=-1)
          {
            params =(($(this).attr("href").split("?"))[1]).split("&");
            obj={};
            params.map(function(a,b){
              a=a.split("=");
              return obj[a[0]]=a[1];
            })
            params=obj;
            
          }
          $.routing($(this).attr("href").split("?")[0],params,{assets:{js:true,css:true}});
          e.preventDefault();
        }
    });
};

$.layout=function(filename=[],dist="body",elemntIndex=0,elemnt=""){
  if(filename.length==elemntIndex||filename[elemntIndex]==undefined)
    return $(dist).prepend(elemnt);
   
  if(filename.length>0)
    $.ajax({
      url: filename[elemntIndex],
      success:function(data){
        
          elemnt+=data;
          elemntIndex++;
          $.layout(filename,dist,elemntIndex,elemnt);
      },
        error:function(){
          elemntIndex++;
        }
    });
}
$.styles=function(filename=[],styleIndex=0,style=""){
  if(filename.length==styleIndex||$(filename[styleIndex]).attr("data-href")==undefined)
    return (function(){
      $(filename).remove();
      if($("style.gs-style").length)
        $("style.gs-style").html("")
      else
        $("head").append("<style class=\"gs-style\"></style>");
      $("style.gs-style").append(style);
    })()
    
  if(filename.length>0)
    $.ajax({
      url: $(filename[styleIndex]).attr("data-href"),
      success:function(data){
          styleIndex++;
          style+=data;
          $.styles(filename,styleIndex,style);
      },
        error:function(){
            styleIndex++;
        }
    });
}