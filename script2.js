const form = document.querySelector("form");
//by id m # use nhi krte
let V = 13;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const start = parseInt(document.getElementById("start").value);
  const end = parseInt(document.getElementById("end").value);
  const results = document.getElementById("results");
  if (isNaN(start) || start < 0 || start > V) {
    results.innerHTML = "Please provide a valid starting position.";
  } else if (isNaN(end) || end < 0 || end > V) {
    results.innerHTML = "Please provide a valid destination position.";
  } else {
    const MAXN = 100;
    const INF = 1e7;

    let dis = new Array(MAXN).fill(0).map(() => new Array(MAXN).fill(0));
    let Next = new Array(MAXN).fill(0).map(() => new Array(MAXN).fill(0));
   
    function initialise(V, graph) {
      for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
          dis[i][j] = graph[i][j];
          if (graph[i][j] === INF) Next[i][j] = -1;
          else Next[i][j] = j;
        }
      }
    }

    function constructPath(u, v) {
      if (Next[u][v] === -1) return [];
      let path = [u];
      let val = u
      while (val !== v) {
        console.log(val,v);
        console.log(Next);
        val = Next[val][v];
        path.push(val);
      }
      console.log(path);
      return path;
    }

    function floydWarshall(V) {
      for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
          for (let j = 0; j < V; j++) {
            if (dis[i][k] === INF || dis[k][j] === INF) continue;
            if (dis[i][j] > dis[i][k] + dis[k][j]) {
              dis[i][j] = dis[i][k] + dis[k][j];
              Next[i][j] = Next[i][k];
            }
          }
        }
      }
    }

    // function printPath(path) {
    //   console.log(path);
    //   let n = path.length;
    //   let result = "";
    //   for (let i = 0; i < n - 1; i++) 
    //     result += ` ${path[i]} -> `;
    //   result += path[n - 1];
    //   results.innerHTML = `<span>${result}</span>`;
    // }
    function printPath(path, name) {
      let n = path.length;
      let result = '';
      for (let i = 0; i < n - 1; i++)
          result += ` ${name[path[i]]} <i class="fa-solid fa-chevron-right"></i> `;
      result += [name[path[n - 1]]];
      results.innerHTML = `<span>${result}</span>`;
  }

    // let graph = [
    //   [0, 3, INF, 7],
    //   [8, 0, 2, INF],
    //   [5, INF, 0, 1],
    //   [2, INF, INF, 0],
    // ];
    let name = ["University Gate","Cafeteria","Ground","Library","Computer Department", "Lal Chowk", "Lal Bahadur Shastri Hall", "Vivekananda Auditorium","VC Office", "Girls' Hostel", "Girls Park", "MBA Park","Teacher's Apartment"];

        let graph =[ [0, 2, INF, 6, INF, INF, INF, INF, INF, INF, INF, INF, 24],
        [2, 0, 2, 4, INF, INF, INF, INF, INF, INF, INF, INF, INF],
        [INF, 2, 0, 2, 4, INF, INF, INF, INF, INF, INF, INF, INF],
        [6, 4, 2, 0, 2, 4, INF, INF, INF, INF, INF, INF, INF],
        [INF, INF, 4, 2, 0, 2, 4, INF, INF, INF, INF, INF, INF],
        [INF, INF, INF, 4, 2, 0, 2, 4, INF, INF, INF, INF, INF],
        [INF, INF, INF, INF, 4, 2, 0, 2, 4, INF, INF, INF, INF],
        [INF, INF, INF, INF, INF, 4, 2, 0, 2, 4, INF, INF, INF],
        [INF, INF, INF, INF, INF, INF, 4, 2, 0, 2, 4, INF, INF],
        [INF, INF, INF, INF, INF, INF, INF, 4, 2, 0, 2, 4, INF],
        [INF, INF, INF, INF, INF, INF, INF, INF, 4, 2, 0, 2, 4],
        [INF, INF, INF, INF, INF, INF, INF, INF, INF, 4, 2, 0, 2],
        [24, INF, INF, INF, INF, INF, INF, INF, INF, INF, 4, 2, 0]
      ];
    initialise(V, graph);
    floydWarshall(V);
    let path = constructPath(start, end);
    if (path.length === 0) {
      results.innerHTML = "There is no path between the given points.";
    } else {
      printPath(path,name);
    }
    
  }
});