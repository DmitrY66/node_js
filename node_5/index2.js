import { EventEmitter } from 'node:events';
import {
  readFile,
  writeFile,
  stat,
  copyFile,
  truncate
} from 'node:fs/promises';

export class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }

  async log(message) {
    this.logQueue.unshift(message);
    if (!this.writing) {
      this.writing = true;
      await this.writeLog();
    }
  }

  async writeLog() {
    const message = this.logQueue.shift();

    const fileText = await readFile(this.filename, 'utf-8');
    await writeFile(this.filename, message + '\n' + fileText);
    this.emit('messageLoaded', message);
    this.checkFileSize();

    if (this.logQueue.length) {
      this.writeLog();
    } else {
      this.writing = false;
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.filename);
      return stats.size;
    } catch {
      return 0;
    }
  }

  async checkFileSize() {
    const fileSize = await this.getFileSize();
    if (fileSize > this.maxSize) {
      this.rotateLog();
    }
  }

  async rotateLog() {
    await copyFile(
      this.filename,
      this.filename.slice(0, this.filename.indexOf('.') + 1) + 'bak',
    );

    await truncate(this.filename, this._maxSize);
  }
};

const logger = new Logger('log.txt', 512);

logger.on('messageLoaded', message => {
  console.log('Записано сообщение:', message);
});

logger.log('Первое сообщение');
logger.log('Второе сообщение');
