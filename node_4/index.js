import { EventEmitter } from 'node:events';

class EE extends EventEmitter {
  constructor(interval) {
    super();
    this.interval = interval;
    this.totalInterval = 0;
  }

  emit(name, ...args) {
    this.totalInterval += this.interval;
    setTimeout(() => {
      super.emit(name, ...args);
    }, this.totalInterval);
  }
}

const tick = new EE(500);
tick.addListener('tick', x => {
  console.log('Tick -', x);
});

tick.emit('tick', 1);
tick.emit('tick', 2);
tick.emit('tick', 3);
tick.emit('tick', 4);
tick.emit('tick', 5);
tick.emit('tick', 6);
tick.emit('tick', 7);
tick.emit('tick', 8);



