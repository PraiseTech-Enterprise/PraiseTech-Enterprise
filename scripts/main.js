///uis
let menOpen=false;
function closeMenu(){
  if(!detectMob()){
    message("this method is for mobiles only")
  }
  $("#menuContent").animate({marginLeft:screen.width+($("#menuContent").width()+100)},400);
  $("#menu").attr("class","fa fa-reorder");
  menOpen=false
}

function openMenu(){
  if(!detectMob()){
    message("this method is for mobiles only")
  }
  menOpen=true;
  $("#menuContent").animate({marginLeft:"0"},400);
  $("#menu").attr("class","fa fa-times")
}

onload=()=>{
  $("#aboutGroup img").css("height", $("#aboutGroup img").css("width"));
function openNClose(){
menOpen ? closeMenu():openMenu();
}
  $("#menuContent button,#menu").click(openNClose);
}