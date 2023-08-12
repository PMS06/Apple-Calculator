let lastOperation = null;
      let firstValue = null;
      const display = document.querySelector(".display");

      function appendToDisplay(value) {
        if (["+", "-", "×", "÷"].includes(value)) {
          lastOperation = value;
          firstValue = parseFloat(display.textContent);
          display.textContent += value;
          return;
        }

        if (display.textContent === "0" && value !== ".") {
          display.textContent = value;
        } else {
          display.textContent += value;
        }
      }
      function calculatePercentage() {
        let currentValue = parseFloat(
          display.textContent.split(lastOperation).pop()
        );

        if (lastOperation && firstValue !== null) {
          switch (lastOperation) {
            case "+":
              display.textContent =
                firstValue + firstValue * (currentValue / 100);
              break;
            case "-":
              display.textContent =
                firstValue - firstValue * (currentValue / 100);
              break;
            case "×":
              display.textContent = firstValue * (currentValue / 100);
              break;
            case "÷":
              display.textContent = firstValue / (currentValue / 100);
              break;
          }
          lastOperation = null;
          firstValue = null;
        } else {
          display.textContent = currentValue / 100;
        }
      }

      function compute() {
        try {
          let computationString = display.textContent
            .replace("×", "*")
            .replace("÷", "/");
          display.textContent = eval(computationString);
          firstValue = null; // Reset the state
          lastOperation = null;
        } catch (e) {
          alert("Invalid expression");
          clearDisplay();
        }
      }
      function clearDisplay() {
        display.textContent = "0";
        firstValue = null;
        lastOperation = null;
      }

      function removeLast() {
        if (display.textContent.length > 1) {
          display.textContent = display.textContent.slice(0, -1);
        } else {
          clearDisplay();
        }
      }