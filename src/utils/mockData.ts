import type { RecommendationResult } from '../store/slices/recommendationSlice'
import type { HistoryItem } from '../store/slices/historySlice'
import type { RoadmapCategory } from '../store/slices/roadmapSlice'

export const MOCK_RECOMMENDATION: RecommendationResult = {
  algorithm: {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    explanation:
      'Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element and eliminates the half where the target cannot lie. This makes it extremely efficient for large sorted datasets.',
    javaCode: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid; // Found!
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        return -1; // Not found
    }
    
    public static void main(String[] args) {
        int[] sortedArr = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        int target = 23;
        int result = binarySearch(sortedArr, target);
        System.out.println("Found at index: " + result); // Output: 5
    }
}`,
    tags: ['sorted-array', 'divide-and-conquer', 'O(log n)', 'iterative'],
  },
  alternatives: [
    {
      id: 'linear-search',
      name: 'Linear Search',
      category: 'Searching',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      explanation: 'Simple sequential search through all elements. Best when array is unsorted or very small.',
      javaCode: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      tags: ['unsorted', 'simple', 'O(n)'],
    },
    {
      id: 'interpolation-search',
      name: 'Interpolation Search',
      category: 'Searching',
      timeComplexity: 'O(log log n)',
      spaceComplexity: 'O(1)',
      explanation: 'Works better than binary search for uniformly distributed data by using interpolation formula.',
      javaCode: `public static int interpolationSearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        int pos = lo + ((target - arr[lo]) * (hi - lo)) / (arr[hi] - arr[lo]);
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}`,
      tags: ['uniform-distribution', 'sorted', 'O(log log n)'],
    },
    {
      id: 'jump-search',
      name: 'Jump Search',
      category: 'Searching',
      timeComplexity: 'O(√n)',
      spaceComplexity: 'O(1)',
      explanation: 'Jumps ahead by fixed steps and then does linear search when a larger element is found.',
      javaCode: `public static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int) Math.sqrt(n);
    int prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.sqrt(n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
    if (arr[prev] == target) return prev;
    return -1;
}`,
      tags: ['sorted', 'O(√n)', 'block-based'],
    },
  ],
  confidence: 94,
  problemDescription: 'Find a target value in a sorted array efficiently',
  timestamp: new Date().toISOString(),
}

export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    problemDescription: 'Find a target value in a sorted array',
    algorithmName: 'Binary Search',
    category: 'Searching',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    result: MOCK_RECOMMENDATION,
  },
  {
    id: '2',
    problemDescription: 'Find shortest path between two nodes in a weighted graph',
    algorithmName: "Dijkstra's Algorithm",
    category: 'Graph',
    timeComplexity: 'O((V+E) log V)',
    spaceComplexity: 'O(V)',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    result: null,
  },
  {
    id: '3',
    problemDescription: 'Count number of ways to climb n stairs with 1 or 2 steps',
    algorithmName: 'Dynamic Programming (Tabulation)',
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    result: null,
  },
  {
    id: '4',
    problemDescription: 'Sort a million integers efficiently',
    algorithmName: 'Merge Sort',
    category: 'Sorting',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    timestamp: new Date(Date.now() - 345600000).toISOString(),
    result: null,
  },
]

export const MOCK_ROADMAP: RoadmapCategory[] = [
  {
    id: 'arrays',
    name: 'Arrays & Strings',
    icon: '📦',
    topics: [
      { id: 'a1', name: 'Two Pointers', category: 'arrays', description: 'Solve problems with two pointers moving toward each other', completed: true, suggested: false, difficulty: 'beginner' },
      { id: 'a2', name: 'Sliding Window', category: 'arrays', description: 'Fixed/variable size window over arrays/strings', completed: true, suggested: false, difficulty: 'beginner' },
      { id: 'a3', name: 'Prefix Sum', category: 'arrays', description: 'Precompute cumulative sums for range queries', completed: false, suggested: true, difficulty: 'beginner' },
      { id: 'a4', name: 'Kadane\'s Algorithm', category: 'arrays', description: 'Maximum subarray sum in O(n)', completed: false, suggested: false, difficulty: 'intermediate' },
    ],
  },
  {
    id: 'searching',
    name: 'Searching',
    icon: '🔍',
    topics: [
      { id: 's1', name: 'Linear Search', category: 'searching', description: 'Sequential element lookup', completed: true, suggested: false, difficulty: 'beginner' },
      { id: 's2', name: 'Binary Search', category: 'searching', description: 'Divide & conquer on sorted arrays', completed: true, suggested: false, difficulty: 'beginner' },
      { id: 's3', name: 'Binary Search on Answer', category: 'searching', description: 'Binary search on the answer space', completed: false, suggested: true, difficulty: 'intermediate' },
    ],
  },
  {
    id: 'sorting',
    name: 'Sorting',
    icon: '🔢',
    topics: [
      { id: 'so1', name: 'Bubble Sort', category: 'sorting', description: 'Simple comparison-based sorting', completed: true, suggested: false, difficulty: 'beginner' },
      { id: 'so2', name: 'Merge Sort', category: 'sorting', description: 'Divide-and-conquer stable sort', completed: false, suggested: true, difficulty: 'intermediate' },
      { id: 'so3', name: 'Quick Sort', category: 'sorting', description: 'Partition-based in-place sort', completed: false, suggested: false, difficulty: 'intermediate' },
      { id: 'so4', name: 'Heap Sort', category: 'sorting', description: 'Heap-based comparison sort', completed: false, suggested: false, difficulty: 'advanced' },
    ],
  },
  {
    id: 'graph',
    name: 'Graph Algorithms',
    icon: '🕸️',
    topics: [
      { id: 'g1', name: 'BFS', category: 'graph', description: 'Breadth-first graph traversal', completed: false, suggested: true, difficulty: 'intermediate' },
      { id: 'g2', name: 'DFS', category: 'graph', description: 'Depth-first graph traversal', completed: false, suggested: false, difficulty: 'intermediate' },
      { id: 'g3', name: "Dijkstra's", category: 'graph', description: 'Shortest path in weighted graphs', completed: false, suggested: false, difficulty: 'advanced' },
      { id: 'g4', name: 'Topological Sort', category: 'graph', description: 'Linear ordering of DAG vertices', completed: false, suggested: false, difficulty: 'advanced' },
    ],
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    icon: '🧮',
    topics: [
      { id: 'd1', name: 'Memoization (Top-Down)', category: 'dp', description: 'Cache recursive results', completed: false, suggested: true, difficulty: 'intermediate' },
      { id: 'd2', name: 'Tabulation (Bottom-Up)', category: 'dp', description: 'Fill DP table iteratively', completed: false, suggested: false, difficulty: 'intermediate' },
      { id: 'd3', name: 'Knapsack', category: 'dp', description: '0/1 and unbounded knapsack problems', completed: false, suggested: false, difficulty: 'advanced' },
      { id: 'd4', name: 'LCS / LIS', category: 'dp', description: 'Longest common/increasing subsequence', completed: false, suggested: false, difficulty: 'advanced' },
    ],
  },
  {
    id: 'trees',
    name: 'Trees',
    icon: '🌲',
    topics: [
      { id: 't1', name: 'Binary Tree Traversal', category: 'trees', description: 'Inorder, preorder, postorder', completed: false, suggested: false, difficulty: 'beginner' },
      { id: 't2', name: 'BST Operations', category: 'trees', description: 'Insert, delete, search in BST', completed: false, suggested: false, difficulty: 'intermediate' },
      { id: 't3', name: 'Lowest Common Ancestor', category: 'trees', description: 'Find LCA in binary trees', completed: false, suggested: false, difficulty: 'advanced' },
    ],
  },
]
