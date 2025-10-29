/*
 * Comprehensive test suite for BoundedQueue
 * Implements ISP analysis with BCC, BVA, State-Based Testing, and MCC
 */
import BoundedQueue from './BoundedQueue.js';

describe('BoundedQueue - Constructor Tests (BCC)', () => {
  test('C-B1: Valid capacity, typical usage (capacity=5)', () => {
    const bq = new BoundedQueue(5);
    expect(bq.capacity).toBe(5);
    expect(bq.size).toBe(0);
    expect(bq.is_empty()).toBe(true);
    expect(bq.is_full()).toBe(false);
  });

  test('C-B2: Valid capacity, minimum edge case (capacity=0)', () => {
    const bq = new BoundedQueue(0);
    expect(bq.capacity).toBe(0);
    expect(bq.size).toBe(0);
    expect(bq.is_empty()).toBe(true);
    expect(bq.is_full()).toBe(true); // Capacity 0 queue is both empty and full
  });

  test('C-B3: Valid capacity, small value (capacity=1)', () => {
    const bq = new BoundedQueue(1);
    expect(bq.capacity).toBe(1);
    expect(bq.size).toBe(0);
    expect(bq.is_empty()).toBe(true);
    expect(bq.is_full()).toBe(false);
  });

  test('C-B4: Valid capacity, large value (capacity=100)', () => {
    const bq = new BoundedQueue(100);
    expect(bq.capacity).toBe(100);
    expect(bq.size).toBe(0);
    expect(bq.is_empty()).toBe(true);
    expect(bq.is_full()).toBe(false);
  });

  test('C-B5: Invalid capacity (capacity=-1)', () => {
    expect(() => new BoundedQueue(-1)).toThrow(RangeError);
    expect(() => new BoundedQueue(-1)).toThrow("capacity is less than 0");
  });
});

describe('BoundedQueue - Enqueue Tests (BCC)', () => {
  test('E-B1: Valid number, empty queue', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(42);
    expect(bq.size).toBe(1);
    expect(bq.is_full()).toBe(false);
    expect(bq.is_empty()).toBe(false);
  });

  test('E-B2: NaN element, empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue(NaN)).toThrow(RangeError);
    expect(() => bq.enqueue(NaN)).toThrow("element is invalid");
  });

  test('E-B3: Non-number string, empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue("hello")).toThrow(RangeError);
    expect(() => bq.enqueue("hello")).toThrow("element is invalid");
  });

  test('E-B4: Null element, empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue(null)).toThrow(RangeError);
    expect(() => bq.enqueue(null)).toThrow("element is invalid");
  });

  test('E-B5: Undefined element, empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue(undefined)).toThrow(RangeError);
    expect(() => bq.enqueue(undefined)).toThrow("element is invalid");
  });

  test('E-B6: Valid number, partially full queue', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    bq.enqueue(99);
    expect(bq.size).toBe(4);
    expect(bq.is_full()).toBe(false);
    expect(bq.is_empty()).toBe(false);
  });

  test('E-B7: Valid number, full queue', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    expect(() => bq.enqueue(99)).toThrow(Error);
    expect(() => bq.enqueue(99)).toThrow("queue is full");
  });
});

describe('BoundedQueue - Dequeue Tests (BCC)', () => {
  test('D-B1: Non-empty queue with multiple elements', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    const result = bq.dequeue();
    expect(result).toBe(0);
    expect(bq.size).toBe(2);
    expect(bq.is_empty()).toBe(false);
  });

  test('D-B2: Queue with single element', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(42);
    const result = bq.dequeue();
    expect(result).toBe(42);
    expect(bq.size).toBe(0);
    expect(bq.is_empty()).toBe(true);
  });

  test('D-B3: Full queue (size = capacity)', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    const result = bq.dequeue();
    expect(result).toBe(0);
    expect(bq.size).toBe(4);
    expect(bq.is_empty()).toBe(false);
  });

  test('D-B4: Empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.dequeue()).toThrow(Error);
    expect(() => bq.dequeue()).toThrow("queue is empty");
  });
});

describe('BoundedQueue - Boundary Value Analysis (BVA)', () => {
  test('C-BVA-1: Constructor capacity below boundary (-1)', () => {
    expect(() => new BoundedQueue(-1)).toThrow(RangeError);
  });

  test('C-BVA-2: Constructor minimum valid boundary (0)', () => {
    const bq = new BoundedQueue(0);
    expect(bq.capacity).toBe(0);
    expect(bq.is_full()).toBe(true);
    expect(bq.is_empty()).toBe(true);
  });

  test('C-BVA-3: Constructor just above minimum (1)', () => {
    const bq = new BoundedQueue(1);
    expect(bq.capacity).toBe(1);
    expect(bq.is_empty()).toBe(true);
  });

  test('E-BVA-1: Enqueue one away from empty (size=0→1)', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(10);
    expect(bq.size).toBe(1);
    expect(bq.is_empty()).toBe(false);
  });

  test('E-BVA-2: Enqueue one away from full (size=4→5)', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 4; i++) {
      bq.enqueue(i);
    }
    bq.enqueue(99);
    expect(bq.size).toBe(5);
    expect(bq.is_full()).toBe(true);
  });

  test('E-BVA-3: Enqueue exactly full (size=5)', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    expect(() => bq.enqueue(99)).toThrow("queue is full");
  });

  test('D-BVA-1: Dequeue one away from empty (size=1→0)', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(10);
    const result = bq.dequeue();
    expect(result).toBe(10);
    expect(bq.size).toBe(0);
    expect(bq.is_empty()).toBe(true);
  });

  test('D-BVA-2: Dequeue one away from full (size=5→4)', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    const result = bq.dequeue();
    expect(result).toBe(0);
    expect(bq.size).toBe(4);
    expect(bq.is_full()).toBe(false);
  });

  test('D-BVA-3: Dequeue exactly empty (size=0)', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.dequeue()).toThrow("queue is empty");
  });
});

describe('BoundedQueue - State-Based Testing', () => {
  test('S-WA-1: Wrap-around test sequence', () => {
    const bq = new BoundedQueue(5);
    // Fill queue
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    // Dequeue 3 elements - front moves to index 3
    for (let i = 0; i < 3; i++) {
      bq.dequeue();
    }
    // Add new elements - should wrap around
    bq.enqueue(100);
    bq.enqueue(200);

    expect(bq.size).toBe(4);
    expect(bq.toString()).toMatch(/\[3,\s*4,\s*100,\s*200\]/);
  });

  test('S-MO-1: Enqueue then check is_full (not full)', () => {
    const bq = new BoundedQueue(3);
    bq.enqueue(10);
    expect(bq.is_full()).toBe(false);
    expect(bq.size).toBe(1);
  });

  test('S-MO-2: Fill queue then check is_full', () => {
    const bq = new BoundedQueue(3);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    expect(bq.is_full()).toBe(true);
    expect(bq.size).toBe(3);
  });

  test('S-MO-3: Dequeue then check is_empty', () => {
    const bq = new BoundedQueue(3);
    bq.enqueue(10);
    bq.dequeue();
    expect(bq.is_empty()).toBe(true);
  });

  test('S-MO-4: Enqueue multiple elements then check toString', () => {
    const bq = new BoundedQueue(3);
    bq.enqueue(10);
    bq.enqueue(20);
    const result = bq.toString();
    expect(result).toMatch(/\[10,\s*20\]/);
    expect(result).toContain("is_empty(): false");
    expect(result).toContain("is_full(): false");
  });

  test('S-MO-5: Complex wrap-around with toString', () => {
    const bq = new BoundedQueue(3);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    bq.dequeue(); // removes 0
    bq.enqueue(99); // adds 99 at index 0
    const result = bq.toString();
    expect(result).toMatch(/\[1,\s*2,\s*99\]/);
    expect(result).toContain("is_full(): true");
  });

  test('S-CT-1: Complex state transition test', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(1);
    bq.enqueue(2);
    bq.dequeue(); // size: 2→1, removes 1
    bq.enqueue(3);
    bq.enqueue(4);
    bq.dequeue(); // size: 3→2, removes 2
    bq.dequeue(); // size: 2→1, removes 3
    bq.enqueue(5);
    bq.enqueue(6);
    bq.enqueue(7);

    expect(bq.size).toBe(4);
    const result = bq.toString();
    expect(result).toMatch(/\[4,\s*5,\s*6,\s*7\]/);
  });
});

describe('BoundedQueue - Multiple Choice Coverage (MCC)', () => {
  test('E-MCC-1: Valid number × Empty', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(42);
    expect(bq.size).toBe(1);
  });

  test('E-MCC-2: NaN × Empty', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue(NaN)).toThrow("element is invalid");
  });

  test('E-MCC-3: String × Empty', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue("hello")).toThrow("element is invalid");
  });

  test('E-MCC-4: Null × Empty', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue(null)).toThrow("element is invalid");
  });

  test('E-MCC-5: Undefined × Empty', () => {
    const bq = new BoundedQueue(5);
    expect(() => bq.enqueue(undefined)).toThrow("element is invalid");
  });

  test('E-MCC-6: Valid number × Partially full', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    bq.enqueue(99);
    expect(bq.size).toBe(4);
  });

  test('E-MCC-7: NaN × Partially full', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    expect(() => bq.enqueue(NaN)).toThrow("element is invalid");
  });

  test('E-MCC-8: String × Partially full', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 3; i++) {
      bq.enqueue(i);
    }
    expect(() => bq.enqueue("hello")).toThrow("element is invalid");
  });

  test('E-MCC-9: Valid number × Full', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    expect(() => bq.enqueue(99)).toThrow("queue is full");
  });

  test('E-MCC-10: NaN × Full', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    // Element validity check happens before queue full check
    expect(() => bq.enqueue(NaN)).toThrow("element is invalid");
  });

  test('E-MCC-11: String x Full', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    // Element validity check happens before queue full check
    expect(() => bq.enqueue("hello")).toThrow("element is invalid");
  });
});

describe('BoundedQueue - is_empty and is_full observer methods', () => {
  test('is_empty with empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(bq.is_empty()).toBe(true);
  });

  test('is_empty with non-empty queue', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(10);
    expect(bq.is_empty()).toBe(false);
  });

  test('is_full with empty queue', () => {
    const bq = new BoundedQueue(5);
    expect(bq.is_full()).toBe(false);
  });

  test('is_full with full queue', () => {
    const bq = new BoundedQueue(5);
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }
    expect(bq.is_full()).toBe(true);
  });

  test('is_full with partially full queue', () => {
    const bq = new BoundedQueue(5);
    bq.enqueue(10);
    bq.enqueue(20);
    expect(bq.is_full()).toBe(false);
  });
});

describe('BoundedQueue - Additional Coverage Tests', () => {
  test('Complete queue cycle: fill, partial dequeue, refill (demo scenario)', () => {
    const bq = new BoundedQueue(10);

    // Initial empty state
    expect(bq.toString()).toMatch(/\[\]\s+is_empty\(\): true,\s+is_full\(\): false/);

    // Fill queue completely
    for (let i = 0; i < 10; i++) {
      bq.enqueue(i);
    }
    expect(bq.toString()).toMatch(/\[0,\s*1,\s*2,\s*3,\s*4,\s*5,\s*6,\s*7,\s*8,\s*9\]\s+is_empty\(\): false,\s+is_full\(\): true/);

    // Dequeue 3 elements
    for (let i = 0; i < 3; i++) {
      bq.dequeue();
    }
    expect(bq.toString()).toMatch(/\[3,\s*4,\s*5,\s*6,\s*7,\s*8,\s*9\]\s+is_empty\(\): false,\s+is_full\(\): false/);

    // Add 2 more elements
    for (let i = 1; i < 3; i++) {
      bq.enqueue(i);
    }
    expect(bq.toString()).toMatch(/\[3,\s*4,\s*5,\s*6,\s*7,\s*8,\s*9,\s*1,\s*2\]\s+is_empty\(\): false,\s+is_full\(\): false/);
    expect(bq.size).toBe(9);
  });

  test('Edge case: capacity = 1 operations', () => {
    const bq = new BoundedQueue(1);

    // Empty single-element queue
    expect(bq.is_empty()).toBe(true);
    expect(bq.is_full()).toBe(false);

    // Fill single-element queue
    bq.enqueue(42);
    expect(bq.is_empty()).toBe(false);
    expect(bq.is_full()).toBe(true);

    // Try to enqueue into full single-element queue
    expect(() => bq.enqueue(99)).toThrow("queue is full");

    // Dequeue from full single-element queue
    const result = bq.dequeue();
    expect(result).toBe(42);
    expect(bq.is_empty()).toBe(true);
    expect(bq.is_full()).toBe(false);

    // Enqueue again to verify circular array
    bq.enqueue(123);
    expect(bq.dequeue()).toBe(123);
  });

  test('toString with various sizes', () => {
    const bq = new BoundedQueue(10);

    // Empty
    expect(bq.toString()).toBe("[] is_empty(): true, is_full(): false");

    // Single element
    bq.enqueue(5);
    expect(bq.toString()).toBe("[5] is_empty(): false, is_full(): false");

    // Multiple elements
    bq.enqueue(10);
    bq.enqueue(15);
    expect(bq.toString()).toBe("[5, 10, 15] is_empty(): false, is_full(): false");

    // Full
    for (let i = 20; i < 27; i++) {
      bq.enqueue(i);
    }
    expect(bq.size).toBe(10);
    expect(bq.is_full()).toBe(true);
    expect(bq.toString()).toMatch(/\[5,\s*10,\s*15,\s*20,\s*21,\s*22,\s*23,\s*24,\s*25,\s*26\]/);
    expect(bq.toString()).toContain("is_full(): true");
  });

  test('Complex wrap-around with multiple cycles', () => {
    const bq = new BoundedQueue(5);

    // First fill
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }

    // Empty completely
    for (let i = 0; i < 5; i++) {
      bq.dequeue();
    }

    // Fill again - should start at front=0, back=0
    for (let i = 10; i < 15; i++) {
      bq.enqueue(i);
    }

    expect(bq.size).toBe(5);
    expect(bq.is_full()).toBe(true);
    expect(bq.dequeue()).toBe(10);
  });

  test('ToString with wrap-around after dequeue', () => {
    const bq = new BoundedQueue(5);

    // Fill to capacity
    for (let i = 0; i < 5; i++) {
      bq.enqueue(i);
    }

    // Dequeue first element
    bq.dequeue();

    // Enqueue new element (should wrap around)
    bq.enqueue(100);

    const result = bq.toString();
    expect(result).toMatch(/\[1,\s*2,\s*3,\s*4,\s*100\]/);
    expect(bq.size).toBe(5);
    expect(bq.is_full()).toBe(true);
  });
});
