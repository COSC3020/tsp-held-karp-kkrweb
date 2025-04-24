// Kane Kriz
// UWYO COSC 3020 Algorithms
// TSP Held Karp Exercise - primary js file
// 24 April 2025
//


//


/*_____PSUEDOCODE:_____


// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city

*/



function tsp_hk(distance_matrix) 
{
    return -1;
}



//
