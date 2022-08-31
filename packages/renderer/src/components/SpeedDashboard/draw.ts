export const draw = (process:number=0,len:number=20) => {
  // 参考博客：http://www.demodashi.com/demo/13031.html
  let canvas = document.getElementById('speedDashboard') as HTMLCanvasElement;
  let width = 400;
  let height = 400;
  let ctx = canvas.getContext('2d') as  CanvasRenderingContext2D;
  let lineNums = 50;
  let innerLineNums = 75;
  let activeProcess = 0;
  let moveDotProcess = 0;
  let deg1 = (Math.PI * 12) / (9 * lineNums);
  // let colorLineNums = process / 2;
  let radius = 82;
  // let angle = deg1 * process / 2;
  let duration = 2000;
  let colorArr = ['#2196F3', '#9C27B0', '#F44336'];
  let tickColorArr = [];
  let tickColor = '#9b9db7';
  let timer;
  //色彩段数与彩色刻度条保持一致,线条无间隔,所以段数 * 2
  let gradient = ctx.createLinearGradient(0, 0, (radius + 45) * 2, 0);
  gradient.addColorStop(0, colorArr[2]);
  gradient.addColorStop(0.5, colorArr[1]);
  gradient.addColorStop(1.0, colorArr[0]);

  function drawInner() {
    let i;
    ctx.save();
    for (i = 0; i <= innerLineNums; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(155,157,183,1)';
      ctx.moveTo(radius, 0);
      ctx.lineTo(radius - 2, 0);
      ctx.stroke();
      //每个点的弧度,360°弧度为2π,即旋转弧度为 2π / 75
      ctx.rotate(2*Math.PI / innerLineNums);
    }
    ctx.restore();

    //lineNums 灰色长刻度条数量
    ctx.save();
    for (i = 0; i <= lineNums; i++) {
      let is_on = (((i - 1) / lineNums) * 100 < activeProcess - 1);
      let color = getTickColor(is_on, i);
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.moveTo(radius + 8, 0);
      ctx.lineTo(radius + 35, 0);
      ctx.stroke();
      //每个点的弧度,360°弧度为2π,即旋转弧度为 2π / 75
      ctx.rotate(2*Math.PI / innerLineNums);
    }
    ctx.restore();

    // 内环刻度线
    ctx.save();
    for (i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = tickColor;
      ctx.moveTo(radius, 0);
      ctx.lineTo(radius - 4, 0);
      ctx.stroke();

      //每10个点分一个刻度,共5个刻度,旋转角度为deg1 * 10
      ctx.rotate(deg1 * 10);
    }
    ctx.restore();

    //内环刻度上面数字
    ctx.save();
    ctx.rotate(Math.PI / 2);
    for (i = 0; i < 6; i++) {
      ctx.fillStyle = 'rgba(165,180,198, .4)';
      ctx.font = '10px JetBrains Mono Regular';
      ctx.textAlign = 'center';
      ctx.fillText(String(len * i), 0, -65);
      ctx.rotate(deg1 * 10);
    }
    ctx.restore();

    //内环文字
    ctx.save();
    ctx.rotate(210 * Math.PI / 180);
    ctx.fillStyle = '#FA6C37';
    ctx.font = '40px JetBrains Mono Regular';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(String(process), 0, -30);
    let width = ctx.measureText(String(process)).width;

    ctx.fillStyle = '#FA6C37';
    ctx.font = '20px JetBrains Mono Regular';
    ctx.fillText('Mb/S', 5, 18);
    ctx.restore();
  }

  function drawLine() {
    //外环渐变线
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = gradient;
    ctx.arc(0, 0, radius + 45, 0, activeProcess / 2 * deg1, false);
    ctx.stroke();
    ctx.restore();
  }

  function drawEndPoint(beginX?, beginY?) {
    // 终点
    ctx.save();
    ctx.rotate(activeProcess / 2 * deg1);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.arc(radius + 45, 0, 5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(246, 5, 51, 1)';
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(246, 5, 51, 1)';
    ctx.arc(radius + 45, 0, 3, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }

  function drawMoveDot() {
    ctx.save();
    ctx.beginPath();
    ctx.rotate(moveDotProcess / 2 * deg1);
    ctx.fillStyle = 'rgb(3 169 244 / 30%)';
    ctx.arc(radius, 0, 5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }

  function render() {
    ctx.restore();
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(150*Math.PI/180);
    drawInner();
    drawLine();
    drawMoveDot();
    drawEndPoint();
    ctx.restore();
  }

  function start() {
    let lastUpdate = +new Date();
    let start = activeProcess;
    let speed = (process - start) / duration;
    let isend = false;
    tickColorArr = gradientColorArray();
    const update = function () {
      let now = +new Date();
      let elapsed = now - lastUpdate;
      moveDotProcess += elapsed * speed;
      lastUpdate = now;
      if (isend || activeProcess > process) {
        isend = true;
      } else {
        activeProcess += elapsed * speed;
      }
      render();
      requestFrame(update);
    };
    requestFrame(update);
  }
  start();

  function getTickColor(is_on, index) {
    let _index = index < 1 ? 1 : index;
    if (is_on) {
      if (tickColorArr && tickColorArr.length > 0) {
        return tickColorArr[_index-1];
      } else {
        return 'red';
      }
    } else {
      return tickColor;
    }
  }

  function gradientColorArray () {
    let list = [];
    for(let i = 0; i < colorArr.length - 1; i++) {
      let next = colorArr[i + 1];
      let cur = colorArr[i];
      let colorStep = 12;
      list = list.concat(gradientColor(cur, next, colorStep));
    }
    // console.log('------list', list, list.length);
    return list;
  }

  function gradientColor(startColor,endColor,step){
    let startRGB = colorRgb(startColor);//转换为rgb数组模式
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];

    let endRGB = colorRgb(endColor);
    let endR = endRGB[0];
    let endG = endRGB[1];
    const endB = endRGB[2];

    let sR = (endR - startR) / step;//总差值
    const sG = (endG-startG)/step;
    const sB = (endB-startB)/step;

    let colorArr = [];
    for(let i=0;i<step;i++){
      //计算每一步的hex值
      let hex = colorHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
      // @ts-ignore
      colorArr.push(hex);
    }
    return colorArr;
  }

  // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  function colorRgb(sColor){
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if(sColor && reg.test(sColor)){
      let i;
      if(sColor.length === 4){
        let sColorNew = '#';
        for(i = 1; i<4; i+=1){
          sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [] as any[];
      for(i = 1; i<7; i+=2){
        sColorChange.push(parseInt('0x'+sColor.slice(i,i+2)));
      }
      return sColorChange;
    }else{
      return sColor;
    }
  }
  // 将rgb表示方式转换为hex表示方式
  function colorHex(rgb){
    let i;
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if(/^(rgb|RGB)/.test(_this)){
      let aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,'').split(',');
      let strHex = '#';
      for(i = 0; i<aColor.length; i++){
        let hex: string | number = Number(aColor[i]).toString(16) as unknown as number;
        hex = hex < 10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
        if(hex === '0'){
          hex += hex;
        }
        strHex += hex;
      }
      if(strHex.length !== 7){
        strHex = _this;
      }
      return strHex;
    }else if(reg.test(_this)){
      let aNum = _this.replace(/#/,'').split('');
      if(aNum.length === 6){
        return _this;
      }else if(aNum.length === 3){
        let numHex = '#';
        for(i = 0; i<aNum.length; i+=1){
          numHex += (aNum[i]+aNum[i]);
        }
        return numHex;
      }
    }else{
      return _this;
    }
  }

  function requestFrame(f) {
    let anim = window.requestAnimationFrame;
    anim(f);
  }

  // document.getElementById('clearBtn').addEventListener('click', function(){
  //   window.cancelAnimationFrame(timer);
  //   activeProcess = 0;
  //   start();
  // });
};
