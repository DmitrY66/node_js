const textToBuffer = (text, encoding) => Buffer.from(text, encoding);
// Ваше решение преобразование текста в буфер с заданной кодировкой


const bufferToText = (buffer, encoding) => buffer.toString(encoding);
// Ваше решение, декодирование буфера в текст с заданной кодировкой



// Проверка решения
const text = 'Привет, мир!';


const utf8Buffer = textToBuffer(text, 'utf-8');
console.log(utf8Buffer);


const decodedText = bufferToText(utf8Buffer, 'utf-8');
console.log(decodedText); // Выведет: Привет, мир!
