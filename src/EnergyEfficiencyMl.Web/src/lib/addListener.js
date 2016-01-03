import { delegator } from './delegator';

export default function addListener(target, type, handler) {
  delegator.addEventListener(target, type, handler);

  return {
    destroy() {
      delegator.removeEventListener(target, type, handler);
    }
  };
}
