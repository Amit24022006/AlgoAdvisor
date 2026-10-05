import type { Problem } from '../store/slices/problemsSlice'
import type { AISuggestion } from '../store/slices/aiSuggestSlice'

export const MOCK_PROBLEMS: Problem[] = [
  // ── ARRAYS ──────────────────────────────────────────────
  {
    id: 'p1',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table'],
    tags: ['array', 'hash-table', 'O(n)'],
    acceptance: 49,
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.',
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    hints: ['A brute force approach would be O(n²). Can you do it in O(n)?', 'Think about storing what you\'ve seen so far.'],
    relatedAlgorithm: 'Find two numbers in an array that sum to a target value',
  },
  {
    id: 'p2',
    number: 2,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    categories: ['Array', 'Greedy'],
    tags: ['array', 'greedy', 'sliding-window'],
    acceptance: 54,
    description:
      'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.',
    constraints: [
      '1 ≤ prices.length ≤ 10⁵',
      '0 ≤ prices[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No transactions done, max profit = 0.' },
    ],
    hints: ['Track the minimum price seen so far as you scan left to right.'],
    relatedAlgorithm: 'Track minimum value while scanning array to maximize difference',
  },
  {
    id: 'p3',
    number: 3,
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    categories: ['Array', 'Hash Table'],
    tags: ['array', 'hash-table', 'sorting'],
    acceptance: 61,
    description:
      'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
    ],
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true' },
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    relatedAlgorithm: 'Detect duplicates in an unsorted integer array',
  },
  {
    id: 'p4',
    number: 4,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming'],
    tags: ['array', 'dp', 'kadane'],
    acceptance: 50,
    description:
      'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    hints: ['Classic Kadane\'s Algorithm. Keep track of current running sum.'],
    relatedAlgorithm: 'Find maximum sum contiguous subarray using Kadane\'s Algorithm',
  },
  {
    id: 'p5',
    number: 5,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    categories: ['Array', 'Prefix Sum'],
    tags: ['array', 'prefix-sum', 'O(n)'],
    acceptance: 65,
    description:
      'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.',
    constraints: [
      '2 ≤ nums.length ≤ 10⁵',
      '-30 ≤ nums[i] ≤ 30',
      'The product of any prefix or suffix is guaranteed to fit in a 32-bit integer.',
    ],
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' },
    ],
    hints: ['Use a prefix product array and a suffix product array.', 'Can you solve it with O(1) extra space (output array doesn\'t count)?'],
    relatedAlgorithm: 'Compute prefix and suffix products to avoid division',
  },
  {
    id: 'p6',
    number: 6,
    title: 'Maximum Product Subarray',
    difficulty: 'Medium',
    categories: ['Array', 'Dynamic Programming'],
    tags: ['array', 'dp', 'greedy'],
    acceptance: 35,
    description:
      'Given an integer array `nums`, find a subarray that has the largest product, and return the product.\n\nThe test cases are generated so that the answer will fit in a 32-bit integer.',
    constraints: [
      '1 ≤ nums.length ≤ 2 × 10⁴',
      '-10 ≤ nums[i] ≤ 10',
      'The product of any subarray is guaranteed to fit in a 32-bit integer.',
    ],
    examples: [
      { input: 'nums = [2,3,-2,4]', output: '6', explanation: '[2,3] has the largest product 6.' },
      { input: 'nums = [-2,0,-1]', output: '0', explanation: 'The result cannot be 2, because [-2,-1] is not a subarray.' },
    ],
    hints: ['Track both the maximum and minimum product ending at each position (negatives flip signs).'],
    relatedAlgorithm: 'Track both max and min running product to handle negative numbers',
  },
  {
    id: 'p7',
    number: 7,
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search'],
    tags: ['array', 'binary-search', 'O(log n)'],
    acceptance: 49,
    description:
      'Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.',
    constraints: [
      'n == nums.length',
      '1 ≤ n ≤ 5000',
      '-5000 ≤ nums[i] ≤ 5000',
      'All the integers of nums are unique.',
      'nums is sorted and rotated between 1 and n times.',
    ],
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'The original array was [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
      { input: 'nums = [11,13,15,17]', output: '11' },
    ],
    hints: ['Binary search: compare mid to right to determine which half is unsorted.'],
    relatedAlgorithm: 'Binary search on a rotated sorted array to find the pivot',
  },

  // ── TWO POINTERS / SLIDING WINDOW ────────────────────
  {
    id: 'p8',
    number: 8,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    categories: ['String', 'Two Pointers'],
    tags: ['string', 'two-pointers'],
    acceptance: 45,
    description:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    constraints: [
      '1 ≤ s.length ≤ 2 × 10⁵',
      's consists only of printable ASCII characters.',
    ],
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false' },
      { input: 's = " "', output: 'true' },
    ],
    relatedAlgorithm: 'Check if a string is a palindrome ignoring non-alphanumeric characters',
  },
  {
    id: 'p9',
    number: 9,
    title: 'Three Sum',
    difficulty: 'Medium',
    categories: ['Array', 'Two Pointers', 'Sorting'],
    tags: ['array', 'two-pointers', 'sorting'],
    acceptance: 33,
    description:
      'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
    constraints: [
      '3 ≤ nums.length ≤ 3000',
      '-10⁵ ≤ nums[i] ≤ 10⁵',
    ],
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' },
    ],
    hints: ['Sort first. Fix one element, then use two pointers for the remaining pair.'],
    relatedAlgorithm: 'Sort array then use two pointers to find all zero-sum triplets',
  },
  {
    id: 'p10',
    number: 10,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    categories: ['String', 'Sliding Window', 'Hash Table'],
    tags: ['string', 'sliding-window', 'hash-table'],
    acceptance: 34,
    description:
      'Given a string `s`, find the length of the longest substring without repeating characters.',
    constraints: [
      '0 ≤ s.length ≤ 5 × 10⁴',
      's consists of English letters, digits, symbols and spaces.',
    ],
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' },
    ],
    hints: ['Use a sliding window with a set or map to track characters and their positions.'],
    relatedAlgorithm: 'Find longest substring without repeating characters using sliding window',
  },

  // ── BINARY SEARCH ─────────────────────────────────────
  {
    id: 'p11',
    number: 11,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search'],
    tags: ['array', 'binary-search', 'O(log n)'],
    acceptance: 39,
    description:
      'There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with O(log n) runtime complexity.',
    constraints: [
      '1 ≤ nums.length ≤ 5000',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      'All values of nums are unique.',
      'nums is an ascending array that is possibly rotated.',
      '-10⁴ ≤ target ≤ 10⁴',
    ],
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
      { input: 'nums = [1], target = 0', output: '-1' },
    ],
    hints: ['Binary search still works if you can determine which half is sorted.'],
    relatedAlgorithm: 'Binary search on a rotated sorted array to find a target value',
  },
  {
    id: 'p12',
    number: 12,
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    categories: ['Array', 'Binary Search'],
    tags: ['binary-search', 'O(n log m)'],
    acceptance: 47,
    description:
      'Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.\n\nKoko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nKoko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.',
    constraints: [
      '1 ≤ piles.length ≤ 10⁴',
      'piles.length ≤ h ≤ 10⁹',
      '1 ≤ piles[i] ≤ 10⁹',
    ],
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4' },
      { input: 'piles = [30,11,23,4,20], h = 5', output: '30' },
      { input: 'piles = [30,11,23,4,20], h = 6', output: '23' },
    ],
    hints: ['Binary search on the answer space [1, max(piles)].'],
    relatedAlgorithm: 'Binary search on the answer space to find minimum eating speed',
  },

  // ── STACK ──────────────────────────────────────────────
  {
    id: 'p13',
    number: 13,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    categories: ['String', 'Stack'],
    tags: ['stack', 'string'],
    acceptance: 40,
    description:
      'Given a string `s` containing just the characters `\'(\'`, `\')\'`, `\'{\'`, `\'}\'`, `\'[\'` and `\']\'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    constraints: [
      '1 ≤ s.length ≤ 10⁴',
      's consists of parentheses only \'()[]{}\' ',
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
    ],
    relatedAlgorithm: 'Validate bracket matching using a stack',
  },
  {
    id: 'p14',
    number: 14,
    title: 'Min Stack',
    difficulty: 'Medium',
    categories: ['Stack', 'Design'],
    tags: ['stack', 'design', 'O(1)'],
    acceptance: 54,
    description:
      'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element `val` onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.',
    constraints: [
      '-2³¹ ≤ val ≤ 2³¹ - 1',
      'Methods pop, top and getMin operations will always be called on non-empty stacks.',
      'At most 3 × 10⁴ calls will be made to push, pop, top, and getMin.',
    ],
    examples: [
      {
        input: 'MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2',
        output: 'null, null, null, -3, null, 0, -2',
      },
    ],
    hints: ['Use a second stack that tracks the minimum at every level.'],
    relatedAlgorithm: 'Use an auxiliary stack to track minimums in O(1)',
  },

  // ── LINKED LIST ────────────────────────────────────────
  {
    id: 'p15',
    number: 15,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    categories: ['Linked List'],
    tags: ['linked-list', 'iterative', 'recursive'],
    acceptance: 73,
    description:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 ≤ Node.val ≤ 5000',
    ],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    relatedAlgorithm: 'Reverse a singly linked list iteratively or recursively',
  },
  {
    id: 'p16',
    number: 16,
    title: 'Detect Cycle in Linked List',
    difficulty: 'Easy',
    categories: ['Linked List', 'Two Pointers'],
    tags: ['linked-list', 'two-pointers', 'floyd-cycle'],
    acceptance: 49,
    description:
      'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.',
    constraints: [
      'The number of nodes in the list is in the range [0, 10⁴].',
      '-10⁵ ≤ Node.val ≤ 10⁵',
    ],
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle, tail connects to node index 1.' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' },
    ],
    hints: ['Floyd\'s Tortoise and Hare algorithm — fast pointer moves 2x, slow moves 1x.'],
    relatedAlgorithm: 'Detect a cycle in a linked list using Floyd\'s Tortoise and Hare',
  },

  // ── TREES ──────────────────────────────────────────────
  {
    id: 'p17',
    number: 17,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    categories: ['Tree', 'BFS', 'DFS'],
    tags: ['tree', 'dfs', 'recursion'],
    acceptance: 77,
    description:
      'Given the root of a binary tree, invert the tree, and return its root.',
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 ≤ Node.val ≤ 100',
    ],
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
      { input: 'root = []', output: '[]' },
    ],
    relatedAlgorithm: 'Recursively invert a binary tree using DFS',
  },
  {
    id: 'p18',
    number: 18,
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    categories: ['Tree', 'DFS', 'BFS'],
    tags: ['tree', 'dfs', 'bfs', 'recursion'],
    acceptance: 74,
    description:
      'Given the root of a binary tree, return its maximum depth.\n\nA binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    constraints: [
      'The number of nodes in the tree is in the range [0, 10⁴].',
      '-100 ≤ Node.val ≤ 100',
    ],
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' },
    ],
    relatedAlgorithm: 'Find maximum depth of a binary tree using DFS recursion',
  },
  {
    id: 'p19',
    number: 19,
    title: 'Lowest Common Ancestor of BST',
    difficulty: 'Medium',
    categories: ['Tree', 'BST'],
    tags: ['tree', 'bst', 'dfs'],
    acceptance: 62,
    description:
      'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA: "The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself)."',
    constraints: [
      'The number of nodes in the tree is in the range [2, 10⁵].',
      '-10⁹ ≤ Node.val ≤ 10⁹',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the BST.',
    ],
    examples: [
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8', output: '6', explanation: 'The LCA of nodes 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 4', output: '2', explanation: 'The LCA of nodes 2 and 4 is 2.' },
    ],
    hints: ['In a BST, if both values are less than root, go left. If both are greater, go right. Otherwise, root is the LCA.'],
    relatedAlgorithm: 'Find LCA in a BST by leveraging BST ordering property',
  },
  {
    id: 'p20',
    number: 20,
    title: 'Level Order Traversal',
    difficulty: 'Medium',
    categories: ['Tree', 'BFS'],
    tags: ['tree', 'bfs', 'queue'],
    acceptance: 65,
    description:
      'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 ≤ Node.val ≤ 1000',
    ],
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' },
    ],
    hints: ['Use a queue. Process nodes level by level, tracking the size of each level.'],
    relatedAlgorithm: 'Traverse a binary tree level-by-level using BFS with a queue',
  },

  // ── GRAPH ──────────────────────────────────────────────
  {
    id: 'p21',
    number: 21,
    title: 'Number of Islands',
    difficulty: 'Medium',
    categories: ['Graph', 'DFS', 'BFS', 'Matrix'],
    tags: ['graph', 'dfs', 'bfs', 'union-find'],
    acceptance: 57,
    description:
      'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 ≤ m, n ≤ 300',
      'grid[i][j] is \'0\' or \'1\'.',
    ],
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
    ],
    hints: ['Use DFS/BFS to flood-fill each island, marking visited cells.'],
    relatedAlgorithm: 'Count connected components in a grid using DFS flood-fill',
  },
  {
    id: 'p22',
    number: 22,
    title: 'Clone Graph',
    difficulty: 'Medium',
    categories: ['Graph', 'DFS', 'BFS', 'Hash Table'],
    tags: ['graph', 'dfs', 'bfs', 'hash-table'],
    acceptance: 55,
    description:
      'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.',
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 ≤ Node.val ≤ 100',
      'Node.val is unique for each node.',
      'There are no repeated edges and no self-loops in the graph.',
    ],
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'The graph has 4 nodes. Node 1\'s neighbors are 2 and 4.' },
    ],
    hints: ['Use a HashMap to map original nodes to their clones. DFS/BFS to traverse.'],
    relatedAlgorithm: 'Deep copy a graph using DFS with a visited hashmap',
  },
  {
    id: 'p23',
    number: 23,
    title: 'Course Schedule',
    difficulty: 'Medium',
    categories: ['Graph', 'Topological Sort'],
    tags: ['graph', 'topological-sort', 'dfs', 'cycle-detection'],
    acceptance: 45,
    description:
      'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.',
    constraints: [
      '1 ≤ numCourses ≤ 2000',
      '0 ≤ prerequisites.length ≤ 5000',
      'prerequisites[i].length == 2',
      '0 ≤ ai, bi < numCourses',
    ],
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Circular dependency detected.' },
    ],
    hints: ['Build a directed graph and check for cycles (DFS coloring or topological sort).'],
    relatedAlgorithm: 'Detect cycles in a directed graph using topological sort (Kahn\'s or DFS)',
  },

  // ── DYNAMIC PROGRAMMING ────────────────────────────────
  {
    id: 'p24',
    number: 24,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    categories: ['Dynamic Programming'],
    tags: ['dp', 'memoization', 'fibonacci'],
    acceptance: 52,
    description:
      'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
    constraints: ['1 ≤ n ≤ 45'],
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step\n2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1. 1+1+1\n2. 1+2\n3. 2+1' },
    ],
    hints: ['This is essentially the Fibonacci sequence. dp[i] = dp[i-1] + dp[i-2].'],
    relatedAlgorithm: 'Count ways to climb stairs using bottom-up dynamic programming',
  },
  {
    id: 'p25',
    number: 25,
    title: 'House Robber',
    difficulty: 'Medium',
    categories: ['Dynamic Programming'],
    tags: ['dp', 'array'],
    acceptance: 50,
    description:
      'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
    constraints: [
      '1 ≤ nums.length ≤ 100',
      '0 ≤ nums[i] ≤ 400',
    ],
    examples: [
      { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (1) + house 3 (3) = 4.' },
      { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (2) + house 3 (9) + house 5 (1) = 12.' },
    ],
    hints: ['At each house, decide: rob it (add to prev-prev) or skip (keep prev).'],
    relatedAlgorithm: 'Maximize non-adjacent sum using 1D dynamic programming',
  },
  {
    id: 'p26',
    number: 26,
    title: 'Coin Change',
    difficulty: 'Medium',
    categories: ['Dynamic Programming'],
    tags: ['dp', 'bfs', 'greedy'],
    acceptance: 43,
    description:
      'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.',
    constraints: [
      '1 ≤ coins.length ≤ 12',
      '1 ≤ coins[i] ≤ 2³¹ - 1',
      '0 ≤ amount ≤ 10⁴',
    ],
    examples: [
      { input: 'coins = [1,5,11], amount = 11', output: '1', explanation: '11 = 11' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
    ],
    hints: ['Classic unbounded knapsack DP. dp[i] = min coins to make amount i.'],
    relatedAlgorithm: 'Minimum coin change using bottom-up dynamic programming (unbounded knapsack)',
  },
  {
    id: 'p27',
    number: 27,
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    categories: ['Dynamic Programming', 'String'],
    tags: ['dp', 'string', '2D-dp'],
    acceptance: 57,
    description:
      'Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.',
    constraints: [
      '1 ≤ text1.length, text2.length ≤ 1000',
      'text1 and text2 consist of only lowercase English characters.',
    ],
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The LCS is "ace", length 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' },
    ],
    hints: ['2D DP table where dp[i][j] = LCS of text1[0..i] and text2[0..j].'],
    relatedAlgorithm: 'Find longest common subsequence using 2D dynamic programming table',
  },

  // ── HEAP / PRIORITY QUEUE ──────────────────────────────
  {
    id: 'p28',
    number: 28,
    title: 'Kth Largest Element in Array',
    difficulty: 'Medium',
    categories: ['Array', 'Heap', 'Sorting'],
    tags: ['heap', 'sorting', 'quickselect'],
    acceptance: 66,
    description:
      'Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.\n\nNote that it is the `k`th largest element in sorted order, not the `k`th distinct element.\n\nCan you solve it without sorting?',
    constraints: [
      '1 ≤ k ≤ nums.length ≤ 10⁵',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
    ],
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
    ],
    hints: ['Use a min-heap of size k. Or use Quickselect for O(n) average.'],
    relatedAlgorithm: 'Find kth largest element using a min-heap of size k',
  },
  {
    id: 'p29',
    number: 29,
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    categories: ['Array', 'Hash Table', 'Heap'],
    tags: ['heap', 'hash-table', 'bucket-sort'],
    acceptance: 67,
    description:
      'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      'k is in the range [1, the number of unique elements in the array].',
      'It is guaranteed that the answer is unique.',
    ],
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' },
    ],
    hints: ['Count frequencies with a HashMap. Then use a min-heap of size k, or bucket sort by frequency.'],
    relatedAlgorithm: 'Find top-k frequent elements using frequency map and a min-heap',
  },

  // ── HARD ───────────────────────────────────────────────
  {
    id: 'p30',
    number: 30,
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    categories: ['Linked List', 'Heap', 'Divide & Conquer'],
    tags: ['heap', 'linked-list', 'divide-and-conquer'],
    acceptance: 50,
    description:
      'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
    constraints: [
      'k == lists.length',
      '0 ≤ k ≤ 10⁴',
      '0 ≤ lists[i].length ≤ 500',
      '-10⁴ ≤ lists[i][j] ≤ 10⁴',
      'lists[i] is sorted in ascending order.',
      'The sum of lists[i].length will not exceed 10⁴.',
    ],
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' },
      { input: 'lists = [[]]', output: '[]' },
    ],
    hints: ['Use a min-heap of size k, seeded with each list\'s head. Or divide & conquer merge pairs.'],
    relatedAlgorithm: 'Merge k sorted linked lists using a min-heap priority queue',
  },
]

// ── AI suggestion mock responses keyed by keyword patterns ──────────────────

export function getMockAISuggestion(questionText: string): AISuggestion {
  const q = questionText.toLowerCase()

  if (q.includes('two sum') || (q.includes('two') && q.includes('sum') && q.includes('array'))) {
    return {
      algorithmName: 'Hash Map (One-Pass)',
      category: 'Hash Table',
      reasoning:
        'Your problem asks for a pair of indices whose values sum to a target. A hash map lets you store each element\'s complement (target - current) as you scan, making lookups O(1) instead of the O(n²) brute-force nested loop.',
      steps: [
        { step: 1, text: 'Create an empty hash map: { value → index }.' },
        { step: 2, text: 'Iterate through the array with index i and value nums[i].' },
        { step: 3, text: 'Compute complement = target − nums[i].' },
        { step: 4, text: 'If complement exists in the map, return [map[complement], i].' },
        { step: 5, text: 'Otherwise, store nums[i] → i in the map and continue.' },
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      confidence: 97,
      codeSnippet: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement))
            return new int[]{ map.get(complement), i };
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
    }
  }

  if (q.includes('palindrome') || q.includes('palindromic')) {
    return {
      algorithmName: 'Two Pointers',
      category: 'String / Two Pointers',
      reasoning:
        'Palindrome checks are symmetric by nature — the character at position i must match the character at position (n-1-i). Two pointers starting from opposite ends and moving inward efficiently verify this in O(n) time without extra space.',
      steps: [
        { step: 1, text: 'Set left = 0, right = s.length() − 1.' },
        { step: 2, text: 'Skip non-alphanumeric characters on both sides.' },
        { step: 3, text: 'Compare characters (case-insensitive) at left and right.' },
        { step: 4, text: 'If they differ, return false immediately.' },
        { step: 5, text: 'Move left++ and right--. Repeat until left ≥ right.' },
        { step: 6, text: 'Return true — all pairs matched.' },
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      confidence: 95,
      codeSnippet: `public boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
            return false;
        l++; r--;
    }
    return true;
}`,
    }
  }

  if (q.includes('island') || q.includes('connected') || q.includes('grid') || q.includes('flood')) {
    return {
      algorithmName: 'DFS Flood Fill',
      category: 'Graph / DFS',
      reasoning:
        'The problem involves counting connected regions in a 2D grid, which maps directly to counting connected components in a graph. DFS flood-fill efficiently marks all cells of each island in one pass per island, preventing recounts.',
      steps: [
        { step: 1, text: 'Iterate over every cell in the grid.' },
        { step: 2, text: 'When you find an unvisited land cell (\'1\'), increment the island count.' },
        { step: 3, text: 'Launch a DFS/BFS from that cell, marking all reachable \'1\' cells as visited (e.g., set to \'0\').' },
        { step: 4, text: 'DFS explores all 4 directions (up, down, left, right).' },
        { step: 5, text: 'Continue scanning — the next unvisited \'1\' is a new island.' },
      ],
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n) for the recursion stack',
      confidence: 93,
      codeSnippet: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++)
        for (int j = 0; j < grid[0].length; j++)
            if (grid[i][j] == '1') { dfs(grid, i, j); count++; }
    return count;
}
private void dfs(char[][] g, int i, int j) {
    if (i < 0 || i >= g.length || j < 0 || j >= g[0].length || g[i][j] != '1') return;
    g[i][j] = '0';
    dfs(g, i+1, j); dfs(g, i-1, j); dfs(g, i, j+1); dfs(g, i, j-1);
}`,
    }
  }

  if (q.includes('coin') || q.includes('minimum') && q.includes('change')) {
    return {
      algorithmName: 'Bottom-Up Dynamic Programming (Unbounded Knapsack)',
      category: 'Dynamic Programming',
      reasoning:
        'This is a classic unbounded knapsack variant: you have unlimited coins and want the minimum count to reach a target. Greedy fails when coin denominations are non-canonical (e.g., [1,3,4], target=6 → greedy gives 4+1+1=3, but 3+3=2 is optimal). DP guarantees the global optimum.',
      steps: [
        { step: 1, text: 'Create a dp array of size (amount+1), initialized to Infinity (except dp[0] = 0).' },
        { step: 2, text: 'For each amount i from 1 to target, try every coin denomination c.' },
        { step: 3, text: 'If i − c ≥ 0 and dp[i − c] is not Infinity, update dp[i] = min(dp[i], dp[i − c] + 1).' },
        { step: 4, text: 'After processing all amounts, dp[amount] holds the answer.' },
        { step: 5, text: 'If dp[amount] is still Infinity, return -1 (amount unreachable).' },
      ],
      timeComplexity: 'O(amount × coins.length)',
      spaceComplexity: 'O(amount)',
      confidence: 96,
      codeSnippet: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int c : coins)
            if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    }
  }

  if (q.includes('binary search') || q.includes('sorted array') || q.includes('rotated')) {
    return {
      algorithmName: 'Binary Search',
      category: 'Searching',
      reasoning:
        'The problem involves searching in a sorted (or partially sorted) structure, which is the definitive use case for binary search. By halving the search space each iteration, you achieve O(log n) instead of linear scan O(n).',
      steps: [
        { step: 1, text: 'Set lo = 0, hi = array.length − 1.' },
        { step: 2, text: 'Compute mid = lo + (hi − lo) / 2 (avoids integer overflow).' },
        { step: 3, text: 'Compare arr[mid] with the target.' },
        { step: 4, text: 'If arr[mid] == target, return mid.' },
        { step: 5, text: 'If arr[mid] < target, search the right half: lo = mid + 1.' },
        { step: 6, text: 'If arr[mid] > target, search the left half: hi = mid − 1.' },
        { step: 7, text: 'If lo > hi, return -1 (not found).' },
      ],
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      confidence: 94,
      codeSnippet: `public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
    }
  }

  if (q.includes('sliding window') || q.includes('substring') || q.includes('subarray') && q.includes('longest')) {
    return {
      algorithmName: 'Sliding Window',
      category: 'Array / String',
      reasoning:
        'The problem asks for an optimal contiguous subarray or substring, which is the hallmark of sliding window technique. A variable-size window expands by moving the right pointer and shrinks by moving the left pointer when a constraint is violated, maintaining O(n) time.',
      steps: [
        { step: 1, text: 'Initialize left = 0, right = 0, and any auxiliary data structure (e.g., Set or frequency Map).' },
        { step: 2, text: 'Expand the window: add arr[right] to your data structure, then advance right.' },
        { step: 3, text: 'Check if the constraint is violated (e.g., duplicate character, sum exceeds limit).' },
        { step: 4, text: 'If violated, shrink from the left: remove arr[left] from the structure, advance left.' },
        { step: 5, text: 'At each step, update your answer (max/min window size, count, etc.).' },
        { step: 6, text: 'Continue until right reaches the end of the array.' },
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k) where k is window constraint size',
      confidence: 91,
      codeSnippet: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int l = 0, ans = 0;
    for (int r = 0; r < s.length(); r++) {
        while (set.contains(s.charAt(r))) set.remove(s.charAt(l++));
        set.add(s.charAt(r));
        ans = Math.max(ans, r - l + 1);
    }
    return ans;
}`,
    }
  }

  if (q.includes('graph') || q.includes('bfs') || q.includes('shortest path')) {
    return {
      algorithmName: 'Breadth-First Search (BFS)',
      category: 'Graph',
      reasoning:
        'BFS is ideal for unweighted shortest path and level-order traversal problems. It explores neighbors level by level using a queue, guaranteeing the shortest path in unweighted graphs because it never revisits a node via a longer route.',
      steps: [
        { step: 1, text: 'Create a queue and enqueue the starting node. Mark it as visited.' },
        { step: 2, text: 'While the queue is not empty, dequeue the front node.' },
        { step: 3, text: 'Process the node (check if it\'s the target, record its level, etc.).' },
        { step: 4, text: 'For each unvisited neighbor, mark as visited and enqueue it.' },
        { step: 5, text: 'Repeat until the queue is empty or the target is found.' },
      ],
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      confidence: 90,
      codeSnippet: `void bfs(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> q = new LinkedList<>();
    q.add(start); visited[start] = true;
    while (!q.isEmpty()) {
        int node = q.poll();
        for (int neighbor : adj.get(node))
            if (!visited[neighbor]) { visited[neighbor] = true; q.add(neighbor); }
    }
}`,
    }
  }

  // Default generic response
  return {
    algorithmName: 'Hash Map / Two Pointers',
    category: 'General',
    reasoning:
      'Based on the problem description, the key pattern involves tracking seen elements or maintaining a structured view of the data. A hash map provides O(1) lookups, while two pointers can exploit sorted order to reduce complexity from O(n²) to O(n).',
    steps: [
      { step: 1, text: 'Identify the core constraint: what relationship must hold between elements?' },
      { step: 2, text: 'Choose structure: use a HashMap if lookups dominate, or sort + two-pointers if order helps.' },
      { step: 3, text: 'Iterate through the data once, maintaining your auxiliary state.' },
      { step: 4, text: 'At each step, check the constraint and update your answer accordingly.' },
      { step: 5, text: 'Return the accumulated result after the full scan.' },
    ],
    timeComplexity: 'O(n) to O(n log n)',
    spaceComplexity: 'O(n) or O(1)',
    confidence: 78,
    codeSnippet: `// Approach depends on exact problem constraints.
// General hash map pattern:
Map<Integer, Integer> seen = new HashMap<>();
int result = 0;
for (int x : nums) {
    // check condition using seen
    seen.put(x, seen.getOrDefault(x, 0) + 1);
}`,
  }
}
