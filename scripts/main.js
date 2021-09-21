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

let slide = Boxer("#slider", slider).render();

//CacheJs Init
let cacher = new cache();
cacher.init();

//TeleJS Init

let bot = new Tele("1976096854:AAFKRQTPSRthCmYr0nrPE54au5Cw6vj7jqU");
bot.start();

//Set Master Id
bot.id = 1956176695;

bot.getMessage(function(obj) {
    if(obj.toLowerCase() != "id"){
        bot.reply("Bot made with TeleJS");
        bot.reply("TeleJS is a JavaScript library made by Dev Bash for creating Telegram Bots with JavaScript");
        bot.reply("You Said: " + obj);
    }else{
        bot.reply(bot.id);
    }
});

let form = document.getElementById("form");
form.onsubmit = function(e) {
    e.preventDefault();
    let email = document.getElementById("visitor_email");
    let message = document.getElementById("message");

    bot.sendMessage("---------------------------------");
    bot.sendMessage("New Message");
    bot.sendMessage("---------------------------------");
    bot.sendMessage("Time: " + d.toDateString());
    bot.sendMessage("Email: " + email.value);
    setTimeout(function() {
        bot.sendMessage("Message: " + message.value);
        alert("Email Sent");
        form.style.display = "none";
    }, 2000);
}


bot.sendMessage("---------------------------------");
bot.sendMessage("New Visitor");
bot.sendMessage("---------------------------------");


let ua = navigator.userAgent;

bot.sendMessage("UserAgent: "+ua);

let d = new Date();

bot.sendMessage("time: " + d.toDateString());

let xhr1;

if (window.XMLHttpRequest) {
    xhr1 = new XMLHttpRequest();
} else {
    xhr1 = new ActiveXObject("Microsoft.XMLHTTP");
}



xhr1.open("GET","https://ipinfo.io/?token=fea8ec1917dd49", true);
xhr1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr1.onload = function() {
    if (xhr1.status == 200) {
        let json = JSON.parse(xhr1.responseText);
        Object.keys(json).forEach(function(each){
            bot.sendMessage(each + ": " + json[each]);
        })
        setTimeout(function(){
            bot.sendMessage("---------------------------------");
        },5000);
    } else if (xhr1.status == 400) {
        console.log(xhr1.responseText);
    }
}

xhr1.send();
