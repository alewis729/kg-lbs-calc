const inputKg = document.querySelector("#input-kg");
const inputLbs = document.querySelector("#input-lbs");
const mainContentNode = document.querySelector(".main-content");

const ANIMATION_CLASS = "main-content-animation";

const LBS_CONSTANT = 2.20462;

const roundNum = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const calculate = ({ value, isKg = false }) => {
  if (isNaN(Number(value))) return value;
  const calc = isKg ? value * LBS_CONSTANT : value / LBS_CONSTANT;
  return roundNum(calc);
};

const adjustInputWidths = () => {
  let kgLen = inputKg.value.length;
  let lbsLen = inputLbs.value.length;

  if (kgLen === 0) {
    kgLen = 1;
  }
  if (lbsLen === 0) {
    lbsLen = 1;
  }
  inputKg.style.width = `calc(${kgLen}ch + 5px)`;
  inputLbs.style.width = `calc(${lbsLen}ch + 5px)`;
};

const handleInputChange = (value, isKg, inputNode, inputOtherUnitNode) => {
  const otherUnitCalculated = calculate({ value, isKg });
  const otherUnitVal = inputOtherUnitNode.value;

  if (Number(otherUnitVal) !== otherUnitCalculated) {
    inputOtherUnitNode.value = otherUnitCalculated;
  }

  adjustInputWidths();
};

window.addEventListener("load", function () {
  inputKg.addEventListener("input", (e) => {
    handleInputChange(e.target.value, true, inputKg, inputLbs);
  });

  inputLbs.addEventListener("input", (e) => {
    handleInputChange(e.target.value, false, inputLbs, inputKg);
  });

  adjustInputWidths();

  setTimeout(() => {
    mainContentNode.classList.add(ANIMATION_CLASS);
  }, 750);
});
