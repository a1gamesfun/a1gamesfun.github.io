var slider = document.getElementById("volumeSlider");
var output = document.getElementById("volumeNumber");
//output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  //output.innerHTML = this.value;
  //console.log(document.volume)
  //document.volume = this.value / 100;
  localStorage.setItem("gamevolume", this.value);
}