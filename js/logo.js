var items = document.querySelectorAll('.circle a');


/* having 8 items */ 
for(var i = 0, l = items.length; i < l; i++) {
    
    items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";  
    items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
    
    // grouping
    if (i == 2 && items[i].style.top == "50%"){
        items[i].style.top = "55%";
    }
    if (i == 4 && items[i].style.left == "50%"){
        items[i].style.left = "55%";
    }
    if (i == 6 && items[i].style.top == "50%"){
        items[i].style.top = "55%";
    }
    
    if (i == 0 || i == 1 || i == 7){
        $(items[i]).on('click', { target: $(items[i]).attr('local') }, function(event) {
            $('body').scrollTo(event.data.target, 1000);
        });
    }
    
}


document.querySelector('.logoimg').onclick = function(e) {
   e.preventDefault(); document.querySelector('.circle').classList.toggle('open');
   document.querySelector('.circular-menu').classList.toggle('closed');
}
