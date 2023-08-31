const textToBuffer = (text, encoding) => Buffer.from(text, encoding);
// Ваше решение преобразование текста в буфер с заданной кодировкой


const bufferToText = (buffer, encoding) => buffer.toString(encoding);
// Ваше решение, декодирование буфера в текст с заданной кодировкой



// Проверка решения
const text1 = 'Привет, мир!';
const text2 = 'Bookshop';

const utf8Buffer = textToBuffer(text1, 'utf-8');
console.log(utf8Buffer);


const decodedTextutf8 = bufferToText(utf8Buffer, 'utf-8');
console.log(decodedTextutf8); // Выведет: Привет, мир!

console.log();

const base64Buffer = textToBuffer(text2, 'base64');
console.log(base64Buffer);


const decodedTextbase64 = bufferToText(base64Buffer, 'base64');
console.log(decodedTextbase64); // Выведет: Bookshop
