let $swipe = document.querySelector('.js-swipe');
let $overlay = document.querySelector('.js-mobile-overlay');

let swipeWidth = $swipe.clientWidth;
let menuLastX = -swipeWidth;
let dragWidth = 300;

let drag = false;

let mouseDownX = 0;
let distance = -swipeWidth;

//Проверяет нажатие ЛКМ в левой части экрана и начинает проводить
window.addEventListener('mousedown', function(e)
{
   if(e.clientX <= dragWidth)
   {
       swipeStart(e);
   }
})

//Проверяет, есть ли нажатие мыши
window.addEventListener('mouseup', swipeFinish)

//Обрабатывает swipe
window.addEventListener('mousemove', function(e)
{
    if(drag)
    {
        swipeDrag(e);
    }
})
//Проверяет пролистывание меню
$swipe.addEventListener('mousedown', function(e) 
{ 
    swipeStart(e);
})
//Проверяет нажатие ЛКМ на overlay
$overlay.addEventListener('mousedown', swipeClose)

function swipeStart(e)
{
    e.preventDefault();
    mouseDownX = e.clientX;
    drag = true;
}

function swipeDrag(e)
{
    distance = Math.max(Math.min(e.clientX - mouseDownX + menuLastX, 0), -swipeWidth);
    $swipe.style.cssText = 'transform: translate(' + distance + 'px, 0px)';
    if(distance > -swipeWidth)
    {
        let opacity = Math.min((distance + swipeWidth) / swipeWidth, 1);
        $overlay.style.cssText = 'visibility: visible; opacity:' + opacity + '';
    }
    else
    {
        $overlay.style.cssText = 'visibility: hidden';
    }
}

function swipeFinish()
{
    drag = false;

    if(distance + swipeWidth > swipeWidth/2)
    {
        swipeOpen();
    }
    else
    {
        swipeClose();
    }

}
//Открывает меню
function swipeOpen()
{
    $swipe.classList.add('active');
    $swipe.style.cssText = 'transition: transform .3s linear';
    $overlay.classList.add('active');
    $overlay.style.cssText = 'transition: opacity .1s linear';
    distance = 0;
    menuLastX = distance;
}
//Закрывает меню
function swipeClose()
{
    $swipe.classList.remove('active');
    $swipe.style.cssText = 'transition: transform .3s linear';
    $overlay.classList.remove('active');
    $overlay.style.cssText = 'transition: opacity .15s linear, visibility .2s linear';
    distance = -swipeWidth;
    menuLastX = distance;
}