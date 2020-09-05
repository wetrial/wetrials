import { newGuid } from '../../packages/core/src/utils';
import {
  base64,
  debase64,
  encrypt,
  decrypt,
  encryptKey,
  encryptBtoa,
  decryptAtob,
} from '../../packages/core/src/crypto';

describe('utils >> crypto', () => {
  describe('base64 && debase64', () => {
    it('base64 string', () => {
      const basedContent = base64('you see what?');
      const deBasedContent = debase64(basedContent);
      expect(deBasedContent).toBe('you see what?');
    });

    // it('base64 object', () => {
    //   const basedContent = base64({ name: 'xxg', say: 'you see what?' });
    //   const deBasedContent = JSON.parse(debase64(basedContent));
    //   expect(deBasedContent.name).toBe('xxg');
    //   expect(deBasedContent.say).toBe('you see what?');
    // });
  });

  describe('encryptKey', () => {
    it('lengt is 172', () => {
      expect(encryptKey(newGuid()).length).toBe(172);
    });
  });

  describe('encrypt && decrypt', () => {
    it('encrypt string', () => {
      const cryptoKey = newGuid();
      const basedContent = encrypt('see you what?', cryptoKey);

      const deBasedContent = decrypt(basedContent, cryptoKey);
      expect(deBasedContent).toBe('see you what?');
    });

    it('encrypt object', () => {
      const cryptoKey = newGuid();
      const basedContent = encrypt({ name: 'xxg', say: 'see you what?' }, cryptoKey);
      const deBasedContent = JSON.parse(decrypt(basedContent, cryptoKey));
      expect(deBasedContent.name).toBe('xxg');
      expect(deBasedContent.say).toBe('see you what?');
    });
  });

  describe('encrypt && decrypt', () => {
    it('encrypt string', () => {
      const cryptoKey = newGuid();
      const basedContent = encrypt('see you what?', cryptoKey);

      const deBasedContent = decrypt(basedContent, cryptoKey);
      expect(deBasedContent).toBe('see you what?');
    });

    it('encryptBtoa & decryptAtob string', () => {
      const data = '张三李四';

      const encryptedData = encryptBtoa(data);
      const decryptedData = decryptAtob(encryptedData);
      expect(decryptedData).toBe(data);
    });

    it('encryptBtoa & decryptAtob object', () => {
      const data = { name: '谢新根', age: 30, sex: '男' };

      const encryptedData = encryptBtoa(data);
      const decryptedData = JSON.parse(decryptAtob(encryptedData));

      expect(decryptedData.name).toBe('谢新根');
      expect(decryptedData.age).toBe(30);
      expect(decryptedData.sex).toBe('男');
    });

    it('encryptBtoa & decryptAtob array', () => {
      const data = [12, 30, 31];
      const encryptedData = encryptBtoa(data);
      const decryptedData = JSON.parse(decryptAtob(encryptedData));
      expect(decryptedData.length).toBe(3);
      expect(decryptedData[0]).toBe(12);
      expect(decryptedData[1]).toBe(30);
      expect(decryptedData[2]).toBe(31);
    });
  });
});
