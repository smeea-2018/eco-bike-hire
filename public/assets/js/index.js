const signupForm = $("#signup-form");
const loginForm = $("#login-form");
const errorText = $("#error-text");
const bookButton = $("#book-button");

const handleCreateBooking = async (event) => {
  event.preventDefault();

  const bookingType = $("#bookingType").val();
  const bookingDuration = $("#booking-duration").val();
  const startDate = $("#startdate").val();

  if (bookingType && bookingDuration && startDate) {
    try {
      const payload = {
        bookingType,
        bookingDuration,
        startDate,
      };

      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        renderError(
          "create-booking-error",
          "Failed to create a new booking. Please try again."
        );
      }
    } catch (error) {
      renderError(
        "create-booking-error",
        "Failed to create a new booking. Please try again."
      );
    }
  } else {
    renderError("create-booking-error", "Please complete all required fields.");
  }
};

const handleSignup = async (event) => {
  event.preventDefault();

  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  errorText.empty();

  if (firstName && lastName && email && password && confirmPassword) {
    if (password === confirmPassword) {
      try {
        const payload = {
          firstName,
          lastName,
          email,
          password,
        };

        const response = await fetch("/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
          window.location.assign("/login");
        } else {
          errorText.append(
            `<p class="text-danger">Failed to create account</p>`
          );
        }
      } catch (error) {
        errorText.append(`<p class="text-danger">Failed to create account</p>`);
      }
    } else {
      errorText.append(`<p class="text-danger">Passwords do not match</p>`);
    }
  } else {
    errorText.append(`<p class="text-danger">Please complete all fields</p>`);
  }
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = $("#email").val();
  const password = $("#password").val();

  errorText.empty();

  if (email && password) {
    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        window.location.assign("/dashboard");
      } else {
        errorText.append(`<p class="text-danger">Failed to login</p>`);
      }
    } catch (error) {
      errorText.append(`<p class="text-danger">Failed to login</p>`);
    }
  } else {
    errorText.append(`<p class="text-danger">Please complete all fields</p>`);
  }
};

signupForm.submit(handleSignup);
loginForm.submit(handleLogin);
bookButton.click(handleCreateBooking);
