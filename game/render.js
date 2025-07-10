export class screen {
  constructor() {
    this.container = document.getElementById('page2-content');
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    this.context = this.canvas.getContext('2d');
    
    this.container.insertBefore(this.canvas, this.container.children[0]);
  }
  
  clear(context) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
