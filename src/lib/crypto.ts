import { sha256 as nobleSha256 } from '@noble/hashes/sha256';
import { bytesToHex } from '@noble/hashes/utils';

/**
 * Calculates the SHA-256 hash of a message.
 * @param message The string to hash.
 * @returns A promise that resolves to the hex-encoded hash string.
 */
export async function sha256(message: string): Promise<string> {
  // Encode the message as a UTF-8 byte array
  const msgBuffer = new TextEncoder().encode(message);

  // Hash the message using Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // Convert the ArrayBuffer to an array of bytes
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convert bytes to a hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

/**
 * Encrypts/decrypts a message using the Caesar cipher.
 * @param text The string to process.
 * @param shift The number of positions to shift letters.
 * @returns The processed string.
 */
export function caesarCipher(text: string, shift: number): string {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      }
      // Lowercase letters
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      }

      return char; // Non-alphabetic characters remain unchanged
    })
    .join('');
}

/**
 * Converts a hexadecimal string to a binary string.
 * @param hex The hexadecimal string.
 * @returns The binary representation, padded to 256 bits.
 */
export function hexToBinary(hex: string): string {
  if (!hex) return ''.padStart(256, '0');
  return hex.split('').map(c =>
    parseInt(c, 16).toString(2).padStart(4, '0')
  ).join('').padStart(256, '0');
}
