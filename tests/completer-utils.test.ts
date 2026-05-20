import { completer, getCompleter } from '../src/completer-utils.js';

describe('completer-utils', () => {
  describe('Structural & Lifecycle Blueprint', () => {
    it('should initialize a valid Completer architecture wrapper', () => {
      const c = completer();

      expect(c).toHaveProperty('complete');
      expect(c).toHaveProperty('completeError');
      expect(c).toHaveProperty('future');
      expect(c.future).toBeInstanceOf(Promise);
    });

    it('should fulfill the future instance successfully when complete is invoked', async () => {
      const c = completer<string>();

      c.complete('resolved-value');

      await expect(c.future).resolves.toBe('resolved-value');
    });

    it('should reject the future instance properly when completeError is invoked', async () => {
      const c = completer();
      const mockError = new Error('operational-failure');

      c.completeError(mockError);

      await expect(c.future).rejects.toThrow('operational-failure');
    });

    it('should guarantee idempotency by ignoring subsequent complete invocations', async () => {
      const c = completer<string>();

      c.complete('first-call');
      c.complete('second-call'); // should be ignored gracefully

      await expect(c.future).resolves.toBe('first-call');
    });
  });

  describe('Key-Based Registry Management', () => {
    it('should securely register and retrieve the exact completer instance by an explicit key', () => {
      const uniqueKey = 'execution-context-key';
      const createdInstance = completer(uniqueKey);
      const retrievedInstance = getCompleter(uniqueKey);

      expect(retrievedInstance).toBe(createdInstance);
    });

    it('should return null smoothly when attempting to retrieve a non-existent key', () => {
      const retrieved = getCompleter('non-existent-or-expired-key');
      expect(retrieved).toBeNull();
    });

    it('should decouple independent blank invocations into separate unique instances', () => {
      const c1 = completer();
      const c2 = completer();

      expect(c1).not.toBe(c2);
    });

    it('should lifecycle-evict the completer from the internal registry once settled', async () => {
      const key = 'transient-lifecycle-key';
      const c = completer(key);

      // Verify it exists in registry while pending
      expect(getCompleter(key)).toBe(c);

      // Settle the completer execution loop
      c.complete('done');
      await c.future;

      // Assert it was evicted or cleaned up from the registry to prevent memory leaks
      // Note: If your implementation doesn't evict automatically, it's highly recommended 
      // to implement it right inside the .finally() layer of the completer instantiation!
      expect(getCompleter(key)).toBeNull();
    });
  });
});
