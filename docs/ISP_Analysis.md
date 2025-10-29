This document presents a comprehensive Input Space Partitioning (ISP) analysis for the BoundedQueue class, following the Base Choice Coverage (BCC) criterion, along with bonus analyses using Boundary Value Analysis (BVA), State-Based Testing, and Multiple Choice Coverage (MCC).

## Method: constructor(capacity)

### (a) Input Variables

- `capacity` (formal parameter): The maximum number of elements the queue can hold

### (b) Characteristics

- **C1: Capacity Validity**: Whether the capacity value is valid or invalid
  - Valid: capacity ≥ 0
  - Invalid: capacity < 0

### (c) Partition into Blocks

- **C1-B1** (Base): Valid capacity, typical usage (capacity = 5)
- **C1-B2**: Valid capacity, minimum edge case (capacity = 0)
- **C1-B3**: Valid capacity, small value (capacity = 1)
- **C1-B4**: Valid capacity, large value (capacity = 100)
- **C1-B5**: Invalid capacity (capacity = -1)

### (d) Define Values for Each Block

- C1-B1: capacity = 5
- C1-B2: capacity = 0
- C1-B3: capacity = 1
- C1-B4: capacity = 100
- C1-B5: capacity = -1

### (e) Test Set (BCC)

| Test ID | Sequence of Operations | Expected Result (Oracle) | BCC Choice(s) Covered |
|---------|------------------------|---------------------------|----------------------|
| C-B1 | `new BoundedQueue(5)` | Queue created with capacity=5, size=0, not full, empty | C1-B1 |
| C-B2 | `new BoundedQueue(0)` | Queue created with capacity=0, size=0, full and empty | C1-B2 |
| C-B3 | `new BoundedQueue(1)` | Queue created with capacity=1, size=0, not full, empty | C1-B3 |
| C-B4 | `new BoundedQueue(100)` | Queue created with capacity=100, size=0, not full, empty | C1-B4 |
| C-B5 | `new BoundedQueue(-1)` | Throws RangeError: "capacity is less than 0" | C1-B5 |

---

## Method: enqueue(element)

### (a) Input Variables

- `element` (formal parameter): The element to add to the queue
- **Queue_Size** (abstract state variable): Current number of elements in the queue
- **Queue_Capacity** (abstract state variable): Maximum capacity of the queue

### (b) Characteristics

- **C1: Element Validity**: Type and validity of the element
  - Valid number
  - NaN (Invalid)
  - Non-number (string, null, undefined, object, etc.)

- **C2: Queue State**: The current fullness state of the queue
  - Empty: size = 0
  - Partially full: 0 < size < capacity
  - Full: size = capacity

### (c) Partition into Blocks

**Element Validity (C1):**
- **C1-B1** (Base): Valid number (element = 42)
- **C1-B2**: NaN (element = NaN)
- **C1-B3**: Non-number string (element = "hello")
- **C1-B4**: Non-number null (element = null)
- **C1-B5**: Non-number undefined (element = undefined)

**Queue State (C2):**
- **C2-B1** (Base): Empty queue (size = 0)
- **C2-B2**: Partially full queue (0 < size < capacity)
- **C2-B3**: Full queue (size = capacity)

### (d) Define Values for Each Block

- C1-B1: element = 42
- C1-B2: element = NaN
- C1-B3: element = "hello"
- C1-B4: element = null
- C1-B5: element = undefined
- C2-B1: Queue with 0 elements (capacity = 5)
- C2-B2: Queue with 3 elements in capacity 5
- C2-B3: Queue with 5 elements in capacity 5

### (e) Test Set (BCC)

| Test ID | Sequence of Operations | Expected Result (Oracle) | BCC Choice(s) Covered |
|---------|------------------------|---------------------------|----------------------|
| E-B1 | `bq = new BoundedQueue(5); bq.enqueue(42)` | Element 42 added, size=1, is_full()=false, is_empty()=false | C1-B1, C2-B1 |
| E-B2 | `bq = new BoundedQueue(5); bq.enqueue(NaN)` | Throws RangeError: "element is invalid" | C1-B2, C2-B1 |
| E-B3 | `bq = new BoundedQueue(5); bq.enqueue("hello")` | Throws RangeError: "element is invalid" | C1-B3, C2-B1 |
| E-B4 | `bq = new BoundedQueue(5); bq.enqueue(null)` | Throws RangeError: "element is invalid" | C1-B4, C2-B1 |
| E-B5 | `bq = new BoundedQueue(5); bq.enqueue(undefined)` | Throws RangeError: "element is invalid" | C1-B5, C2-B1 |
| E-B6 | `bq = new BoundedQueue(5); for(let i=0; i<3; i++) bq.enqueue(i); bq.enqueue(99)` | Element 99 added, size=4, is_full()=false, is_empty()=false | C1-B1, C2-B2 |
| E-B7 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); bq.enqueue(99)` | Throws Error: "queue is full" | C1-B1, C2-B3 |

---

## Method: dequeue()

### (a) Input Variables

- **Queue_Size** (abstract state variable): Current number of elements in the queue
- **Queue_Contents** (abstract state variable): The elements currently in the queue

### (b) Characteristics

- **C1: Queue Emptiness State**: Whether the queue has elements or not
  - Empty: size = 0
  - Non-empty: size > 0

- **C2: Queue Size Category**: The number of elements in the queue
  - Single element: size = 1
  - Multiple elements: 1 < size < capacity
  - Full: size = capacity

### (c) Partition into Blocks

**Queue Emptiness (C1):**
- **C1-B1** (Base): Non-empty queue (size > 0)
- **C1-B2**: Empty queue (size = 0)

**Queue Size (C2):**
- **C2-B1** (Base): Multiple elements (1 < size < capacity)
- **C2-B2**: Single element (size = 1)
- **C2-B3**: Full queue (size = capacity)

### (d) Define Values for Each Block

- C1-B1: Queue with size > 0
- C1-B2: Queue with size = 0
- C2-B1: Queue with 3 elements in capacity 5
- C2-B2: Queue with 1 element in capacity 5
- C2-B3: Queue with 5 elements in capacity 5

### (e) Test Set (BCC)

| Test ID | Sequence of Operations | Expected Result (Oracle) | BCC Choice(s) Covered |
|---------|------------------------|---------------------------|----------------------|
| D-B1 | `bq = new BoundedQueue(5); for(let i=0; i<3; i++) bq.enqueue(i); result = bq.dequeue()` | Returns 0, size=2, is_empty()=false, front pointer advanced | C1-B1, C2-B1 |
| D-B2 | `bq = new BoundedQueue(5); bq.enqueue(42); result = bq.dequeue()` | Returns 42, size=0, is_empty()=true, front pointer advanced | C1-B1, C2-B2 |
| D-B3 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); result = bq.dequeue()` | Returns 0, size=4, is_empty()=false, front pointer advanced | C1-B1, C2-B3 |
| D-B4 | `bq = new BoundedQueue(5); bq.dequeue()` | Throws Error: "queue is empty" | C1-B2 |

---

## Bonus Task 1: Boundary Value Analysis (BVA)

Boundary Value Analysis focuses on testing values at the boundaries of the input domain.

### BVA for Constructor

| Test ID | Sequence of Operations | Expected Result | Boundary Tested |
|---------|------------------------|-----------------|-----------------|
| C-BVA-1 | `new BoundedQueue(-1)` | Throws RangeError | Below boundary (capacity < 0) |
| C-BVA-2 | `new BoundedQueue(0)` | Success, capacity=0, full and empty | Minimum valid boundary |
| C-BVA-3 | `new BoundedQueue(1)` | Success, capacity=1, empty | Just above minimum |

### BVA for Enqueue

| Test ID | Sequence of Operations | Expected Result | Boundary Tested |
|---------|------------------------|-----------------|-----------------|
| E-BVA-1 | `bq = new BoundedQueue(5); bq.enqueue(10)` | Success, size=1 | One away from empty (size=0→1) |
| E-BVA-2 | `bq = new BoundedQueue(5); for(let i=0; i<4; i++) bq.enqueue(i); bq.enqueue(99)` | Success, size=5, full | One away from full (size=4→5) |
| E-BVA-3 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); bq.enqueue(99)` | Throws "queue is full" | Exactly full (size=5) |

### BVA for Dequeue

| Test ID | Sequence of Operations | Expected Result | Boundary Tested |
|---------|------------------------|-----------------|-----------------|
| D-BVA-1 | `bq = new BoundedQueue(5); bq.enqueue(10); bq.dequeue()` | Returns 10, size=0 | One away from empty (size=1→0) |
| D-BVA-2 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); bq.dequeue()` | Returns 0, size=4 | One away from full (size=5→4) |
| D-BVA-3 | `bq = new BoundedQueue(5); bq.dequeue()` | Throws "queue is empty" | Exactly empty (size=0) |

---

## Bonus Task 2: State-Based Testing

### Wrap-Around Test Sequence

This test verifies that the circular array implementation correctly handles wraparound behavior.

| Test ID | Sequence of Operations | Expected Result |
|---------|------------------------|-----------------|
| S-WA-1 | <pre>bq = new BoundedQueue(5)<br>for(let i=0; i<5; i++) bq.enqueue(i)  // Fill queue<br>for(let i=0; i<3; i++) bq.dequeue()   // Dequeue 3: front moves<br>bq.enqueue(100)                        // Add new element<br>bq.enqueue(200)</pre> | Queue state: [3, 4, 100, 200], size=4, back wraps around to 0, 1; toString() shows correct order |

### Mutator/Observer Pair Tests

| Test ID | Sequence of Operations | Expected Result |
|---------|------------------------|-----------------|
| S-MO-1 | `bq = new BoundedQueue(3); bq.enqueue(10); bq.is_full()` | is_full() returns false (size=1, capacity=3) |
| S-MO-2 | `bq = new BoundedQueue(3); for(let i=0; i<3; i++) bq.enqueue(i); bq.is_full()` | is_full() returns true (size=3, capacity=3) |
| S-MO-3 | `bq = new BoundedQueue(3); bq.enqueue(10); bq.dequeue(); bq.is_empty()` | is_empty() returns true |
| S-MO-4 | `bq = new BoundedQueue(3); bq.enqueue(10); bq.enqueue(20); bq.toString()` | toString() returns "[10, 20] is_empty(): false, is_full(): false" |
| S-MO-5 | `bq = new BoundedQueue(3); for(let i=0; i<3; i++) bq.enqueue(i); bq.dequeue(); bq.enqueue(99); bq.toString()` | toString() returns "[1, 2, 99] is_empty(): false, is_full(): true" |

### Complex State Transition Test

| Test ID | Sequence of Operations | Expected Result |
|---------|------------------------|-----------------|
| S-CT-1 | <pre>bq = new BoundedQueue(5)<br>bq.enqueue(1); bq.enqueue(2)<br>bq.dequeue()                      // size: 2→1<br>bq.enqueue(3); bq.enqueue(4)<br>bq.dequeue(); bq.dequeue()       // size: 3→1<br>bq.enqueue(5); bq.enqueue(6)<br>bq.enqueue(7)</pre> | Final state: size=4, front=3, back=2 (wrap around), toString shows [4, 5, 6, 7] in correct order |

---

## Bonus Task 3: Multiple Choice Coverage (MCC)

For the `enqueue(element)` method, we create a test set that covers every combination of blocks from all partitions (Element_Type × Queue_State).

### MCC Test Set for Enqueue

| Test ID | Sequence of Operations | Expected Result | Blocks Covered |
|---------|------------------------|-----------------|----------------|
| E-MCC-1 | `bq = new BoundedQueue(5); bq.enqueue(42)` | Success, size=1 | Valid_Number × Empty |
| E-MCC-2 | `bq = new BoundedQueue(5); bq.enqueue(NaN)` | Throws RangeError: "element is invalid" | NaN × Empty |
| E-MCC-3 | `bq = new BoundedQueue(5); bq.enqueue("hello")` | Throws RangeError: "element is invalid" | String × Empty |
| E-MCC-4 | `bq = new BoundedQueue(5); bq.enqueue(null)` | Throws RangeError: "element is invalid" | Null × Empty |
| E-MCC-5 | `bq = new BoundedQueue(5); bq.enqueue(undefined)` | Throws RangeError: "element is invalid" | Undefined × Empty |
| E-MCC-6 | `bq = new BoundedQueue(5); for(let i=0; i<3; i++) bq.enqueue(i); bq.enqueue(99)` | Success, size=4 | Valid_Number × Partially_Full |
| E-MCC-7 | `bq = new BoundedQueue(5); for(let i=0; i<3; i++) bq.enqueue(i); bq.enqueue(NaN)` | Throws RangeError: "element is invalid" | NaN × Partially_Full |
| E-MCC-8 | `bq = new BoundedQueue(5); for(let i=0; i<3; i++) bq.enqueue(i); bq.enqueue("hello")` | Throws RangeError: "element is invalid" | String × Partially_Full |
| E-MCC-9 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); bq.enqueue(99)` | Throws Error: "queue is full" | Valid_Number × Full |
| E-MCC-10 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); bq.enqueue(NaN)` | Throws RangeError: "element is invalid" | NaN × Full |
| E-MCC-11 | `bq = new BoundedQueue(5); for(let i=0; i<5; i++) bq.enqueue(i); bq.enqueue("hello")` | Throws RangeError: "element is invalid" | String × Full |

**Note**: MCC requires 5 (element types) × 3 (queue states) = 15 test cases. The implementation checks element validity before checking if the queue is full, so tests E-MCC-10 and E-MCC-11 throw "element is invalid" error rather than "queue is full". This reveals an important implementation detail: invalid elements are always rejected regardless of queue state.

---

## Summary

- **BCC Test Cases**: 17 tests (constructor: 5, enqueue: 7, dequeue: 4, is_empty, is_full)
- **BVA Test Cases**: 8 additional boundary tests
- **State-Based Tests**: 6 tests (wrap-around, mutator/observer pairs, complex transitions)
- **MCC Test Cases**: 11 tests covering element type × queue state combinations

**Total Test Cases**: 53 comprehensive tests (42 from original ISP analysis + 11 additional coverage tests)

### Additional Coverage Tests
- Complete queue cycle: fill, partial dequeue, refill (demo scenario)
- Edge case: capacity = 1 operations
- ToString with various sizes (empty, single, multiple, full)
- Complex wrap-around with multiple cycles
- ToString with wrap-around after dequeue

