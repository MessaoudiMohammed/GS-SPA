# GS-SPA
 SPA (~5kb) via (JQuery/AJAX) version beta
 
Demo:
-   Basic:  [link](https://codepen.io/OxiDev/pen/JVYGzO)

## Installation

Include Libs in your HTML code:

	<script src="/jquery_3.3.1_jquery.js"/>
    <script src="/get.scripts.js"/>
    <script class="gs-scripts" src="./index.js"/>
    
## Architect
 <img src="https://i.imgur.com/XXs0lbb.png" align="center">
 
 every folder has index.html - index.js - index.css so every folder is a route e.g:
  ->Route target.com/sale/
     folder: /sale/
      -index.html [template]
      -index.js   [logic]
      -index.css  [styles]

## Configuration
 - lazyload for js/css :
       
     ##### scripts:
       
       <script class="gs-scripts" src="./index.js"/>
    *add "gs-scripts" class*
    ##### stylesheets:
    
       <link type="text/css" rel="stylesheet" data-href="test.css"/>
    *add "data-href" attribute*
 

## Usage
 -Initialize page :
 
    $.init(["/nav.html"]);

*$.init has only one input as param (type:array) if you wanna add some sub html code to the body such as nav, dialogs, header, etc...*
 - Link anchor <a/> / routing on HTML:
 
       <li><a href="/?page=4&a=lol" data-routing>home</a></li>
       <li><a href="/test1/?page=5" data-routing>test page</a></li>
    *add "data-routing" attribute*
- Link button <button/> / routing on js:
    HTML:
        
        <button>display</button>

    JS:
    
       $(document).ready(function(){
        $("button").on("click",function(){
            $.routing("/test1/",{parm1:"hello",parm2:"exmple"},{
                assets:{
                    css:true,
                }
            });
        })
      });
       
 *$.routing function has 3 inputs (path_folder,params,options)*
 -path_folder : path folder as we see above.
 -params : params you wanna pass to this page
 -options : assets prop for js/css if you wanna import js/css file (index.js/index.css)

- Import js file using $.scripts function :

      $.script([path_file_name],function_runs_after_importing_all_files")

- Import Html file using $.layout function :

      $.layout([path_file_name],dist_element)

- Import Css files using $.styles function :

      $.styles([path_file_name])
      
      //or
      
      $.styles([path_file_name],null,dist)
      
-Check History of routing using $.history

      // $.history is array of objects
      
# Conclusion

 this lib is just beta if you wanna update or upgrade or whatever you want to do, just folk it and do it.
