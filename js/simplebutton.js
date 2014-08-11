/*
$('.morph-button').hover(
    function(){ $(this).addClass('active open') },
    function(){ $(this).removeClass('active open') }
)
*/

$('.morph-button').click(function(){$(this).toggleClass('active open')});
