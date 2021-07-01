let isNowPainting = false;

// CANVAS *****************************************************
const canvas = document.getElementById('js-canvas');
canvas.width = 512;
canvas.height = 512;

canvas.addEventListener('mousemove', onCanvasMouseMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', stopPainting);
canvas.addEventListener('mouseenter', onCanvasMouseEnter);
canvas.addEventListener('contextmenu', onCanvasContextMenu);

function onCanvasMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (isNowPainting) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    ctx.beginPath();
    isNowPainting = true;
}

function stopPainting(event) {
    isNowPainting = false;
}

function onCanvasMouseEnter(event) {
    if (isNowPainting) {
        startPainting(event);
    }
}

function onCanvasContextMenu(event) {
    event.preventDefault();
    console.log('right click');
}
//**********************************************************


// CONTEXT *************************************************
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 3;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//**********************************************************


// RANGE ***************************************************
const thickness = document.getElementById('js-range');
thickness.addEventListener('input', onThicknessChange);

function onThicknessChange(event) {
    ctx.lineWidth = thickness.value;
}
//**********************************************************


// COLOR PICK **********************************************
const colors = document.querySelectorAll('.controls__color');
colors.forEach(color => {
    color.addEventListener('mouseup', onColorPickMouseUp);
});
colors.forEach(color => {
    color.addEventListener('mousedown', onColorPickMouseDown);
});

function onColorPickMouseUp(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

function onColorPickMouseDown(event) {
    if (!paintMode) {
        ctx.fillStyle = event.target.style.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
//**********************************************************


// MODE ****************************************************
let paintMode = true;
const modeToggler = document.getElementById('js-mode');
modeToggler.addEventListener('click', onModeTogglerClick);

function onModeTogglerClick(event) {
    if (paintMode)
        modeToggler.innerText = 'Paint';
    else
        modeToggler.innerText = 'Fill';
    paintMode = !paintMode;
}
//**********************************************************


// SAVE ****************************************************
const saveBtn = document.getElementById('js-save');
saveBtn.addEventListener('click', onSaveBtnClick);

function onSaveBtnClick(event) {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.setAttribute('href', image);
    link.setAttribute('download', 'my-image.png');
    console.log(link);
    link.click();
}