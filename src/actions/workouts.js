const ROOT_URL = 'http://localhost:3001'

export function getWorkouts( headers ) {
  fetch( `${ ROOT_URL }/workouts` ).
    then(
      response => response.json()
    ).
    then(
      data => {
        debugger;
        console.log( data );
      }
    )
}
