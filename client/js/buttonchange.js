      var a=0;
      var b=0;
      var c=0;
      $(document).ready(function(){
        $("#btnclick1").click(function(){
          a=a+1;
          if(a%2==1){
            $("#imgcheck1").attr("src","img/read-green.png");
          }else if(a%2==0){
            $("#imgcheck1").attr("src","img/read-dark-default.png");
          }        
        });
  
        $("#btnclick2").click(function(){
          b=b+1;
          if(b%2==1){
            $("#imgcheck2").attr("src","img/read-green.png");
          }else if(b%2==0){
            $("#imgcheck2").attr("src","img/read-dark-default.png");
          }        
        });  
  
        $("#btnclick3").click(function(){
          c=c+1;
          if(c%2==1){
            $("#imgcheck3").attr("src","img/read-green.png");
          }else if(c%2==0){
            $("#imgcheck3").attr("src","img/read-dark-default.png");
          }        
        });   
      });