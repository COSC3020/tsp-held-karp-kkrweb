// Kane Kriz
// UWYO COSC 3020 Algorithms
// TSP Held Karp Exercise - primary js file
// 28 April 2025
//


//




/*_____PSUEDOCODE PROVIDED:_____


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


//


function tsp_hk(distanceMatrix)
{
    if(distanceMatrix.length == 1)
    {
        return 0;
    }
  
    if(distanceMatrix == null || distanceMatrix.length == 0)
    {
        return -1;
    }

    var citiesList = [];
  
    for(var i = 0; i < distanceMatrix.length; i++)
    {
        citiesList.push(i);
    }

    var shortestLen = findDistMin(citiesList, distanceMatrix);
    
    if(shortestLen == Infinity)
    {
        return -1;
    }
    else
    {
        return shortestLen;
    }
}




//




function findDistMin(citiesList, distanceMatrix)
{
    var shortestLen = Infinity;
    
    for(var i = 0; i < citiesList.length; i++)
    {
        var currentLen = solve(citiesList, citiesList[i], distanceMatrix);
        
        if(currentLen < shortestLen)
        {
            shortestLen = currentLen;
        }
    }
    
    return shortestLen;
}




//




function solve(citiesList, start, distanceMatrix)
{
    if(citiesList.length == 2)
    {
        var destinationCity;
        
        if(citiesList[0] == start)
        {
            destinationCity = citiesList[1];
        }
        else
        {
            destinationCity = citiesList[0];
        }
        
        return distanceMatrix[start][destinationCity];
    }

    var minDistance = Infinity;
    var remainingCities = [];
    
    for(var i = 0; i < citiesList.length; i++)
    {
        if(citiesList[i] != start)
        {
            remainingCities.push(citiesList[i]);
        }
    }
    
    for(var i = 0; i < remainingCities.length; i++)
    {
        var nextCity = remainingCities[i];
        var partialDistance = solve(remainingCities, nextCity, distanceMatrix);
      
        var stepDistance = distanceMatrix[start][nextCity];
        var totalDistance = partialDistance + stepDistance;
        
        if(totalDistance < minDistance)
        {
            minDistance = totalDistance;
        }
    }
    
    return minDistance;
}



//
