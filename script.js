const metric = document.querySelector(".metric");
const imperial = document.querySelector(".imperial");
const metricCon = document.querySelector(".metric-con");
const imperialCon = document.querySelector(".imperial-con");
const inputBox = document.querySelectorAll("#inputBox");
const clearBtn = document.querySelector(".clearBtn");
const calculateBtn = document.querySelector(".calculateBtn");
const bmiResult = document.querySelector(".bmi-result");
const bmiTextResult = document.querySelector(".bmi-text-result");
const heightCm = document.querySelector(".height-cm-input");
const weightKg = document.querySelector(".weight-kg-input");
const heightInch = document.querySelector(".height-inch-input");
const weightPounds = document.querySelector(".weight-pounds-input");
const error1 = document.querySelector(".error-metric");
const error2 = document.querySelector(".error-imperial");

// The user only can type numbers
inputBox.forEach((inputBox) => {
    inputBox.addEventListener("input", (event) => {

        const input = event.target.value;
        const numbersOnly = /^\d*$/;
        if (!numbersOnly.test(input)) {
            event.target.value = input.replace(/\D/g, "");
        }
        if (input.charAt(0) === "0") {
            event.target.value = input.replace("0", "")
        }

    });
});

// Clear all inputBox value
clearBtn.addEventListener("click", () => {
    inputBox.forEach((inputValue) => {
        inputValue.value = "";
    });
    bmiResult.textContent = "0";
    bmiTextResult.textContent = "";
});

metric.addEventListener("click", () => {
    if (imperial.classList.contains("active")) {
        imperialCon.classList.remove("activeCon");
        metricCon.classList.add("activeCon");
        imperial.classList.remove("active");
        metric.classList.add("active");
        error2.innerHTML = "";
        bmiResult.textContent = "0";
        bmiTextResult.textContent = "";
        heightInch.value = "";
        weightPounds.value = "";
    }
});

imperial.addEventListener("click", () => {
    if (metric.classList.contains("active")) {
        metricCon.classList.remove("activeCon");
        imperialCon.classList.add("activeCon");
        metric.classList.remove("active");
        imperial.classList.add("active");
        error1.innerHTML = "";
        bmiResult.textContent = "0";
        bmiTextResult.textContent = "";
        heightCm.value = "";
        weightKg.value = "";
    }
});

calculateBtn.addEventListener("click", () => {
    calculateInput();
});

// Calculate BMI 
function calculateInput() {
    if (metric.classList.contains("active")) {
        if ((heightCm.value === "") || (weightKg.value === "")) {
            error1.innerHTML = `<button class="errorButton"><i class="fa-regular fa-circle-xmark"></i></button><p class="errorText">Please fill out the empty field(s)</p>`;
        } else if (!((heightCm.value === "") && (weightKg.value === ""))) {
            error1.innerHTML = "";
            const bmi = weightKg.value / ((heightCm.value/100) ** 2);
            bmiResult.textContent = bmi.toFixed(2);
            bmiTextCalculation(bmi); 
        }
    } else if (imperial.classList.contains("active")) {
        if ((heightInch.value === "") || (weightPounds.value === "")) {
            error2.innerHTML = `<button class="errorButton"><i class="fa-regular fa-circle-xmark"></i></button><p class="errorText">Please fill out the empty field(s)</p>`;
        } else if (!((heightInch.value === "") && (weightPounds.value === ""))) {
            error2.innerHTML = "";
            const bmi = (weightPounds.value / (heightInch.value ** 2)) * 703;
            bmiResult.textContent = bmi.toFixed(2);
            bmiTextCalculation(bmi);
        }
    }
}

function bmiTextCalculation(bmi) {
    if (bmi < 18.5) {
        bmiTextResult.textContent = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        bmiTextResult.textContent = "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        bmiTextResult.textContent = "Overweight";
    } else if (bmi >= 30 && bmi <= 34.9) {
        bmiTextResult.textContent = "Obesity Class I";
    } else if (bmi >= 35 && bmi <= 39.9) {
        bmiTextResult.textContent = "Obesity Class II";
    } else {
        bmiTextResult.textContent = "Obesity Class III";
    }
}

// Delete error message
error1.addEventListener("click", (event) => {
    if (event.target.classList.contains("errorButton")) {
        error1.innerHTML = "";
    }
});

error2.addEventListener("click", (event) => {
    if (event.target.classList.contains("errorButton")) {
        error2.innerHTML = "";
    }
});