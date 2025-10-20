import '@testing-library/jest-dom';

import  { TextDecoder,TextEncoder } from 'text-encoding';

if (typeof (globalThis as any).TextEncoder === 'undefined') {
    (globalThis as any).TextEncoder = TextEncoder;
}
if (typeof (globalThis as any).TextDecoder === 'undefined') {
    (globalThis as any).TextDecoder = TextDecoder;
}
