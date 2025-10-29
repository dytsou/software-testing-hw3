# BoundedQueue Input Space Partitioning (ISP) Testing

This homework implements comprehensive software testing using Input Space Partitioning (ISP) techniques for the BoundedQueue data structure.

## Files

- `BoundedQueue.js` - The BoundedQueue implementation
- `BoundedQueue.test.js` - Comprehensive test suite
- `ISP_Analysis.md` - Complete ISP analysis documentation
- `package.json` - Project configuration and dependencies

## Installation

Install dependencies using pnpm:

```bash
pnpm install
```

## Running Tests

Run all tests:
```bash
pnpm test
```

Run tests with coverage report:
```bash
pnpm test:coverage
```

## Test Coverage

The test suite includes:

### Base Choice Coverage (BCC)
- **Constructor**: 5 tests covering valid/invalid capacities
- **Enqueue**: 7 tests covering element types and queue states
- **Dequeue**: 4 tests covering queue emptiness states

### Boundary Value Analysis (BVA)
- 8 additional tests targeting boundary conditions
- Tests capacity boundaries (-1, 0, 1)
- Tests queue size boundaries (empty, full, one away from boundaries)

### State-Based Testing
- 6 tests covering wrap-around behavior
- Mutator/observer pair testing
- Complex state transition scenarios

### Multiple Choice Coverage (MCC)
- 11 tests for enqueue method
- Covers all combinations of element types × queue states

**Total: 53 comprehensive test cases** (42 from original ISP analysis + 11 additional coverage tests)

## Running the Demo

To run the BoundedQueue demo:
```bash
node BoundedQueue.js
```

## Test Results

All tests should pass, demonstrating:
- Correct handling of valid inputs
- Proper exception throwing for invalid inputs
- FIFO queue semantics
- Circular array wrap-around behavior
- State management (empty, partial, full)

