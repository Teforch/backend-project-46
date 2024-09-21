import path from 'path';
import getAbsouluteFilePath from '../src/getAbsoluteFilePath.js';

describe('getAbsoluteFilePath', () => {
  it('should return the absolute file path based on the current working directory', () => {
    // Сохраняем текущее рабочее пространство
    const currentDir = process.cwd();
    const filePath = 'test.txt'; // Путь к файлу для теста
    const expectedAbsolutePath = path.resolve(currentDir, filePath);

    // Вызываем функцию
    const result = getAbsouluteFilePath(filePath);

    // Проверяем, что результат соответствует ожидаемому значению
    expect(result).toBe(expectedAbsolutePath);
  });
});
