# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.


//



Name: Kane Kriz

Start Date: 17 April 2025

Last Edited: 28 April 2025

Feedback Request 1 Date: 28 April 2025




//


Feedback Request 2 Date: 30 April 2025


//



Response: 




First, I want to analyze the functionality of the implementation step by step and work inwards to help determine the overall complexity. 

The implementation begins with input validation through the checks `if(distanceMatrix == null || distanceMatrix.length == 0)` and `if(distanceMatrix.length == 1)`, which handle edge cases in constant time. 

The core algorithm then initializes the city indices through the loop `for(var i = 0; i < distanceMatrix.length; i++) { citiesList.push(i); }`, requiring $O(n)$ time where n is the number of cities.

The recursive `solve` function forms the heart of the implementation, processing city subsets through the base case `if(citiesList.length == 2)` and recursive decomposition. 

Each recursive call handles a smaller subproblem through `var partialDistance = solve(remainingCities, nextCity, distanceMatrix)`.

The combination step `var totalDistance = partialDistance + stepDistance` builds up complete solutions from these partial results. 

The current implementation’s memoization key `JSON.stringify(citiesList) + start` ensures uniqueness and acts against potential collision issues.

The algorithm must explore all possible city subsets and starting points, with n choices for the starting city and $\binom{n}{k}$ possible subsets for each subset size k, summing to $2^n$ total subsets.

Each subset requires $O(n)$ processing time.

The overall worst case asymptotic time complexity is thus $O(n^2 ∗ 2^n). 

This matches the theoretical expectation for the help karp algorithm per the attatched python TSP solution source.

...This source was consulted to verify how reasonable the computed runtime of my implementation actually was or not, as I thought it appeared off.

I barely looked at the actual logic and code of the python source as its uber condensed look makes my eyes want to explode.




Now to consider the overall asymptotic memory complexity. 

The implementation maintains a recursion stack that can reach depth n-1 levels.

Each recursive level stores its remaining cities list through operations like `remainingCities.push(citiesList[i])`, requiring $O(n)$ space per level. 

The distance matrix requires $O(n^2)$ storage space.

Temporary variables contribute constant space per recursion level.

The current recursive implementation without memoization means the space is dominated by the matrix storage and maximum stack storage. 

The recursion stack uses $O(n)$ space per call and $O(n * 2^n)$ total space with memoization.

(via n-1 levels * $O(n)$ storage per level, while the matrix requires $O(n^2)$ space).

Due to this, the overall worst case asymptotic memory complexity is $O(n^2)$.




//



Plagiarism Acknowledgement: I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.



Citations:

Ensured that any consulted logic / conceptual help to help move me in the right direction came only where applicable and with limited JS code

“Traveling Salesman Problem (TSP) in Python.” GeeksforGeeks, 31 May 2024, www.geeksforgeeks.org/traveling-salesman-problem-tsp-in-python/.

Liang, David. “Intro — Python Algorithms: Traveling Salesman Problem.” Medium, 17 July 2024, medium.com/@davidlfliang/intro-python-algorithms-traveling-salesman-problem-ffa61f0bd47b.

the, Caching. “Memoization: Caching the Results of Expensive Function Calls.” SoftwarePatternsLexicon.com, 7 July 2024, softwarepatternslexicon.com/functional/optimizations/caching-and-specialization/memoization/. Accessed 30 Apr. 2025.
