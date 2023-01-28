// Get the form element
const form = document.getElementById("registration-form");

// Add a submit event listener to the form
form.addEventListener("submit", function (event) {
  // Get the form inputs
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var team = document.getElementById("team").value;
  var members = document.getElementById("members").value;
  var idea = document.getElementById("idea").value;
  var video = document.getElementById("video").value;

  // Check that all the required fields are filled in
  if (
    name === "" ||
    email === "" ||
    team === "" ||
    members === "" ||
    idea === ""
  ) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Check that the email address is in the correct format
  var emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegEx.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Check that the video format is correct
  var videoRegEx = /(\.mp4|\.mkv|\.avi|\.wmv)$/i;
  if (!videoRegEx.test(video)) {
    alert("Please upload a video in the correct format (mp4, mkv, avi, wmv)");
    return;
  }
  //submit the form if all validations passed
  form.submit();
});

fetch("main.py", {
  method: "POST",
  body: JSON.stringify({
    name: name,
    email: email,
    team: team,
    members: members,
    idea: idea,
  }),
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((response) => console.log("Success:", response))
  .catch((error) => console.error("Error:", error));
