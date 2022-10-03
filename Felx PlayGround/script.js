function getValues() {
  var container = document.getElementById("main");

  var display = document.getElementById("display").value;
  var flexDirection = document.getElementById("flex-direction").value;
  var flexWrap = document.getElementById("flex-wrap").value;
  var justifyContent = document.getElementById("justify-content").value;
  var alignItems = document.getElementById("align-items").value;
  var alignContent = document.getElementById("align-content").value;
  var css = document.getElementById("css-code");
  container.style = `display:${display};flex-direction:${flexDirection};flex-wrap:${flexWrap};justify-content:${justifyContent};align-items:${alignItems};align-content:${alignContent}`;
  var item1 = document.getElementById("div1");
  var item1Style = document.getElementById("item1-style").value;
  item1.style = `align-self:${item1Style}`;
  var item2 = document.getElementById("div2");
  var item2Style = document.getElementById("item2-style").value;
  item2.style = `align-self:${item2Style}`;
  var item3 = document.getElementById("div3");
  var item3Style = document.getElementById("item3-style").value;
  item3.style = `align-self:${item3Style}`;
  css.innerHTML = `.flex-container{</br>
    display:${display};</br>
    flex-direction:${flexDirection};</br>
    flex-wrap:${flexWrap};</br>
    justify-content:${justifyContent};</br>
    align-items:${alignItems};</br>
    align-content:${alignContent};</br>
  }   </br></br>.box1{</br>
    align-self:${item1Style};</br>

  }</br>
  </br>.box2{</br>
    align-self:${item2Style};</br>
  }</br>
  </br>.box3{</br>
  align-self:${item3Style};</br>
  };`;
}

getValues();
