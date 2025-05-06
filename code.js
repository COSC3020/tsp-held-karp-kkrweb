// Kane Kriz
// UWYO COSC 3020 Algorithms
// TSP Held Karp Exercise - primary js file
// 30 April 2025
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
    if((distanceMatrix == null) || distanceMatrix.length == 0)
    {
        return -1;
    }

    if(distanceMatrix.length == 1)
    {
        return 0;
    }

    var citiesList = [];
  
    for(var i = 0; i < distanceMatrix.length; i++)
    {
        citiesList.push(i);
    }

    var shortestLen = findMinDist(citiesList, distanceMatrix);
    
    if(shortestLen == null)
    {
        return -1;
    }
      
    else
    {
        return shortestLen;
    }
}


//


function findMinDist(citiesList, distanceMatrix)
{
    var shortestLen = null;
    var memoStorage = {};
    
    for(var i = 0; i < citiesList.length; i++)
    {
        var currentLen = solve(citiesList, citiesList[i], distanceMatrix, memoStorage);
        
        if(currentLen != null && (shortestLen == null || (currentLen < shortestLen)))
        {
            shortestLen = currentLen;
        }
    }
    
    return shortestLen;
}


//


 function solve(citiesList, start, distanceMatrix, memoStorage)
{
    var key = JSON.stringify(citiesList.slice().sort()) + start; //used sources to help actually implement the memoization and related key correctly
    
    if(memoStorage[key] !== undefined)
    {
        return memoStorage[key];
    }

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
        
        var distance = distanceMatrix[start][destinationCity];
      
        if(distance >= 0)
        {
            memoStorage[key] = distance;
            return distance;
        }
          
        else
        {
            memoStorage[key] = null;
            return null;
        }
    }

    var minDistance = null;
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
        var partialDistance = solve(remainingCities, nextCity, distanceMatrix, memoStorage);
        var stepDistance = distanceMatrix[start][nextCity];
        
        if(partialDistance != null && stepDistance >= 0)
        {
            var totalDistance = partialDistance + stepDistance;
          
            if(minDistance == null || (totalDistance < minDistance))
            {
                minDistance = totalDistance;
            }
        }
    }
    
    memoStorage[key] = minDistance;
    return minDistance;
}



//
