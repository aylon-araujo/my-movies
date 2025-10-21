import '@testing-library/jest-dom';

import  { TextDecoder,TextEncoder } from 'text-encoding';

type GlobalWithTextAPIs = typeof globalThis & {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
};

if (typeof (globalThis as GlobalWithTextAPIs).TextEncoder === 'undefined') {
    (globalThis as GlobalWithTextAPIs).TextEncoder = TextEncoder;
}
if (typeof (globalThis as GlobalWithTextAPIs).TextDecoder === 'undefined') {
    (globalThis as GlobalWithTextAPIs).TextDecoder = TextDecoder;
}
