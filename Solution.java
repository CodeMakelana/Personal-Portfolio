class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        
        int uniqueCount = 1; // Start with the first element
        
        // Start from the second element
        for (int i = 1; i < nums.length; i++) {
            // If current element is different from the previous one
            if (nums[i] != nums[i - 1]) {
                // Place it at the position indicated by uniqueCount
                nums[uniqueCount] = nums[i];
                uniqueCount++;
            }
            // If it's a duplicate, we skip it
        }
        
        return uniqueCount; // Return the count of unique elements
    }
}