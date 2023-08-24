import { EventEmitter } from 'node:events';

class EE extends EventEmitter {
  constructor() {
    super();
  };

  sendMessage(user, message) {
    this.emit('sendMessage', user, message);
  };
};

const messages = new EE();

const receiveMessage = (user, message) => console.log(`${user}: ${message}`);

messages.on('sendMessage', receiveMessage);

messages.sendMessage('Eustace', 'Если увидишь на подоконнике двадцать четыре кактуса - это провал!!!');
messages.sendMessage('Alex', 'Хорошо, но я умею считать только до десяти.');
messages.sendMessage('Eustace', 'Какого хрена ты делаешь в разведке?');
messages.sendMessage('Alex', 'Вообще-то я пастор.');
messages.sendMessage('Eustace', 'Прости, я забыл. Съешь это сообщение.');
