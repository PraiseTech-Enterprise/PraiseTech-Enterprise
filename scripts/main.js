///uis
let menOpen = false;
let timeout = ()=>1;
function closeMenu() {
    if (!detectMob()) {
        message("this method is for mobiles only")
    }
    timeout = setTimeout(()=>{
        $("#menuContent").hide();
    }
    , 1000);
    $("#menuContent").animate({
        marginLeft: screen.width + ($("#menuContent").width() + 100)
    }, 400);
    $("#menu").attr("class", "fa fa-reorder");
    menOpen = false
}

function openMenu() {
    if (innerWidth > 450)
        return message("error command");
    $("#menuContent").show();
    clearTimeout(timeout);
    if (!detectMob()) {
        message("this method is for mobiles only")
    }
    menOpen = true;
    $("#menuContent").animate({
        marginLeft: "0"
    }, 400);
    $("#menu").attr("class", "fa fa-times")
}

onload = ()=>{
    $("#aboutGroup img").css("height", $("#aboutGroup img").css("width"));
    function openNClose() {
        menOpen ? closeMenu() : openMenu();
    }
    $("#menuContent button,#menu").click(openNClose);

    addEventListener("resize", ()=>{
        if (innerWidth > 450) {
            $("#menuContent").hide();
        }
    }
    )
}

//Render slider component

let slide = Boxer("#slider",slider).render();

//CacheJs Init
let cacher = new cache();
cacher.init();