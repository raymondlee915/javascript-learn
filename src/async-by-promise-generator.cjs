async function nativePromise() {
  console.log('beginning');
  var result = await asyncMethodWithPromise();

  console.log(result);
}

async function asyncMethodWithPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Promise Resolved');
    }, 1000);
  });
}

//nativePromise(); // Promise Resolved

function async(generator) {
  var iterator = generator();
  function handle(iteratorResult) {
    if (iteratorResult.done) {
      return;
    }
    const iteratorValue = iteratorResult.value;
    if (iteratorValue instanceof Promise) {
      iteratorValue.then((res) => handle(iterator.next(res)));
    }
  }
  try {
    handle(iterator.next());
  } catch (e) {
    iterator.throw(e);
  }
}

function async2(generator){
    var iterator = generator();
    var handle = function(iteratorResult){
        if(!iteratorResult || iteratorResult.done){
            return;
        }

        var iteratorValue = iteratorResult.value;
        if(iteratorValue instanceof Promise){
            iteratorValue.then((res) => handle(iterator.next(res)));
        }
    }

    try{
        handle(iterator.next());
    }catch{
        iterator.throw();
    }
}

function getJSON(url) {
    if(url === 'data/ninjas.json'){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([{missionsUrl: 'data/missions.json'}]);
            }, 500);
        });
    }

    if(url === 'data/missions.json'){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([{detailsUrl: 'data/mission-1.json'}]);
            }, 500);
        });

        // return Promise.resolve([{detailsUrl: 'data/mission-1.json'}]);
    }

    if(url === 'data/mission-1.json'){
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Mission Accomplished');
            }, 500);
        });

    }
}

async2(function* () {
  try {
    const ninjas = yield getJSON('data/ninjas.json');
    console.log(`Ninjas: ${JSON.stringify(ninjas)}`)
    const missions = yield getJSON(ninjas[0].missionsUrl);
    console.log(`Missions: ${JSON.stringify(missions)}`)
    const missionDescription = yield getJSON(missions[0].detailsUrl);

    console.log(missionDescription);
    //Study the mission details
  } catch (e) {
    //Oh no, we weren't able to get the mission details
  }
});
