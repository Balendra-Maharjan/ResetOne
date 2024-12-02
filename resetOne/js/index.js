document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.querySelector(".form-btn");
  const closeFormBtn = document.querySelector(".close-form-btn");
  const nextStepBtn = document.querySelector(".next-step-btn");
  const body = document.body;
  const formContainer = document.querySelector(".form-container");
  const steps = document.querySelectorAll(".step-form-item");

  let currentStep = 0;

  // Utility function to toggle class
  const toggleClass = (element, className, action) => {
      element.classList[action](className);
  };

  // Open form
  openFormBtn.addEventListener("click", () => {
      toggleClass(body, "form-active", "add");
      toggleClass(formContainer, "fade-in", "add");   
      openFormBtn.preventsDefault();   
  });

  // Close form
  closeFormBtn.addEventListener("click", () => {
      toggleClass(body, "form-active", "remove");
      resetForm();
  });

  // Next step
  nextStepBtn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
          goToNextStep();
      }
  });

  // Validate inputs in the current step
  const validateStep = (stepIndex) => {
      const inputs = steps[stepIndex].querySelectorAll("input[required]");
      let isValid = true;

      inputs.forEach((input) => {
          if (!input.value.trim()) {
              input.classList.add("error");
              isValid = false;
          } else {
              input.classList.remove("error");
          }
      });

      return isValid;
  };

  // Navigate to the next step with fade-in animation
  const goToNextStep = () => {
      steps[currentStep].classList.remove("active");
      steps[currentStep].classList.add("fade-out");
      steps[currentStep].style.display = "none";

      currentStep++;
      if (currentStep < steps.length) {
          steps[currentStep].classList.add("fade-in");
          steps[currentStep].classList.add("active");
          steps[currentStep].style.display = "block";
      }
  };

  // Reset the form
  const resetForm = () => {
      steps.forEach((step, index) => {
          step.classList.remove("active", "fade-in", "fade-out");
          if (index === 0) step.classList.add("active");
          step.querySelectorAll("input").forEach((input) => {
              input.value = "";
              input.classList.remove("error");
          });
      });
      currentStep = 0;
  };
});
