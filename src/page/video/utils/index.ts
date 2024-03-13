
const func = (canvasRef:any) => {

    let ctx = canvasRef.getContext('2d'); //获取2d上下文

    let img = new Image(); //创建img

    img.src = require("../assets/img1.jpg")

    ctx.drawImage(img, 0, 0);
    ctx.restore();
};

export { func };
