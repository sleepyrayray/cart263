window.onload = setup;
function setup() {
  console.log("in week 4 ;)")

  // window.setTimeout(addTimeoutText, 2000);

  document.querySelector("#boxA").addEventListener("click", runTimeout);

  // window.setInterval(addTextRecur, 2000);
  // function addTextRecur() {
  //   let parent = document.getElementById("parent");
  //   parent.innerHTML += " NEW TEXT TO APPEAR RECUR ";
  // }

  function runTimeout() {
    window.setTimeout(addTimeoutText, 2000);
  }

  function addTimeoutText() {
    let parent = document.getElementById("parent");
    parent.innerHTML += " NEW TEXT TO APPEAR ";
  }

}
