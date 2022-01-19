import chalk from 'chalk';

class ColorLog_ {
  logo(port){
    console.log(chalk.blue(`
                         启动成功
     __    __     ______     ______   ______     __  __    
    /\\ "-./  \\   /\\  __ \\   /\\__  _\\ /\\  ___\\   /\\_\\_\\_\\   
    \\ \\ \\-./\\ \\  \\ \\  __ \\  \\/_/\\ \\/ \\ \\  __\\   \\/_/\\_\\/_  
     \\ \\_\\ \\ \\_\\  \\ \\_\\ \\_\\    \\ \\_\\  \\ \\_____\\   /\\_\\/\\_\\ 
      \\/_/  \\/_/   \\/_/\\/_/     \\/_/   \\/_____/   \\/_/\\/_/ 
                        
                        port:${port}                                        
    `));
  }

  start(message) {
    console.log(chalk.rgb(255,127,0)('▶ start '),
      chalk.hex('#CF5A0C')(message));
    console.log('\n');
  }

  success(message){
    console.log(chalk.rgb(0,255,127)('✔ success '),chalk.hex('#2CB6AD')(message));
    console.log('\n');
  }

  error(message){
    console.log(chalk.hex('#C60808')('✖ error'),
      chalk.hex('#F73C3C')(message));

  }

  warn(message){
    console.log(chalk.yellow(message));
  }

  info(message){
    console.log(chalk.rgb(102,179,255)('⬤ info '),chalk.green(message));
  }
}

export const ColorLog = new ColorLog_();

