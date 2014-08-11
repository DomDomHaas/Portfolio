
$('.stack').hover(
    function(){ $(this).addClass('active') },
    function(){ $(this).removeClass('active') }
)

$('.stack').click(function(){$(this).toggleClass('active')});
